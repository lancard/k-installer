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
        fs2020SceneryId: "RKTU-fs2020-scenery",
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
        fs2020SceneryId: "RKTN-fs2020-scenery",
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
        // fs2020SceneryId: "RKPU-fs2020-scenery",
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
        name: "Jeongseok Airport",
        p3dSceneryId: "RKPD-p3d-scenery"
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
        localStorageNameOfInstalledVersion: "RKSI-fs2020-scenery-installed-version",
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
        localStorageNameOfInstalledVersion: "RKSS-fs2020-scenery-installed-version",
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
        localStorageNameOfInstalledVersion: "RKSS-p3d-scenery-installed-version",
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
        localStorageNameOfInstalledVersion: "RKPC-p3d-scenery-installed-version",
        localStorageNameOfInstalledDirectoryList: "RKPC-p3d-scenery-installed-directory-list",
        directory: {
            "RKPC-p3d-scenery\\scenery": "RKPC-master\\scenery",
            "RKPC-p3d-scenery\\texture": "RKPC-master\\texture"
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
        localStorageNameOfInstalledVersion: "RKPK-fs2020-scenery-installed-version",
        localStorageNameOfInstalledDirectoryList: "RKPK-fs2020-scenery-installed-directory-list",
        directory: {
            "thekoreans-airport-rkpk-busan": `fs2020-RKPK-master\\Packages\\thekoreans-airport-rkpk-busan`
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
        localStorageNameOfInstalledVersion: "RKPK-p3d-scenery-installed-version",
        localStorageNameOfInstalledDirectoryList: "RKPK-p3d-scenery-installed-directory-list",
        directory: {
            "Hongs_GimHae": `RKPK-master\\Hongs_GimHae`
        }
    },
    "RKTU-fs2020-scenery": {
        icao: "RKTU",
        programType: 'fs2020',
        author: "KOREA SIM",
        license: "contact 'KOREA SIM'",
        donation: "https://toss.me/krsim",
        downloadUrl: "https://github.com/lancard/fs2020-RKTU/releases/latest/download/RKTU.zip",
        versionCheckUrl: "https://lancard.github.io/fs2020-RKTU/version.txt",
        versionModifier: (data) => data.trim(),
        localStorageNameOfInstalledVersion: "RKTU-fs2020-scenery-installed-version",
        localStorageNameOfInstalledDirectoryList: "RKTU-fs2020-scenery-installed-directory-list",
        directory: {
            "CHEONGJUAIRPORT": "CHEONGJUAIRPORT",
            "cheongju-airport": "cheongju-airport"
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
        localStorageNameOfInstalledVersion: "RKTU-p3d-scenery-installed-version",
        localStorageNameOfInstalledDirectoryList: "RKTU-p3d-scenery-installed-directory-list",
        directory: {
            "RKTU-p3d-scenery\\scenery": "RKTU-master\\scenery",
            "RKTU-p3d-scenery\\texture": "RKTU-master\\texture"
        }
    },
    "RKNY-p3d-scenery": {
        icao: "RKNY",
        programType: 'p3d',
        author: "드로",
        license: "contact https://sites.google.com/view/airbornelabs",
        donation: "contact https://sites.google.com/view/airbornelabs",
        downloadUrl: "https://github.com/lancard/RKNY/archive/master.zip",
        versionCheckUrl: "https://lancard.github.io/RKNY/version.txt",
        versionModifier: (data) => data.trim(),
        localStorageNameOfInstalledVersion: "RKNY-p3d-scenery-installed-version",
        localStorageNameOfInstalledDirectoryList: "RKNY-p3d-scenery-installed-directory-list",
        directory: {
            "RKNY-p3d-scenery\\scenery": "RKNY-master\\scenery",
            "RKNY-p3d-scenery\\texture": "RKNY-master\\texture"
        }
    },
    "RKTN-fs2020-scenery": {
        icao: "RKTN",
        programType: 'fs2020',
        author: "KoreaFix team",
        license: "contact KoreaFix team",
        donation: "https://www.buymeacoffee.com/KoreaFix",
        downloadUrl: "https://github.com/lancard/fs2020-RKTN/archive/master.zip",
        versionCheckUrl: "https://lancard.github.io/fs2020-RKTN/version.txt",
        versionModifier: (data) => data.trim(),
        localStorageNameOfInstalledVersion: "RKTN-fs2020-scenery-installed-version",
        localStorageNameOfInstalledDirectoryList: "RKTN-fs2020-scenery-installed-directory-list",
        directory: {
            "Daegu-airport": `fs2020-RKTN-master\\Deagu-airport`
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
        localStorageNameOfInstalledVersion: "RKTN-p3d-scenery-installed-version",
        localStorageNameOfInstalledDirectoryList: "RKTN-p3d-scenery-installed-directory-list",
        directory: {
            "RKTN-p3d-scenery": "RKTN-master\\1. Daegu International Airport RKTN VER1.0"
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
        localStorageNameOfInstalledVersion: "RKJB-p3d-scenery-installed-version",
        localStorageNameOfInstalledDirectoryList: "RKJB-p3d-scenery-installed-directory-list",
        directory: {
            "RKJB-p3d-scenery\\scenery": "RKJB-master\\scenery",
            "RKJB-p3d-scenery\\texture": "RKJB-master\\texture"
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
        localStorageNameOfInstalledVersion: "RKJJ-p3d-scenery-installed-version",
        localStorageNameOfInstalledDirectoryList: "RKJJ-p3d-scenery-installed-directory-list",
        directory: {
            "RKJJ-p3d-scenery\\scenery": "RKJJ-master\\scenery",
            "RKJJ-p3d-scenery\\texture": "RKJJ-master\\texture"
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
        localStorageNameOfInstalledVersion: "RKJK-fs2020-scenery-installed-version",
        localStorageNameOfInstalledDirectoryList: "RKJK-fs2020-scenery-installed-directory-list",
        directory: {
            "JejuFlight-scenery-gunsan": `fs2020-RKJK-master\\JejuFlight-scenery-gunsan`
        }
    },
    "RKJK-p3d-scenery": {
        icao: "RKJK",
        programType: 'p3d',
        author: "드로",
        license: "contact https://sites.google.com/view/airbornelabs",
        donation: "contact https://sites.google.com/view/airbornelabs",
        downloadUrl: "https://github.com/lancard/RKJK/archive/master.zip",
        versionCheckUrl: "https://lancard.github.io/RKJK/version.txt",
        versionModifier: (data) => data.trim(),
        localStorageNameOfInstalledVersion: "RKJK-p3d-scenery-installed-version",
        localStorageNameOfInstalledDirectoryList: "RKJK-p3d-scenery-installed-directory-list",
        directory: {
            "RKJK-p3d-scenery\\scenery": "RKJK-master\\scenery",
            "RKJK-p3d-scenery\\texture": "RKJK-master\\texture"
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
        localStorageNameOfInstalledVersion: "RKJY-fs2020-scenery-installed-version",
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
        localStorageNameOfInstalledVersion: "RKJY-p3d-scenery-installed-version",
        localStorageNameOfInstalledDirectoryList: "RKJY-p3d-scenery-installed-directory-list",
        directory: {
            "RKJY-p3d-scenery\\scenery": "scenery",
            "RKJY-p3d-scenery\\texture": "texture"
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
        localStorageNameOfInstalledVersion: "RKNW-fs2020-scenery-installed-version",
        localStorageNameOfInstalledDirectoryList: "RKNW-fs2020-scenery-installed-directory-list",
        directory: {
            "wonju-airport": `fs2020-RKNW-master\\wonju-airport`
        }
    },
    "RKNW-p3d-scenery": {
        icao: "RKNW",
        programType: 'p3d',
        author: "드로",
        license: "contact https://sites.google.com/view/airbornelabs",
        donation: "contact https://sites.google.com/view/airbornelabs",
        downloadUrl: "https://github.com/lancard/RKNW/archive/main.zip",
        versionCheckUrl: "https://lancard.github.io/RKNW/version.txt",
        versionModifier: (data) => data.trim(),
        localStorageNameOfInstalledVersion: "RKNW-p3d-scenery-installed-version",
        localStorageNameOfInstalledDirectoryList: "RKNW-p3d-scenery-installed-directory-list",
        directory: {
            "RKNW-p3d-scenery\\scenery": `RKNW-main\\scenery`,
            "RKNW-p3d-scenery\\texture": `RKNW-main\\texture`
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
        localStorageNameOfInstalledVersion: "RKPS-fs2020-scenery-installed-version",
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
        downloadUrl: "https://github.com/lancard/RKPS/archive/main.zip",
        versionCheckUrl: "https://lancard.github.io/RKPS/version.txt",
        versionModifier: (data) => data.trim(),
        localStorageNameOfInstalledVersion: "RKPS-p3d-scenery-installed-version",
        localStorageNameOfInstalledDirectoryList: "RKPS-p3d-scenery-installed-directory-list",
        directory: {
            "RKPS-p3d-scenery\\scenery": "RKPS-main\\scenery",
            "RKPS-p3d-scenery\\texture": "RKPS-main\\texture"
        }
    },
    /*
    "RKPU-fs2020-scenery": {
        icao: "RKPU",
        programType: 'fs2020',
        author: "ArtistPilot",
        license: "contact ArtistPilot",
        donation: "contact ArtistPilot",
        downloadUrl: "https://github.com/lancard/fs2020-RKPU/archive/master.zip",
        versionCheckUrl: "https://lancard.github.io/fs2020-RKPU/version.txt",
        versionModifier: (data) => data.trim(),
        localStorageNameOfInstalledVersion: "RKPU-fs2020-scenery-installed-version",
        localStorageNameOfInstalledDirectoryList: "RKPU-fs2020-scenery-installed-directory-list",
        directory: {
            "kim-airport-rkpu-ulsan": `fs2020-RKPU-master\\kim-airport-rkpu-ulsan`
        }
    },
    */
    "RKPU-p3d-scenery": {
        icao: "RKPU",
        programType: 'p3d',
        author: "유이 (https://hosii.info)",
        license: "contact https://hosii.info",
        donation: "contact https://hosii.info",
        downloadUrl: "https://github.com/lancard/RKPU/archive/master.zip",
        versionCheckUrl: "https://lancard.github.io/RKPU/version.txt",
        versionModifier: (data) => data.trim(),
        localStorageNameOfInstalledVersion: "RKPU-p3d-scenery-installed-version",
        localStorageNameOfInstalledDirectoryList: "RKPU-p3d-scenery-installed-directory-list",
        directory: {
            "RKPU-p3d-scenery\\scenery": "RKPU-master\\scenery",
            "RKPU-p3d-scenery\\texture": "RKPU-master\\texture"
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
        localStorageNameOfInstalledVersion: "RKTH-p3d-scenery-installed-version",
        localStorageNameOfInstalledDirectoryList: "RKTH-p3d-scenery-installed-directory-list",
        directory: {
            "RKTH-p3d-scenery\\scenery": "RKTH-master\\scenery",
            "RKTH-p3d-scenery\\texture": "RKTH-master\\texture"
        }
    },
    "RKPD-p3d-scenery": {
        icao: "RKPD",
        programType: 'p3d',
        author: "NewMarine(choiminsuhworker@naver.com)",
        license: "contact NewMarine",
        donation: "contact NewMarine",
        downloadUrl: "https://github.com/lancard/RKPD/archive/p3d.zip",
        versionCheckUrl: "https://lancard.github.io/RKPD/version.txt",
        versionModifier: (data) => data.trim(),
        localStorageNameOfInstalledVersion: "RKPD-p3d-scenery-installed-version",
        localStorageNameOfInstalledDirectoryList: "RKPD-p3d-scenery-installed-directory-list",
        directory: {
            "RKPD-p3d-scenery\\scenery": "RKPD-p3d\\scenery",
            "RKPD-p3d-scenery\\texture": "RKPD-p3d\\texture"
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
        localStorageNameOfInstalledVersion: "RKTL-p3d-scenery-installed-version",
        localStorageNameOfInstalledDirectoryList: "RKTL-p3d-scenery-installed-directory-list",
        directory: {
            "RKTL-p3d-scenery\\scenery": "scenery",
            "RKTL-p3d-scenery\\texture": "texture"
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
        localStorageNameOfInstalledVersion: "RKRS-fs2020-scenery-installed-version",
        localStorageNameOfInstalledDirectoryList: "RKRS-fs2020-scenery-installed-directory-list",
        directory: {
            "kim-airport-rkrs-susaek": `fs2020-RKRS-master\\kim-airport-rkrs-susaek`
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
        localStorageNameOfInstalledVersion: "ZKPY-p3d-scenery-installed-version",
        localStorageNameOfInstalledDirectoryList: "ZKPY-p3d-scenery-installed-directory-list",
        directory: {
            "ZKPY-p3d-scenery\\scenery": "ZKPY-master\\scenery",
            "ZKPY-p3d-scenery\\texture": "ZKPY-master\\texture"
        }
    },
    "ZKWS-p3d-scenery": {
        icao: "ZKWS",
        programType: 'p3d',
        author: "me",
        license: "contact me",
        donation: "contact me",
        downloadUrl: "https://github.com/lancard/ZKWS/archive/main.zip",
        versionCheckUrl: "https://lancard.github.io/ZKWS/version.txt",
        versionModifier: (data) => data.trim(),
        localStorageNameOfInstalledVersion: "ZKWS-p3d-scenery-installed-version",
        localStorageNameOfInstalledDirectoryList: "ZKWS-p3d-scenery-installed-directory-list",
        directory: {
            "ZKWS-p3d-scenery\\scenery": "ZKWS-main\\scenery",
            "ZKWS-p3d-scenery\\texture": "ZKWS-main\\texture"
        }
    },
    "yeouido": {
        programType: 'fs2020',
        downloadUrl: "https://github.com/lancard/fs2020-yeouido/archive/master.zip",
        versionCheckUrl: "https://lancard.github.io/fs2020-yeouido/version.txt",
        versionModifier: (data) => data.trim(),
        localStorageNameOfInstalledVersion: "yeouido-fs2020-scenery-installed-version",
        localStorageNameOfInstalledDirectoryList: "yeouido-fs2020-scenery-installed-directory-list",
        directory: {
            "mycompany-airport-rksy-yeoido-airport": "fs2020-yeouido-master\\mycompany-airport-rksy-yeoido-airport"
        }
    }
};