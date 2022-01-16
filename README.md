# wordle-solver
Wordle Solver

Special thanks to [@chordbug](https://twitter.com/chordbug) and their [hello wordl](https://foldr.moe/hello-wordl/#), which was used extensively for testing.

Word List from https://en.lexipedia.org/
* 5 to 5 letters, minimum frequency 100, and not only wikitionary words

## How to use
**Depends on Node 17**
Run `node tester.js`, and follow the prompts:
* First you'll always be given two answers, one based on the number of unique letters (good for initial guesses) and one based on popularity (good for final guess).
* Next, it'll ask you to enter any letters that are not in the word, you should type this with no punctuation (e.g. if 'f', 'i', and 'r', were not part of the word, write it as `fir`)
* Next, it'll ask you to enter any letters that are part of the word, you should type this the same as above - be sure to include any letters that were correct but in the wrong space
* Next, it'll ask you about each slot that has not already been resolved - type either `not _`, `is _` or simply hit the enter key.
* After that it loops, kill the program by hitting CTRL+C

## Files

`isValidWord.js` - function for determining if the word is valid based on the information we already have

`lexipedia_raw.txt` - file from https://en.lexipedia.org/, feel free to download your own and rename it to this for preprocessing (see below)

`lexipedia.json` - file generated from running `preprocessor.js`, based on `lexipedia_raw.txt`, it is all the words with some data extracted into a javascript readable format

`lexipediaProcessor.js` - functions for going through all the words in `lexipedia.json` and determining what the next best hint or answer might be

`preprocessor.js` - script for processing the `lexipedia_raw.txt`, and turning it into `lexipedia.json` , filters out invalid words and does calculates certain information up-front

`tester.js` - non-interactive file for determining the next best hint or answer
