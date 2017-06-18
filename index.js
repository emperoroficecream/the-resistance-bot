

const { prompts, confirmations, errors } = require('./messages');
const gameConfig = require('./gameconfig');
const { shout, shoutAt, whisperTo } = require('./comm');
const sample = require('./sample');
const { validateInitialPlayers, validateMissionTeam, validateVote } = require('./validators');
const states = require('./states');


// Register player handles

function addPlayers(input) {
    for (let player of input) {
        states.players.push(player);
    }
    num_players = states.players.size;
    shout(confirmations.REGISTER_SUCCESS, Array.from(states.players).toString());
    return Promise.resolve(states.players);
}

function registerPlayers() {
    shout(prompts.REGISTER_PLAYERS);
    return new Promise((resolve, reject) => {
        process.stdin.once('data', (data) => {
            validateInitialPlayers(data, resolve, reject);
        });
    });
}

function letLeaderNominateMissionTeam(leader) {
    shoutAt(leader, prompts.ASSEMBLE_MISSION_TEAM);
    return new Promise((resolve, reject) => {
        process.stdin.once('data', (data) => {
            validateMissionTeam(data, resolve, reject);
        });
    });
}

function voteForMissionTeam(candidates) {
    let playerResponses = [];
    states.mission_team_candidates = candidates;
    states.players.forEach((player) => {
        shoutAt(player, prompts.VOTE_FOR_MISSON_TEAM);
        playerResponses.push(new Promise((resolve, reject) => {
            process.stdin.once('data', (data) => {
                validateVote(data, resolve, reject);
            })
        }));
    })
    return Promise.all(playerResponses);
}

function checkMissionTeamVotes(votes) {
    const yeses = votes.filter((vote) => vote === 'y').length;
    const noes = votes.length - yeses;
    states.curr_attempts_for_mission_team++;
    return new Promise((resolve, reject) => {
        if (yeses <= noes) {
            if (states.curr_attempts_for_mission_team === 5) {
                reject(confirmations.FIVE_NOMINATION_FAILURE);
            } else {
                reject(prompts.NOMINATION_FAILED);
            }
        } else {
            resolve(states.mission_team_candidates);
        }
    })
}

function checkMissionVotes(votes) {
    return new Promise((resolve, reject) => {
        if (votes.some((vote) => vote === 'n')) {
            reject(confirmations.MISSION_FAILED);
            states.missions[states.curr_round] = 0;
        } else {
            resolve(confirmations.MISSION_SUCCESS);
            states.missions[states.curr_round] = 1;
        }
    })  
}

function conductMission(mission_team) {
    shoutAt(mission_team, prompts.CONDUCT_MISSION);
    states.mission_team = mission_team;
    let missionTeamResponses = [];
    states.mission_team.forEach((member) => {
        missionTeamResponses.push(new Promise((resolve, reject) => {
            process.stdin.once('data', (data) => {
                validateVote(data, resolve, reject);
            })
        }));
    })
    return Promise.all(missionTeamResponses);
}

function getSpiesNumber(numMap, num_players) {
    let last;
    for (let nPlayer in numMap) {
        if (nPlayer >= num_players) {
            return numMap[nPlayer];
        }
    }
}

function checkGameEnd() {
    states.curr_round++;
    if (states.curr_round === 5) {
        // game ends
    } else {
        // start over
    }
}

function startRound() {
    // Get next leader

}


function chooseFirstLeader(players) {
    return Promise.resolve(sample(players, 1)[0]);
}

function chooseSpies(players) {
    return Promise.resolve(sample(players, getSpiesNumber(gameConfig.NUM_OF_SPIES, num_players)));
}

function start() {
    //         // Prompt mission team

    //         // Vote for mission team

    //         // If team nomination passes, prompt team members to dm mission vote

    //         // If team nomination fails, prompt another nomination until 5 trials

    registerPlayers()
        .then(addPlayers)
        .then((players) => {
            spies = chooseSpies(players);
            leader = chooseFirstLeader(players);
            return Promise.resolve(leader);
        })
        .then(letLeaderNominateMissionTeam)
        .then(voteForMissionTeam)
        .then(checkMissionTeamVotes)
        .then(conductMission)
        .then(checkMissionVotes)
        .then(checkGameEnd)
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
