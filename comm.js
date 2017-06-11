// Replace with platform-specific communication API methods
const shout = function() {
    console.log.apply(console, Array.from(arguments));
}

const whisperTo = function(player, content) {
    console.log('@' + player, content);
    console.log.apply('@' + player, content);
}

module.exports = {
    shout,
    whisperTo
}