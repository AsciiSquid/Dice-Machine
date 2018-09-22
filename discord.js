// Run this to start the bot and stuff

const fs = require('fs'),
      Discord = require('discord.js');
const config = require('./config.json'),
      roll = require('./rolls.js');
const client = new Discord.Client();
//Logging into discord
client.login(config.token)
    .then(console.log)
    .catch(console.error);

client.on('ready', () => {
    //Sets name (if we need to)
    if (client.user.username != config.username) client.user.setUsername(config.username);
    //Sets the profile info.
    var act = config.activity;
    client.user.setActivity(act.name, { type: act.type })
        .then(presence => console.log(`Dice Machine now ${act.type} ${presence.game ? presence.game.name : 'none'}`))
        .catch(console.error);
});

function createRollReply(rolldata) {
    if (rolldata === null) return 'Invalid roll!';
    //Formats the results of the roll
    var msg = rolldata.sum.toString();
    msg += '```' + rolldata.rolls[0];
    for (i = 1; i < rolldata.rolls.length; i++) {
        msg += ' + ' + rolldata.rolls[i];
    }
    return msg += '```';
}

client.on('message', (message) => {
    //Check blacklist
    if (config.blacklist.includes(message.channel.id)) return;
    //Check for prefix
    else if (message.content.startsWith(config.prefix)) {
        //Removes prefix
        var msg = message.content.slice(config.prefix.length + 1),
            rolldata = roll.parse(msg.split(' '));
        //Collects the roll data, creates the reply, then sends it.
        message.channel.send(createRollReply(rolldata))
            .then(message => console.log(`Rolled up ${msg} for ${message.channel.name}`))
            .catch(console.error);
    }
});