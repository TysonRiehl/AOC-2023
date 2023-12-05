const common = require('../../common')

let lastCategory = null;
let seeds;

async function handler() {
    const input = await common.loadInput('input.txt');
    const lines = common.splitToLines(input);
    const mapping = {};
    seeds = lines[0].split(": ")[1].split(" ");
    let lineIndex = 2;
    for (lineIndex = 2; lineIndex < lines.length; lineIndex++) {
        lineIndex = loadMap(mapping, lines, lineIndex)
    }

    let category = 'seed';
    let currentIndex;
    let lowestLocation = 999999999999999999999;

    for (let seed of seeds) {
        currentIndex = seed;
        while (true) {
            let target = Object.keys(mapping[category])[0];
            // console.log(category + " " + target + " " + currentIndex)
            currentIndex = getIndex(category, target, currentIndex, mapping);
            if (target === 'location') {
                lowestLocation = currentIndex < lowestLocation ? currentIndex : lowestLocation;
                break;
            }

            category = target;
        }

        category = 'seed';
    }

    console.log(lowestLocation);
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
        for(let pv of previousMapping) {
            if (pv >= source && pv <= source + range) {
                let dst = pv - source;
                targetMapping[pv] = parseInt(dest) + dst;
            }
        }

        console.log(targetMapping);
        // for (let i = 0; i < range; i++) {
        //     if (previousMapping && previousMapping.includes(parseInt(source) + i)) {
        //         targetMapping[parseInt(source) + i] = parseInt(dest) + i;
        //     }
        // }
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
