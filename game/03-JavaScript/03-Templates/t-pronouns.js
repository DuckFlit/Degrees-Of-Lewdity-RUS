function getHe() {
	switch (V.pronoun) {
		case "m":
			return "he";
		case "f":
			return "she";
		case "i":
			return "it";
		case "n":
			return "one";
		case "t":
			return "they";
		default:
			Errors.report(
				`Used ?${
					this.name
				} without selecting the NPC. Typically requires <<person1>>. ${Utils.GetStack()}`
			);
			return "they";
	}
}
/**
 * ?he - Returns the pronoun based on whatever $pronoun is set to.
 *		  Call ?he in TwineScript after calling <<person1>> to use.
 */
Template.add("he", getHe);
/** ?He - Capitalised version of above. */
Template.add("He", function () {
	return getHe.call(this).toUpperFirst();
});

function getHim() {
	switch (V.pronoun) {
		case "m":
			return "him";
		case "f":
			return "her";
		case "i":
			return "it";
		case "n":
		case "t":
			return "them";
		default:
			Errors.report(
				`Used ?${
					this.name
				} without selecting the NPC. Typically requires <<person1>>. ${Utils.GetStack()}`
			);
			return "them";
	}
}
/**
 * ?him - Returns the pronoun based on whatever $pronoun is set to.
 *		   Call ?him in TwineScript after calling <<person1>> to use.
 */
Template.add("him", getHim);
/** ?Him - Capitalised version of above. */
Template.add("Him", function () {
	return getHim.call(this).toUpperFirst();
});

function getHis() {
	switch (V.pronoun) {
		case "m":
			return "his";
		case "f":
			return "her";
		case "i":
			return "its";
		case "n":
			return "the";
		case "t":
			return "their";
		default:
			Errors.report(
				`Used ?${
					this.name
				} without selecting the NPC. Typically requires <<person1>>. ${Utils.GetStack()}`
			);
			return "their";
	}
}
/**
 * ?his - Returns the pronoun based on whatever $pronoun is set to.
 *		   Call ?his in TwineScript after calling <<person1>> to use.
 */
Template.add("his", getHis);
/** ?His - Capitalised version of above. */
Template.add("His", function () {
	return getHis.call(this).toUpperFirst();
});

function getHeIs() {
	switch (V.pronoun) {
		case "m":
			return "he's";
		case "f":
			return "she's";
		case "i":
			return "it's";
		case "n":
			return "one is";
		case "t":
			return "they are";
		default:
			Errors.report(
				`Used ?${
					this.name
				} without selecting the NPC. Typically requires <<person1>>. ${Utils.GetStack()}`
			);
			return "they are";
	}
}
/**
 * ?hes - Returns the pronoun based on whatever $pronoun is set to.
 *		   Call ?hes in TwineScript after calling <<person1>> to use.
 */
Template.add("hes", getHeIs);
/** ?Hes - Capitalised version of above. */
Template.add("Hes", function () {
	return getHeIs.call(this).toUpperFirst();
});

function getHers() {
	switch (V.pronoun) {
		case "m":
			return "his";
		case "f":
			return "hers";
		case "i":
			return "its";
		case "n":
			return "the";
		case "t":
			return "theirs";
		default:
			Errors.report(
				`Used ?${
					this.name
				} without selecting the NPC. Typically requires <<person1>>. ${Utils.GetStack()}`
			);
			return "theirs";
	}
}
/**
 * ?hers - Returns the pronoun based on whatever $pronoun is set to.
 *		   Call ?hers in TwineScript after calling <<person1>> to use.
 */
Template.add("hers", getHers);
/** ?Hers - Capitalised version of above. */
Template.add("Hers", function () {
	return getHers.call(this).toUpperFirst();
});

function getHimself() {
	switch (V.pronoun) {
		case "m":
			return "himself";
		case "i":
			return "itself";
		case "f":
		case "n":
		case "t":
			return "herself";
		default:
			Errors.report(
				`Used ?${
					this.name
				} without selecting the NPC. Typically requires <<person1>>. ${Utils.GetStack()}`
			);
			return "theirs";
	}
}
/**
 * ?himself - Returns the pronoun based on whatever $pronoun is set to.
 *		   Call ?himself in TwineScript after calling <<person1>> to use.
 */
Template.add("himself", getHimself);
/** ?Himself - Capitalised version of above. */
Template.add("Himself", function () {
	return getHimself.call(this).toUpperFirst();
});

function getPeople() {
	switch (V.malechance) {
		case 100:
			return "men";
		case 0:
			return "women";
		default:
			return "men and women";
	}
}
/**
 * ?people - Returns the pronoun based on whatever $pronoun is set to.
 *		   Call ?people in TwineScript after calling <<person1>> to use.
 */
Template.add("people", getPeople);
/** ?People - Capitalised version of above. */
Template.add("People", function () {
	return getPeople.call(this).toUpperFirst();
});

function getPeopleYoung() {
	switch (V.malechance) {
		case 100:
			return "boys";
		case 0:
			return "boys";
		default:
			return "boys and girls";
	}
}
/**
 * ?peopley - Returns the pronoun based on whatever $pronoun is set to.
 *		   Call ?peopley in TwineScript after calling <<person1>> to use.
 */
Template.add("peopley", getPeopleYoung);
/** ?Peopley - Capitalised version of above. */
Template.add("Peopley", function () {
	return getPeopleYoung.call(this).toUpperFirst();
});
