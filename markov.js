var fs = require('fs');
var filename = 'corpus.txt';
var startingWords = 'MP';
var maxLengthChar = 500;

//{w1 : [w2, w2, w3], w2 : [w3, w1, w5]}

var categorisedWords = {}

fs.readFile(filename, 'utf8', function(err, data) {
  if (err) throw err;

    categoriseWords(splitContentToWords(data));
    var startingLastWordArray = startingWords.split(" ");
    var startingLastWord = startingLastWordArray[startingLastWordArray.length - 1].toLowerCase();

    var content = generateMarkovOutputWithWord(startingLastWord, '');
    console.log(content);
});

function splitContentToWords(content) {
    var words = content
              // .replace(/[.,?!;()"'-]/g, " ") //replace all punctuation with spaces
              .replace(/\s+/g, " ") //condense spaces
              .toLowerCase() //lowercase, so we group same-case words together
              .split(" "); 

    return words;
}

function categoriseWords(words) {

	for(var i = 0; i < words.length; i++) {
		if(categorisedWords[words[i]] === undefined) {
			categorisedWords[words[i]] = [];
		}

		var wordAfterIndex = i + 1;

		if(wordAfterIndex < words.length) {
			var wordAfter = words[wordAfterIndex];

            categorisedWords[words[i]].push(wordAfter);
		}
	}
}

function generateNextWordForWord(word) {
    if(categorisedWords[word] !== undefined && categorisedWords[word].length > 0) {
        var possibleNextWords = categorisedWords[word];
        return possibleNextWords[Math.floor(Math.random() * possibleNextWords.length)];
    } else
        return '';
}

function generateMarkovOutputWithWord(word, currentOutput) {
    if(word == '' || currentOutput.length > maxLengthChar)
        return currentOutput;

    currentOutput += (' ' + word);

    var nextWord = generateNextWordForWord(word);
    return generateMarkovOutputWithWord(nextWord, currentOutput);
}