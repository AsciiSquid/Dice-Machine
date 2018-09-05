// === Stuff for the die roll calculations ===
//Rolls dice based on string
function rollDice(line) {
    //format as '#d#'
    //Invalid strings will probably return null or crash
    //---//
    //Regex search string
    const reg = /(^\d*)d(\d*)/;
    //Deconstruct the regex search data
    let searched = reg.exec(line);
    var count = parseInt(searched[1]),
        die = parseInt(searched[2]);
    //Does the rolls
    var rolls = [],
        sum = 0;
    for (i = 0; i < count; i++) {
        let roll = Math.floor(Math.random() * die) + 1;
        rolls.push(roll);
        sum += roll;
    }
    return { sum: sum, rolls: rolls };
}

exports.parse = rollDice;