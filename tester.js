const LexipediaProcessor = require('./lexipediaProcessor')

const readlinePromises = require('readline/promises');
const cli = readlinePromises.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const information = ({
	invalidLetters: [],
	requiredLetters: [],
	slots: [
		{is: undefined, not: []},
		{is: undefined, not: []},
		{is: undefined, not: []},
		{is: undefined, not: []},
		{is: undefined, not: []}
	]
})

const runTester = async () => {

	while (true) {
		// post possible solutions
		const nextBestHint = LexipediaProcessor.nextBestHint(information) || {}
		console.log('next best hint:', `"${nextBestHint.w}"`, nextBestHint.p)

		const nextBestAnswer = LexipediaProcessor.nextBestAnswer(information) || {}
		console.log('next best answer:', `"${nextBestAnswer.w}"`, nextBestAnswer.p)

		// ask questions about the results
		const invalidLetters = await cli.question(`invalid letters? ${information.invalidLetters}: `)
		information.invalidLetters.push(...invalidLetters.split(''))

		const requiredLetters = await cli.question(`required letters? ${information.requiredLetters}: `)
		information.requiredLetters.push(...requiredLetters.split(''))

		const updateSlot = async (index) => {
			const slot = information.slots[index]
			if (!slot.is) {
				const slotUpdate = await cli.question(`slot ${index + 1} update? `)
				if (slotUpdate === '') return;
				const [command, letter] = slotUpdate.split(' ')
				if (command === 'not') { slot.not.push(letter) }
				if (command === 'is') { slot.is = letter }
			}
		}

		await updateSlot(0)
		await updateSlot(1)
		await updateSlot(2)
		await updateSlot(3)
		await updateSlot(4)

	}

}

runTester()
