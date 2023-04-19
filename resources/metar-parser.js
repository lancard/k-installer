(function () { function r(e, n, t) { function o(i, f) { if (!n[i]) { if (!e[i]) { var c = "function" == typeof require && require; if (!f && c) return c(i, !0); if (u) return u(i, !0); var a = new Error("Cannot find module '" + i + "'"); throw a.code = "MODULE_NOT_FOUND", a } var p = n[i] = { exports: {} }; e[i][0].call(p.exports, function (r) { var n = e[i][1][r]; return o(n || r) }, p, p.exports, r, e, n, t) } return n[i].exports } for (var u = "function" == typeof require && require, i = 0; i < t.length; i++)o(t[i]); return o } return r })()({
    1: [function (require, module, exports) {
        metarParser = require('metar-parser');

    }, { "metar-parser": 2 }], 2: [function (require, module, exports) {
        /**
         * Simple object check.
         * @param {any} item Subject
         * @returns {boolean} isObject
         */
        function isObject(item) {
            return (item && typeof item === "object" && !Array.isArray(item));
        }

        /**
         * Deep merge two objects.
         * @param {Object} target Object to merge in
         * @param {Object} sources Objects to merge
         * @returns {Object} Merged object
         */
        function mergeDeep(target, ...sources) {
            if (!sources.length) {
                return target;
            }

            const source = sources.shift();

            if (isObject(target) && isObject(source)) {
                for (const key in source) {
                    if (isObject(source[key])) {
                        if (!target[key]) {
                            Object.assign(target, { [key]: {} });
                        }
                        mergeDeep(target[key], source[key]);
                    } else {
                        Object.assign(target, { [key]: source[key] });
                    }
                }
            }

            return mergeDeep(target, ...sources);
        }

        /**
         * Parses METAR/SPECI format
         * @param {string} metar Metar report string
         * @returns {Object} Parsed Metar object
         */
        module.exports = function parse(metar) {
            let result = {};

            [
                require("./parsers/type"),
                require("./parsers/auto"),
                require("./parsers/station"),
                require("./parsers/time"),
                require("./parsers/wind"),
                require("./parsers/correction"),
                require("./parsers/nosig"),
                require("./parsers/wind_variation"),
                require("./parsers/visibility"),
                require("./parsers/tempdew"),
                require("./parsers/altimeter"),
                require("./parsers/clouds"),
                require("./parsers/runway_visual_range"),
                require("./parsers/weather"),
                require("./parsers/cavok"),
                require("./parsers/windshear"),
                require("./parsers/vertical_visibility"),
                require("./parsers/recent_weather"),
                require("./parsers/remarks")
            ]
                .map(parser => parser.parse(metar.toUpperCase()))
                .forEach(data => {
                    result = mergeDeep(result, data);
                });

            return result;
        };

    }, { "./parsers/altimeter": 4, "./parsers/auto": 5, "./parsers/cavok": 6, "./parsers/clouds": 7, "./parsers/correction": 8, "./parsers/nosig": 9, "./parsers/recent_weather": 10, "./parsers/remarks": 11, "./parsers/runway_visual_range": 12, "./parsers/station": 13, "./parsers/tempdew": 14, "./parsers/time": 15, "./parsers/type": 16, "./parsers/vertical_visibility": 17, "./parsers/visibility": 18, "./parsers/weather": 19, "./parsers/wind": 20, "./parsers/wind_variation": 21, "./parsers/windshear": 22 }], 3: [function (require, module, exports) {
        module.exports = class Parser {
            static parse() {
                throw new Error("Parser must have a parse function");
            }
        };

    }, {}], 4: [function (require, module, exports) {
        const Parser = require("../parser");

        module.exports = class AltimeterParser extends Parser {
            static parse(metar) {
                const match = ` ${metar} `.match(/\s(Q|A)([0-9]{4})\s/);

                if (!match) {
                    return {
                        altimeter: null
                    };
                }

                const type = match[1];
                const value = parseInt(match[2], 10);

                let inchesHg;
                let millibars;

                if (type === "A") {
                    inchesHg = value / 100;
                    millibars = Math.round(value / 100 * 33.8637526);
                } else if (type === "Q") {
                    millibars = value;
                    inchesHg = Math.round(value * 100 * 0.0295301) / 100;
                }

                return {
                    altimeter: {
                        inches: inchesHg,
                        millibars
                    }
                };
            }
        };

    }, { "../parser": 3 }], 5: [function (require, module, exports) {
        const Parser = require("../parser");

        module.exports = class AutoParser extends Parser {
            static parse(metar) {
                const match = ` ${metar} `.match(/\sAUTO\s/);

                return {
                    auto: !!match
                };
            }
        };

    }, { "../parser": 3 }], 6: [function (require, module, exports) {
        const Parser = require("../parser");

        module.exports = class CavokParser extends Parser {
            static parse(metar) {
                const match = ` ${metar} `.match(/\sCAVOK\s/);

                return {
                    cavok: !!match
                };
            }
        };

    }, { "../parser": 3 }], 7: [function (require, module, exports) {
        const Parser = require("../parser");
        const { SKY_CONDITIONS } = require("../strings");

        module.exports = class CloudsParser extends Parser {
            static parse(metar) {
                let part;
                const match = [];
                const regex = /(CLR|SKC|FEW|SCT|BKN|OVC|VV)([0-9/]{3})(CU|CB|TCU|CI|[/]{3})?/g;

                while (part = regex.exec(metar)) {
                    match.push(part);
                }

                return {
                    clouds: match.map(group => {
                        return {
                            code: group[1],
                            meaning: SKY_CONDITIONS[group[1]],
                            altitude: parseInt(group[2], 10) * 100,
                            type: group[3] || null,
                            typeMeaning: group[3] ? SKY_CONDITIONS[group[3]] : null
                        };
                    })
                };
            }
        };

    }, { "../parser": 3, "../strings": 23 }], 8: [function (require, module, exports) {
        const Parser = require("../parser");

        module.exports = class CorrectionParser extends Parser {
            static parse(metar) {
                const match = ` ${metar} `.match(/\sCOR|CC([A-Z])\s/);

                return {
                    correction: match ? match[1] : false
                };
            }
        };

    }, { "../parser": 3 }], 9: [function (require, module, exports) {
        const Parser = require("../parser");

        module.exports = class NosigParser extends Parser {
            static parse(metar) {
                const match = ` ${metar} `.match(/\sNOSIG\s/);

                return {
                    nosig: !!match
                };
            }
        };

    }, { "../parser": 3 }], 10: [function (require, module, exports) {
        const Parser = require("../parser");
        const { WEATHER } = require("../strings");

        module.exports = class RecentWeatherParser extends Parser {
            static parse(metar) {
                const match = ` ${metar} `.match(/\sRE((?:[A-Z]{2})+)\s/);

                if (!match) {
                    return {
                        recentWeather: []
                    };
                }

                return {
                    recentWeather: match[1].match(/.{1,2}/g).map(group => {
                        return {
                            code: group,
                            meaning: WEATHER[group] || null
                        };
                    })
                };
            }
        };

    }, { "../parser": 3, "../strings": 23 }], 11: [function (require, module, exports) {
        const Parser = require("../parser");
        const { convertKTtoMPS } = require("../utils");

        module.exports = class RemarksParser extends Parser {
            static parse(metar) {
                let match = metar.match(/RMK\s(.+)$/);

                if (!match) {
                    return {
                        remarks: null
                    };
                }

                const remarkStr = match[1];
                const remarks = {};

                // STATION TYPE
                if (remarkStr.includes("AO1")) {
                    remarks.stationType = {
                        description: "Type of automated station",
                        remark: "AO1",
                        value: "Station is not equipped with a rain/snow sensor"
                    };
                } else if (remarkStr.includes("AO2")) {
                    remarks.stationType = {
                        description: "Type of automated station",
                        remark: "AO2",
                        value: "Station is equipped with a rain/snow sensor"
                    };
                }

                // QFE pressure
                if (match = remarkStr.match(/QFE([0-9]{3})/)) {
                    const value = parseInt(match[1])
                    remarks.qfeAltimeter = {
                        millibars: value,
                        inchesHg: Math.round(value * 100 * 0.0295301) / 100
                    };
                }

                // PEAK WIND
                if (match = remarkStr.match(/PK\sWND\s([0-9]{3})([0-9]{2})\/([0-9]{2})([0-9]{2})/)) {
                    const date = new Date();

                    date.setUTCHours(match[3]);
                    date.setUTCMinutes(match[4]);

                    remarks.peakWind = {
                        description: "Peak wind",
                        remark: match[0],
                        value: {
                            direction: match[1],
                            speedKT: match[2],
                            speedMPS: convertKTtoMPS(match[2]),
                            date: date.toUTCString()
                        }
                    };
                }

                return {
                    remarks
                };
            }
        };

    }, { "../parser": 3, "../utils": 24 }], 12: [function (require, module, exports) {
        const Parser = require("../parser");
        const { RWR_TREND } = require("../strings");

        module.exports = class RVRParser extends Parser {

            /**
             * Parses Runway Visual Range
             * @param {string} metar Metar string
             * @returns {Object} Parsed object
             */
            static parse(metar) {
                let part;
                const match = [];
                const regex = /R([0-9]{2}[LRC]?)\/([MP])?([0-9]{4})(?:V([MP])?([0-9]{4}))?(FT)?\/?([UND]?)/g;

                while (part = regex.exec(metar)) {
                    match.push(part);
                }

                return {
                    runwayVisualRange: match.map(group => {
                        const min = parseInt(group[3], 10);
                        const minRange = RWR_TREND[group[2]] || "exact";

                        return {
                            runway: group[1],
                            min,
                            minRange,
                            max: group[5] ? parseInt(group[5], 10) : min,
                            maxRange: group[5] ? RWR_TREND[group[4]] || "exact" : "exact",
                            trend: RWR_TREND[group[7]] || "not possible to determine"
                        };
                    })
                };
            }
        };

    }, { "../parser": 3, "../strings": 23 }], 13: [function (require, module, exports) {
        const Parser = require("../parser");

        module.exports = class StationParser extends Parser {
            static parse(metar) {
                const match = ` ${metar} `.match(/\s([A-Z]{4})\s/);

                return {
                    station: match ? match[1] : "unknown"
                };
            }

            static toText(output) {
                return `Report location: ${output.station}`;
            }
        };

    }, { "../parser": 3 }], 14: [function (require, module, exports) {
        const Parser = require("../parser");

        module.exports = class TempDewParser extends Parser {
            static parse(metar) {
                const match = ` ${metar} `.match(/\s(M?[0-9]{2}\/M?[0-9]{2})\s/);

                if (!match) {
                    return {
                        temperature: null,
                        dewpoint: null
                    };
                }

                const tempdew = match[1].split("/").map(value => {
                    if (value.slice(0, 1) === "M") {
                        return value.slice(1, 3) * -1;
                    }
                    return 1 * value;
                });

                return {
                    temperature: {
                        celsius: tempdew[0],
                        fahrenheit: Math.round((tempdew[0] * 1.8 + 32) * 100) / 100
                    },
                    dewpoint: {
                        celsius: tempdew[1],
                        fahrenheit: Math.round((tempdew[1] * 1.8 + 32) * 100) / 100
                    }
                };
            }
        };

    }, { "../parser": 3 }], 15: [function (require, module, exports) {
        const Parser = require("../parser");

        module.exports = class TimeParser extends Parser {
            static parse(metar) {
                const match = ` ${metar} `.match(/\s([0-9]{2})([0-9]{2})([0-9]{2})Z\s/);

                if (!match) {
                    return {
                        time: null
                    };
                }

                const day = parseInt(match[1], 10);
                const hour = parseInt(match[2], 10);
                const minute = parseInt(match[3], 10);

                const date = new Date();

                date.setUTCDate(day);
                date.setUTCHours(hour);
                date.setUTCMinutes(minute);

                return {
                    time: {
                        day,
                        hour,
                        minute,
                        date: date.toUTCString()
                    }
                };
            }
        };

    }, { "../parser": 3 }], 16: [function (require, module, exports) {
        const Parser = require("../parser");

        module.exports = class TypeParser extends Parser {
            static parse(metar) {
                const match = ` ${metar} `.match(/\s(METAR|SPECI)\s/);

                return {
                    type: match ? match[1] : "METAR"
                };
            }
        };

    }, { "../parser": 3 }], 17: [function (require, module, exports) {
        const Parser = require("../parser");

        module.exports = class VerticalVisibilityParser extends Parser {
            static parse(metar) {
                const match = ` ${metar} `.match(/\sVV([0-9]{3})|(\/\/\/)\s/);

                if (!match) {
                    return {
                        verticalVisibility: null
                    };
                }

                const units = match[1] ? parseInt(match[1], 10) : 0;
                const meters = units * 30;
                const feet = units * 100;

                return {
                    verticalVisibility: {
                        meters,
                        feet
                    }
                };
            }
        };

    }, { "../parser": 3 }], 18: [function (require, module, exports) {
        const Parser = require("../parser");
        const { UNITS } = require("../strings");

        module.exports = class VisibilityParser extends Parser {
            static parse(metar) {
                const match = ` ${metar} `.match(/\s([0-9]{4})\s|\s((?:[0-9]{1,2}\/)?[0-9]{1,2})(SM|KM)\s/);

                if (!match) {
                    return {
                        visibility: null
                    };
                }

                const unit = UNITS[match[3]] || "meter";
                let distance;

                if (match[2] && match[2].includes("/")) {
                    const parts = match[2].split("/").map(part => parseInt(part, 10));

                    distance = parts[0] / parts[1];
                } else {
                    distance = parseInt(match[1] || match[2], 10);
                }

                let distanceMeters;
                let distanceFeet;

                if (unit === "meter") {
                    distanceMeters = distance;
                    distanceFeet = Math.round(distance * 3.2808);
                } else if (unit === "kilometer") {
                    distanceMeters = distance * 1000;
                    distanceFeet = Math.round(distanceMeters * 3.2808);
                } else if (unit === "statute mile") {
                    distanceFeet = distance * 5280;
                    distanceMeters = Math.round(distanceFeet * 0.3048);
                }

                return {
                    visibility: {
                        meters: distanceMeters,
                        feet: distanceFeet,
                        miles: Math.round(distanceFeet / 5280 * 100) / 100,
                        kilometers: Math.round(distanceMeters / 10) / 100
                    }
                };
            }
        };

    }, { "../parser": 3, "../strings": 23 }], 19: [function (require, module, exports) {
        const Parser = require("../parser");
        const { WEATHER } = require("../strings");

        module.exports = class WeatherParser extends Parser {
            static parse(metar) {
                const regex = /(-|\+|VC)?(MI|PR|BC|DR|BL|SH|TS|FZ)?(DZ|RA|SN|SG|IC|PE|GR|GS|UP)?(BR|FG|FU|VA|DU|SA|HZ|PY)?(PO|SQ|FC|SS)?/;
                const data = metar.split(" ")
                    .filter(str => !!str)
                    .map(word => word.match(regex))
                    .filter(match => match !== null && match[0] !== "")
                    .map(group => {
                        return {
                            codes: [group[2], group[3], group[4]].filter(code => !!code),
                            intensity: group[1] ? WEATHER[group[1]] : "moderate",
                            descriptor: WEATHER[group[2]] || null,
                            precipitation: WEATHER[group[3]] || null,
                            obscuration: WEATHER[group[4]] || null
                        };
                    });

                return {
                    weather: data
                };
            }
        };

    }, { "../parser": 3, "../strings": 23 }], 20: [function (require, module, exports) {
        const Parser = require("../parser");
        const { convertKTtoMPS, convertMPStoKT } = require("../utils");

        module.exports = class WindParser extends Parser {
            static parse(metar) {
                const match = ` ${metar} `.match(/\s([0-9]{3}|VRB)([0-9]{2})(?:G([0-9]{2}))?(KT|MPS)\s/);

                if (!match) {
                    return {
                        wind: null
                    };
                }

                const speed = parseInt(match[2], 10);
                let speedKt;
                let speedMps;

                if (match[4] === "KT") {
                    speedKt = speed;
                    speedMps = convertKTtoMPS(speed);
                } else {
                    speedMps = speed;
                    speedKt = convertMPStoKT(speed);
                }

                return {
                    wind: {
                        direction: match[1] === "VRB" ? "VRB" : parseInt(match[1], 10),
                        speedKt,
                        speedMps,
                        gust: match[3] ? parseInt(match[3], 10) : false,
                        variableDirection: match[1] === "VRB"
                    }
                };
            }
        };

    }, { "../parser": 3, "../utils": 24 }], 21: [function (require, module, exports) {
        const Parser = require("../parser");

        module.exports = class VariationParser extends Parser {
            static parse(metar) {
                const match = ` ${metar} `.match(/\s([0-9]{3})V([0-9]{3})\s/);

                if (!match) {
                    return {
                        wind: {
                            variation: null
                        }
                    };
                }

                return {
                    wind: {
                        variation: {
                            min: parseInt(match[1], 10),
                            max: parseInt(match[2], 10)
                        }
                    }
                };
            }
        };

    }, { "../parser": 3 }], 22: [function (require, module, exports) {
        const Parser = require("../parser");

        module.exports = class WindshearParser extends Parser {
            static parse(metar) {
                let part;
                const match = [];
                const regex = /WS\s(?:RWY([0-9]{2}[LRC]?))|(ALL RWY)/g;

                while (part = regex.exec(metar)) {
                    match.push(part);
                }

                return {
                    windshear: match.map(group => group[1] || group[2])
                };
            }
        };

    }, { "../parser": 3 }], 23: [function (require, module, exports) {
        module.exports.UNITS = {
            FT: "feet",
            SM: "statute mile",
            KM: "kilometer"
        };

        module.exports.SKY_CONDITIONS = {
            SKC: "sky clear",
            FEW: "few",
            SCT: "scattered",
            BKN: "broken",
            OVC: "overcast",
            CLR: "clear",
            CB: "cumulonimbus",
            TCU: "towering cumulus",
            CU: "cumulus",
            CI: "cirrus",
            "///": "no information"
        };

        module.exports.RWR_TREND = {
            U: "upward",
            D: "downward",
            N: "no change",
            P: "more than",
            M: "less than"
        };

        module.exports.WEATHER = {
            "+": "heavy",
            "-": "light",
            VC: "in the vicinity",
            MI: "shallow",
            PR: "partial",
            BC: "patches",
            DR: "low drifting",
            BL: "blowing",
            SH: "shower",
            TS: "thunderstorm",
            FZ: "freezing",
            DZ: "drizzle",
            RA: "rain",
            SN: "snow",
            SG: "snow grains",
            IC: "ice crystals",
            PE: "ice pellets",
            GR: "hail",
            GS: "small hail",
            UP: "unknown",
            BR: "mist",
            FG: "fog",
            FU: "smoke",
            VA: "volcanic ash",
            DU: "dust",
            SA: "sand",
            HZ: "haze",
            PY: "spray",
            PO: "dust whirls",
            SQ: "squalls",
            FC: "funnel cloud/tornado/waterspout",
            SS: "duststorm"
        };

    }, {}], 24: [function (require, module, exports) {
        module.exports.convertKTtoMPS = kt => {
            return Math.round(parseFloat(kt) / 1.94384 * 100) / 100;
        };

        module.exports.convertMPStoKT = mps => {
            return Math.round(parseFloat(mps) * 1.94384 * 100) / 100;
        };

    }, {}]
}, {}, [1]);