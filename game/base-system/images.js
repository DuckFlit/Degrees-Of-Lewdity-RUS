function gainSchoolStar(variable) {
	if (V.statdisable === "t") return;
	if (V.options.images === 1) {
		if (V[variable] + 1 === 3) {
			return `<img class="icon" src="img/ui/gold_star.png">`;
		} else if (V[variable] + 1 === 2) {
			return `<img class="icon" src="img/ui/silver_star.png">`;
		} else if (V[variable] + 1 === 1) {
			return `<img class="icon" src="img/ui/bronze_star.png">`;
		}
	} else {
		if (V[variable] + 1 === 3) {
			return `<span class="gold">Gold Star</span>`;
		} else if (V[variable] + 1 === 2) {
			return `<span class="platinum">Silver Star</span>`;
		} else if (V[variable] + 1 === 1) {
			return `<span class="brown">Bronze Star</span>`;
		}
	}
	return "";
}
window.gainSchoolStar = gainSchoolStar;

function schoolStar(variable) {
	if (V.options.images === 1) {
		if (V[variable] >= 3) {
			return `<img class="icon" src="img/ui/gold_star.png">`;
		} else if (V[variable] === 2) {
			return `<img class="icon" src="img/ui/silver_star.png">`;
		} else if (V[variable] === 1) {
			return `<img class="icon" src="img/ui/bronze_star.png">`;
		} else {
			return `<img class="icon" src="img/ui/empty_star.png">`;
		}
	} else {
		return `<span class="platinum">${V[variable]} / 3 stars</span>`;
	}
}
window.schoolStar = schoolStar;

DefineMacroS("g_science_star", () => gainSchoolStar("science_star"));
DefineMacroS("science_star", () => schoolStar("science_star"));
DefineMacroS("g_maths_star", () => gainSchoolStar("maths_star"));
DefineMacroS("maths_star", () => schoolStar("maths_star"));
DefineMacroS("g_english_star", () => gainSchoolStar("english_star"));
DefineMacroS("english_star", () => schoolStar("english_star"));
DefineMacroS("g_history_star", () => gainSchoolStar("history_star"));
DefineMacroS("history_star", () => schoolStar("history_star"));
