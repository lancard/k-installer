// common library
const fs = require('fs');
const path = require('path');
const appVersion = process.env.npm_package_version ? process.env.npm_package_version : JSON.parse(fs.readFileSync('resources/app.asar/package.json')).version;
const dialog = require('@electron/remote').dialog;
const request = require('request');
const progress = require('request-progress');
const decompress = require("decompress");

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

function updateDownloadStatus(selector, state) {
    if (state.percent) {
        var message = `${(state.size.transferred / 1024 / 1024).toFixed(2)} MB / ${(state.size.total / 1024 / 1024).toFixed(2)} MB (${(state.percent * 100).toFixed(0)}%)`;
        $(selector).find("[transferred]").text(message);
    }
    else {
        $(selector).find("[transferred]").text(`${(state.size.transferred / 1024 / 1024).toFixed(2)} MB`);
    }
    $(selector).find("[speed]").text(`${(state.speed / 1024 / 1024).toFixed(2)} MB/s`);
}

function randomString(length) {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyz';

    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}


function downloadFile(filename, url, callback, progressCallback) {
    const oldPath = path.join(path.dirname(filename), randomString(32));
    const file = fs.createWriteStream(oldPath);

    // The options argument is optional so you can omit it
    progress(request(url), {
        // throttle: 2000,                    // Throttle the progress event to 2000ms, defaults to 1000ms
        // delay: 1000,                       // Only start to emit after 1000ms delay, defaults to 0ms
        // lengthHeader: 'x-transfer-length'  // Length header to use, defaults to content-length
    })
        .on('progress', function (state) {
            if (progressCallback)
                progressCallback(state);
        })
        .on('error', function (err) {
            console.error(err);
            // Do something with err
        })
        .on('end', function () {
            file.close();
            fs.renameSync(oldPath, filename);
            callback(filename, url);
        })
        .pipe(file);
}

function moveSync(oldPath, newPath) {
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
        fs.unlinkSync(oldPath);
    }
}

var programInfo = {
    "k-installer": {
        downloadUrl: "https://github.com/lancard/k-installer/releases/latest/download/k-installer.zip",
        versionCheckUrl: "https://lancard.github.io/k-installer/package.json",
        versionModifier: (data) => data.version
    },
    "RKJY-fs2020-scenery": {
        programType: 'fs2020',
        author: "ArtistPilot",
        license: "contact ArtistPilot",
        downloadUrl: "https://github.com/lancard/fs2020-RKJY/archive/master.zip",
        versionCheckUrl: "https://lancard.github.io/fs2020-RKJY/version.txt",
        versionModifier: (data) => data.trim(),
        unzippedRootDirectory: "fs2020-RKJY-master",
        localStorageNameOfInstalledVersion: "RKJY-fs2020-scenery-installed-version",
        localStorageNameOfInstalledRootDirectory: "RKJY-fs2020-scenery-installed-directory",
        localStorageNameOfInstalledDirectoryList: "RKJY-fs2020-scenery-installed-directory-list",
        directory: {
            "rkjy-airport-scene": `fs2020-RKJY-master\\rkjy-airport-scene`,
            "rkjy": `fs2020-RKJY-master\\rkjy`,
            "zulu-airport-rkjy-yeosu": `fs2020-RKJY-master\\zulu-airport-rkjy-yeosu`
        }
    },
    "RKJY-p3d-scenery": {
        programType: 'p3d',
        author: "VFR GO!",
        license: "contact 'VFR GO!'",
        downloadUrl: "https://github.com/lancard/VFRGO/releases/download/master/VFRGO_Yeosu.zip",
        versionCheckUrl: "https://api.github.com/repos/lancard/VFRGO/releases/latest",
        versionModifier: (data) => data.assets[2].updated_at,
        unzippedRootDirectory: ".",
        localStorageNameOfInstalledVersion: "RKJY-p3d-scenery-installed-version",
        localStorageNameOfInstalledRootDirectory: "RKJY-p3d-scenery-installed-directory",
        localStorageNameOfInstalledDirectoryList: "RKJY-p3d-scenery-installed-directory-list",
        directory: {
            "scenery": "RKJY-p3d-scenery\\scenery",
            "texture": "RKJY-p3d-scenery\\texture"
        }
    },
    "RKPK-fs2020-scenery": {
        downloadUrl: "https://github.com/lancard/fs2020-RKPK/archive/master.zip",
        versionFileName: "https://lancard.github.io/fs2020-RKPK/version.txt",
        directory: {
            "Packages\\thekoreans-airport-rkpk-busan": `thekoreans-airport-rkpk-busan`
        }
    },
    "RKPK-p3d-scenery": {
        directory: {
            "Packages\\thekoreans-airport-rkpk-busan": `thekoreans-airport-rkpk-busan`
        }
    }
};


