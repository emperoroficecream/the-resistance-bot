const errors = require('./messages').errors;
const gameConfig = require('./gameconfig');
let { players, missions, curr_attempts_for_mission_team, spies, leader, curr_round } = require('./states');

// If given person is one of current players
function isPlayer(person) {
    return players.indexOf(person) !== -1; 
}

// Return true if given persons are all current players
// Return the first person that is not currently playing otherwise
function areCurrentPlayers(people) {
    return people.every(isPlayer);
}

function clean(result) {
    return result.toString().trim().split(' ');
}

function validateInitialPlayers(result, resolve, reject) {
    result = clean(result);
    if (result.length > gameConfig.MAX_NUM_PLAYERS) {
        reject(errors.TOO_MANY_PLAYERS);
    } else if (result.length < gameConfig.MIN_NUM_PLAYERS) {
        reject(errors.TOO_FEW_PLAYERS);
    } else {
        resolve(result);
    }
}

function validateMissionTeam(result, resolve, reject) {
    result = clean(result);

    if (!areCurrentPlayers(result)) {
        return reject(errors.NOMINATED_NON_PLAYER);
    }
    const num_players = players.length;
    const isRightNumber =  gameConfig.MISSION_TEAM_NUM_PLAYERS[num_players][curr_round] === result.length;
    if (!isRightNumber) {
        return reject(errors.NOMINATED_WRONG_NUMBER_OF_PEOPLE);
    }
    resolve(result);
}

function validateVote(result, resolve, reject) {
    result = result.toString().trim().toLowerCase();
    if (result === 'y' || result === 'n') {
        resolve(result);
    } else {
        reject(errors.UNRECOGNIZED_RESPONSE);
    }
}

module.exports = {
    validateInitialPlayers: validateInitialPlayers,
    validateMissionTeam: validateMissionTeam,
    validateVote: validateVote
}