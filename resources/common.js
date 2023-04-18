// common library
const fs = require('fs');
const path = require('path');
const appVersion = process.env.npm_package_version ? process.env.npm_package_version : JSON.parse(fs.readFileSync('resources/app.asar/package.json')).version;
const dialog = require('@electron/remote').dialog;
const request = require('request');
const progress = require('request-progress');
const child_process = require('child_process');
var programRootDirectory = (process.env.NODE_ENV == "development" ? "." : require('@electron/remote').app.getAppPath() + ".unpacked");

const airportInfo = {
    RKSI: {
        icao: "RKSI",
        name: "Incheon intl Airport",
        fs2020SceneryId: "RKSI-fs2020-scenery"
    },
    RKSS: {
        icao: "RKSS",
        name: "Gimpo intl Airport",
        fs2020SceneryId: "RKSS-fs2020-scenery",
        p3dSceneryId: "RKSS-p3d-scenery"
    },
    RKPC: {
        icao: "RKPC",
        name: "Jeju intl Airport",
        p3dSceneryId: "RKPC-p3d-scenery"
    },
    RKPK: {
        icao: "RKPK",
        name: "Gimhae intl Airport",
        fs2020SceneryId: "RKPK-fs2020-scenery",
        p3dSceneryId: "RKPK-p3d-scenery"
    },
    RKTU: {
        icao: "RKTU",
        name: "Cheongju intl Airport",
        p3dSceneryId: "RKTU-p3d-scenery"
    },
    RKNY: {
        icao: "RKNY",
        name: "Yangyang intl Airport",
        p3dSceneryId: "RKNY-p3d-scenery"
    },
    RKTN: {
        icao: "RKTN",
        name: "Daegu intl Airport",
        p3dSceneryId: "RKTN-p3d-scenery"
    },
    RKJB: {
        icao: "RKJB",
        name: "Muan intl Airport",
        p3dSceneryId: "RKJB-p3d-scenery"
    },
    RKJJ: {
        icao: "RKJJ",
        name: "Gwangju Airport",
        p3dSceneryId: "RKJJ-p3d-scenery"
    },
    RKJK: {
        icao: "RKJK",
        name: "Gunsan Airport",
        p3dSceneryId: "RKJK-p3d-scenery"
    },
    RKJY: {
        icao: "RKJY",
        name: "Yeosu Airport",
        fs2020SceneryId: "RKJY-fs2020-scenery",
        p3dSceneryId: "RKJY-p3d-scenery"
    },
    RKNW: {
        icao: "RKNW",
        name: "Wonju Airport",
        fs2020SceneryId: "RKNW-fs2020-scenery",
        p3dSceneryId: "RKNW-p3d-scenery"
    },
    RKPS: {
        icao: "RKPS",
        name: "Sacheon Airport"
    },
    RKPU: {
        icao: "RKPU",
        name: "Ulsan Airport"
    },
    RKSM: {
        icao: "RKSM",
        name: "Seoul Airport"
    },
    RKTH: {
        icao: "RKTH",
        name: "Pohang Gyeongju Airport"
    },
    RKTL: {
        icao: "RKTL",
        name: "Uljin Airport"
    },
    RKPD: {
        icao: "RKPD",
        name: "Jeongseok Airport"
    },
    ZKPY: {
        icao: "ZKPY",
        name: "Pyeongyang intl Airport"
    },
    ZKWS: {
        icao: "ZKWS",
        name: "Wonsan Kalma intl Airport"
    }
}


