/* Loads the lexipedia_raw.txt into useful json */

const fs = require('fs')

const lexipdeiaSource = fs.readFileSync('./lexipedia_raw.txt', 'utf8')
const lexipediaRows= lexipdeiaSource.split('\n')

const rowToWordObject = (row) => {
	const [word, letterCount, frequency, articles] = row.split(/\s+/)

	// for now, rate the popularity based on number of articles this word appears in
	const popularity = articles

	const uniqueLetters = [...new Set(word.split(''))]
	const numberOfUniqueLetters = uniqueLetters.length

	return {
		w: word, p: popularity, u: uniqueLetters, n: numberOfUniqueLetters
	}
}

const isValidWord = (row) => {
	const [word, letterCount, frequency, articles] = row.split(/\s+/)
	const saneRegex = /[a-z][a-z][a-z][a-z][a-z]/
	return word.match(saneRegex)
}

const processedLexipedia = lexipediaRows.filter(isValidWord).map(rowToWordObject)

fs.writeFileSync('./lexipedia.json', JSON.stringify(processedLexipedia))
