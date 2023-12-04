
var fs = require('fs');
async function loadInput(optionalName) {
    return new Promise((resolve, reject) => {
        fs.readFile(optionalName || 'input.txt', 'utf8', function (err, data)
        {
            resolve(data);
        });
    });
}


function splitToLines(data) {
    return data.split(/\r?\n/);
}

module.exports = {loadInput, splitToLines};
