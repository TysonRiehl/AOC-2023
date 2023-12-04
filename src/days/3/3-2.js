const common = require('../../common')

async function handler() {
    const input = await common.loadInput('input.txt');
    const lines = common.splitToLines(input);
    let sum = 0;

    let gears = {};

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();

        for (let cIndex = 0; cIndex < line.length; cIndex++) {
            let c = parseInt(line[cIndex]);
            if (isPartNumber(c)) {
                let pathLength = getPartLength(line, cIndex);
                let partNumber = line.slice(cIndex, cIndex + pathLength - 1);

                let validPartNumber = false;
                let symbolSpot = null;

                for (let y = -1; y <= 1; y++) {
                    if (i + y < 0 || i + y >= lines.length) continue;
                    for(let x = -1; x < pathLength && x + cIndex < line.length; x++) {
                        if (x + cIndex < 0) continue;
                        let theC = lines[i + y][x + cIndex];
                        if (isSymbol(theC)) {
                            symbolSpot = (i + y) + "_" + (x + cIndex);
                            validPartNumber = true;
                            break;
                        }
                    }

                    if (validPartNumber)
                        break;
                }

                if (validPartNumber) {
                    if (!gears[symbolSpot]) {
                        gears[symbolSpot] = [];
                    }

                    gears[symbolSpot].push(parseInt(partNumber))
                    console.log("VALID part: " + partNumber)
                    sum += parseInt(partNumber);
                } else {
                    console.log("BAD Part: " + partNumber)
                }

                cIndex += pathLength - 1;
            }
        }
    }

    let gearSum = 0;
    let gearsa = Object.values(gears);
    for (let gear of gearsa) {
        if (gear.length <= 1) continue;
        let gSum = gear[0];
        for (let i = 1; i < gear.length; i++) {
            gSum *= gear[i];
        }

        gearSum += gSum;
    }

    console.log(gearSum)
}

function isPartNumber(c) {
    return !isNaN(parseInt(c));
}

function isSymbol(c) {
    return c === '*';
}

function getPartLength(line, startIndex) {
    let ind = startIndex;
    let length = 1;
    while(ind < line.length) {
        if (line[ind] !== '.' && !isNaN(parseInt(line[ind]))) {
            length++;
        } else {
            break;
        }
        ind++;
    }

    return length;
}

handler();
