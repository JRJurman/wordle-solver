// returns true if there are invalid letters in the word object
const hasInvalidLetters = (invalidLetters, wordLetters) => {
	// if the set union of both is smaller than the list, then there were common elements
	// e.g. [a,b,c] U [r,a,c,e] => [a,b,c,r,a,c,e] vs [a,b,c,r,e] => true
	// e.g. [a,b,c] U [h,e,l,p] => [a,b,c,h,e,l,p] vs [a,b,c,h,e,l,p] => false
	const bothUniqueLetters = [...invalidLetters, ...wordLetters]
	const setOfLetters = new Set(bothUniqueLetters)
	return bothUniqueLetters.length !== setOfLetters.size
}

const hasRequiredLetters = (requiredLetters, wordLetters) => {
	// if the set union of both is smaller than the list, then there were common elements
	// works the same as hasInvalidLetters
	// slightly different in that we check the difference in the size of the set vs the array
	// it should be exactly the size of the number of required letters
	const bothUniqueLetters = [...requiredLetters, ...wordLetters]
	const setOfLetters = new Set(bothUniqueLetters)
	return (bothUniqueLetters.length - setOfLetters.size) === requiredLetters.length
}

const slotToRegex = (slot) => {
	if (slot.is) return slot.is
	if (slot.not) return `[^${slot.not.join()}]`
	return '.'
}

const slotsObjectToRegexes = (slotsObject) => {
	return slotsObject.map(slotToRegex).join('')
}

// based on an information object, is this word still possible?
// information object type definition:
/*
information = {
	invalidLetters = ['a', 'b', 'c'],
	requiredLetters = ['e']
	slots = [{not: ['d']}, [{is: 'f'}] ...]
}
*/
const isValidWord = (information) => {
	// calculate regex pre-emptively
	const slotsRegex = slotsObjectToRegexes(information.slots)

	// function per-word
	return (wordObject) => {
		// if this word has any of the invalid letters, return false
		const isInvalid = hasInvalidLetters(information.invalidLetters, wordObject.u)
		if (isInvalid) return false

		// if the word does not contain any required letters, return false
		const isValid = hasRequiredLetters(information.requiredLetters, wordObject.u)
		if (!isValid) return false

		// if the word does not match the known slots information, return false
		const matchesSlots = wordObject.w.match(slotsRegex)
		if (!matchesSlots) return false

		return true
	}
}

module.exports = isValidWord
