const common = require('../../common')

// Time:        42     68     69     85
// Distance:   284   1005   1122   1341


async function handler() {
    const input = await common.loadInput('input.txt');
    const lines = common.splitToLines(input);

    const times = lines[0].split(":")[1].trim().split(" ").filter(x => x !== "")
    const distances = lines[1].split(":")[1].trim().split(" ").filter(x => x !== "")
    let races = [];
    for (let i = 0; i < times.length; i++) {
        races.push({time: +times[i], distance: +distances[i]});
    }

    let total = 1;

    for (let race of races) {
        let amount = getWaysToWin(race);
        console.log(amount);
        total *= amount;
    }
    console.log(total);
}

function getWaysToWin(race) {
    let waysToWin;
    let startTime = getStartTime(race)
    let endTime = getEndTime(race)
    waysToWin = endTime - startTime;
    console.log(waysToWin, startTime, endTime)
    return waysToWin;
}

function getStartTime(race) {
    let min = 1;
    let max = race.time;

    while (true) {
        let middle = Math.floor((min + max) / 2);

        if (isWin(race, middle)) {
            max = middle;
        } else {
            min = middle;
        }

        if (max - min <= 1) {
            break;
        }
    }


    return min;
}

function getEndTime(race) {
    let min = 1;
    let max = race.time;

    while (true) {
        let middle = Math.floor((min + max) / 2);

        if (isWin(race, middle)) {
            min = middle;
        } else {
            max = middle;
        }

        if (max - min <= 1) {
            break;
        }
    }


    return max - 1;
}

function isWin(race, holdTime) {
    let timeToRun = race.time - holdTime;
    let distanceOverTime = timeToRun * holdTime;
    return distanceOverTime > race.distance;
}

handler();
