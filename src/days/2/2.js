
const common = require('../../common')
const rules = {red: 12, green: 13, blue: 14};

async function handler() {
    const input = await common.loadInput('input.txt');
    const lines = common.splitToLines(input);
    let gameSum = 0;

    for (let line of lines) {
        if (line === '') continue;
        let gameNumber = line.split(': ')[0].split(' ')[1];
        console.log(line.split(': '))
        let bags = line.split(': ')[1].split('; ');
        let isValid = true;
        for (let bag of bags) {
            if (!isValidBag(bag)) {
                isValid = false;
                break;
            }
        }

        if (isValid) {
            gameSum += parseInt(gameNumber);
        }

    }

    console.log(gameSum);
}

function isValidBag(bag) {
    let rolls = bag.split(", ");
    for (let roll of rolls) {
        let num = roll.split(" ")[0];
        let color = roll.split(" ")[1];

        if (rules[color] < num) {
            return false;
        }
    }

    return true;
}


handler();
