function displayMonthday() {
	return ordinalSuffixOf(Time.monthDay);
}
DefineMacroS("displayMonthday", displayMonthday);

/* Redundant - use Time.monthName */
// function month() {
// 	return Time.monthName.slice(0, 3);
// }
// DefineMacroS("month", month);

// eslint-disable-next-line no-var, no-unused-vars
const statDisplay = (() => {
	function grace(amount, expectedRank) {
		amount = Number(amount);
		if (amount && V.statdisable === "f") {
			let displayGrace = true;

			// Optional second variable is the rank of the NPC giving the order, or when the player is expected to meet a higher standard. Grace changes won't apply if the player's rank equals or exceeds the expected rank
			const ranks = ["prospective", "initiate", "monk", "priest", "bishop"];
			const playerRankValue = ranks.indexOf(V.temple_rank);
			const expectedRankValue = ranks.indexOf(expectedRank);

			if (expectedRankValue > 1) {
				if (playerRankValue >= expectedRankValue) displayGrace = false;

				// Below might be a more interesting way to handle it, remove the above line and uncomment the below to enable. Lollipop Scythe
				// Allows the player to gain grace in events only if they are below a certain rank
				// if (amount > 0 && playerRankValue >= expectedRankValue) displayGrace = false;

				// Allows the player to lose grace in events only if they are at or above a certain rank
				// if (amount < 0 && playerRankValue < expectedRankValue) displayGrace = false;
			}

			if (displayGrace) {
				if (amount > 0) {
					return ` | <span class="green"> ${"+ ".repeat(amount)} Grace</span>`;
				} else {
					return ` | <span class="red"> ${"- ".repeat(-amount)} Grace</span>`;
				}
			}
		}
		return "";
	}
	DefineMacroS("ggrace", expectedRank => grace(1, expectedRank));
	DefineMacroS("gggrace", expectedRank => grace(2, expectedRank));
	DefineMacroS("ggggrace", expectedRank => grace(3, expectedRank));
	DefineMacroS("lgrace", expectedRank => grace(-1, expectedRank));
	DefineMacroS("llgrace", expectedRank => grace(-2, expectedRank));
	DefineMacroS("lllgrace", expectedRank => grace(-3, expectedRank));

	return {};
})();
