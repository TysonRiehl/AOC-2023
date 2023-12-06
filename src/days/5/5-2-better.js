const common = require('../../common')

let bestLoc = 9999999999999999;

// attempts 32266442 To High
// 32256442 Too high
// 32266442
async function handler() {

    const input = await common.loadInput('input.txt');
    const lines = common.splitToLines(input);
    const mapping = {};
    let tempSeeds = lines[0].split(": ")[1].split(" ");
    let seeds = [];
    for (let i = 0; i < tempSeeds.length; i += 2) {
        seeds.push({source: +tempSeeds[i], dest: +tempSeeds[i], range: +tempSeeds[i + 1]});
    }

    let lineIndex = 2;
    for (lineIndex = 2; lineIndex < lines.length; lineIndex++) {
        lineIndex = loadMap(mapping, lines, lineIndex)
    }

    for (let i = 0; i < seeds.length; i++) {
        console.log("Starting seed: " + JSON.stringify(seeds[i]))
        traverse(seeds[i], mapping.seed, mapping);
    }

    console.log(bestLoc)
}

function traverse(range, targetMapping, mapping) {
    console.log("Traverse", JSON.stringify(range) + " " + JSON.stringify(targetMapping))
    let hasMapped = false;


    for (let i = 0; i < targetMapping.values.length; i++) {
        if (targetMapping.to === 'soil') {
            console.log('soil');
        }
        let targetRange = targetMapping.values[i];
        // If we are above the minimum and below the max
        let start1 = range.dest;
        let end1 = range.dest + range.range;
        let start2 = targetRange.source;
        let end2 = targetRange.source + targetRange.range;

        if (end2 >= start1 && start2 <= end1) {
            let newStart = Math.max(start1, start2);
            let newEnd = Math.min(end1, end2);

            if (targetMapping.to === 'location') {
                // console.log("In Range: " + newStart)
                bestLoc = newStart < bestLoc ? newStart : bestLoc;
                continue;
            }

            let diff = newStart - start2;
            console.log(newStart, start2, targetRange.dest, diff, newEnd, newStart)

            traverse({dest: targetRange.dest + diff, range: newEnd - newStart}, mapping[targetMapping.to], mapping)
            if (end1 > end2) {
                let newRange = {dest: newEnd, range: range.range - (newEnd - newStart)};
                console.log("prev", range, targetRange, newRange, newEnd, newStart)
                range = newRange
            } else {
                return;
            }
        } else {

        }
    }

    if (targetMapping.to === 'location') {
        // console.log("OUTSIDE RANGE: " + targetRange.source)
        bestLoc = range.dest < bestLoc ? range.dest : bestLoc;
        return;
    }

    if (range.range <= 0) return;
    traverse({dest: range.dest, range: range.range}, mapping[targetMapping.to], mapping)
}


function loadMap(mapping, lines, lineIndex) {
    let newIndex = lineIndex;
    let [from, to] = lines[newIndex].split(' map:')[0].split('-to-');

    newIndex++;
    if (!mapping[from]) {
        mapping[from] = {
            from: from,
            to: to,
            values: []
        };
    }
    let targetMapping = mapping[from].values;


    while (newIndex < lines.length && lines[newIndex] !== '') {
        let [dest, source, range] = lines[newIndex].split(' ').map(x => parseInt(x));
        targetMapping.push({source: source, dest: dest, range: range});

        newIndex++;
    }

    mapping[from].values = targetMapping.sort((a, b) => {
        return a.source - b.source;
    });

    return newIndex;
}

handler();
