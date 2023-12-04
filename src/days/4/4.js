const common = require('../../common')

async function handler() {
    const input = await common.loadInput('input.txt');
    const lines = common.splitToLines(input);
    let sum = 0;

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        if (line === '') continue;

        let cardNumber = line.split(':')[0].split(' ')[1];
        let allNumbers = line.split(':')[1];
        let winningNumbers = allNumbers.split(' | ')[0].trim().split(' ').filter(x => x !== '');
        let yourNumbers = allNumbers.split(' | ')[1].trim().split(' ').filter(x => x !== '');
        let wonNumbers = yourNumbers.filter(num => {
            return winningNumbers.includes(num);
        }).map(a => {
            console.log(a);
            return a;
        });


        if (wonNumbers.length === 0) continue;
        let tot = 0;
        let cardValue = 1;
        for (let a = 0; a < wonNumbers.length; a++) {
            tot = cardValue;
            cardValue *= 2;
        }


        console.log(wonNumbers + " " + tot);

        sum += tot;
    }

    console.log(sum)
}

handler();
