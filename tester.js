const LexipediaProcessor = require('./lexipediaProcessor')

/* empty state
const information = ({
	invalidLetters: [],
	requiredLetters: [],
	slots: [{}, {}, {}, {}, {}]
})
*/

const information = ({
	invalidLetters: ['f', 'i', 't', 'y', 'a', 'o', 'l'],
	requiredLetters: ['r', 's', 'e'],
	slots: [{not: ['r']}, {not: ['e']}, {not: ['r']}, {is: 'e'}, {is: 's'}]
})

console.log('calculate next best answer: ', LexipediaProcessor.nextBestAnswer(information))
console.log('calculate next best hint: ', LexipediaProcessor.nextBestHint(information))
