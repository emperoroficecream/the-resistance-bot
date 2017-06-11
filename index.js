

const messages = require('./messages');
const gameConfig = require('./gameconfig');
const { shout, whisperTo } = require('./comm');


let game_is_started = false;
let players = new Set();
let total_mission_record = [null, null, null, null, null];
let curr_attempts_for_mission_team = 0;
let num_players = 0;


// Register player handles
function validateNumberOfPlayers(n) {
    return n <= gameConfig.MAX_NUM_PLAYERS && n >= gameConfig.MIN_NUM_PLAYERS;
}

function validatePlayers(result, resolve, reject) {
    if (result.length > gameConfig.MAX_NUM_PLAYERS) {
        reject(messages.TOO_MANY_PLAYERS);
    } else if (result.length < gameConfig.MIN_NUM_PLAYERS) {
        reject(messages.TOO_FEW_PLAYERS);
    } else {
        resolve(result);
    }
}

function addPlayers(input) {
    for (let player of input) {
        players.add(player);
    }
    num_players = players.size;
    shout(messages.REGISTER_SUCCESS, Array.from(players).toString());
}

function registerPlayers() {
    shout(messages.REGISTER_PLAYERS);
    return new Promise((resolve, reject) => {
        process.stdin.once('data', (data) => {
            validatePlayers(data.toString().trim().split(' '), resolve, reject);
        });
    });
}

function start() {
    registerPlayers()
        .then((result) => {
            addPlayers(result);
        })
        .catch((e) => {
            shout(e);
            start();
        });
}

start();

module.exports = {
    registerPlayers,
    addPlayers
}




// registerPlayers();

// Give out identities

// Prompt mission team

// Vote for mission team

// If team nomination passes, prompt team members to dm mission vote

// If team nomination fails, prompt another nomination until 5 trials

// 

