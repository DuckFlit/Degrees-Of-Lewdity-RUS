const setChildFirstWord = (childId, word, playerAbsent = false) => {
	if (!childId && V.childSelected) childId = V.childSelected.childId;
	if (!childId && !V.childSelected) return false;

	const child = V.children[childId];

	// First word already set
	if (child.localVariables.firstWord) return false;

	if (!word) {
		const wordList = ["mama", "mommy", "dada", "daddy", "papa", "no", "nana", "yes", "uh oh", "bye", "bye-bye", "hello"];

		// Should be last
		if (random(0, Math.ceil(2000 / wordList.length)) === 0) {
			wordList.push("Brouzouf");
		}
		word = wordList[random(0, wordList.length - 1)];
	}
	child.localVariables.firstWord = {
		word,
		date: { day: V.monthday, month: V.month.toUpperFirst(), year: V.year },
		playerAbsent,
	};
	return true;
};
DefineMacro("setChildFirstWord", setChildFirstWord);