const programInfo = {
    "k-installer": {
        downloadUrl: "https://github.com/lancard/k-installer/releases/latest/download/k-installer.zip",
        versionCheckUrl: "https://lancard.github.io/k-installer/package.json",
        versionModifier: (data) => data.version,
        localStorageNameOfInstalledVersion: "k-installer-installed-version",
        localStorageNameOfInstalledRootDirectory: "k-installer-installed-directory"
    },
    "RKSI-fs2020-scenery": {
        icao: "RKSI",
        programType: 'fs2020',
        author: "ArtistPilot, KIS, KoreaSim, Real Wing, DDKK8, JEJUFLIGHT, LAZ, MCRN KARAKUM",
        license: "contact ArtistPilot",
        donation: "contact ArtistPilot",
        downloadUrl: "https://big.mywire.org/RKSI.zip",
        versionCheckUrl: "https://big.mywire.org/version.txt",
        versionModifier: (data) => data.trim(),
        unzippedRootDirectory: ".",
        localStorageNameOfInstalledVersion: "RKSI-fs2020-scenery-installed-version",
        localStorageNameOfInstalledRootDirectory: "RKSI-fs2020-scenery-installed-directory",
        localStorageNameOfInstalledDirectoryList: "RKSI-fs2020-scenery-installed-directory-list",
        directory: {
            "airport-rksi-model": "airport-rksi-model",
            "Fly Together Korea-RKSI Aerial": "Fly Together Korea-RKSI Aerial",
            "ftk-airport-rksi-seoul-incheon": "ftk-airport-rksi-seoul-incheon"
        }
    },
    "RKSS-fs2020-scenery": {
        icao: "RKSS",
        programType: 'fs2020',
        author: "Rusion",
        license: "refer https://github.com/lancard/fs2020-RKSS and contact Rusion",
        donation: "Kookmin bank, 27430104173050",
        downloadUrl: "https://github.com/lancard/fs2020-RKSS/archive/master.zip",
        versionCheckUrl: "https://lancard.github.io/fs2020-RKSS/version.txt",
        versionModifier: (data) => data.trim(),
        unzippedRootDirectory: "fs2020-RKSS-master",
        localStorageNameOfInstalledVersion: "RKSS-fs2020-scenery-installed-version",
        localStorageNameOfInstalledRootDirectory: "RKSS-fs2020-scenery-installed-directory",
        localStorageNameOfInstalledDirectoryList: "RKSS-fs2020-scenery-installed-directory-list",
        directory: {
            "msapgimpo-msapgimpo": "fs2020-RKSS-master\\msapgimpo-msapgimpo"
        }
    },
    "RKSS-p3d-scenery": {
        icao: "RKSS",
        programType: 'p3d',
        author: "hongsda and me",
        license: "contact me",
        donation: "contact me",
        downloadUrl: "https://github.com/lancard/RKSS/archive/master.zip",
        versionCheckUrl: "https://lancard.github.io/RKSS/version.txt",
        versionModifier: (data) => data.trim(),
        unzippedRootDirectory: "RKSS-master",
        localStorageNameOfInstalledVersion: "RKSS-p3d-scenery-installed-version",
        localStorageNameOfInstalledRootDirectory: "RKSS-p3d-scenery-installed-directory",
        localStorageNameOfInstalledDirectoryList: "RKSS-p3d-scenery-installed-directory-list",
        directory: {
            "Hongs_GimPo": "RKSS-master\\Hongs_GimPo"
        }
    },
    "RKPC-p3d-scenery": {
        icao: "RKPC",
        programType: 'p3d',
        author: "business and me",
        license: "contact me",
        donation: "contact me",
        downloadUrl: "https://github.com/lancard/RKPC/archive/master.zip",
        versionCheckUrl: "https://lancard.github.io/RKPC/version.txt",
        versionModifier: (data) => data.trim(),
        unzippedRootDirectory: "RKPC-master",
        localStorageNameOfInstalledVersion: "RKPC-p3d-scenery-installed-version",
        localStorageNameOfInstalledRootDirectory: "RKPC-p3d-scenery-installed-directory",
        localStorageNameOfInstalledDirectoryList: "RKPC-p3d-scenery-installed-directory-list",
        directory: {
            "scenery": "RKPC-p3d-scenery\\scenery",
            "texture": "RKPC-p3d-scenery\\texture"
        }
    },
    "RKPK-fs2020-scenery": {
        icao: "RKPK",
        programType: 'fs2020',
        author: "me and hongsda",
        license: "contact me",
        donation: "contact me",
        downloadUrl: "https://github.com/lancard/fs2020-RKPK/archive/master.zip",
        versionCheckUrl: "https://lancard.github.io/fs2020-RKPK/version.txt",
        versionModifier: (data) => data.trim(),
        unzippedRootDirectory: "fs2020-RKPK-master",
        localStorageNameOfInstalledVersion: "RKPK-fs2020-scenery-installed-version",
        localStorageNameOfInstalledRootDirectory: "RKPK-fs2020-scenery-installed-directory",
        localStorageNameOfInstalledDirectoryList: "RKPK-fs2020-scenery-installed-directory-list",
        directory: {
            "thekoreans-airport-rkpk-busan": `Packages\\thekoreans-airport-rkpk-busan`
        }
    },
    "RKPK-p3d-scenery": {
        icao: "RKPK",
        programType: 'p3d',
        author: "hongsda and me",
        license: "contact me",
        donation: "contact me",
        downloadUrl: "https://github.com/lancard/RKPK/archive/master.zip",
        versionCheckUrl: "https://lancard.github.io/RKPK/version.txt",
        versionModifier: (data) => data.trim(),
        unzippedRootDirectory: "RKPK-master",
        localStorageNameOfInstalledVersion: "RKPK-p3d-scenery-installed-version",
        localStorageNameOfInstalledRootDirectory: "RKPK-p3d-scenery-installed-directory",
        localStorageNameOfInstalledDirectoryList: "RKPK-p3d-scenery-installed-directory-list",
        directory: {
            "Hongs_GimHae": `Hongs_GimHae`
        }
    },
    "RKTU-p3d-scenery": {
        icao: "RKTU",
        programType: 'p3d',
        author: "me and 유이 (https://hosii.info)",
        license: "contact https://hosii.info",
        donation: "contact https://hosii.info",
        downloadUrl: "https://github.com/lancard/RKTU/archive/master.zip",
        versionCheckUrl: "https://lancard.github.io/RKTU/version.txt",
        versionModifier: (data) => data.trim(),
        unzippedRootDirectory: "RKTU-master",
        localStorageNameOfInstalledVersion: "RKTU-p3d-scenery-installed-version",
        localStorageNameOfInstalledRootDirectory: "RKTU-p3d-scenery-installed-directory",
        localStorageNameOfInstalledDirectoryList: "RKTU-p3d-scenery-installed-directory-list",
        directory: {
            "scenery": "RKTU-p3d-scenery\\scenery",
            "texture": "RKTU-p3d-scenery\\texture"
        }
    },
    "RKNY-p3d-scenery": {
        icao: "RKNY",
        programType: 'p3d',
        author: "VFR GO!",
        license: "contact 'VFR GO!'",
        donation: "contact 'VFR GO!'",
        downloadUrl: "https://github.com/lancard/VFRGO/releases/download/master/VFRGO_YangYang.zip",
        versionCheckUrl: "https://raw.githubusercontent.com/lancard/VFRGO/main/version.txt",
        versionModifier: (data) => data.trim(),
        unzippedRootDirectory: ".",
        localStorageNameOfInstalledVersion: "RKNY-p3d-scenery-installed-version",
        localStorageNameOfInstalledRootDirectory: "RKNY-p3d-scenery-installed-directory",
        localStorageNameOfInstalledDirectoryList: "RKNY-p3d-scenery-installed-directory-list",
        directory: {
            "scenery": "RKNY-p3d-scenery\\scenery",
            "texture": "RKNY-p3d-scenery\\texture"
        }
    },
    "RKTN-p3d-scenery": {
        icao: "RKTN",
        programType: 'p3d',
        author: "rentonflight",
        license: "contact rentonflight",
        donation: "contact rentonflight",
        downloadUrl: "https://github.com/lancard/RKTN/archive/master.zip",
        versionCheckUrl: "https://lancard.github.io/RKTN/version.txt",
        versionModifier: (data) => data.trim(),
        unzippedRootDirectory: "RKTN-master",
        localStorageNameOfInstalledVersion: "RKTN-p3d-scenery-installed-version",
        localStorageNameOfInstalledRootDirectory: "RKTN-p3d-scenery-installed-directory",
        localStorageNameOfInstalledDirectoryList: "RKTN-p3d-scenery-installed-directory-list",
        directory: {
            "RKTN-p3d-scenery": "1. Daegu International Airport RKTN VER1.0"
        }
    },
    "RKJB-p3d-scenery": {
        icao: "RKJB",
        programType: 'p3d',
        author: "me and 유이 (https://hosii.info)",
        license: "contact https://hosii.info",
        donation: "contact https://hosii.info",
        downloadUrl: "https://github.com/lancard/RKJB/archive/master.zip",
        versionCheckUrl: "https://lancard.github.io/RKJB/version.txt",
        versionModifier: (data) => data.trim(),
        unzippedRootDirectory: "RKJB-master",
        localStorageNameOfInstalledVersion: "RKJB-p3d-scenery-installed-version",
        localStorageNameOfInstalledRootDirectory: "RKJB-p3d-scenery-installed-directory",
        localStorageNameOfInstalledDirectoryList: "RKJB-p3d-scenery-installed-directory-list",
        directory: {
            "scenery": "RKJB-p3d-scenery\\scenery",
            "texture": "RKJB-p3d-scenery\\texture"
        }
    },
    "RKJJ-p3d-scenery": {
        icao: "RKJB",
        programType: 'p3d',
        author: "유이 (https://hosii.info)",
        license: "contact https://hosii.info",
        donation: "contact https://hosii.info",
        downloadUrl: "https://github.com/lancard/RKJJ/archive/master.zip",
        versionCheckUrl: "https://lancard.github.io/RKJJ/version.txt",
        versionModifier: (data) => data.trim(),
        unzippedRootDirectory: "RKJJ-master",
        localStorageNameOfInstalledVersion: "RKJJ-p3d-scenery-installed-version",
        localStorageNameOfInstalledRootDirectory: "RKJJ-p3d-scenery-installed-directory",
        localStorageNameOfInstalledDirectoryList: "RKJJ-p3d-scenery-installed-directory-list",
        directory: {
            "scenery": "RKJJ-p3d-scenery\\scenery",
            "texture": "RKJJ-p3d-scenery\\texture"
        }
    },
    "RKJK-p3d-scenery": {
        icao: "RKJK",
        programType: 'p3d',
        author: "유이 (https://hosii.info)",
        license: "contact https://hosii.info",
        donation: "contact https://hosii.info",
        downloadUrl: "https://github.com/lancard/RKJK/archive/master.zip",
        versionCheckUrl: "https://lancard.github.io/RKJK/version.txt",
        versionModifier: (data) => data.trim(),
        unzippedRootDirectory: "RKJK-master",
        localStorageNameOfInstalledVersion: "RKJK-p3d-scenery-installed-version",
        localStorageNameOfInstalledRootDirectory: "RKJK-p3d-scenery-installed-directory",
        localStorageNameOfInstalledDirectoryList: "RKJK-p3d-scenery-installed-directory-list",
        directory: {
            "scenery": "RKJK-p3d-scenery\\scenery",
            "texture": "RKJK-p3d-scenery\\texture"
        }
    },
    "RKJY-fs2020-scenery": {
        icao: "RKJY",
        programType: 'fs2020',
        author: "ArtistPilot",
        license: "contact ArtistPilot",
        donation: "contact ArtistPilot",
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
        icao: "RKJY",
        programType: 'p3d',
        author: "VFR GO!",
        license: "contact 'VFR GO!'",
        donation: "contact 'VFR GO!'",
        downloadUrl: "https://github.com/lancard/VFRGO/releases/download/master/VFRGO_Yeosu.zip",
        versionCheckUrl: "https://raw.githubusercontent.com/lancard/VFRGO/main/version.txt",
        versionModifier: (data) => data.trim(),
        unzippedRootDirectory: ".",
        localStorageNameOfInstalledVersion: "RKJY-p3d-scenery-installed-version",
        localStorageNameOfInstalledRootDirectory: "RKJY-p3d-scenery-installed-directory",
        localStorageNameOfInstalledDirectoryList: "RKJY-p3d-scenery-installed-directory-list",
        directory: {
            "scenery": "RKJY-p3d-scenery\\scenery",
            "texture": "RKJY-p3d-scenery\\texture"
        }
    },
    "RKNW-fs2020-scenery": {
        icao: "RKNW",
        programType: 'fs2020',
        author: "ddkk08",
        license: "contact ddkk08",
        donation: "contact ddkk08",
        downloadUrl: "https://github.com/lancard/fs2020-RKNW/archive/master.zip",
        versionCheckUrl: "https://lancard.github.io/fs2020-RKNW/version.txt",
        versionModifier: (data) => data.trim(),
        unzippedRootDirectory: "fs2020-RKNW-master",
        localStorageNameOfInstalledVersion: "RKNW-fs2020-scenery-installed-version",
        localStorageNameOfInstalledRootDirectory: "RKNW-fs2020-scenery-installed-directory",
        localStorageNameOfInstalledDirectoryList: "RKNW-fs2020-scenery-installed-directory-list",
        directory: {
            "wonju-airport": `fs2020-RKNW-master\\wonju-airport`
        }
    },
    "RKNW-p3d-scenery": {
        icao: "RKNW",
        programType: 'p3d',
        author: "Dro(권예준), FSXPlayer",
        license: "contact both",
        donation: "contact both",
        downloadUrl: "https://github.com/lancard/RKNW/archive/main.zip",
        versionCheckUrl: "https://lancard.github.io/RKNW/version.txt",
        versionModifier: (data) => data.trim(),
        unzippedRootDirectory: ".",
        localStorageNameOfInstalledVersion: "RKNW-p3d-scenery-installed-version",
        localStorageNameOfInstalledRootDirectory: "RKNW-p3d-scenery-installed-directory",
        localStorageNameOfInstalledDirectoryList: "RKNW-p3d-scenery-installed-directory-list",
        directory: {
            "RKNW-main": `RKNW`
        }
    }
};


