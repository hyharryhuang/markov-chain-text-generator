# markov-chain-text-generator
Node implementation of a Markov Chain Text Generator.

Usage:
```javascript
var markov = require(./'markov.js');
var filename = 'corpus.txt';
var startingWord = 'MP';
var maxLengthChar = 500;

markov.generate(filename, startingWord, maxLengthChar, function(result) {
    console.log(result);
});
```