function updateScreen(id) {
    $(`[latestVersion="${id}"]`).text(programInfo[id].latestVersion);
    if (id == "k-installer") {
        $(`[installedVersion="${id}"]`).text(programInfo[id].installedVersion);
        if (programInfo[id].latestVersion != programInfo[id].installedVersion) {
            $("[downloadButton=k-installer]").removeClass("collapse");
        }
        return;
    }

    if (!isInstalledBefore(id)) {
        $(`[installedVersion="${id}"]`).text("(not installed)");
        $(`[installedDirectory="${id}"]`).text("(not installed)");
        $(`[update-mark-${id}]`).removeClass(`must-show-${id}`);
        return;
    }

    $(`[installedVersion="${id}"]`).text(programInfo[id].installedVersion);
    var installedDirectoryList = JSON.parse(localStorage.getItem(programInfo[id].localStorageNameOfInstalledDirectoryList)).join(", ");
    $(`[installedDirectory="${id}"]`).text(installedDirectoryList);

    if (programInfo[id].latestVersion == programInfo[id].installedVersion) {
        $(`[update-mark-${id}]`).removeClass(`must-show-${id}`);
    }
    else {
        $(`[update-mark-${id}]`).addClass(`must-show-${id}`);
    }
}


function checkUpdate(id) {
    if (!programInfo[id].versionCheckUrl)
        return;

    $.get(programInfo[id].versionCheckUrl, (data) => {
        const latestVersion = programInfo[id].versionModifier ? programInfo[id].versionModifier(data) : data;
        const installedVersion = (id == "k-installer" ? appVersion : localStorage.getItem(programInfo[id].localStorageNameOfInstalledVersion));

        programInfo[id].installedVersion = installedVersion;
        programInfo[id].latestVersion = latestVersion;

        updateScreen(id);
    });
}

function isInstalledBefore(id) {
    return localStorage.getItem(programInfo[id].localStorageNameOfInstalledRootDirectory) != null;
}

function removeProgram(id) {
    if (typeof (id) != 'string') {
        id = $(id).attr('downloadButton');
    }

    if (!isInstalledBefore(id))
        return;

    const installedDirectoryArray = JSON.parse(localStorage.getItem(programInfo[id].localStorageNameOfInstalledDirectoryList));

    // remove first
    installedDirectoryArray.forEach(e => {
        fs.rmSync(e, { recursive: true, force: true });
    });

    // remove storage
    localStorage.removeItem(programInfo[id].localStorageNameOfInstalledRootDirectory);
    localStorage.removeItem(programInfo[id].localStorageNameOfInstalledDirectoryList);
    localStorage.removeItem(programInfo[id].localStorageNameOfInstalledVersion);

    programInfo[id].installedVersion = null;

    // update screen
    updateScreen(id);
}