function decompress(zipFilename, targetDirectory, callback) {
    child_process.exec(`${programRootDirectory}\\7za.exe x "${zipFilename}" -y -bd -o"${targetDirectory}"`, (error, stdout, stderr) => {
        if (error) {
            alert(`extract error: ${error}`);
            return;
        }

        callback();
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
        fs.unlinkSync(oldPath);
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

            decompress(filename, targetDirectory, () => {
                fs.rmSync(filename); // remove zip file for disk space

                if (id == "k-installer") {
                    var zipcontents = getZipfileList(filename);
                    child_process.execSync(`"${localStorage.getItem(programInfo[id].localStorageNameOfInstalledRootDirectory)}\\${zipcontents[0]}"`);
                    return;
                }

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

                alert(`installation complete: ${id}`);

                // restore hide elements
                $buttons.show();
                $status.hide();

                // check update again
                updateScreen(id);
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
        installProgram(id, localStorage.getItem(programInfo[id].localStorageNameOfInstalledRootDirectory));
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
        if (localStorage.getItem("fs2020-root-directory") == null) {
            alert('select directory in home screen first');
            showMenu('k-installer');
            return;
        }

        targetDir = localStorage.getItem("fs2020-root-directory");
    }
    if (programInfo[id].programType == 'p3d') {
        if (localStorage.getItem("p3d-root-directory") == null) {
            alert('select directory in home screen first');
            showMenu('k-installer');
            return;
        }

        targetDir = localStorage.getItem("p3d-root-directory");
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

function updateAllMetar() {
    $(`[airportTemplate]`).find("[metarArea]").text(" (Loading...) ");

    $.getJSON("https://airplane.mywire.org/metar.json", metar => {
        for (var airport in metar) {
            $(`[airportTemplate][icao=${airport}]`).find("[metarArea]").text(metar[airport].metar);
        }
    });
}

function initialization() {
    // save preferences for k-installer
    localStorage.setItem(programInfo["k-installer"].localStorageNameOfInstalledVersion, appVersion);
    localStorage.setItem(programInfo["k-installer"].localStorageNameOfInstalledRootDirectory, require('os').tmpdir());

    if (localStorage.getItem("fs2020-root-directory") == null) {
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
    $("span[menu-icao=RKSI]").prepend("<i class='text-warning fas fa-star'></i>")
    $("span[menu-icao=RKSS]").prepend("<i class='text-warning fas fa-star'></i>")
    $("span[menu-icao=RKPC]").prepend("<i class='text-warning fas fa-star'></i>")
    $("span[menu-icao=RKPK]").prepend("<i class='text-warning fas fa-star'></i>")
    $("span[menu-icao=ZKPY]").prepend("<i class='text-warning fas fa-star'></i>")


    // check update
    for (var id in programInfo) {
        checkUpdate(id);
    }

    // update chart
    $.getJSON('https://lancard.github.io/chart/AIP/latest/AD/chartInformation.json', (chart) => {
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

    // update metar and register interval
    updateAllMetar();
    setInterval(updateAllMetar, 10 * 60 * 1000);
}

function showMenu(selectedId) {
    $("div.container-fluid").hide(500);
    $("#" + selectedId).show(500);
}

function openChart(elem, chartName) {
    var icao = $(elem).parents("div[airportTemplate]").attr("icao");

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
        $clonedDOM.find("[sceneryType=fs2020]").find("[donation]").text(programInfo[fs2020Id].donation);
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
        $clonedDOM.find("[sceneryType=p3d]").find("[donation]").text(programInfo[p3dId].donation);
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
