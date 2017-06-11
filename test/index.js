const assert = require('assert');
const stdin = require('mock-stdin').stdin();

const bot = require('../index');
const messages = require('../messages');


describe('The bot', function() {
    beforeEach(function() {

    });
    describe('prompts players\'s names and', function() {
        it('registers the answer', function() {
            process.nextTick(function() {
                stdin.send('1 2 3 4 5');
            });
            return bot.registerPlayers()
                .then(function(result) {
                    assert.deepEqual(result, ['1', '2', '3', '4', '5']);
                })
        });
        it('complains about too few players', function() {
            process.nextTick(function() {
                stdin.send('1 2');
            });
            return bot.registerPlayers()
                .catch(function(e) {
                    assert.equal(e, messages.TOO_FEW_PLAYERS);
                })
        });
        it('complains about too many players', function() {
            process.nextTick(function() {
                stdin.send('1 2 3 4 5 6 7 8 9 10 11');
            });
            return bot.registerPlayers()
                .catch(function(e) {
                    assert.equal(e, messages.TOO_MANY_PLAYERS);
                })
        });
    });
});