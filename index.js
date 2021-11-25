const input = require('input'),

      { generateOutput } = require('./outputGenerator');

async function enterValue(name, start, end) {
    let id = 0;

    while(isNaN(id) || !parseInt(id) >= start && !parseInt(id) <= end) {
        id = await input.text(`Please enter the ${name} id between ${start} and ${end}: \n`);
    }

    return parseInt(id);
}

async function start() {
    const userId = await enterValue('user', 1, 5),
          loyaltyCardId = await enterValue('loyalty card', 1, 6);
    
    const output = JSON.stringify(generateOutput(userId, loyaltyCardId), 0, 2);

    console.log(output);
}

start();