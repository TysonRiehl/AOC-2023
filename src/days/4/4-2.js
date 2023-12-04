const common = require('../../common')

async function handler() {
    const input = await common.loadInput('input.txt');
    const lines = common.splitToLines(input);
    let totalCards = 0;

    let cardBonus = {};
    let cardBonusHistory = {};

    for (let i = 0; i < lines.length; i++) {
        cardBonus[i] = 0;
        cardBonusHistory[i] = 0;
    }

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        if (line === '') continue;

        totalCards++;
        if (i % 10 === 0) {
            console.log("Card: " + (i + 1))
        }
        let allNumbers = line.split(':')[1];
        let winningNumbers = allNumbers.split(' | ')[0].trim().split(' ').filter(x => x !== '');
        let yourNumbers = allNumbers.split(' | ')[1].trim().split(' ').filter(x => x !== '');
        let wonNumbers = yourNumbers.filter(num => {
            return winningNumbers.includes(num);
        });


        if (wonNumbers.length > 0) {
            for (let wonIndex = 0; wonIndex < wonNumbers.length; wonIndex++) {
                cardBonus[i + wonIndex + 1] += 1;
                totalCards++;
                cardBonusHistory[i + wonIndex + 1] += 1;
            }
        }

        if (cardBonus[i] > 0) {
            cardBonus[i]--;
            i--;
        }
    }

    console.log(totalCards)
    console.log(cardBonusHistory);
}

handler();
