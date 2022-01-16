# wordle-solver
Wordle Solver

Word List from https://en.lexipedia.org/
* 5 to 5 letters, minimum frequency 100, and not only wikitionary words

## How to use
In the non-interactive mode (only option right now), fill in the information in `tester.js`, and then run `node tester.js`.

## Files

`isValidWord.js` - function for determining if the word is valid based on the information we already have

`lexipedia_raw.txt` - file from https://en.lexipedia.org/, feel free to download your own and rename it to this for preprocessing (see below)

`lexipedia.json` - file generated from running `preprocessor.js`, based on `lexipedia_raw.txt`, it is all the words with some data extracted into a javascript readable format

`lexipediaProcessor.js` - functions for going through all the words in `lexipedia.json` and determining what the next best hint or answer might be

`preprocessor.js` - script for processing the `lexipedia_raw.txt`, and turning it into `lexipedia.json` , filters out invalid words and does calculates certain information up-front

`tester.js` - non-interactive file for determining the next best hint or answer
