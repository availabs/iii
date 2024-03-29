const {
    scaleOrdinal,
    scaleThreshold
} = require("d3-scale");

const ss = require("simple-statistics");

const { format } = require("d3-format");

const LimitedAttributes = {
    num_events: "Occurances",
    property_damage: "Property Damage $"
}

const sheldusAttributes = {
    num_events: "Occurances",
    property_damage: "Property Damage $",
    crop_damage: "Crop Damage $",
    injuries: "Injuries",
    fatalities: "Fatalities"
}

const scaleCk = () => {
    let domain = [0, 1, 2, 3, 4],
        range = ["#f2efe9", "#fadaa6", "#f7c475", "#f09a10", "#cf4010"],
        scale = scaleThreshold()
            .domain(domain)
            .range(range);
    function Scale(d) {
        return scale(d);
    }
    Scale.domain = function(d) {
        if (!arguments.length) {
            return domain;
        }
        domain = d;
        ckmeans();
        return Scale;
    }
    Scale.range = function(r) {
        if (!arguments.length) {
            return range;
        }
        range = r;
        ckmeans();
        return Scale;
    }
    Scale.invertExtent = function(e) {
        return scale.invertExtent(e);
    }
    function ckmeans() {
        const ckmeans = ss.ckmeans(domain, range.length),
            thresholds = ckmeans.slice(0, range.length).map(ck => ck[ck.length - 1]);
        scale.domain(thresholds)
            .range(range);
    }
    return Scale;
}

const increase = 100
const getColors = num => {
    const colors = [];
    let r = 0, g = increase, b = 0;
    for (let i = 0; i < num; ++i) {

        colors.push(`rgb(${ r },${ g },${ b })`);

        b += increase;

        if (b > 255) {
            b %= 255;
            g += increase;
        }

        if (g > 255) {
            g %= 255;
            r += increase;
        }

        if (r > 255) {
            r %= 255;
        }
    }
    return colors;
}

const increase2 = 85
const getColors2 = num => {
    const colors = [];
    let r = 0, g = increase2, b = 0;
    for (let i = 0; i < num; ++i) {

        colors.push(`rgb(${ r },${ g },${ b })`);

        b += increase2;

        if (b > 255) {
            b = 0;
            g += increase2;
        }

        if (g > 255) {
            g = 0;
            r += increase2;
        }

        if (r > 255) {
            r = 0;
        }
    }
    return colors;
}

const D3_CATEGORY20 = [
    "#1f77b4",
    "#aec7e8",
    "#ff7f0e",
    "#ffbb78",
    "#2ca02c",
    "#98df8a",
    "#d62728",
    "#ff9896",
    "#9467bd",
    "#c5b0d5",
    "#8c564b",
    "#c49c94",
    "#e377c2",
    "#f7b6d2",
    "#7f7f7f",
    "#c7c7c7",
    "#bcbd22",
    "#dbdb8d",
    "#17becf",
    "#9edae5"
];

const getHazardName = hazardid =>
    (hazardid === "winterweat") ? "Winter Weather" :
        ['nri', 'bric', 'sovist', 'sovi', 'builtenv'].includes(hazardid) ? hazardid.toUpperCase() :
            hazardid.split("")
                .map((d, i) => i === 0 ? d.toUpperCase() : d)
                .join("")

function fnum(x, withDollar=true, roundUnder10K=true) {
    if(isNaN(x)) return x;

    if(x < 9999 && !roundUnder10K) {
        const frmt = format(withDollar ? "$,.0f" : ",.0f")
        return frmt(x);
    }
    if (x > 999 && x < 9999 && roundUnder10K) {
        const frmt = format(withDollar ? "$,.0f" : ",.0f")
        return frmt(x/1000) + "K";
    }

    if(x < 1000000) {
        const frmt = format(withDollar ? "$,.0f" : ",.0f")
        return frmt(x/1000) + "K";
    }
    if( x < 10000000) {
        const frmt = format(withDollar ? "$,.2f" : ",.2f")
        return frmt(x/1000000) + "M";
    }

    if(x < 1000000000) {
        const frmt = format(withDollar ? "$,.1f" : ",.1f")
        return frmt(x/1000000) + "M";
    }

    if(x < 1000000000000) {
        const frmt = format(withDollar ? "$,.1f" : ",.1f")
        return frmt(x/1000000000) + "B";
    }

    return "$1T+";
}

const ftypeMap = {
    730: { name: "Education", color: D3_CATEGORY20[0] },
    740: { name: "Emergency Response and Law Enforcement", color: D3_CATEGORY20[1] },
    800: { name: "Health and Medical", color: D3_CATEGORY20[4] },
    820: { name: "Public Attractions and Landmark Buildings", color: D3_CATEGORY20[5] },
    830: { name: "Government and Military", color: D3_CATEGORY20[16] }
}

