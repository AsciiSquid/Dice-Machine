//Rolls dice based on two numbers.
function rollDice(count, max) {
    //Checks for the 0 edge case (cause you cant roll 0)
    if (count <= 0 || max <= 0) {return null;}
    //Does the rolls
    var values = [],
        rollsum = 0;
    for (var _ = 0; _ < count; _++) {
        let roll = Math.floor(Math.random() * max) + 1;
        values.push(roll);
        rollsum += roll;
    }
    return { sum: rollsum, rolls: values };
}
//Converts the command line into usable data array
function parseCmd(line) {
    //Regular expresion to break down the command
    var reg = /(?:\+|-)?(?:\d+d\d+|\d)/g,
        str = line.replace(/\s/g, '');
    //Splits the line
    var cmd = [];
    for (var c = undefined; c !== null; c = reg.exec(str)) {
        //ingnores the initial undefined variable, as well as any slip ups
        if (c) cmd.push(c[0]);
    }
    return cmd;
}
//Converts the command into a rolldata object
function parseRoll(line) {
    const commands = parseCmd(line),
          dieReg = /(^\d+)d(\d+)/; //Regex used to locate dice commands
    var rolls = [], //list of dice roll data
        sum = 0; //total sum of calculation
    for (var i = 0; i < commands.length; i++) {
        //Handles + or - characters
        var handle = commands[i][0];
        if (handle === '+') {
            sum = Math.abs(sum);
        } else if (handle === '-') {
            sum = -sum;
        } else if (i !== 0){
            return null;
        }
        
        //Cuts off the handle after the first pass
        var value = (i === 0) ? commands[i] : commands[i].substr(1);
        //Handle the dice/math
        var dice = dieReg.exec(value);
        if (dice) {
            var count = Math.floor(parseInt(dice[1])),
                max = Math.floor(parseInt(dice[2]));
            var roll = rollDice(count, max);
            rolls.push(roll);
            sum += roll.sum;
        } else {
            rolls.push(commands[i]);
            sum += Math.floor(parseInt(value));
        }
    }
    return {sum: Math.abs(sum), info: rolls};
}

exports.parse = parseRoll;

parseRoll('1d20 + 1')