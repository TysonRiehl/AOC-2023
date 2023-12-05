const common = require('../../common')

let lastCategory = null;
let seeds = [];
let processed = 0;
let nextProcessed = 1000000;
let processSpeed = 1000;

async function handler() {

    const input = await common.loadInput('input.txt');
    const lines = common.splitToLines(input);
    const mapping = {};
    let tempSeeds = lines[0].split(": ")[1].split(" ");
    let realLowest = 99999999999999999999999;
    // seeds = tempSeeds;

    for (let i = 0; i < tempSeeds.length; i++) {
        let start = parseInt(tempSeeds[i]);
        let length = parseInt(tempSeeds[i + 1]);

        for (let x = 0; x < length; x++) {
            seeds.push(start + x);

            if (seeds.length > processSpeed) {
                let lowest = buildMapAndGetLowest(lines, mapping);
                realLowest = lowest < realLowest ? lowest : realLowest;
                seeds = [];
            }
        }
        i++;
    }


    if (seeds.length > 0) {
        let lowest = buildMapAndGetLowest(lines, mapping);
        realLowest = lowest < realLowest ? lowest : realLowest;
        seeds = [];
    }

    console.log(realLowest);
}

function buildMapAndGetLowest(lines, mapping) {
    lastCategory = null;
    mapping = {};
    let lineIndex = 2;
    for (lineIndex = 2; lineIndex < lines.length; lineIndex++) {
        lineIndex = loadMap(mapping, lines, lineIndex)
    }

    let lowestLocation = 999999999999999999999;

    for (let seed of seeds) {
        let low = getLowestForSeed(seed, mapping)
        lowestLocation = low < lowestLocation ? low : lowestLocation;
    }
    processed += seeds.length;
    if (processed > nextProcessed) {
        nextProcessed += 1000000;
        console.log("Processed: " + processed);
    }
    return lowestLocation;
}

function getLowestForSeed(seed, mapping) {
    let category = 'seed';
    let currentIndex = seed;
    let lowest = 9999999999999999;

    while (true) {
        let target = Object.keys(mapping[category])[0];
        currentIndex = getIndex(category, target, currentIndex, mapping);
        if (target === 'location') {
            lowest = currentIndex < lowest ? currentIndex : lowest;
            break;
        }

        category = target;
    }

    return lowest;
}


function loadMap(mapping, lines, lineIndex) {
    let newIndex = lineIndex;
    let [from, to] = lines[newIndex].split(' map:')[0].split('-to-');

    newIndex++;
    if (!mapping[from]) {
        mapping[from] = {};
    }
    mapping[from][to] = {};
    let targetMapping = mapping[from][to];
    let previousMapping = null;
    if (lastCategory != null) {
        previousMapping = Object.values(mapping[lastCategory][from]).map(x => parseInt(x));
    } else {
        previousMapping = seeds.map(x => parseInt(x));
    }

    while (newIndex < lines.length && lines[newIndex] !== '') {
        let [dest, source, range] = lines[newIndex].split(' ').map(x => parseInt(x));
        for (let pv of previousMapping) {
            if (pv >= source && pv < source + range) {
                let dst = pv - source;
                targetMapping[pv] = parseInt(dest) + dst;
            }
        }

        newIndex++;
    }

    for (let val of previousMapping) {
        if (!targetMapping[val]) {
            targetMapping[val] = val;
        }
    }

    lastCategory = from;

    return newIndex;
}

function getIndex(from, to, idx, mapping) {
    // console.log(from + " " + to)
    // console.log(mapping[from][to])
    return mapping[from]?.[to]?.[idx] ?? idx;
}

handler();
