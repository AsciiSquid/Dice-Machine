//Test case script for proper debugging
const roll = require('./rolls.js');

/*
    Basic case format
    in: String given to parseRoll()
    des: Description of input
    pass: Bool on whether the output should return rolldata or null
    (Pretty hard to predict the out value of a RNG machine)
*/
var cases = [
    {
        in: '1d20',
        des: 'Single roll',
        pass: true
    },
    {
        in: '1d20+1-1',
        des: 'Single roll with maths',
        pass: true
    },
    {
        in: '1d0',
        des: 'Rolling a d0',
        pass: false
    },
    {
        in: '0d20',
        des: 'Rolling 0 dice',
        pass: false
    },
    {
        in: '10+5-15',
        des: 'Maths adding to 0',
        pass: true
    },
    {
        in: '64d128',
        des: 'Very big roll',
        pass: true
    },
    {
        in: '1d20+one',
        des: 'Invalid string',
        pass: false
    },
    {
        in: '1dice',
        des: 'Invalid dice',
        pass: false
    }
];
console.log('Sterting Test...');
for (var i = 0; i < cases.length; i++) {
    var testcase = cases[i],
        result = null;
    try {
        result = roll.parse(testcase.in);
    } catch(e) {
        console.error(`${testcase.des}:\tERROR!\n${e}`);
        continue
    }
    if (Boolean(result) === testcase.pass) {
        console.log(`${testcase.des}:\tPASS\nReturns: ${result}`);
    } else {
        console.log(`${testcase.des}:\tFAIL\nReturns: ${result}`);
    }
}
console.log('End of test...');