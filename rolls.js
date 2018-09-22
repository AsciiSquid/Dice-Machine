//Rolls dice based on two numbers.
function rollDice(count, max) {
    console.log('Rolling '+count+'d'+max);
    //Checks for the 0 edge case (cause you cant roll 0)
    if (count <= 0 || max <= 0) {return null;}
    //Does the rolls
    var values = [],
        rollsum = 0;
    for (i = 0; i < count; i++) {
        let roll = Math.floor(Math.random() * max) + 1;
        console.log('Rolled'+roll);
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
    for (i = undefined; i !== null; i = reg.exec(str)) {
        //ingnores the initial undefined variable, as well as any slip ups
        if (i) cmd.push(i[0]);
    }
    console.log('Command: ' + cmd);
    return cmd;
}
//Converts the command into a rolldata object
function parseRoll(line) {
    const commands = parseCmd(line),
          dieReg = /(^\d+)d(\d+)/; //Regex used to locate dice commands
    var rolls = [], //list of dice roll data
        sum = 0; //total sum of calculation
    for (i = 0; i < commands.length; i++) {
        console.log('==='+commands[0]+'===')
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
            console.log('Result:'+roll);
            rolls.push(roll);
            sum += roll.sum;
        } else {
            console.log('Added '+value+' to '+sum);
            rolls.push(commands[i]);
            sum += Math.floor(parseInt(value));
        }
    }
    return {sum: sum, info: rolls};
}

exports.parse = parseRoll;