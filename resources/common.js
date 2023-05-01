// common library
const fs = require('fs');
const path = require('path');
const child_process = require('child_process');
const remote = require('@electron/remote');

const appVersion = process.env.npm_package_version ? process.env.npm_package_version : JSON.parse(fs.readFileSync('resources/app.asar/package.json')).version;
const programRootDirectory = (process.env.NODE_ENV == "development" ? "." : require('@electron/remote').app.getAppPath() + ".unpacked");

if (!appVersion.startsWith('1.0')) {
    alert('open beta finished! use 1.0.X version plz');
    openExternalBrowser("https://github.com/lancard/k-installer/releases");
}

function openExternalBrowser(url) {
    child_process.execSync(`start ${url}`);
}

function decompress(zipFilename, targetDirectory, callback) {
    child_process.exec(`${programRootDirectory}\\7za.exe x "${zipFilename}" -y -bd -o"${targetDirectory}"`, (error, stdout, stderr) => {
        if (error) {
            $.toast({
                heading: 'Error',
                text: `extract error: ${error}`,
                position: 'top-right',
                hideAfter: false,
                icon: 'error'
            });
            return;
        }

        callback();
    });
}

const https = require('follow-redirects').https;
function downloadFile(filename, url, callback, progressCallback) {
    https.get(url, response => {
        const tempPath = path.join(path.dirname(filename), randomString(32));
        const fileStream = fs.createWriteStream(tempPath);

        var transferred = 0;
        const startTime = dayjs();
        var lastReportedTime = startTime;
        const total = response.headers['content-length'];

        response.on('data', chunk => {
            fileStream.write(chunk);
            transferred += chunk.length;

            var now = dayjs();

            // every second
            if (now.diff(lastReportedTime, 'second', true) > 1) {
                lastReportedTime = now;
                var diff = now.diff(startTime, 'second', true);
                var speed = 0
                if (diff != 0) {
                    speed = transferred / diff;
                }
                progressCallback(transferred, speed, total);
            }
        });

        response.on('error', (err) => {
            fileStream.close();
            console.error(err);
        })

        response.on('end', () => {
            fileStream.close();
            fs.renameSync(tempPath, filename);

            // last report
            var now = dayjs();
            var diff = now.diff(startTime, 'second', true);
            var speed = 0
            if (diff != 0) {
                speed = transferred / diff;
            }
            progressCallback(transferred, speed, total);

            // callback
            callback(filename, url);
        });
    }).on('error', (err) => {
        console.error(err);
    });
}

function getZipfileList(filename) {
    return child_process.execSync(`${programRootDirectory}\\7za.exe l -ba -slt "${filename}"`).toString().split("\r\n").filter(e => e.startsWith('Path = ')).map(e => e.substring(7));
}

function getCommunityDirectory() {
    var msfsConfigPath = null;

    const steamPath = path.join(process.env.APPDATA, "\\Microsoft Flight Simulator\\UserCfg.opt");
    const storePath = path.join(process.env.LOCALAPPDATA, "\\Packages\\Microsoft.FlightSimulator_8wekyb3d8bbwe\\LocalCache\\UserCfg.opt");

    if (fs.existsSync(steamPath)) {
        msfsConfigPath = steamPath;
    } else if (fs.existsSync(storePath)) {
        msfsConfigPath = storePath;
    } else {
        return null;
    }

    if (!msfsConfigPath) {
        return null;
    }

    try {
        const msfsConfig = fs.readFileSync(msfsConfigPath).toString();
        const msfsConfigLines = msfsConfig.split(/\r?\n/);
        const packagesPathLine = msfsConfigLines.find(line => line.includes('InstalledPackagesPath'));
        const communityDir = path.join(packagesPathLine.split(" ").slice(1).join(" ").replaceAll('"', ''), "\\Community");

        return fs.existsSync(communityDir) ? communityDir : null;
    } catch (e) {
        console.warn('Could not parse community dir from file', msfsConfigPath);
        console.error(e);
        return null;
    }
}

function updateDownloadStatus(selector, transferred, speed, total) {
    if (total) {
        var message = `${(transferred / 1024 / 1024).toFixed(2)} MB / ${(total / 1024 / 1024).toFixed(2)} MB (${(transferred * 100 / total).toFixed(0)}%)`;
        $(selector).find("[transferred]").text(message);
    }
    else {
        $(selector).find("[transferred]").text(`${(transferred / 1024 / 1024).toFixed(2)} MB`);
    }
    $(selector).find("[speed]").text(`${(speed / 1024 / 1024).toFixed(2)} MB/s`);
}

