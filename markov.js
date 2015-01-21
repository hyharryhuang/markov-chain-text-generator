var fs = require('fs');

var categorisedWords = {} //{w1 : [w2, w2, w3], w2 : [w3, w1, w5]}

function splitContentToWords(content) {
    var words = content
              // .replace(/[.,?!;()"'-]/g, " ") //replace all punctuation with spaces
              .replace(/\s+/g, " ") //condense spaces
              .split(" "); 

    return words;
}

function categoriseWords(words) {

	for(var i = 0; i < words.length; i++) {
        var lowercaseWord = words[i].toLowerCase(); //store word lowercase so we can do a case insensitive match later on.

		if(categorisedWords[lowercaseWord] === undefined) {
			categorisedWords[lowercaseWord] = [];
		}

		var wordAfterIndex = i + 1;

		if(wordAfterIndex < words.length) {
			var wordAfter = words[wordAfterIndex];

            categorisedWords[lowercaseWord].push(wordAfter);
		}
	}
}

function generateNextWordForWord(word) {
    var lowercaseWord = word.toLowerCase();

    if(categorisedWords[lowercaseWord] !== undefined && categorisedWords[lowercaseWord].length > 0) {
        var possibleNextWords = categorisedWords[lowercaseWord];
        return possibleNextWords[Math.floor(Math.random() * possibleNextWords.length)];
    } else
        return '';
}

function generateMarkovOutputWithWord(word, currentOutput, maxLengthChar) {
    if(word == '' || currentOutput.length > maxLengthChar)
        return currentOutput;

    if(currentOutput.length == 0)
        currentOutput += word;
    else
        currentOutput += (' ' + word);

    var nextWord = generateNextWordForWord(word);
    return generateMarkovOutputWithWord(nextWord, currentOutput);
}

exports.generate = function(corpusFilename, startingWords, maxLengthChar, callback) {
    fs.readFile(corpusFilename, 'utf8', function(err, data) {
        if (err) throw err;

        categoriseWords(splitContentToWords(data));
        var startingLastWordArray = startingWords.split(" ");
        var startingLastWord = startingLastWordArray[startingLastWordArray.length - 1];

        callback(generateMarkovOutputWithWord(startingLastWord, '', maxLengthChar));
    });
}