var markov = require('./markov.js');
var filename = 'corpus.txt';
var startingWord = 'MP';
var maxLengthChar = 500;

markov.generate(filename, startingWord, maxLengthChar, function(result) {
    console.log(result);
});