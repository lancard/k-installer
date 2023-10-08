const airportInfo = {
    RKSI: {
        icao: "RKSI",
        name: "Incheon intl",
        fs2020SceneryId: "RKSI-fs2020-scenery"
    },
    RKSS: {
        icao: "RKSS",
        name: "Gimpo intl",
        fs2020SceneryId: "RKSS-fs2020-scenery",
        p3dSceneryId: "RKSS-p3d-scenery"
    },
    RKPC: {
        icao: "RKPC",
        name: "Jeju intl",
        fs2020SceneryId: "RKPC-fs2020-scenery",
        p3dSceneryId: "RKPC-p3d-scenery"
    },
    RKPK: {
        icao: "RKPK",
        name: "Gimhae intl",
        fs2020SceneryId: "RKPK-fs2020-scenery",
        p3dSceneryId: "RKPK-p3d-scenery"
    },
    RKTU: {
        icao: "RKTU",
        name: "Cheongju intl",
        fs2020SceneryId: "RKTU-fs2020-scenery",
        p3dSceneryId: "RKTU-p3d-scenery"
    },
    RKNY: {
        icao: "RKNY",
        name: "Yangyang intl",
        fs2020SceneryId: "RKNY-fs2020-scenery",
        p3dSceneryId: "RKNY-p3d-scenery"
    },
    RKTN: {
        icao: "RKTN",
        name: "Daegu intl",
        fs2020SceneryId: "RKTN-fs2020-scenery",
        p3dSceneryId: "RKTN-p3d-scenery"
    },
    RKJB: {
        icao: "RKJB",
        name: "Muan intl",
        fs2020SceneryId: "RKJB-fs2020-scenery",
        p3dSceneryId: "RKJB-p3d-scenery"
    },
    RKJJ: {
        icao: "RKJJ",
        name: "Gwangju",
        fs2020SceneryId: "RKJJ-fs2020-scenery",
        p3dSceneryId: "RKJJ-p3d-scenery"
    },
    RKJK: {
        icao: "RKJK",
        name: "Gunsan",
        fs2020SceneryId: "RKJK-fs2020-scenery",
        p3dSceneryId: "RKJK-p3d-scenery"
    },
    RKJY: {
        icao: "RKJY",
        name: "Yeosu",
        fs2020SceneryId: "RKJY-fs2020-scenery",
        p3dSceneryId: "RKJY-p3d-scenery"
    },
    RKNW: {
        icao: "RKNW",
        name: "Wonju",
        fs2020SceneryId: "RKNW-fs2020-scenery",
        p3dSceneryId: "RKNW-p3d-scenery"
    },
    RKPS: {
        icao: "RKPS",
        name: "Sacheon",
        fs2020SceneryId: "RKPS-fs2020-scenery",
        p3dSceneryId: "RKPS-p3d-scenery"
    },
    RKPU: {
        icao: "RKPU",
        name: "Ulsan",
        fs2020SceneryId: "RKPU-fs2020-scenery",
        p3dSceneryId: "RKPU-p3d-scenery"
    },
    RKSM: {
        icao: "RKSM",
        name: "Seoul",
        fs2020SceneryId: "RKSM-fs2020-scenery",
    },
    RKTH: {
        icao: "RKTH",
        name: "Pohang Gyeongju",
        fs2020SceneryId: "RKTH-fs2020-scenery",
        p3dSceneryId: "RKTH-p3d-scenery"
    },
    RKTL: {
        icao: "RKTL",
        name: "Uljin",
        fs2020SceneryId: "RKTL-fs2020-scenery",
        p3dSceneryId: "RKTL-p3d-scenery"
    },
    RKPD: {
        icao: "RKPD",
        name: "Jeongseok",
        fs2020SceneryId: "RKPD-fs2020-scenery",
        p3dSceneryId: "RKPD-p3d-scenery"
    },
    RKTA: {
        icao: "RKTA",
        name: "Taean",
        fs2020SceneryId: "RKTA-fs2020-scenery"
    },
    RKSO: {
        icao: "RKSO",
        name: "Osan",
        fs2020SceneryId: "RKSO-fs2020-scenery"
    },
    RKRS: {
        icao: "RKRS",
        name: "Susaek",
        fs2020SceneryId: "RKRS-fs2020-scenery"
    },
    RKDU: {
        icao: "RKDU",
        name: "Ulleung (virtual)",
        fs2020SceneryId: "RKDU-fs2020-scenery"
    },
    ZKPY: {
        icao: "ZKPY",
        name: "Pyeongyang intl",
        fs2020SceneryId: "ZKPY-fs2020-scenery",
        p3dSceneryId: "ZKPY-p3d-scenery"
    },
    ZKWS: {
        icao: "ZKWS",
        name: "Wonsan Kalma intl",
        fs2020SceneryId: "ZKWS-fs2020-scenery",
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
        author: "ArtistPilot, KIS, KoreaSim, Real Wing, DDKK08, JEJUFLIGHT, LAZ, MCRN KARAKUM",
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
        author: "Rusion and me",
        license: "ctc contact Rusion and me",
        donation: "Kookmin bank, 27430104173050",
        downloadUrl: "https://github.com/lancard/fs2020-RKSS/archive/master.zip",
        versionCheckUrl: "https://lancard.github.io/fs2020-RKSS/version.txt",
        versionModifier: (data) => data.trim(),
        localStorageNameOfInstalledVersion: "RKSS-fs2020-scenery-installed-version",
        localStorageNameOfInstalledDirectoryList: "RKSS-fs2020-scenery-installed-directory-list",
        directory: {
            "thekoreans-airport-rkss-gimpo": `fs2020-RKSS-master\\Packages\\thekoreans-airport-rkss-gimpo`
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
    "RKPC-fs2020-scenery": {
        icao: "RKPC",
        programType: 'fs2020',
        author: "Me and Snowynest",
        license: "contact Me and Snowynest",
        donation: "contact Me and Snowynest",
        downloadUrl: "https://github.com/lancard/fs2020-RKPC/archive/master.zip",
        versionCheckUrl: "https://lancard.github.io/fs2020-RKPC/version.txt",
        versionModifier: (data) => data.trim(),
        localStorageNameOfInstalledVersion: "RKPC-fs2020-scenery-installed-version",
        localStorageNameOfInstalledDirectoryList: "RKPC-fs2020-scenery-installed-directory-list",
        directory: {
            "thekoreans-airport-rkpc-jeju": `fs2020-RKPC-master\\Packages\\thekoreans-airport-rkpc-jeju`
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
        donation: "<a href='javascript:void(0)' onclick=\"openExternalBrowser('https://toss.me/krsim')\">https://toss.me/krsim</a>",
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
        donation: "<a href='javascript:void(0)' onclick=\"openExternalBrowser('https://hosii.info')\">contact 유이 in https://hosii.info</a>",
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
    "RKNY-fs2020-scenery": {
        icao: "RKNY",
        programType: 'fs2020',
        author: "Snowynest",
        license: "contact Snowynest",
        donation: "contact Snowynest",
        downloadUrl: "https://github.com/lancard/fs2020-RKNY/archive/master.zip",
        versionCheckUrl: "https://lancard.github.io/fs2020-RKNY/version.txt",
        versionModifier: (data) => data.trim(),
        localStorageNameOfInstalledVersion: "RKNY-fs2020-scenery-installed-version",
        localStorageNameOfInstalledDirectoryList: "RKNY-fs2020-scenery-installed-directory-list",
        directory: {
            "YangyangAirport": `fs2020-RKNY-master\\YangyangAirport`
        }
    },
    "RKNY-p3d-scenery": {
        icao: "RKNY",
        programType: 'p3d',
        author: "드로",
        license: "contact https://sites.google.com/view/airbornelabs",
        donation: "<a href='javascript:void(0)' onclick=\"openExternalBrowser('https://sites.google.com/view/airbornelabs')\">contact 드로 in https://sites.google.com/view/airbornelabs</a>",
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
        donation: "<a href='javascript:void(0)' onclick=\"openExternalBrowser('https://www.buymeacoffee.com/KoreaFix')\">https://www.buymeacoffee.com/KoreaFix</a>",
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
    "RKJB-fs2020-scenery": {
        icao: "RKJB",
        programType: 'fs2020',
        author: "me and 유이",
        license: "contact me and 유이",
        donation: "contact me and 유이",
        downloadUrl: "https://github.com/lancard/fs2020-RKJB/archive/master.zip",
        versionCheckUrl: "https://lancard.github.io/fs2020-RKJB/version.txt",
        versionModifier: (data) => data.trim(),
        localStorageNameOfInstalledVersion: "RKJB-fs2020-scenery-installed-version",
        localStorageNameOfInstalledDirectoryList: "RKJB-fs2020-scenery-installed-directory-list",
        directory: {
            "thekoreans-airport-rkjb-muan": `fs2020-RKJB-master\\Packages\\thekoreans-airport-rkjb-muan`
        }
    },
    "RKJB-p3d-scenery": {
        icao: "RKJB",
        programType: 'p3d',
        author: "me and 유이 (https://hosii.info)",
        license: "contact https://hosii.info",
        donation: "<a href='javascript:void(0)' onclick=\"openExternalBrowser('https://hosii.info')\">contact 유이 in https://hosii.info</a>",
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
    "RKJJ-fs2020-scenery": {
        icao: "RKJJ",
        programType: 'fs2020',
        author: "me and 유이",
        license: "contact me and 유이",
        donation: "contact me and 유이",
        downloadUrl: "https://github.com/lancard/fs2020-RKJJ/archive/master.zip",
        versionCheckUrl: "https://lancard.github.io/fs2020-RKJJ/version.txt",
        versionModifier: (data) => data.trim(),
        localStorageNameOfInstalledVersion: "RKJJ-fs2020-scenery-installed-version",
        localStorageNameOfInstalledDirectoryList: "RKJJ-fs2020-scenery-installed-directory-list",
        directory: {
            "thekoreans-airport-rkjj-gwangju": `fs2020-RKJJ-master\\Packages\\thekoreans-airport-rkjj-gwangju`
        }
    },
    "RKJJ-p3d-scenery": {
        icao: "RKJB",
        programType: 'p3d',
        author: "유이 (https://hosii.info)",
        license: "contact https://hosii.info",
        donation: "<a href='javascript:void(0)' onclick=\"openExternalBrowser('https://hosii.info')\">contact 유이 in https://hosii.info</a>",
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
        donation: "<a href='javascript:void(0)' onclick=\"openExternalBrowser('https://sites.google.com/view/airbornelabs')\">contact 드로 in https://sites.google.com/view/airbornelabs</a>",
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
        license: "contact ArtistPilot (hyuntakim123@naver.com)",
        donation: "Toss 1000-3637-7654",
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
        versionCheckUrl: "https://raw.githubusercontent.com/lancard/VFRGO/master/version.txt",
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
        donation: "<a href='javascript:void(0)' onclick=\"openExternalBrowser('https://sites.google.com/view/airbornelabs')\">contact 드로 in https://sites.google.com/view/airbornelabs</a>",
        downloadUrl: "https://github.com/lancard/RKNW/archive/master.zip",
        versionCheckUrl: "https://lancard.github.io/RKNW/version.txt",
        versionModifier: (data) => data.trim(),
        localStorageNameOfInstalledVersion: "RKNW-p3d-scenery-installed-version",
        localStorageNameOfInstalledDirectoryList: "RKNW-p3d-scenery-installed-directory-list",
        directory: {
            "RKNW-p3d-scenery\\scenery": `RKNW-master\\scenery`,
            "RKNW-p3d-scenery\\texture": `RKNW-master\\texture`
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
        downloadUrl: "https://github.com/lancard/RKPS/archive/master.zip",
        versionCheckUrl: "https://lancard.github.io/RKPS/version.txt",
        versionModifier: (data) => data.trim(),
        localStorageNameOfInstalledVersion: "RKPS-p3d-scenery-installed-version",
        localStorageNameOfInstalledDirectoryList: "RKPS-p3d-scenery-installed-directory-list",
        directory: {
            "RKPS-p3d-scenery\\scenery": "RKPS-master\\scenery",
            "RKPS-p3d-scenery\\texture": "RKPS-master\\texture"
        }
    },
    "RKPU-fs2020-scenery": {
        icao: "RKPU",
        programType: 'fs2020',
        author: "me and 유이",
        license: "contact me and 유이",
        donation: "contact me and 유이",
        downloadUrl: "https://github.com/lancard/fs2020-RKPU/archive/master.zip",
        versionCheckUrl: "https://lancard.github.io/fs2020-RKPU/version.txt",
        versionModifier: (data) => data.trim(),
        localStorageNameOfInstalledVersion: "RKPU-fs2020-scenery-installed-version",
        localStorageNameOfInstalledDirectoryList: "RKPU-fs2020-scenery-installed-directory-list",
        directory: {
            "thekoreans-airport-rkpu-ulsan": `fs2020-RKPU-master\\Packages\\thekoreans-airport-rkpu-ulsan`
        }
    },
    "RKPU-p3d-scenery": {
        icao: "RKPU",
        programType: 'p3d',
        author: "유이 (https://hosii.info)",
        license: "contact https://hosii.info",
        donation: "<a href='javascript:void(0)' onclick=\"openExternalBrowser('https://hosii.info')\">contact 유이 in https://hosii.info</a>",
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
    "RKSM-fs2020-scenery": {
        icao: "RKSM",
        programType: 'fs2020',
        author: "Min-soo Lee",
        license: "contact Min-soo Lee (민수#8934)",
        donation: "contact Min-soo Lee (민수#8934)",
        downloadUrl: "https://github.com/lancard/fs2020-RKSM/archive/master.zip",
        versionCheckUrl: "https://lancard.github.io/fs2020-RKSM/version.txt",
        versionModifier: (data) => data.trim(),
        localStorageNameOfInstalledVersion: "RKSM-fs2020-scenery-installed-version",
        localStorageNameOfInstalledDirectoryList: "RKSM-fs2020-scenery-installed-directory-list",
        directory: {
            "a7lmu-seoulab": `fs2020-RKSM-master\\a7lmu-seoulab`
        }
    },
    "RKTH-fs2020-scenery": {
        icao: "RKTH",
        programType: 'fs2020',
        author: "me",
        license: "contact me",
        donation: "contact me",
        downloadUrl: "https://github.com/lancard/fs2020-RKTH/archive/master.zip",
        versionCheckUrl: "https://lancard.github.io/fs2020-RKTH/version.txt",
        versionModifier: (data) => data.trim(),
        localStorageNameOfInstalledVersion: "RKTH-fs2020-scenery-installed-version",
        localStorageNameOfInstalledDirectoryList: "RKTH-fs2020-scenery-installed-directory-list",
        directory: {
            "thekoreans-airport-rkth-pohang": `fs2020-RKTH-master\\Packages\\thekoreans-airport-rkth-pohang`
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
    "RKPD-fs2020-scenery": {
        icao: "RKPD",
        programType: 'fs2020',
        author: "Min-soo Lee",
        license: "contact Min-soo Lee (민수#8934)",
        donation: "contact Min-soo Lee (민수#8934)",
        downloadUrl: "https://github.com/lancard/fs2020-RKPD/archive/master.zip",
        versionCheckUrl: "https://lancard.github.io/fs2020-RKPD/version.txt",
        versionModifier: (data) => data.trim(),
        localStorageNameOfInstalledVersion: "RKPD-fs2020-scenery-installed-version",
        localStorageNameOfInstalledDirectoryList: "RKPD-fs2020-scenery-installed-directory-list",
        directory: {
            "a7lmu-airport-rkpd-jeongseok": `fs2020-RKPD-master\\a7lmu-airport-rkpd-jeongseok`
        }
    },
    "RKPD-p3d-scenery": {
        icao: "RKPD",
        programType: 'p3d',
        author: "NewMarine",
        license: "contact NewMarine",
        donation: "contact choiminsuhworker@naver.com",
        downloadUrl: "https://github.com/lancard/RKPD/archive/master.zip",
        versionCheckUrl: "https://lancard.github.io/RKPD/version.txt",
        versionModifier: (data) => data.trim(),
        localStorageNameOfInstalledVersion: "RKPD-p3d-scenery-installed-version",
        localStorageNameOfInstalledDirectoryList: "RKPD-p3d-scenery-installed-directory-list",
        directory: {
            "RKPD-p3d-scenery\\scenery": "RKPD-master\\scenery",
            "RKPD-p3d-scenery\\texture": "RKPD-master\\texture"
        }
    },
    "RKTA-fs2020-scenery": {
        icao: "RKTA",
        programType: 'fs2020',
        author: "Min-soo Lee",
        license: "contact Min-soo Lee (민수#8934)",
        donation: "contact Min-soo Lee (민수#8934)",
        downloadUrl: "https://github.com/lancard/fs2020-RKTA/archive/master.zip",
        versionCheckUrl: "https://lancard.github.io/fs2020-RKTA/version.txt",
        versionModifier: (data) => data.trim(),
        localStorageNameOfInstalledVersion: "RKTA-fs2020-scenery-installed-version",
        localStorageNameOfInstalledDirectoryList: "RKTA-fs2020-scenery-installed-directory-list",
        directory: {
            "a7lmu-airport-rkta-taean": `fs2020-RKTA-master\\a7lmu-airport-rkta-taean`
        }
    },
    "RKTL-fs2020-scenery": {
        icao: "RKTL",
        programType: 'fs2020',
        author: "Min-soo Lee",
        license: "contact Min-soo Lee (민수#8934)",
        donation: "contact Min-soo Lee (민수#8934)",
        downloadUrl: "https://github.com/lancard/fs2020-RKTL/archive/master.zip",
        versionCheckUrl: "https://lancard.github.io/fs2020-RKTL/version.txt",
        versionModifier: (data) => data.trim(),
        localStorageNameOfInstalledVersion: "RKTL-fs2020-scenery-installed-version",
        localStorageNameOfInstalledDirectoryList: "RKTL-fs2020-scenery-installed-directory-list",
        directory: {
            "a7_lmu-airport-rktl-uljin": `fs2020-RKTL-master\\a7_lmu-airport-rktl-uljin`
        }
    },
    "RKTL-p3d-scenery": {
        icao: "RKTL",
        programType: 'p3d',
        author: "VFR GO!",
        license: "contact 'VFR GO!'",
        donation: "contact 'VFR GO!'",
        downloadUrl: "https://github.com/lancard/VFRGO/releases/download/master/VFRGO_Uljin.zip",
        versionCheckUrl: "https://raw.githubusercontent.com/lancard/VFRGO/master/version.txt",
        versionModifier: (data) => data.trim(),
        localStorageNameOfInstalledVersion: "RKTL-p3d-scenery-installed-version",
        localStorageNameOfInstalledDirectoryList: "RKTL-p3d-scenery-installed-directory-list",
        directory: {
            "RKTL-p3d-scenery\\scenery": "scenery",
            "RKTL-p3d-scenery\\texture": "texture"
        }
    },
    "RKSO-fs2020-scenery": {
        icao: "RKSO",
        programType: 'fs2020',
        author: "Min-soo Lee",
        license: "contact Min-soo Lee (민수#8934)",
        donation: "contact Min-soo Lee (민수#8934)",
        downloadUrl: "https://github.com/lancard/fs2020-RKSO/archive/master.zip",
        versionCheckUrl: "https://lancard.github.io/fs2020-RKSO/version.txt",
        versionModifier: (data) => data.trim(),
        localStorageNameOfInstalledVersion: "RKSO-fs2020-scenery-installed-version",
        localStorageNameOfInstalledDirectoryList: "RKSO-fs2020-scenery-installed-directory-list",
        directory: {
            "a7lmu-airport-rkso-osanairbase": `fs2020-RKSO-master\\a7lmu-airport-rkso-osanairbase`
        }
    },
    "RKRS-fs2020-scenery": {
        icao: "RKRS",
        programType: 'fs2020',
        author: "ArtistPilot",
        license: "contact ArtistPilot (hyuntakim123@naver.com)",
        donation: "Toss 1000-3637-7654",
        downloadUrl: "https://github.com/lancard/fs2020-RKRS/archive/master.zip",
        versionCheckUrl: "https://lancard.github.io/fs2020-RKRS/version.txt",
        versionModifier: (data) => data.trim(),
        localStorageNameOfInstalledVersion: "RKRS-fs2020-scenery-installed-version",
        localStorageNameOfInstalledDirectoryList: "RKRS-fs2020-scenery-installed-directory-list",
        directory: {
            "kim-airport-rkrs-susaek": `fs2020-RKRS-master\\kim-airport-rkrs-susaek`
        }
    },
    "RKDU-fs2020-scenery": {
        icao: "RKDU",
        programType: 'fs2020',
        author: "JejuFlight",
        license: "contact JejuFlight",
        donation: "contact JejuFlight",
        downloadUrl: "https://github.com/lancard/fs2020-RKDU/archive/master.zip",
        versionCheckUrl: "https://lancard.github.io/fs2020-RKDU/version.txt",
        versionModifier: (data) => data.trim(),
        localStorageNameOfInstalledVersion: "RKDU-fs2020-scenery-installed-version",
        localStorageNameOfInstalledDirectoryList: "RKDU-fs2020-scenery-installed-directory-list",
        directory: {
            "JejuFlight-UlleungAirport": `fs2020-RKDU-master\\JejuFlight-UlleungAirport`
        }
    },
    "ZKPY-fs2020-scenery": {
        icao: "ZKPY",
        programType: 'fs2020',
        author: "me",
        license: "contact me",
        donation: "contact me",
        downloadUrl: "https://github.com/lancard/fs2020-ZKPY/archive/master.zip",
        versionCheckUrl: "https://lancard.github.io/fs2020-ZKPY/version.txt",
        versionModifier: (data) => data.trim(),
        localStorageNameOfInstalledVersion: "ZKPY-fs2020-scenery-installed-version",
        localStorageNameOfInstalledDirectoryList: "ZKPY-fs2020-scenery-installed-directory-list",
        directory: {
            "thekoreans-airport-zkpy-pyeongyang": `fs2020-ZKPY-master\\Packages\\thekoreans-airport-zkpy-pyeongyang`
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
    "ZKWS-fs2020-scenery": {
        icao: "ZKWS",
        programType: 'fs2020',
        author: "Ottomeme",
        license: "contact Ottomeme",
        donation: "contact Ottomeme",
        downloadUrl: "https://github.com/lancard/fs2020-ZKWS/archive/master.zip",
        versionCheckUrl: "https://lancard.github.io/fs2020-ZKWS/version.txt",
        versionModifier: (data) => data.trim(),
        localStorageNameOfInstalledVersion: "ZKWS-fs2020-scenery-installed-version",
        localStorageNameOfInstalledDirectoryList: "ZKWS-fs2020-scenery-installed-directory-list",
        directory: {
            "airport-zkwsaerial": `fs2020-ZKWS-master\\airport-zkwsaerial`,
            "airport-zkwskalma": `fs2020-ZKWS-master\\airport-zkwskalma`
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
        localStorageNameOfInstalledVersion: "ZKWS-p3d-scenery-installed-version",
        localStorageNameOfInstalledDirectoryList: "ZKWS-p3d-scenery-installed-directory-list",
        directory: {
            "ZKWS-p3d-scenery\\scenery": "ZKWS-master\\scenery",
            "ZKWS-p3d-scenery\\texture": "ZKWS-master\\texture"
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
    },
    "seoulcity": {
        programType: 'fs2020',
        downloadUrl: "https://github.com/lancard/fs2020-seoulcity/archive/master.zip",
        versionCheckUrl: "https://lancard.github.io/fs2020-seoulcity/version.txt",
        versionModifier: (data) => data.trim(),
        localStorageNameOfInstalledVersion: "seoulcity-fs2020-scenery-installed-version",
        localStorageNameOfInstalledDirectoryList: "seoulcity-fs2020-scenery-installed-directory-list",
        directory: {
            "a7lmu-seoulfix": "fs2020-seoulcity-master\\a7lmu-seoulfix"
        }
    },
    "jejuisland": {
        programType: 'fs2020',
        downloadUrl: "https://github.com/lancard/fs2020-jejuisland/archive/master.zip",
        versionCheckUrl: "https://lancard.github.io/fs2020-jejuisland/version.txt",
        versionModifier: (data) => data.trim(),
        localStorageNameOfInstalledVersion: "jejuisland-fs2020-scenery-installed-version",
        localStorageNameOfInstalledDirectoryList: "jejuisland-fs2020-scenery-installed-directory-list",
        directory: {
            "a7lmu-jejuisland": "fs2020-jejuisland-master\\a7lmu-jejuisland"
        }
    }
};
