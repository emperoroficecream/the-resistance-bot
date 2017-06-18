module.exports = {
    prompts: {
        REGISTER_PLAYERS: 'Who\'s playing?',
        ASSEMBLE_MISSION_TEAM: 'Now nominate your mission team',
        VOTE_FOR_MISSON_TEAM: 'Now vote for mission team candidates',
        NOMINATION_FAILED: 'Mission team nomination failed! Nominate again',
        CONDUCT_MISSION: 'Now you are conducting the mission',
    },
    confirmations: {
        REGISTER_SUCCESS: 'Okay! You are about to play the game: ',
        FIVE_NOMINATION_FAILURE: 'Five nomination failure! Spies won the game',
        NOMINATION_SUCCESS: 'Mission team nomination passed!',
        MISSION_FAILED: 'Mission failed!',
        MISSION_SUCCESS: 'Mission succeeded!',
    },
    errors: {
        TOO_MANY_PLAYERS: 'Too many players! Maximum number is 10.',
        TOO_FEW_PLAYERS: 'Too few players! Minimum number is 5.',
        NOMINATED_NON_PLAYER: 'This nominated person is not playing',
        NOMINATED_WRONG_NUMBER_OF_PEOPLE: 'Nominated wrong number!',  
        UNRECOGNIZED_RESPONSE: 'Please enter either y or n',   
    }
}