module.exports = {

    getHazardName,
    fnum,
    getColors,
    getColors2,
    scaleCk,
    ftypeMap,

    getColorScale: domain =>
        scaleOrdinal()
            .domain((domain && domain.sort()) || [1, 2])
            .range(D3_CATEGORY20),

    processSheldus : (data,key) => {
        let yearly = {
            id: sheldusAttributes[key],
            "color": "#047bf8",
            data: Object.keys(data).reduce((total,year) => {
                total.push({
                    "x": +year,
                    "y": data[year][key] || 0
                })
                return total
            }, [])
        }
        let fiveYear = {
            id: '5 Year Avg ' + sheldusAttributes[key],
            "color": "#e65252",
            data: Object.keys(data).reduce((total,year) => {
                let avgTotal = 0
                let count = 0
                for(let i=4; i >= 0; i-- ) {
                    if(data[year-i] && data[year-i][key]){
                        avgTotal += data[year-i][key]
                    }
                    count += 1
                }
                let avg = !isNaN(avgTotal / count)  > 0
                    ? (avgTotal / count)
                    : 0
                total.push({
                    "x": +year,
                    "y": +(avg.toFixed(2))
                })
                return total
            }, [])

        }
        return [yearly,fiveYear]
    },

    processDataForBarChart: (rawData, geoids, lossType="property_damage", hazard=null) => {
// console.log("<processDataForBarChart>",rawData,geoids)
        const data = {}, keys = {};
        for (const geoid in rawData) {
            if (!geoids.includes(geoid)) continue;
            for (const hazardid in rawData[geoid]) {
                if (hazard && (hazardid != hazard)) continue;

                if (!(hazardid in keys)) {
                    keys[hazardid] = true;
                }
                for (const year in rawData[geoid][hazardid]) {
                    if (year === 'allTime') continue;
                    if (!(year in data)) {
                        data[year] = { year };
                    }
                    if (!(hazardid in data[year])) {
                        data[year][hazardid] = 0;
                    }
                    const value = data[year][hazardid] + +rawData[geoid][hazardid][year][lossType];
                    data[year][hazardid] = value;
                }
            }
        }
        return { data: Object.values(data), keys: Object.keys(keys) };
    },

    processSheldus5year : (data, key, type) => {
        type = type ? type : 'avg'
        return Object.keys(data).reduce((total,year) => {
            let avgTotal = 0
            let count = 0
            for(let i=4; i >= 0; i-- ) {
                if(data[year-i] && data[year-i][key]){
                    avgTotal += data[year-i][key]
                }
                count += 1
            }
            let avg = !isNaN(avgTotal / count) && count > 0
                ? (avgTotal / count)
                : 0
            total[year] = type === 'avg' ?  +(avg.toFixed(2)) : +(avgTotal.toFixed(2))
            return total
        }, {})
    },

    sumData : (data, key, len) => {
        return Object.keys(data).reduce((total,year) => {
            let avgTotal = 0
            let count = 0
            for(let i=(len-1); i >= 0; i-- ) {
                if(data[year-i] && data[year-i][key]){
                    avgTotal += data[year-i][key]
                }
                count += 1
            }
            let avg = !isNaN(avgTotal / count) && count > 0
                ? (avgTotal / count)
                : 0
            total[year] = +(avgTotal.toFixed(2))
            return total
        }, {})

    },

    total : (data,key) => {
        // this is a stupid hack
        // to remove crud keys that falcor adds to object
        let numYears = Object.keys(data)
            .filter(d => d.length === 4)
            .length

        if(numYears <= 0) return ''

        let total =  Object.keys(data).reduce((total,year) => {
            if(data[year][key] && !isNaN(+data[year][key])) {
                total += data[year][key]
            }
            return total
        }, 0)
        return fnum(total, false)
    },

    avg : (data,key) => {
        // this is a stupid hack
        // to remove crud keys that falcor adds to object
        let numYears = Object.keys(data)
            .filter(d => d.length === 4)
            .length

        if(numYears <= 0) return ''

        let total =  Object.keys(data).reduce((total,year) => {
            if(data[year][key] && !isNaN(+data[year][key])) {
                total += data[year][key]
            }
            return total
        }, 0)



        return fnum( total / numYears , false)
    },

    avgData : (data,key, len) => {
        return Object.keys(data).reduce((total,year) => {
            let avgTotal = 0
            let count = 0
            for(let i=len-1; i >= 0; i-- ) {
                if(data[year-i] && data[year-i][key]){
                    avgTotal += data[year-i][key]
                }
                count += 1
            }
            let avg = !isNaN(avgTotal / count) && count > 0
                ? (avgTotal / count)
                : 0
            total[year] = +(avg.toFixed(2))
            return total
        }, {})

    }

}