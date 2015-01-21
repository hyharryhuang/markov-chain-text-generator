# markov-chain-text-generator
Node implementation of a Markov Chain Text Generator. Given a corpus, will generate a sentence in the style of the text based on a leading word.

Usage:
```javascript
var markov = require(./'markov.js');
var filename = 'corpus.txt'; //Name of text file to read from. 
var startingWord = 'MP'; //Starting word/words in a sentence. Currently will only look at the last word provided. 
var maxLengthChar = 500; //Max sentence character length

markov.generate(filename, startingWord, maxLengthChar, function(result) {
    console.log(result);
});
```