function randomString(length) {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyz';

    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

function rmSync(path) {
    try {
        fs.rmSync(path, { recursive: true, force: true });
    }
    catch (e) {
        $.toast({
            heading: 'Error',
            text: `unable to remove: ${path}`,
            position: 'top-right',
            hideAfter: false,
            icon: 'error'
        });
        throw new Error(`unable to remove: ${path}`);
    }
}

function moveSync(oldPath, newPath) {
    if (oldPath == newPath) {
        return;
    }

    // create directory first
    if (!fs.existsSync(path.dirname(newPath))) {
        fs.mkdirSync(path.dirname(newPath), { recursive: true });
    }

    // try to rename
    try {
        fs.renameSync(oldPath, newPath);
    } catch (e) {
        // if fail, (different device) copy and remove
        fs.copyFileSync(oldPath, newPath);
        rmSync(oldPath);
    }
}


function updateAirportMarks(icao) {
    const fs2020Id = `${icao}-fs2020-scenery`;
    const p3dId = `${icao}-p3d-scenery`;

    const fs2020installedVersion = programInfo[fs2020Id] ? localStorage.getItem(programInfo[fs2020Id].localStorageNameOfInstalledVersion) : null;
    const p3dinstalledVersion = programInfo[p3dId] ? localStorage.getItem(programInfo[p3dId].localStorageNameOfInstalledVersion) : null;

    // installed mark
    if (fs2020installedVersion != null || p3dinstalledVersion != null) {
        $(`[map-overlay=${icao}] div.bg-gray-800`).addClass("text-success");
    }
    else {
        $(`[map-overlay=${icao}] div.bg-gray-800`).removeClass("text-success");
    }

    // update mark
    var updated = false;
    if (fs2020installedVersion != null && fs2020installedVersion != programInfo[fs2020Id].latestVersion) {
        updated = true;
    }
    if (p3dinstalledVersion != null && p3dinstalledVersion != programInfo[p3dId].latestVersion) {
        updated = true;
    }


    if (updated) {
        $(`[updateIcon=${icao}]`).removeClass("d-none");
        $(`[map-overlay=${icao}] div.bg-gray-800`).addClass("text-danger");
    }
    else {
        $(`[updateIcon=${icao}]`).addClass("d-none");
        $(`[map-overlay=${icao}] div.bg-gray-800`).removeClass("text-danger");
    }
}

function updateScreen(id) {
    $(`[updateNotify="${id}"]`).addClass("collapse");
    $(`[latestVersion="${id}"]`).text(programInfo[id].latestVersion);

    if (id == "k-installer") {
        $(`[installedVersion="${id}"]`).text(appVersion);
        if (programInfo[id].latestVersion != appVersion) {
            $("[downloadButton=k-installer]").removeClass("collapse");
        }
        return;
    }


    if (!isInstalledBefore(id)) {
        $(`[installedVersion="${id}"]`).text("(not installed)");
        $(`[installedDirectory="${id}"]`).text("(not installed)");
        updateAirportMarks(programInfo[id].icao);
        return;
    }

    $(`[installedVersion="${id}"]`).text(localStorage.getItem(programInfo[id].localStorageNameOfInstalledVersion));
    var installedDirectoryList = JSON.parse(localStorage.getItem(programInfo[id].localStorageNameOfInstalledDirectoryList)).join(", ");
    $(`[installedDirectory="${id}"]`).text(installedDirectoryList);

    // update mark to scenery
    if (programInfo[id].latestVersion != localStorage.getItem(programInfo[id].localStorageNameOfInstalledVersion))
        $(`[updateNotify="${id}"]`).removeClass("collapse");

    // update marks to airport
    updateAirportMarks(programInfo[id].icao);
}


function checkUpdate(id) {
    if (!programInfo[id].versionCheckUrl)
        return;

    $.get(programInfo[id].versionCheckUrl, (data) => {
        const latestVersion = programInfo[id].versionModifier ? programInfo[id].versionModifier(data) : data;

        programInfo[id].latestVersion = latestVersion;

        updateScreen(id);
    });
}

function isInstalledBefore(id) {
    return localStorage.getItem(programInfo[id].localStorageNameOfInstalledVersion) != null;
}

function removeProgramFromUI(elem) {
    id = $(elem).attr('downloadButton');

    if (!confirm('want to delete?'))
        return;

    removeProgram(id);

    $.toast({
        heading: 'Success',
        text: `Removed: ${id}`,
        position: 'top-right',
        hideAfter: false,
        icon: 'success'
    });
}

function removeProgram(id) {
    if (!isInstalledBefore(id))
        return;

    const installedDirectoryArray = JSON.parse(localStorage.getItem(programInfo[id].localStorageNameOfInstalledDirectoryList));

    // remove first
    installedDirectoryArray.forEach(e => {
        rmSync(e);
    });

    // remove storage
    localStorage.removeItem(programInfo[id].localStorageNameOfInstalledDirectoryList);
    localStorage.removeItem(programInfo[id].localStorageNameOfInstalledVersion);

    // update screen
    updateScreen(id);
}

var downloadCount = 0;
function installProgram(id) {

    var targetDirectory = ""

    if (id == "k-installer") {
        targetDirectory = require('os').tmpdir();
    }

    if (programInfo[id].programType == 'fs2020') {
        if (localStorage.getItem("fs2020-root-directory") == null) {
            alert('select directory in home screen first');
            showMenu('k-installer');
            return;
        }

        targetDirectory = localStorage.getItem("fs2020-root-directory");
    }
    if (programInfo[id].programType == 'p3d') {
        if (localStorage.getItem("p3d-root-directory") == null) {
            alert('select directory in home screen first');
            showMenu('k-installer');
            return;
        }

        targetDirectory = localStorage.getItem("p3d-root-directory");
    }

    // check already directory exist
    for (var dir in programInfo[id].directory) {
        var newPath = `${targetDirectory}\\${dir}`
        if (fs.existsSync(newPath)) {
            if (!confirm(`directory ${newPath} already exist. do you want to delete before install?`)) {
                alert('abort');
                return;
            }
            rmSync(newPath);
        }
    }

    const unzippedDirectory = `${targetDirectory}\\${randomString(32)}`;
    const filename = `${unzippedDirectory}\\${id}.zip`;

    fs.mkdirSync(unzippedDirectory, { recursive: true });

    var $buttons = $(`[downloadButton="${id}"]`);
    var $status = $(`[downloadStatus="${id}"]`);

    $buttons.hide();
    $status.show();
    $status.find("[statusMessage]").text("downloading...");
    downloadCount++;
    $("[downloadCount]").text(downloadCount);

    downloadFile(filename, programInfo[id].downloadUrl,
        () => {
            $status.find("[statusMessage]").text("decompressing...");

            decompress(filename, unzippedDirectory, () => {
                if (id == "k-installer") {
                    var zipcontents = getZipfileList(filename);
                    rmSync(filename); // remove zip file for disk space
                    child_process.execSync(`"${unzippedDirectory}\\${zipcontents[0]}"`);
                    downloadCount--;
                    $("[downloadCount]").text(downloadCount);
                    return;
                }

                rmSync(filename); // remove zip file for disk space

                // replacement for unzipped files
                var installedDirectory = [];
                for (var dir in programInfo[id].directory) {
                    moveSync(`${unzippedDirectory}\\${programInfo[id].directory[dir]}`, `${targetDirectory}\\${dir}`);
                    installedDirectory.push(`${targetDirectory}\\${dir}`);
                }

                rmSync(unzippedDirectory); // remove zip root directory

                // save installed information
                localStorage.setItem(programInfo[id].localStorageNameOfInstalledDirectoryList, JSON.stringify(installedDirectory));
                localStorage.setItem(programInfo[id].localStorageNameOfInstalledVersion, programInfo[id].latestVersion);

                $.toast({
                    heading: 'Success',
                    text: `installation complete: ${id}`,
                    position: 'top-right',
                    hideAfter: false,
                    icon: 'success'
                });

                // restore hide elements
                $buttons.show();
                $status.hide();

                // check update again
                updateScreen(id);

                downloadCount--;
                $("[downloadCount]").text(downloadCount);
            });
        },
        (transferred, speed, total) => {
            updateDownloadStatus($status, transferred, speed, total);
        });
}

function upgradeProgram(id) {
    if (typeof (id) != 'string') {
        id = $(id).attr('downloadButton');
    }

    if (id == "k-installer") {
        installProgram(id);
        return;
    }

    var installedDirectory = localStorage.getItem(programInfo[id].localStorageNameOfInstalledVersion);

    // installed before
    if (installedDirectory != null) {
        // remove first
        removeProgram(id);

        installProgram(id);

        return;
    }

    installProgram(id);
}

function selectDirectory(program) {
    var ret = remote.dialog.showOpenDialogSync({ properties: ["openDirectory"] });
    if (!ret) {
        return;
    }
    if (!fs.existsSync(ret[0])) {
        $.toast({
            heading: 'Error',
            text: `path not exist: ${ret[0]}`,
            position: 'top-right',
            hideAfter: false,
            icon: 'error'
        });
        return;
    }

    if (program == 'fs2020') {
        localStorage.setItem("fs2020-root-directory", ret[0]);
        $("#communityDirectory").text(ret[0]);
    }
    if (program == 'p3d') {
        localStorage.setItem("p3d-root-directory", ret[0]);
        $("#addonSceneryDirectory").text(ret[0]);
    }
}


function suggestRunwayList(airport, wind) {
    if (airport == "RKSI") {
        if (wind > 60 && wind < 240) { return "15L(MAIN), 15R(MAIN), 16L, 16R"; }
        else { return "33L(MAIN), 33R(MAIN), 34L, 34R"; }
    }
    if (airport == "RKSS") {
        if (wind > 50 && wind < 230) { return "14L, 14R"; }
        else { return "32L, 32R"; }
    }
    if (airport == "RKPC") {
        if (wind >= 170 && wind < 330) {
            if (wind > 220) {
                return "25(MAIN), 31";
            }
            else {
                return "25";
            }
        }
        else {
            if (wind > 220) {
                return "07(MAIN), 31";
            }
            else {
                return "07";
            }
        }
    }
    if (airport == "RKJB") {
        if (wind >= 110 && wind <= 270) { return "19"; }
        else { return "01"; }
    }
    if (airport == "RKPU") {
        if (wind > 90 && wind < 270) { return "18"; }
        else { return "36"; }
    }
    if (airport == "RKNY") {
        if (wind > 60 && wind < 240) { return "15"; }
        else { return "33"; }
    }
    if (airport == "RKJY") {
        if (wind >= 80 && wind <= 260) { return "17"; }
        else { return "35"; }
    }
    if (airport == "RKPK") {
        if (wind > 90 && wind < 270) { return "18R(MAIN), 18L"; }
        else { return "36L(MAIN), 36R"; }
    }
    if (airport == "RKTU") {
        if (wind >= 150 && wind <= 330) { return "24R(MAIN), 24L"; }
        else { return "06L(MAIN), 06R"; }
    }
    if (airport == "RKTN") {
        if (wind >= 40 && wind <= 220) { return "13R(MAIN), 13L"; }
        else { return "31L(MAIN), 31R"; }
    }
    if (airport == "RKJJ") {
        if (wind >= 140 && wind <= 330) { return "22L(MAIN), 22R"; }
        else { return "04R(MAIN), 04L"; }
    }
    if (airport == "RKJJ") {
        if (wind >= 140 && wind <= 330) { return "22L(MAIN), 22R"; }
        else { return "04R(MAIN), 04L"; }
    }
    if (airport == "RKTH") {
        if (wind >= 200 && wind <= 360) { return "28"; }
        else { return "10"; }
    }
    if (airport == "RKPS") {
        if (wind >= 150 && wind <= 330) { return "24L, 24R"; }
        else { return "06L, 06R"; }
    }
    if (airport == "RKNW") {
        if (wind >= 130 && wind <= 290) { return "21"; }
        else { return "03"; }
    }
    if (airport == "RKTL") {
        if (wind >= 80 && wind <= 260) { return "17"; }
        else { return "35"; }
    }
    if (airport == "RKTP") {
        if (wind >= 130 && wind <= 320) { return "21L, 21R"; }
        else { return "03L, 03R"; }
    }
    if (airport == "RKSO") {
        if (wind >= 0 && wind <= 180) { return "09L, 09R"; }
        else { return "27L, 27R"; }
    }
    if (airport == "RKTI") {
        if (wind > 90 && wind < 270) { return "18L, 18R"; }
        else { return "36L, 36R"; }
    }
    if (airport == "RKTY") {
        if (wind >= 200 && wind <= 360) { return "28"; }
        else { return "10"; }
    }
    if (airport == "RKSM") {
        if (wind >= 110 && wind <= 270) { return "19, 20"; }
        else { return "01, 02"; }
    }
    if (airport == "RKSW") {
        if (wind > 60 && wind < 240) { return "15L, 15R"; }
        else { return "33L, 33R"; }
    }
    if (airport == "RKJK") {
        if (wind > 90 && wind < 270) { return "18"; }
        else { return "36"; }
    }
    if (airport == "RKNN") {
        if (wind > 170 && wind < 350) { return "26"; }
        else { return "08"; }
    }

    return "";
}

function updateAllMetarAndRunway() {
    $(`[airportTemplate]`).find("[metarArea]").text(" (Loading...) ");
    $(`[airportTemplate]`).find("[runwayAreaAmos]").text(" (Loading...) ");
    $(`[airportTemplate]`).find("[runwayAreaWind]").text(" (Loading...) ");

    $.getJSON("https://lancard.github.io/get_metar/metar.json", metar => {
        $.getJSON("https://lancard.github.io/get_runway/runway.json", runway => {
            $(`[airportTemplate]`).find("[metarArea]").text(" (No Metar Information) ");
            $(`[airportTemplate]`).find("[runwayAreaAmos]").text(" (No Runway Information) ");
            $(`[airportTemplate]`).find("[runwayAreaWind]").text(" (No Runway Information) ");

            for (var airport in metar) {
                $(`[airportTemplate][icao=${airport}]`).find("[metarArea]").text(metar[airport]);
            }

            for (var airport in runway) {
                var arr = [];

                for (var r in runway[airport]) {
                    if (runway[airport][r].use)
                        arr.push(r);
                }

                if (metar[airport]) {
                    var metarObject = metarParser(metar[airport]);
                    var windRunway = suggestRunwayList(airport, metarObject.wind.direction);
                    $(`[airportTemplate][icao=${airport}]`).find("[runwayAreaAmos]").text(arr.join(","));
                    $(`[airportTemplate][icao=${airport}]`).find("[runwayAreaWind]").text(windRunway);
                }
            }
        });
    });

    $.getJSON('https://lancard.github.io/chart/AIP/effectiveDateInformation.json', dateList => {
        $("[chartEffectiveDate]").text(dateList[0]);
    });
}

function initialization() {
    // save preferences for k-installer
    localStorage.setItem(programInfo["k-installer"].localStorageNameOfInstalledVersion, appVersion);

    if (localStorage.getItem("fs2020-root-directory") == null) {
        if (getCommunityDirectory() != null)
            localStorage.setItem("fs2020-root-directory", getCommunityDirectory());
    }

    if (localStorage.getItem("fs2020-root-directory") == null) {
        $("#communityDirectory").text("Not Found");
    }
    else {
        $("#communityDirectory").text(localStorage.getItem("fs2020-root-directory"));
    }

    if (localStorage.getItem("p3d-root-directory") == null) {
        $("#addonSceneryDirectory").text("Not Found");
    }
    else {
        $("#addonSceneryDirectory").text(localStorage.getItem("p3d-root-directory"));
    }

    for (var airport in airportInfo) {
        createSceneryContentsDOM(airportInfo[airport].icao, airportInfo[airport].name, airportInfo[airport].fs2020SceneryId, airportInfo[airport].p3dSceneryId);
    }
    $("[airportTemplate]").hide();

    // give start to major airport
    $("span[menu-icao=RKSI]").prepend("<i class='text-warning fas fa-star'></i>");
    $("span[menu-icao=RKSS]").prepend("<i class='text-warning fas fa-star'></i>");
    $("span[menu-icao=RKPC]").prepend("<i class='text-warning fas fa-star'></i>");
    $("span[menu-icao=RKPK]").prepend("<i class='text-warning fas fa-star'></i>");
    $("span[menu-icao=ZKPY]").prepend("<i class='text-warning fas fa-star'></i>");


    // new airport!
    $("span[menu-icao=ZKWS]").append(" <div class='btn btn-sm btn-danger text-small p-0'>new!</div>");
    $("[icao=ZKWS] [scenerytype=fs2020] .card-header .float-right").before(" <div class='btn btn-sm btn-danger text-small p-0'>new!</div>");

    $("span[menu-icao=RKDU]").append(" <div class='btn btn-sm btn-danger text-small p-0'>new!</div>");
    $("[icao=RKDU] [scenerytype=fs2020] .card-header .float-right").before(" <div class='btn btn-sm btn-danger text-small p-0'>new!</div>");

    $("span[menu-icao=RKNY]").append(" <div class='btn btn-sm btn-danger text-small p-0'>new!</div>");
    $("[icao=RKNY] [scenerytype=fs2020] .card-header .float-right").before(" <div class='btn btn-sm btn-danger text-small p-0'>new!</div>");

    $("span[menu-icao=RKPC]").append(" <div class='btn btn-sm btn-danger text-small p-0'>new!</div>");
    $("[icao=RKPC] [scenerytype=fs2020] .card-header .float-right").before(" <div class='btn btn-sm btn-danger text-small p-0'>new!</div>");

    $("span[menu-icao=RKTH]").append(" <div class='btn btn-sm btn-danger text-small p-0'>new!</div>");
    $("[icao=RKTH] [scenerytype=fs2020] .card-header .float-right").before(" <div class='btn btn-sm btn-danger text-small p-0'>new!</div>");


    // check update
    for (var id in programInfo) {
        checkUpdate(id);
    }

    // update chart
    $.getJSON('https://lancard.github.io/chart/AIP/latest/AD/chartInformation.json', (chart) => {
        // add DPRK chart
        chart["ZKPY"] = {
            "AD CHART": "https://docs.google.com/drawings/d/1i5-MPOAG82jDGAm02Vgn1sIow4qArLh8jdKC36zkJ9k/edit?usp=sharing",
            "AD GROUND MOVEMENT CHART": "https://docs.google.com/drawings/d/1i5-MPOAG82jDGAm02Vgn1sIow4qArLh8jdKC36zkJ9k/edit?usp=sharing",
            "AD OBSTACLE CHART TYPE A": false,
            "AD OBSTACLE CHART TYPE B": false,
            "AIRCRAFT PARKING DOCKING CHART": "https://docs.google.com/drawings/d/1pS3pQOvoIkasIqEVvwI4QhE8Xoiz72WIcp7O6ESl5Fo/edit?usp=sharing",
            "AREA CHART": false,
            "ATC SURVEILLANCE MINIMUM ALTITUDE CHART": false,
            "BIRD CONCENTRATION CHART": false,
            "INSTR APCH CHART": "https://docs.google.com/drawings/d/1XPadjZpe-4uQ8-ls_y9AacdV1WtjSSictudLyMvYiT4/edit?usp=sharing",
            "PRECISION APP TERRAIN CHART": false,
            "SID": "https://docs.google.com/drawings/d/15QUM8bKBDNS6_jhxoA5Ilz9r1F2XFPA3vBEpWFNeePE/edit?usp=sharing",
            "STAR": "https://docs.google.com/drawings/d/1oTln52p3Z8Gd9-BJQVquxRaWDHOHyuDUFG6gTrefhso/edit?usp=sharing",
            "TEXT": false,
            "VISUAL APCH CHART": false
        };
        chart["ZKWS"] = {
            "AD CHART": false,
            "AD GROUND MOVEMENT CHART": false,
            "AD OBSTACLE CHART TYPE A": false,
            "AD OBSTACLE CHART TYPE B": false,
            "AIRCRAFT PARKING DOCKING CHART": false,
            "AREA CHART": false,
            "ATC SURVEILLANCE MINIMUM ALTITUDE CHART": false,
            "BIRD CONCENTRATION CHART": false,
            "INSTR APCH CHART": "asfsf",
            "PRECISION APP TERRAIN CHART": false,
            "SID": "https://docs.google.com/drawings/d/15SYvGTXsQFpewbWRBK-QpAoeYWUy3Xj9zZ8UHC4CBHE/edit?usp=sharing",
            "STAR": "https://docs.google.com/drawings/d/1_P7gqcQbMTlIcXF619k1AiOgMNr0WRV7MagiftFtEL4/edit?usp=sharing",
            "TEXT": false,
            "VISUAL APCH CHART": false
        };

        // charts
        for (var airport in chart) {
            var chartType = "";


            // AD charts
            chartType = "AD CHART";
            if (chart[airport][chartType]) {
                $(`<button type="button" class="btn btn-sm btn-info m-2" onclick="openChart(this, '${chartType}')"><i class="fa fa-location-crosshairs"></i> AD</button>`)
                    .appendTo($(`[airportTemplate][icao=${airport}]`).find("[chartArea=AD]"));
            }
            chartType = "AD GROUND MOVEMENT CHART";
            if (chart[airport][chartType]) {
                $(`<button type="button" class="btn btn-sm btn-info m-2" onclick="openChart(this, '${chartType}')"><i class="fa fa-car-side"></i> GND MOVE</button>`)
                    .appendTo($(`[airportTemplate][icao=${airport}]`).find("[chartArea=AD]"));
            }
            chartType = "AIRCRAFT PARKING DOCKING CHART";
            if (chart[airport][chartType]) {
                $(`<button type="button" class="btn btn-sm btn-info m-2" onclick="openChart(this, '${chartType}')"><i class="fa fa-square-parking"></i> PARK</button>`)
                    .appendTo($(`[airportTemplate][icao=${airport}]`).find("[chartArea=AD]"));
            }

            // procedures
            chartType = "SID";
            if (chart[airport][chartType]) {
                $(`<button type="button" class="btn btn-sm btn-info m-2" onclick="openChart(this, '${chartType}')"><i class="fa fa-plane-departure"></i> SID</button>`)
                    .appendTo($(`[airportTemplate][icao=${airport}]`).find("[chartArea=PROCEDURE]"));
            }
            chartType = "STAR";
            if (chart[airport][chartType]) {
                $(`<button type="button" class="btn btn-sm btn-info m-2" onclick="openChart(this, '${chartType}')"><i class="fa fa-plane-arrival"></i> STAR</button>`)
                    .appendTo($(`[airportTemplate][icao=${airport}]`).find("[chartArea=PROCEDURE]"));
            }
            chartType = "INSTR APCH CHART";
            if (chart[airport][chartType]) {
                $(`<button type="button" class="btn btn-sm btn-info m-2" onclick="openChart(this, '${chartType}')"><i class="fa fa-tower-broadcast"></i> INSTR APP</button>`)
                    .appendTo($(`[airportTemplate][icao=${airport}]`).find("[chartArea=PROCEDURE]"));
            }
            chartType = "VISUAL APCH CHART";
            if (chart[airport][chartType]) {
                $(`<button type="button" class="btn btn-sm btn-info m-2" onclick="openChart(this, '${chartType}')"><i class="fa fa-glasses"></i> VIS APP</button>`)
                    .appendTo($(`[airportTemplate][icao=${airport}]`).find("[chartArea=PROCEDURE]"));
            }

            // gen and etc
            chartType = "TEXT";
            if (chart[airport][chartType]) {
                $(`<button type="button" class="btn btn-sm btn-info m-2" onclick="openChart(this, '${chartType}')"><i class="fa fa-t"></i> TEXT</button>`)
                    .appendTo($(`[airportTemplate][icao=${airport}]`).find("[chartArea=GENERAL]"));
            }
            chartType = "AREA CHART";
            if (chart[airport][chartType]) {
                $(`<button type="button" class="btn btn-sm btn-info m-2" onclick="openChart(this, '${chartType}')"><i class="fa fa-location-crosshairs"></i> AREA</button>`)
                    .appendTo($(`[airportTemplate][icao=${airport}]`).find("[chartArea=GENERAL]"));
            }
            chartType = "ATC SURVEILLANCE MINIMUM ALTITUDE CHART";
            if (chart[airport][chartType]) {
                $(`<button type="button" class="btn btn-sm btn-info m-2" onclick="openChart(this, '${chartType}')"><i class="fa fa-arrow-up-1-9"></i> MSA</button>`)
                    .appendTo($(`[airportTemplate][icao=${airport}]`).find("[chartArea=GENERAL]"));
            }
            chartType = "PRECISION APP TERRAIN CHART";
            if (chart[airport][chartType]) {
                $(`<button type="button" class="btn btn-sm btn-info m-2" onclick="openChart(this, '${chartType}')"><i class="fa fa-mountain"></i> TERRAIN</button>`)
                    .appendTo($(`[airportTemplate][icao=${airport}]`).find("[chartArea=GENERAL]"));
            }
            chartType = "BIRD CONCENTRATION CHART";
            if (chart[airport][chartType]) {
                $(`<button type="button" class="btn btn-sm btn-info m-2" onclick="openChart(this, '${chartType}')"><i class="fa fa-dove"></i> BIRD</button>`)
                    .appendTo($(`[airportTemplate][icao=${airport}]`).find("[chartArea=GENERAL]"));
            }
            chartType = "AD OBSTACLE CHART TYPE A";
            if (chart[airport][chartType]) {
                $(`<button type="button" class="btn btn-sm btn-info m-2" onclick="openChart(this, '${chartType}')"><i class="fa fa-mountain-city"></i> OBST A</button>`)
                    .appendTo($(`[airportTemplate][icao=${airport}]`).find("[chartArea=GENERAL]"));
            }
            chartType = "AD OBSTACLE CHART TYPE B";
            if (chart[airport][chartType]) {
                $(`<button type="button" class="btn btn-sm btn-info m-2" onclick="openChart(this, '${chartType}')"><i class="fa fa-mountain-city"></i> OBST B</button>`)
                    .appendTo($(`[airportTemplate][icao=${airport}]`).find("[chartArea=GENERAL]"));
            }
        }
    });

    // update metar/runway and register interval
    updateAllMetarAndRunway();
    setInterval(updateAllMetarAndRunway, 13 * 60 * 1000);
}

function showMenu(selectedId) {
    $("div.container-fluid").hide(500);
    $("#" + selectedId).show(500);
}

function openChart(elem, chartName) {
    var icao = $(elem).parents("div[airportTemplate]").attr("icao");

    if (icao == "ZKPY" && chartName == "AD CHART") {
        openExternalBrowser("https://docs.google.com/drawings/d/1i5-MPOAG82jDGAm02Vgn1sIow4qArLh8jdKC36zkJ9k/edit?usp=sharing");
        return;
    }
    if (icao == "ZKPY" && chartName == "SID") {
        openExternalBrowser("https://docs.google.com/drawings/d/15QUM8bKBDNS6_jhxoA5Ilz9r1F2XFPA3vBEpWFNeePE/edit?usp=sharing");
        return;
    }
    if (icao == "ZKPY" && chartName == "STAR") {
        openExternalBrowser("https://docs.google.com/drawings/d/1oTln52p3Z8Gd9-BJQVquxRaWDHOHyuDUFG6gTrefhso/edit?usp=sharing");
        return;
    }
    if (icao == "ZKPY" && chartName == "AD GROUND MOVEMENT CHART") {
        openExternalBrowser("https://docs.google.com/drawings/d/1i5-MPOAG82jDGAm02Vgn1sIow4qArLh8jdKC36zkJ9k/edit?usp=sharing");
        return;
    }
    if (icao == "ZKPY" && chartName == "AIRCRAFT PARKING DOCKING CHART") {
        openExternalBrowser("https://docs.google.com/drawings/d/1pS3pQOvoIkasIqEVvwI4QhE8Xoiz72WIcp7O6ESl5Fo/edit?usp=sharing");
        return;
    }
    if (icao == "ZKPY" && chartName == "INSTR APCH CHART") {
        if (confirm('View ILS 35?')) {
            openExternalBrowser("https://docs.google.com/drawings/d/1XPadjZpe-4uQ8-ls_y9AacdV1WtjSSictudLyMvYiT4/edit?usp=sharing");
            return;
        }
        if (confirm('View ILS/DME 17?')) {
            openExternalBrowser("https://docs.google.com/drawings/d/186aWUvRcJOuadxu6QEcsDWyz5M4Wc4T5qhz_lU0hkIs/edit?usp=sharing");
            return;
        }
        if (confirm('View RNP 35?')) {
            openExternalBrowser("https://docs.google.com/drawings/d/1cpO68EiuOin4n9P7b1gCgpXThzVehP0d31BKfF2DOZ8/edit?usp=sharing");
            return;
        }
        if (confirm('View RNP 17?')) {
            openExternalBrowser("https://docs.google.com/drawings/d/15aEW6B54jhTT7e-LEOelqpBH89iVGs3tBEUewCouZyQ/edit?usp=sharing");
            return;
        }
        alert('no more INSTR APCH CHART');
        return;
    }

    if (icao == "ZKWS" && chartName == "SID") {
        openExternalBrowser("https://docs.google.com/drawings/d/15SYvGTXsQFpewbWRBK-QpAoeYWUy3Xj9zZ8UHC4CBHE/edit?usp=sharing");
        return;
    }
    if (icao == "ZKWS" && chartName == "STAR") {
        openExternalBrowser("https://docs.google.com/drawings/d/1_P7gqcQbMTlIcXF619k1AiOgMNr0WRV7MagiftFtEL4/edit?usp=sharing");
        return;
    }
    if (icao == "ZKWS" && chartName == "INSTR APCH CHART") {
        if (confirm('View ILS 15L?')) {
            openExternalBrowser("https://docs.google.com/drawings/d/1BlTYFSnlrGW5e2FgEwv7b2Zoa26dqTEMzydzN-crDEM/edit?usp=sharing");
            return;
        }
        if (confirm('View RNAV chart?')) {
            openExternalBrowser("https://docs.google.com/drawings/d/1Cy27EQnWx6FSwibdAlG-JXoSJq5k0cQ7E345uVKv09A/edit?usp=sharing");
            return;
        }
        alert('no more INSTR APCH CHART');
        return;
    }

    if (downloadCount > 0) {
        $.toast({
            heading: 'Error',
            text: 'please use chart button after all download complete.',
            position: 'top-right',
            hideAfter: false,
            icon: 'error'
        });
        return;
    }

    window.open(`https://lancard.github.io/chart/AIP/latest/AD/${icao}/${chartName}.pdf`);
}

function createSceneryContentsDOM(icao, airportName, fs2020Id, p3dId) {
    $clonedDOM = $("[airportTemplate]:not(:visible)").clone().removeClass("collapse");;

    // menu
    $clonedMenuDom = $("[airportMenuTemplate]:not(:visible)").clone().removeClass("collapse");
    $clonedMenuDom.find("[menu-icao]").attr("menu-icao", icao).text(icao);
    $clonedMenuDom.find("[menu-name]").text(airportName);
    $clonedMenuDom.find("[updateIcon]").attr("updateIcon", icao);
    $clonedMenuDom.find("a").attr("onclick", `showMenu('${icao}')`);

    $("[sceneryAndChart]").before($clonedMenuDom);

    // common
    $clonedDOM.attr("id", icao);
    $clonedDOM.attr("icao", icao);
    $clonedDOM.find("[icao]").text(icao);
    $clonedDOM.find("[airportName]").text(airportName);
    $clonedDOM.find("[airportImage]").attr("src", `https://lancard.github.io/k-installer/${icao}.png`);

    // fs2020
    if (fs2020Id) {
        $clonedDOM.find("[sceneryType=fs2020]").find("[author]").text(programInfo[fs2020Id].author);
        $clonedDOM.find("[sceneryType=fs2020]").find("[license]").text(programInfo[fs2020Id].license);
        $clonedDOM.find("[sceneryType=fs2020]").find("[donation]").html(programInfo[fs2020Id].donation);
        $clonedDOM.find("[sceneryType=fs2020]").find("[latestVersion]").attr("latestVersion", fs2020Id);
        $clonedDOM.find("[sceneryType=fs2020]").find("[installedVersion]").attr("installedVersion", fs2020Id);
        $clonedDOM.find("[sceneryType=fs2020]").find("[installedDirectory]").attr("installedDirectory", fs2020Id);
        $clonedDOM.find("[sceneryType=fs2020]").find("[updateNotify]").attr("updateNotify", fs2020Id);
        $clonedDOM.find("[sceneryType=fs2020]").find("[downloadButton]").attr("downloadButton", fs2020Id);
        $clonedDOM.find("[sceneryType=fs2020]").find("[downloadStatus]").attr("downloadStatus", fs2020Id);
    }
    else {
        $clonedDOM.find("[sceneryType=fs2020]").remove();
    }


    // p3d
    if (p3dId) {
        $clonedDOM.find("[sceneryType=p3d]").find("[author]").text(programInfo[p3dId].author);
        $clonedDOM.find("[sceneryType=p3d]").find("[license]").text(programInfo[p3dId].license);
        $clonedDOM.find("[sceneryType=p3d]").find("[donation]").html(programInfo[p3dId].donation);
        $clonedDOM.find("[sceneryType=p3d]").find("[latestVersion]").attr("latestVersion", p3dId);
        $clonedDOM.find("[sceneryType=p3d]").find("[installedVersion]").attr("installedVersion", p3dId);
        $clonedDOM.find("[sceneryType=p3d]").find("[installedDirectory]").attr("installedDirectory", p3dId);
        $clonedDOM.find("[sceneryType=p3d]").find("[updateNotify]").attr("updateNotify", p3dId);
        $clonedDOM.find("[sceneryType=p3d]").find("[downloadButton]").attr("downloadButton", p3dId);
        $clonedDOM.find("[sceneryType=p3d]").find("[downloadStatus]").attr("downloadStatus", p3dId);
    }
    else {
        $clonedDOM.find("[sceneryType=p3d]").remove();
    }

    $clonedDOM.appendTo(`#content`);
}
