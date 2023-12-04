const common = require('../../common')
let nums = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']

async function handler() {
    const input = await common.loadInput('input.txt');
    const lines = common.splitToLines(input);

    let results = [];
    for (let line of lines) {
        let first = null;
        let last = null;
        for (let i = 0; i < line.length; i++) {
            let char = line[i];
            let c = parseInt(char);
            if (!isNaN(c)) {
                if (first == null) {

                    first = c;
                } else {
                    last = c;
                }
            } else {
                for (let numIndex = 0; numIndex < nums.length; numIndex++) {
                    let numString = nums[numIndex];
                    if (line.slice(i, i + numString.length) === numString) {
                        if (first == null) {
                            first = numIndex + 1;
                        } else {
                            last = numIndex + 1;
                        }
                    }
                }
            }
        }

        if (last == null) {
            last = first;
        }

        if (first != null && last != null) {
            results.push(parseInt((first + '') + (last + '')));
        }
    }

    const result = results.reduce((a, b) => {
        return a + b
    });
    console.log(result);
}


handler();
