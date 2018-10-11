//UI system used to play sound files through the bot
const fs = require('fs'),
      path = require('path'),
      readline = require('readline');
//Path to audio files.
const soundPath = '.\\data\\sounds';
//Creates terminal interface
const interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//Voice connection from discord client.
var voiceConnection = null;

exports.connect = function setConnection(connection) {
    voiceConnection = connection;
    console.log('Voice channel connected!');
    interface.prompt();
}

function playSound(filename) {
    //Makes sure there is a connection to play into first.
    if (!voiceConnection) {
        console.log('Voice connection not established!');
        interface.prompt();
        return null;
    }
    var filepath = path.join(soundPath, filename + '.wav');
    //Dispatches the audio stream if the file exists.
    var dispatch = fs.existsSync(filepath) ? voiceConnection.playFile(filepath) : null;
    if (!dispatch) {
        console.log(`File ${filepath} not found!`);
        interface.prompt();
        return null;
    } else {
        dispatch.on('end', (reason) => console.log(`Played ${filename}`));
        interface.prompt();
        return filepath;
    }
}
exports.play = playSound;
//Simple interface catch
interface.on('line', (input) => {
    playSound(input);
});