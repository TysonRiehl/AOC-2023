const common = require('../../common')

async function handler() {
    const input = await common.loadInput('input.txt');
    const lines = common.splitToLines(input);

}

handler();
