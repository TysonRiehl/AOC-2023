const common = require('../../common')

async function handler() {
    // 250828922
    // 251097268
    // 251476222
    const input = await common.loadInput('input.txt');
    const lines = common.splitToLines(input);

    const values = {
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
        '6': 6,
        '7': 7,
        '8': 8,
        '9': 9,
        'T': 10,
        'J': 11,
        'Q': 12,
        'K': 13,
        'A': 14,
    }

    let rankedCards = [];

    for (let line of lines) {
        if (line === '') continue;
        let value = +line.split(' ')[1];
        let cards = line.split(' ')[0].split("");
        // cards = cards.sort((a, b) => {
        //     return values[b] - values[a]
        // });

        let rank = getRank({cards: cards, bid: value});
        rankedCards.push(rank);
    }

    let poweredCards = rankedCards.sort((a, b) => {
        if (a.tier === b.tier) {
            for (let i = 0; i < a.cards.length; i++) {
                if (a.cards[i] === b.cards[i]) continue;
                return values[b.cards[i]] - values[a.cards[i]];
            }
            return 0;
        } else {
            return b.tier - a.tier;
        }
    });


    let sum = 0;
    poweredCards = poweredCards.reverse();
    for (let i = 0; i < poweredCards.length; i++) {
        let p = poweredCards[i];
        sum += (p.bid * (i + 1))
    }

    console.log(poweredCards.slice(0));
    console.log(sum);

}

function getRank(cards) {
    let map = {};

    for (let card of cards.cards) {
        if (!map[card])
            map[card] = 1;
        else
            map[card]++;
    }

    let biggestKey = null;

    for (let key of Object.keys(map)) {
        if (map[key] > 1) {
            biggestKey = biggestKey == null || map[key] > map[biggestKey] ? key : biggestKey;
        }
    }

    let keys = Object.keys(map);
    let tier = 0;
    if (keys.length === 1) {
        tier = 6;
    } else if (keys.length === 2) {
        if (Object.values(map).some(a => a === 4)) {
            tier = 5;
        } else {
            tier = 4;
        }
    } else if (keys.length === 3) {
        if (Object.values(map).some(a => a === 3)) {
            tier = 3;
        } else {
            tier = 2;
        }
    } else if (keys.length === 4) {
        tier = 1;
    }

    cards.tier = tier;

    // cards.cards = cards.cards.sort((a, b) => {
    //     return map[b] - map[a];
    //     // return map[Object.keys(a)]
    // });

    return cards;
}

handler();
