//Readline terminal version used for debugging
const rl = require('readline'),
      roll = require('./rolls.js');

const intf = rl.createInterface({
    input: process.stdin,
    output: process.stdout
});
intf.prompt();
intf.on('line', (input) => {
    console.dir(roll.parse(input));
    intf.prompt();
});