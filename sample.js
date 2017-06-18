module.exports = function(array, n) {
    // Convert from a set to array if necessary
    array = (array instanceof Set) ? [...array] : array;
    // First shuffle
    let shuffled = array.slice(0), i = array.length, temp, sampledIndex;
    while (i--) {
        sampledIndex = Math.floor((i + 1) * Math.random());
        temp = shuffled[sampledIndex];
        shuffled[sampledIndex] = shuffled[i];
        shuffled[i] = temp;

    }
    return shuffled.slice(0, n);
}