const common = require('../../common')

async function handler() {
    const input = await common.loadInput('input.txt');
    const lines = common.splitToLines(input);
    let gameSum = 0;

    for (let line of lines) {
        if (line === '') continue;
        const biggestRoles = {red: 1, green: 1, blue: 1};
        console.log(line)

        let bags = line.split(': ')[1].split('; ');
        for (let bag of bags) {
            let rolls = bag.split(", ");
            for (let roll of rolls) {
                let num = parseInt(roll.split(" ")[0]);
                let color = roll.split(" ")[1];

                console.log(num + " " + color);
                biggestRoles[color] = Math.max(biggestRoles[color], num);
            }
        }

        gameSum += (biggestRoles.red * biggestRoles.green * biggestRoles.blue)
    }

    console.log(gameSum);
}

handler();
