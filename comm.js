// Replace with platform-specific communication API methods
const shout = function() {
    console.log.apply(console, Array.from(arguments));
}

const shoutAt = function(player, content) {
    let at = '';
    if (player instanceof Array) {
        player.forEach((p) => at += '@' + p);
    } else {
        at += '@' + player;
    }
    console.log('shout' + at, content);
}

const whisperTo = function(player, content) {
    let at = '';
    if (player instanceof Array) {
        player.forEach((p) => at += '@' + p);
    } else {
        at += '@' + player;
    }
    console.log('whisper' + at, content);
}

module.exports = {
    shout,
    shoutAt,
    whisperTo
}