function installProgram(id, targetDirectory) {
    const filename = `${targetDirectory}\\${id}.zip`;

    var $buttons = $(`[downloadButton="${id}"]`);
    var $status = $(`[downloadStatus="${id}"]`);

    $buttons.hide();
    $status.show();
    $status.find("[statusMessage]").text("downloading...");

    downloadFile(filename, programInfo[id].downloadUrl,
        () => {
            $status.find("[statusMessage]").text("decompressing...");

            decompress(filename, targetDirectory)
                .then((files) => {
                    fs.rmSync(filename); // remove zip file for disk space

                    // replacement for unzipped files
                    var installedDirectory = [];
                    for (var dir in programInfo[id].directory) {
                        moveSync(`${targetDirectory}\\${programInfo[id].unzippedRootDirectory}\\${dir}`, `${targetDirectory}\\${programInfo[id].directory[dir]}`);
                        installedDirectory.push(`${targetDirectory}\\${programInfo[id].directory[dir]}`);
                    }

                    if (programInfo[id].unzippedRootDirectory != ".") {
                        fs.rmSync(programInfo[id].unzippedRootDirectory, { recursive: true, force: true }); // remove zip root directory
                    }

                    // save installed information
                    localStorage.setItem(programInfo[id].localStorageNameOfInstalledRootDirectory, targetDirectory);
                    localStorage.setItem(programInfo[id].localStorageNameOfInstalledDirectoryList, JSON.stringify(installedDirectory));
                    localStorage.setItem(programInfo[id].localStorageNameOfInstalledVersion, programInfo[id].latestVersion);

                    programInfo[id].installedVersion = programInfo[id].latestVersion;

                    alert(`installation complete: ${id}`);

                    // restore hide elements
                    $buttons.show();
                    $status.hide();

                    // check update again
                    updateScreen(id);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        (state) => {
            updateDownloadStatus($status, state);
        });
}

function upgradeProgram(id) {
    if (typeof (id) != 'string') {
        id = $(id).attr('downloadButton');
    }

    if (id == "k-installer") {
        installProgram(id, '.');
        return;
    }

    var targetDir = localStorage.getItem(programInfo[id].localStorageNameOfInstalledRootDirectory);

    // installed before
    if (targetDir != null) {
        // remove first
        removeProgram(id);

        installProgram(id, targetDir);

        return;
    }

    // install first time ----------------------------------
    if (programInfo[id].programType == 'fs2020') {
        if (window.communityDirectory == null) {
            alert('select directory in home screen');
            showMenu('k-installer');
            return;
        }

        targetDir = window.communityDirectory;
    }
    if (programInfo[id].programType == 'p3d') {
        if (window.addonSceneryDirectory == null) {
            alert('select directory in home screen');
            showMenu('k-installer');
            return;
        }

        targetDir = window.addonSceneryDirectory;
    }

    installProgram(id, targetDir);
}

function selectDirectory(program) {
    var ret = dialog.showOpenDialogSync({ properties: ["openDirectory"] });
    if (!ret) {
        alert('abort');
        return;
    }
    if (!fs.existsSync(ret[0])) {
        alert(`path not exist: ${ret[0]}`);
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

function initialization() {
    window.communityDirectory = localStorage.getItem("fs2020-root-directory");
    if (window.communityDirectory == null) {
        window.communityDirectory = getCommunityDirectory();
        localStorage.setItem("fs2020-root-directory", window.communityDirectory);
    }

    if (window.communityDirectory == null) {
        $("#communityDirectory").addClass("text-danger");
        $("#communityDirectory").text("Not Found");
    }
    else {
        $("#communityDirectory").text(window.communityDirectory);
    }

    window.addonSceneryDirectory = localStorage.getItem("p3d-root-directory");
    if (window.addonSceneryDirectory == null) {
        $("#addonSceneryDirectory").addClass("text-danger");
        $("#addonSceneryDirectory").text("Not Found");
    }
    else {
        $("#addonSceneryDirectory").text(window.addonSceneryDirectory);
    }


    // add stylesheet for update mark element
    for (var id in programInfo) {
        var style = $(`<style>.must-show-${id} { display: inline-block !important; }</style>`);
        $('html > head').append(style);
    }

    $.getJSON("https://airplane.mywire.org/metar.json", metar => {
        $.getJSON('https://lancard.github.io/chart/AIP/latest/AD/chartInformation.json', (data) => {
            createSceneryContentsDOM("RKJY", "Yeosu airport", data["RKJY"], metar["RKJY"].metar, "RKJY-fs2020-scenery", "RKJY-p3d-scenery");

            // check update
            for (var id in programInfo) {
                checkUpdate(id);
            }
        });
    });
}

function showMenu(selectedId) {
    $("div.container-fluid").hide(500);
    $("#" + selectedId).show(500);
}

function openChart(elem, chartName) {
    var icao = $(elem).parents("div[airportTemplate]").attr("icao");

    window.open(`https://lancard.github.io/chart/AIP/latest/AD/${icao}/${chartName}.pdf`);
}

function createSceneryContentsDOM(icao, airportName, chartMap, metar, fs2020Id, p3dId) {
    $clonedDOM = $("[airportTemplate]:not(:visible)").clone().removeClass("collapse");

    // common
    $clonedDOM.attr("icao", icao);
    $clonedDOM.find("[icao]").text(icao);
    $clonedDOM.find("[airportName]").text(airportName);
    $clonedDOM.find("[airportImage]").attr("src", `https://lancard.github.io/k-installer/${icao}.png`);

    // metar
    $clonedDOM.find("[metarArea]").text(metar);

    // charts
    for (var chartType in chartMap) {
        if (!chartMap[chartType])
            continue;

        $(`<button type="button" class="btn btn-info m-2" onclick="openChart(this, '${chartType}')">${chartType}</button>`).appendTo($clonedDOM.find("[chartArea]"));
    }


    // fs2020
    $clonedDOM.find("[sceneryType=fs2020]").find("[author]").text(programInfo[fs2020Id].author);
    $clonedDOM.find("[sceneryType=fs2020]").find("[license]").text(programInfo[fs2020Id].license);
    $clonedDOM.find("[sceneryType=fs2020]").find("[latestVersion]").attr("latestVersion", fs2020Id);
    $clonedDOM.find("[sceneryType=fs2020]").find("[installedVersion]").attr("installedVersion", fs2020Id);
    $clonedDOM.find("[sceneryType=fs2020]").find("[installedDirectory]").attr("installedDirectory", fs2020Id);
    $clonedDOM.find("[sceneryType=fs2020]").find("[downloadButton]").attr("downloadButton", fs2020Id);
    $clonedDOM.find("[sceneryType=fs2020]").find("[downloadStatus]").attr("downloadStatus", fs2020Id);


    // p3d
    $clonedDOM.find("[sceneryType=p3d]").find("[author]").text(programInfo[p3dId].author);
    $clonedDOM.find("[sceneryType=p3d]").find("[license]").text(programInfo[p3dId].license);
    $clonedDOM.find("[sceneryType=p3d]").find("[latestVersion]").attr("latestVersion", p3dId);
    $clonedDOM.find("[sceneryType=p3d]").find("[installedVersion]").attr("installedVersion", p3dId);
    $clonedDOM.find("[sceneryType=p3d]").find("[installedDirectory]").attr("installedDirectory", p3dId);
    $clonedDOM.find("[sceneryType=p3d]").find("[downloadButton]").attr("downloadButton", p3dId);
    $clonedDOM.find("[sceneryType=p3d]").find("[downloadStatus]").attr("downloadStatus", p3dId);

    $clonedDOM.appendTo("#RKJY");
}
