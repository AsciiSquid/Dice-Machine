// Run this to start the bot and stuff

const fs = require('fs'),
      Discord = require('discord.js');
const config = require('./config.json'),
      roll = require('./rolls.js'),
      sounds = require('./soundboard.js');
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
    var msg = rolldata.sum;
    msg += "```";
    function readBody(data) {
        var item = data.shift();
        if (typeof item == 'object') {
            return `[${item.rolls.join('+')}]` + readBody(data);
        } else if (typeof item == 'string') {
            return item + readBody(data);
        } else {
            return '';
        }
    }
    msg += readBody(rolldata.info);
    return msg + '```';
}

client.on('message', (message) => {
    //Check blacklist
    if (config.blacklist.includes(message.channel.id)) return;
    //Check for prefix
    else if (message.content.startsWith(config.prefix)) {
        //Removes prefix
        var msg = message.content.slice(config.prefix.length),
            rolldata = roll.parse(msg);
        //Collects the roll data, creates the reply, then sends it.
        message.channel.send(createRollReply(rolldata))
            .then(message => console.log(`Rolled up ${msg} for ${message.channel.name}`))
            .catch(console.error);
    } else if (message.content === '!!connect') {
        message.member.voiceChannel.join()
        .then((connection) => {
            sounds.connect(connection);
        });
    } else if (message.content === '!!leave') {
        var voiceConnection = client.voiceConnections.get(message.guild.id);
        if (voiceConnection) {
            voiceConnection.disconnect();
        }
    }
});