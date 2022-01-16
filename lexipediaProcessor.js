const lexipedia = require('../lexipedia.json')
const isValidWord = require('../isValidWord')

// determine which word (based on unique letters) we should guess
// also consider popularity here, since this doesn't vary that much
const nextBestHint = (information) => {
	const sortBasedOnUntested = (wordObjectA, wordObjectB) => {
		const numberOfLettersDifference =  wordObjectB.n - wordObjectA.n
		if (numberOfLettersDifference === 0) {
			return wordObjectB.p - wordObjectA.p
		}
		return numberOfLettersDifference
	}
	// sort based on letters not tested
	const validWords = lexipedia.filter(isValidWord(information))
	validWords.sort(sortBasedOnUntested)
	return validWords[0]
}

// determine which word (based on popularity) we should guess
const nextBestAnswer = (information) => {
	const sortBasedOnPopularity = (wordObjectA, wordObjectB) => {
		return wordObjectB.p - wordObjectA.p
	}
	const validWords = lexipedia.filter(isValidWord(information))
	validWords.sort(sortBasedOnPopularity)
	return validWords[0]
}

module.exports = {
	nextBestHint,
	nextBestAnswer
}
