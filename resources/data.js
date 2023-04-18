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
        fs2020SceneryId: "RKJK-fs2020-scenery",
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
        name: "Sacheon Airport",
        fs2020SceneryId: "RKPS-fs2020-scenery",
        p3dSceneryId: "RKPS-p3d-scenery"
    },
    RKPU: {
        icao: "RKPU",
        name: "Ulsan Airport",
        fs2020SceneryId: "RKPU-fs2020-scenery",
        p3dSceneryId: "RKPU-p3d-scenery"
    },
    RKSM: {
        icao: "RKSM",
        name: "Seoul Airport"
    },
    RKTH: {
        icao: "RKTH",
        name: "Pohang Gyeongju Airport",
        p3dSceneryId: "RKTH-p3d-scenery"
    },
    RKTL: {
        icao: "RKTL",
        name: "Uljin Airport",
        p3dSceneryId: "RKTL-p3d-scenery"
    },
    RKPD: {
        icao: "RKPD",
        name: "Jeongseok Airport"
    },
    RKRS: {
        icao: "RKRS",
        name: "Susaek Airport",
        fs2020SceneryId: "RKRS-fs2020-scenery"
    },
    ZKPY: {
        icao: "ZKPY",
        name: "Pyeongyang intl Airport",
        p3dSceneryId: "ZKPY-p3d-scenery"
    },
    ZKWS: {
        icao: "ZKWS",
        name: "Wonsan Kalma intl Airport",
        p3dSceneryId: "ZKWS-p3d-scenery"
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
    "RKJK-fs2020-scenery": {
        icao: "RKJK",
        programType: 'fs2020',
        author: "JejuFlight",
        license: "contact JejuFlight",
        donation: "contact JejuFlight",
        downloadUrl: "https://github.com/lancard/fs2020-RKJK/archive/master.zip",
        versionCheckUrl: "https://lancard.github.io/fs2020-RKJK/version.txt",
        versionModifier: (data) => data.trim(),
        unzippedRootDirectory: "fs2020-RKJK-master",
        localStorageNameOfInstalledVersion: "RKJK-fs2020-scenery-installed-version",
        localStorageNameOfInstalledRootDirectory: "RKJK-fs2020-scenery-installed-directory",
        localStorageNameOfInstalledDirectoryList: "RKJK-fs2020-scenery-installed-directory-list",
        directory: {
            "JejuFlight-scenery-gunsan": `fs2020-RKJY-master\\JejuFlight-scenery-gunsan`
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
    },
    "RKPS-fs2020-scenery": {
        icao: "RKPS",
        programType: 'fs2020',
        author: "JejuFlight",
        license: "contact JejuFlight",
        donation: "contact JejuFlight",
        downloadUrl: "https://github.com/lancard/fs2020-RKPS/archive/master.zip",
        versionCheckUrl: "https://lancard.github.io/fs2020-RKPS/version.txt",
        versionModifier: (data) => data.trim(),
        unzippedRootDirectory: "fs2020-RKPS-master",
        localStorageNameOfInstalledVersion: "RKPS-fs2020-scenery-installed-version",
        localStorageNameOfInstalledRootDirectory: "RKPS-fs2020-scenery-installed-directory",
        localStorageNameOfInstalledDirectoryList: "RKPS-fs2020-scenery-installed-directory-list",
        directory: {
            "jejuflight-scenery-sacheon": `fs2020-RKPS-master\\jejuflight-scenery-sacheon`
        }
    },
    "RKPS-p3d-scenery": {
        icao: "RKPS",
        programType: 'p3d',
        author: "me",
        license: "contact me",
        donation: "contact me",
        downloadUrl: "https://github.com/lancard/RKPS/archive/master.zip",
        versionCheckUrl: "https://lancard.github.io/RKPS/version.txt",
        versionModifier: (data) => data.trim(),
        unzippedRootDirectory: "RKPS-master",
        localStorageNameOfInstalledVersion: "RKPS-p3d-scenery-installed-version",
        localStorageNameOfInstalledRootDirectory: "RKPS-p3d-scenery-installed-directory",
        localStorageNameOfInstalledDirectoryList: "RKPS-p3d-scenery-installed-directory-list",
        directory: {
            "scenery": "RKPS-p3d-scenery\\scenery",
            "texture": "RKPS-p3d-scenery\\texture"
        }
    },
    "RKPU-fs2020-scenery": {
        icao: "RKPU",
        programType: 'fs2020',
        author: "ArtistPilot",
        license: "contact ArtistPilot",
        donation: "contact ArtistPilot",
        downloadUrl: "https://github.com/lancard/fs2020-RKPU/archive/master.zip",
        versionCheckUrl: "https://lancard.github.io/fs2020-RKPU/version.txt",
        versionModifier: (data) => data.trim(),
        unzippedRootDirectory: "fs2020-RKPU-master",
        localStorageNameOfInstalledVersion: "RKPU-fs2020-scenery-installed-version",
        localStorageNameOfInstalledRootDirectory: "RKPU-fs2020-scenery-installed-directory",
        localStorageNameOfInstalledDirectoryList: "RKPU-fs2020-scenery-installed-directory-list",
        directory: {
            "kim-airport-rkpu-ulsan": `kim-airport-rkpu-ulsan`
        }
    },
    "RKPU-p3d-scenery": {
        icao: "RKPU",
        programType: 'p3d',
        author: "유이 (https://hosii.info)",
        license: "contact https://hosii.info",
        donation: "contact https://hosii.info",
        downloadUrl: "https://github.com/lancard/RKPU/archive/master.zip",
        versionCheckUrl: "https://lancard.github.io/RKPU/version.txt",
        versionModifier: (data) => data.trim(),
        unzippedRootDirectory: "RKPU-master",
        localStorageNameOfInstalledVersion: "RKPU-p3d-scenery-installed-version",
        localStorageNameOfInstalledRootDirectory: "RKPU-p3d-scenery-installed-directory",
        localStorageNameOfInstalledDirectoryList: "RKPU-p3d-scenery-installed-directory-list",
        directory: {
            "scenery": "RKPU-p3d-scenery\\scenery",
            "texture": "RKPU-p3d-scenery\\texture"
        }
    },
    "RKTH-p3d-scenery": {
        icao: "RKTH",
        programType: 'p3d',
        author: "me",
        license: "contact me",
        donation: "contact me",
        downloadUrl: "https://github.com/lancard/RKTH/archive/master.zip",
        versionCheckUrl: "https://lancard.github.io/RKTH/version.txt",
        versionModifier: (data) => data.trim(),
        unzippedRootDirectory: "RKTH-master",
        localStorageNameOfInstalledVersion: "RKTH-p3d-scenery-installed-version",
        localStorageNameOfInstalledRootDirectory: "RKTH-p3d-scenery-installed-directory",
        localStorageNameOfInstalledDirectoryList: "RKTH-p3d-scenery-installed-directory-list",
        directory: {
            "scenery": "RKTH-p3d-scenery\\scenery",
            "texture": "RKTH-p3d-scenery\\texture"
        }
    },
    "RKRS-fs2020-scenery": {
        icao: "RKRS",
        programType: 'fs2020',
        author: "ArtistPilot",
        license: "contact ArtistPilot",
        donation: "contact ArtistPilot",
        downloadUrl: "https://github.com/lancard/fs2020-RKRS/archive/master.zip",
        versionCheckUrl: "https://lancard.github.io/fs2020-RKRS/version.txt",
        versionModifier: (data) => data.trim(),
        unzippedRootDirectory: "fs2020-RKRS-master",
        localStorageNameOfInstalledVersion: "RKRS-fs2020-scenery-installed-version",
        localStorageNameOfInstalledRootDirectory: "RKRS-fs2020-scenery-installed-directory",
        localStorageNameOfInstalledDirectoryList: "RKRS-fs2020-scenery-installed-directory-list",
        directory: {
            "kim-airport-rkrs-susaek": `kim-airport-rkrs-susaek`
        }
    },
    "RKTL-p3d-scenery": {
        icao: "RKTL",
        programType: 'p3d',
        author: "VFR GO!",
        license: "contact 'VFR GO!'",
        donation: "contact 'VFR GO!'",
        downloadUrl: "https://github.com/lancard/VFRGO/releases/download/master/VFRGO_Uljin.zip",
        versionCheckUrl: "https://raw.githubusercontent.com/lancard/VFRGO/main/version.txt",
        versionModifier: (data) => data.trim(),
        unzippedRootDirectory: ".",
        localStorageNameOfInstalledVersion: "RKTL-p3d-scenery-installed-version",
        localStorageNameOfInstalledRootDirectory: "RKTL-p3d-scenery-installed-directory",
        localStorageNameOfInstalledDirectoryList: "RKTL-p3d-scenery-installed-directory-list",
        directory: {
            "scenery": "RKTL-p3d-scenery\\scenery",
            "texture": "RKTL-p3d-scenery\\texture"
        }
    },
    "ZKPY-p3d-scenery": {
        icao: "ZKPY",
        programType: 'p3d',
        author: "me",
        license: "contact me",
        donation: "contact me",
        downloadUrl: "https://github.com/lancard/ZKPY/archive/master.zip",
        versionCheckUrl: "https://lancard.github.io/ZKPY/version.txt",
        versionModifier: (data) => data.trim(),
        unzippedRootDirectory: "ZKPY-master",
        localStorageNameOfInstalledVersion: "ZKPY-p3d-scenery-installed-version",
        localStorageNameOfInstalledRootDirectory: "ZKPY-p3d-scenery-installed-directory",
        localStorageNameOfInstalledDirectoryList: "ZKPY-p3d-scenery-installed-directory-list",
        directory: {
            "scenery": "ZKPY-p3d-scenery\\scenery",
            "texture": "ZKPY-p3d-scenery\\texture"
        }
    },
    "ZKWS-p3d-scenery": {
        icao: "ZKWS",
        programType: 'p3d',
        author: "me",
        license: "contact me",
        donation: "contact me",
        downloadUrl: "https://github.com/lancard/ZKWS/archive/master.zip",
        versionCheckUrl: "https://lancard.github.io/ZKWS/version.txt",
        versionModifier: (data) => data.trim(),
        unzippedRootDirectory: "ZKWS-master",
        localStorageNameOfInstalledVersion: "ZKWS-p3d-scenery-installed-version",
        localStorageNameOfInstalledRootDirectory: "ZKWS-p3d-scenery-installed-directory",
        localStorageNameOfInstalledDirectoryList: "ZKWS-p3d-scenery-installed-directory-list",
        directory: {
            "scenery": "ZKWS-p3d-scenery\\scenery",
            "texture": "ZKWS-p3d-scenery\\texture"
        }
    }
};