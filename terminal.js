//Readline terminal version used for debugging
const rl = require('readline'),
      roll = require('./rolls.js');

const interface = rl.createInterface({
    input: process.stdin,
    output: process.stdout
});
interface.prompt();
interface.on('line', (input) => {
    console.dir(roll.parse(input));
    interface.prompt();
});