/* eslint-disable no-undef */
const statDisplay = {
	statChange(statType, amount, colorClass, condition = () => true) {
		amount = Number(amount);
		if (V.statdisable === "t" || !condition()) return document.createDocumentFragment();

		const fragment = document.createDocumentFragment();
		const span = document.createElement("span");
		span.className = colorClass;
		const prefix = amount < 0 ? "- " : "+ ";

		span.textContent = `${prefix.repeat(Math.abs(amount))}${statType}`;
		fragment.appendChild(document.createTextNode(" | "));
		fragment.appendChild(span);

		return fragment;
	},
	grace(amount, expectedRank) {
		amount = Number(amount);
		if (!amount || V.statdisable === "t") return "";

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
		}

		if (displayGrace) {
			return statDisplay.statChange("Grace", amount, amount > 0 ? "green" : "red");
		}
		return "";
	},
	create(name, fn) {
		if (this[name] === undefined && !Macro.get(name)) {
			DefineMacro(name, function () {
				this.output.append(fn(...this.args));
			});
			this[name] = fn;
		} else {
			console.error(`A function with the name "${name}" already exists in statDisplay.`);
		}
	},
};
window.statDisplay = statDisplay;

statDisplay.create("lgrace", expectedRank => statDisplay.grace(-1, expectedRank));
statDisplay.create("llgrace", expectedRank => statDisplay.grace(-2, expectedRank));
statDisplay.create("lllgrace", expectedRank => statDisplay.grace(-3, expectedRank));
statDisplay.create("ggrace", expectedRank => statDisplay.grace(1, expectedRank));
statDisplay.create("gggrace", expectedRank => statDisplay.grace(2, expectedRank));
statDisplay.create("ggggrace", expectedRank => statDisplay.grace(3, expectedRank));

statDisplay.create("lstress", () => statDisplay.statChange("Stress", -1, "green"));
statDisplay.create("llstress", () => statDisplay.statChange("Stress", -2, "green"));
statDisplay.create("lllstress", () => statDisplay.statChange("Stress", -3, "green"));
statDisplay.create("gstress", () => statDisplay.statChange("Stress", 1, "red"));
statDisplay.create("ggstress", () => statDisplay.statChange("Stress", 2, "red"));
statDisplay.create("gggstress", () => statDisplay.statChange("Stress", 3, "red"));

statDisplay.create("ltiredness", () => statDisplay.statChange("Fatigue", -1, "green"));
statDisplay.create("lltiredness", () => statDisplay.statChange("Fatigue", -2, "green"));
statDisplay.create("llltiredness", () => statDisplay.statChange("Fatigue", -3, "green"));
statDisplay.create("gtiredness", () => statDisplay.statChange("Fatigue", 1, "red"));
statDisplay.create("ggtiredness", () => statDisplay.statChange("Fatigue", 2, "red"));
statDisplay.create("gggtiredness", () => statDisplay.statChange("Fatigue", 3, "red"));

statDisplay.create("larousal", () => statDisplay.statChange("Arousal", -1, "green"));
statDisplay.create("llarousal", () => statDisplay.statChange("Arousal", -2, "green"));
statDisplay.create("lllarousal", () => statDisplay.statChange("Arousal", -3, "green"));
statDisplay.create("garousal", () => statDisplay.statChange("Arousal", 1, "red"));
statDisplay.create("ggarousal", () => statDisplay.statChange("Arousal", 2, "red"));
statDisplay.create("gggarousal", () => statDisplay.statChange("Arousal", 3, "red"));

statDisplay.create("ltrauma", () => statDisplay.statChange("Trauma", -1, "green"));
statDisplay.create("lltrauma", () => statDisplay.statChange("Trauma", -2, "green"));
statDisplay.create("llltrauma", () => statDisplay.statChange("Trauma", -3, "green"));
statDisplay.create("gtrauma", () => statDisplay.statChange("Trauma", 1, "red"));
statDisplay.create("ggtrauma", () => statDisplay.statChange("Trauma", 2, "red"));
statDisplay.create("gggtrauma", () => statDisplay.statChange("Trauma", 3, "red"));

statDisplay.create("llewdity", () => statDisplay.statChange("Lewdity", -1, "lewd"));
statDisplay.create("lllewdity", () => statDisplay.statChange("Lewdity", -2, "lewd"));
statDisplay.create("llllewdity", () => statDisplay.statChange("Lewdity", -3, "lewd"));
statDisplay.create("glewdity", () => statDisplay.statChange("Lewdity", 1, "lewd"));
statDisplay.create("gglewdity", () => statDisplay.statChange("Lewdity", 2, "lewd"));
statDisplay.create("ggglewdity", () => statDisplay.statChange("Lewdity", 3, "lewd"));

statDisplay.create("lpain", () => statDisplay.statChange("Pain", -1, "green"));
statDisplay.create("llpain", () => statDisplay.statChange("Pain", -2, "green"));
statDisplay.create("lllpain", () => statDisplay.statChange("Pain", -3, "green"));
statDisplay.create("gpain", () => statDisplay.statChange("Pain", 1, "red"));
statDisplay.create("ggpain", () => statDisplay.statChange("Pain", 2, "red"));
statDisplay.create("gggpain", () => statDisplay.statChange("Pain", 3, "red"));

statDisplay.create("lpurity", () => statDisplay.statChange("Purity", -1, "red"));
statDisplay.create("llpurity", () => statDisplay.statChange("Purity", -2, "red"));
statDisplay.create("lllpurity", () => statDisplay.statChange("Purity", -3, "red"));
statDisplay.create("gpurity", () => statDisplay.statChange("Purity", 1, "green"));
statDisplay.create("ggpurity", () => statDisplay.statChange("Purity", 2, "green"));
statDisplay.create("gggpurity", () => statDisplay.statChange("Purity", 3, "green"));

statDisplay.create("ldelinquency", () => statDisplay.statChange("Delinquency", -1, "green"));
statDisplay.create("lldelinquency", () => statDisplay.statChange("Delinquency", -2, "green"));
statDisplay.create("llldelinquency", () => statDisplay.statChange("Delinquency", -3, "green"));
statDisplay.create("gdelinquency", () => statDisplay.statChange("Delinquency", 1, "red"));
statDisplay.create("ggdelinquency", () => statDisplay.statChange("Delinquency", 2, "red"));
statDisplay.create("gggdelinquency", () => statDisplay.statChange("Delinquency", 3, "red"));

statDisplay.create("lcool", () => statDisplay.statChange("Status", -1, "red"));
statDisplay.create("llcool", () => statDisplay.statChange("Status", -2, "red"));
statDisplay.create("lllcool", () => statDisplay.statChange("Status", -3, "red"));
statDisplay.create("gcool", () => statDisplay.statChange("Status", 1, "green"));
statDisplay.create("ggcool", () => statDisplay.statChange("Status", 2, "green"));
statDisplay.create("gggcool", () => statDisplay.statChange("Status", 3, "green"));

statDisplay.create("lsaltiness", () => statDisplay.statChange("Saltiness", -1, "red"));
statDisplay.create("llsaltiness", () => statDisplay.statChange("Saltiness", -2, "red"));
statDisplay.create("lllsaltiness", () => statDisplay.statChange("Saltiness", -3, "red"));
statDisplay.create("gsaltiness", () => statDisplay.statChange("Saltiness", 1, "green"));
statDisplay.create("ggsaltiness", () => statDisplay.statChange("Saltiness", 2, "green"));
statDisplay.create("gggsaltiness", () => statDisplay.statChange("Saltiness", 3, "green"));

statDisplay.create("lchaos", () => statDisplay.statChange("Chaos", -1, "red"));
statDisplay.create("llchaos", () => statDisplay.statChange("Chaos", -2, "red"));
statDisplay.create("lllchaos", () => statDisplay.statChange("Chaos", -3, "red"));
statDisplay.create("gchaos", () => statDisplay.statChange("Chaos", 1, "green"));
statDisplay.create("ggchaos", () => statDisplay.statChange("Chaos", 2, "green"));
statDisplay.create("gggchaos", () => statDisplay.statChange("Chaos", 3, "green"));

statDisplay.create("ltrust", () => statDisplay.statChange("Trust", -1, "red"));
statDisplay.create("lltrust", () => statDisplay.statChange("Trust", -2, "red"));
statDisplay.create("llltrust", () => statDisplay.statChange("Trust", -3, "red"));
statDisplay.create("gtrust", () => statDisplay.statChange("Trust", 1, "green"));
statDisplay.create("ggtrust", () => statDisplay.statChange("Trust", 2, "green"));
statDisplay.create("gggtrust", () => statDisplay.statChange("Trust", 3, "green"));

statDisplay.create("loxygen", () => statDisplay.statChange("Oxygen", -1, "blue"));
statDisplay.create("goxygen", () => statDisplay.statChange("Oxygen", 1, "teal"));

statDisplay.create("lcontrol", () => statDisplay.statChange("Control", -1, "red"));
statDisplay.create("llcontrol", () => statDisplay.statChange("Control", -2, "red"));
statDisplay.create("lllcontrol", () => statDisplay.statChange("Control", -3, "red"));
statDisplay.create("gcontrol", () => statDisplay.statChange("Control", 1, "green"));
statDisplay.create("ggcontrol", () => statDisplay.statChange("Control", 2, "green"));
statDisplay.create("gggcontrol", () => statDisplay.statChange("Control", 3, "green"));
statDisplay.create("lcombatcontrol", () => statDisplay.statChange("Control", -1, "red"));
statDisplay.create("llcombatcontrol", () => statDisplay.statChange("Control", -2, "red"));
statDisplay.create("lllcombatcontrol", () => statDisplay.statChange("Control", -3, "red"));
statDisplay.create("gcombatcontrol", () => statDisplay.statChange("Control", 1, "green", () => V.control < V.controlstart));
statDisplay.create("ggcombatcontrol", () => statDisplay.statChange("Control", 2, "green", () => V.control < V.controlstart));
statDisplay.create("gggcombatcontrol", () => statDisplay.statChange("Control", 3, "green", () => V.control < V.controlstart));

statDisplay.create("gmystery", () => statDisplay.statChange("????", 1, "red"));
statDisplay.create("gschool", () => statDisplay.statChange("School", 1, "green"));

statDisplay.create("gswimming", () => statDisplay.statChange("Swimming", 1, "green"));
statDisplay.create("ggswimming", () => statDisplay.statChange("Swimming", 2, "green"));
statDisplay.create("gggswimming", () => statDisplay.statChange("Swimming", 3, "green"));

statDisplay.create("gathletics", () => statDisplay.statChange("Athletics", 1, "green"));
statDisplay.create("ggathletics", () => statDisplay.statChange("Athletics", 2, "green"));
statDisplay.create("gggathletics", () => statDisplay.statChange("Athletics", 3, "green"));

statDisplay.create("gdanceskill", () => statDisplay.statChange("Dance skill", 1, "green"));
statDisplay.create("ggdanceskill", () => statDisplay.statChange("Dance skill", 2, "green"));
statDisplay.create("gggdanceskill", () => statDisplay.statChange("Dance skill", 3, "green"));

statDisplay.create("gtending", () => statDisplay.statChange("Tending", 1, "green"));
statDisplay.create("ggtending", () => statDisplay.statChange("Tending", 2, "green"));
statDisplay.create("gggtending", () => statDisplay.statChange("Tending", 3, "green"));

statDisplay.create("ltreasure", () => statDisplay.statChange("Decreases chance of finding treasure", 0, "purple"));
statDisplay.create("gtreasure", () => statDisplay.statChange("Increases chance of finding treasure", 0, "green"));

statDisplay.create("lharass", () => statDisplay.statChange("Decreases chance of harassment", 0, "teal"));
statDisplay.create("gharass", () => statDisplay.statChange("Increases chance of harassment", 0, "pink"));
statDisplay.create("noharass", () => statDisplay.statChange("No chance of harassment", 0, "green"));

statDisplay.create("llove", npc => statDisplay.statChange(npc ? `${npc}'s Love` : "Love", -1, "red"));
statDisplay.create("lllove", npc => statDisplay.statChange(npc ? `${npc}'s Love` : "Love", -2, "red"));
statDisplay.create("llllove", npc => statDisplay.statChange(npc ? `${npc}'s Love` : "Love", -3, "red"));
statDisplay.create("glove", npc => statDisplay.statChange(npc ? `${npc}'s Love` : "Love", 1, "green"));
statDisplay.create("gglove", npc => statDisplay.statChange(npc ? `${npc}'s Love` : "Love", 2, "green"));
statDisplay.create("ggglove", npc => statDisplay.statChange(npc ? `${npc}'s Love` : "Love", 3, "green"));

statDisplay.create("llust", npc => statDisplay.statChange(npc ? `${npc}'s Lust` : "Lust", -1, "teal"));
statDisplay.create("lllust", npc => statDisplay.statChange(npc ? `${npc}'s Lust` : "Lust", -2, "teal"));
statDisplay.create("llllust", npc => statDisplay.statChange(npc ? `${npc}'s Lust` : "Lust", -3, "teal"));
statDisplay.create("glust", npc => statDisplay.statChange(npc ? `${npc}'s Lust` : "Lust", 1, "lewd"));
statDisplay.create("gglust", npc => statDisplay.statChange(npc ? `${npc}'s Lust` : "Lust", 2, "lewd"));
statDisplay.create("ggglust", npc => statDisplay.statChange(npc ? `${npc}'s Lust` : "Lust", 3, "lewd"));

statDisplay.create("lrtrauma", override => statDisplay.statChange("Robin's Trauma", -1, "green", () => C.npc.Robin.trauma > 0 || override));
statDisplay.create("llrtrauma", override => statDisplay.statChange("Robin's Trauma", -2, "green", () => C.npc.Robin.trauma > 0 || override));
statDisplay.create("lllrtrauma", override => statDisplay.statChange("Robin's Trauma", -3, "green", () => C.npc.Robin.trauma > 0 || override));
statDisplay.create("grtrauma", override => statDisplay.statChange("Robin's Trauma", 1, "red", () => C.npc.Robin.trauma >= 20 || override));
statDisplay.create("ggrtrauma", override => statDisplay.statChange("Robin's Trauma", 2, "red", () => C.npc.Robin.trauma >= 20 || override));
statDisplay.create("gggrtrauma", override => statDisplay.statChange("Robin's Trauma", 3, "red", () => C.npc.Robin.trauma >= 20 || override));

statDisplay.create("lattention", () => statDisplay.statChange("Attention", -1, "lewd"));
statDisplay.create("llattention", () => statDisplay.statChange("Attention", -2, "lewd"));
statDisplay.create("lllattention", () => statDisplay.statChange("Attention", -3, "lewd"));
statDisplay.create("gattention", loc => statDisplay.statChange("Attention", 1, "lewd", () => !loc || (loc === "prison" && !V.daily.prison.attentionDay)));
statDisplay.create("ggattention", loc => statDisplay.statChange("Attention", 2, "lewd", () => !loc || (loc === "prison" && !V.daily.prison.attentionDay)));
statDisplay.create("gggattention", loc => statDisplay.statChange("Attention", 3, "lewd", () => !loc || (loc === "prison" && !V.daily.prison.attentionDay)));

statDisplay.create("laggro", () => statDisplay.statChange("Remy's Encroachment", -1, "green", () => V.farm));
statDisplay.create("llaggro", () => statDisplay.statChange("Remy's Encroachment", -2, "green", () => V.farm));
statDisplay.create("lllaggro", () => statDisplay.statChange("Remy's Encroachment", -3, "green", () => V.farm));
statDisplay.create("gaggro", () => statDisplay.statChange("Remy's Encroachment", 1, "red", () => V.farm));
statDisplay.create("ggaggro", () => statDisplay.statChange("Remy's Encroachment", 2, "red", () => V.farm));
statDisplay.create("gggaggro", () => statDisplay.statChange("Remy's Encroachment", 3, "red", () => V.farm));

statDisplay.create("lksuspicion", () => statDisplay.statChange("Jealousy", -1, "green"));
statDisplay.create("llksuspicion", () => statDisplay.statChange("Jealousy", -2, "green"));
statDisplay.create("lllksuspicion", () => statDisplay.statChange("Jealousy", -3, "green"));
statDisplay.create("gksuspicion", () => statDisplay.statChange("Jealousy", 1, "red"));
statDisplay.create("ggksuspicion", () => statDisplay.statChange("Jealousy", 2, "red"));
statDisplay.create("gggksuspicion", () => statDisplay.statChange("Jealousy", 3, "red"));

statDisplay.create("lsuspicion", () => statDisplay.statChange("Suspicion", -1, "green"));
statDisplay.create("llsuspicion", () => statDisplay.statChange("Suspicion", -2, "green"));
statDisplay.create("lllsuspicion", () => statDisplay.statChange("Suspicion", -3, "green"));
statDisplay.create("gsuspicion", () => statDisplay.statChange("Suspicion", 1, "red"));
statDisplay.create("ggsuspicion", () => statDisplay.statChange("Suspicion", 2, "red"));
statDisplay.create("gggsuspicion", () => statDisplay.statChange("Suspicion", 3, "red"));

statDisplay.create("larage", () => statDisplay.statChange("Rage", -1, "green", () => V.averyragerevealed));
statDisplay.create("llarage", () => statDisplay.statChange("Rage", -2, "green", () => V.averyragerevealed));
statDisplay.create("lllarage", () => statDisplay.statChange("Rage", -3, "green", () => V.averyragerevealed));
statDisplay.create("garage", () => statDisplay.statChange("Rage", 1, "red", () => V.averyragerevealed));
statDisplay.create("ggarage", () => statDisplay.statChange("Rage", 2, "red", () => V.averyragerevealed));
statDisplay.create("gggarage", () => statDisplay.statChange("Rage", 3, "red", () => V.averyragerevealed));

statDisplay.create("lendear", () => statDisplay.statChange("Endearment", -1, "pink"));
statDisplay.create("llendear", () => statDisplay.statChange("Endearment", -2, "pink"));
statDisplay.create("lllendear", () => statDisplay.statChange("Endearment", -3, "pink"));
statDisplay.create("gendear", () => statDisplay.statChange("Endearment", 1, "teal"));
statDisplay.create("ggendear", () => statDisplay.statChange("Endearment", 2, "teal"));
statDisplay.create("gggendear", () => statDisplay.statChange("Endearment", 3, "teal"));

statDisplay.create("lhope", () => statDisplay.statChange("Hope", -1, "pink"));
statDisplay.create("llhope", () => statDisplay.statChange("Hope", -2, "pink"));
statDisplay.create("lllhope", () => statDisplay.statChange("Hope", -3, "pink"));
statDisplay.create("ghope", () => statDisplay.statChange("Hope", 1, "teal"));
statDisplay.create("gghope", () => statDisplay.statChange("Hope", 2, "teal"));
statDisplay.create("ggghope", () => statDisplay.statChange("Hope", 3, "teal"));

statDisplay.create("lreb", () => statDisplay.statChange("Rebelliousness", -1, "blue"));
statDisplay.create("llreb", () => statDisplay.statChange("Rebelliousness", -2, "blue"));
statDisplay.create("lllreb", () => statDisplay.statChange("Rebelliousness", -3, "blue"));
statDisplay.create("greb", () => statDisplay.statChange("Rebelliousness", 1, "def"));
statDisplay.create("ggreb", () => statDisplay.statChange("Rebelliousness", 2, "def"));
statDisplay.create("gggreb", () => statDisplay.statChange("Rebelliousness", 3, "def"));

statDisplay.create("ghandskill", () => statDisplay.statChange("Hand skill", 1, "green"));
statDisplay.create("goralskill", () => statDisplay.statChange("Oral skill", 1, "green"));
statDisplay.create("gthighskill", () => statDisplay.statChange("Thigh skill", 1, "green"));
statDisplay.create("gbottomskill", () => statDisplay.statChange("Ass skill", 1, "green"));
statDisplay.create("gvaginalskill", () => statDisplay.statChange("Vaginal skill", 1, "green"));
statDisplay.create("gpenileskill", () => statDisplay.statChange("Penile skill", 1, "green"));
statDisplay.create("ganalskill", () => statDisplay.statChange("Anal skill", 1, "green"));
statDisplay.create("gfeetskill", () => statDisplay.statChange("Feet skill", 1, "green"));
statDisplay.create("gchestskill", () => statDisplay.statChange("Chest skill", 1, "green"));

statDisplay.create("lstockholm", () => statDisplay.statChange("Stockholm Syndrome", -1, "lblue"));
statDisplay.create("llstockholm", () => statDisplay.statChange("Stockholm Syndrome", -2, "lblue"));
statDisplay.create("lllstockholm", () => statDisplay.statChange("Stockholm Syndrome", -3, "lblue"));
statDisplay.create("gstockholm", () => statDisplay.statChange("Stockholm Syndrome", 1, "blue"));
statDisplay.create("ggstockholm", () => statDisplay.statChange("Stockholm Syndrome", 2, "blue"));
statDisplay.create("gggstockholm", () => statDisplay.statChange("Stockholm Syndrome", 3, "blue"));

statDisplay.create("lshame", () => statDisplay.statChange("Shame", -1, "green"));
statDisplay.create("llshame", () => statDisplay.statChange("Shame", -2, "green"));
statDisplay.create("lllshame", () => statDisplay.statChange("Shame", -3, "green"));
statDisplay.create("gshame", () => statDisplay.statChange("Shame", 1, "red"));
statDisplay.create("ggshame", () => statDisplay.statChange("Shame", 2, "red"));
statDisplay.create("gggshame", () => statDisplay.statChange("Shame", 3, "red"));

statDisplay.create("lfarm", () => statDisplay.statChange("Farm yield", -1, "red"));
statDisplay.create("llfarm", () => statDisplay.statChange("Farm yield", -2, "red"));
statDisplay.create("lllfarm", () => statDisplay.statChange("Farm yield", -3, "red"));
statDisplay.create("gfarm", () => statDisplay.statChange("Farm yield", 1, "green"));
statDisplay.create("ggfarm", () => statDisplay.statChange("Farm yield", 2, "green"));
statDisplay.create("gggfarm", () => statDisplay.statChange("Farm yield", 3, "green"));

statDisplay.create("gnet", () => statDisplay.statChange("Net proficiency", 1, "green"));
statDisplay.create("gbaton", () => statDisplay.statChange("Baton proficiency", 1, "green"));
statDisplay.create("ggbaton", () => statDisplay.statChange("Baton proficiency", 2, "green"));
statDisplay.create("gggbaton", () => statDisplay.statChange("Baton proficiency", 3, "green"));
statDisplay.create("gwhip", () => statDisplay.statChange("Whip proficiency", 1, "green"));
statDisplay.create("ggwhip", () => statDisplay.statChange("Whip proficiency", 2, "green"));
statDisplay.create("gggwhip", () => statDisplay.statChange("Whip proficiency", 3, "green"));

statDisplay.create("lsecurity", () => statDisplay.statChange("Security", -1, "green"));
statDisplay.create("llsecurity", () => statDisplay.statChange("Security", -2, "green"));
statDisplay.create("lllsecurity", () => statDisplay.statChange("Security", -3, "green"));
statDisplay.create("gsecurity", () => statDisplay.statChange("Security", 1, "red"));
statDisplay.create("ggsecurity", () => statDisplay.statChange("Security", 2, "red"));
statDisplay.create("gggsecurity", () => statDisplay.statChange("Security", 3, "red"));

statDisplay.create("limpatience", () => statDisplay.statChange("Impatience", -1, "green"));
statDisplay.create("llimpatience", () => statDisplay.statChange("Impatience", -2, "green"));
statDisplay.create("lllimpatience", () => statDisplay.statChange("Impatience", -3, "green"));
statDisplay.create("gimpatience", () => statDisplay.statChange("Impatience", 1, "red"));
statDisplay.create("ggimpatience", () => statDisplay.statChange("Impatience", 2, "red"));
statDisplay.create("gggimpatience", () => statDisplay.statChange("Impatience", 3, "red"));

statDisplay.create("linterest", () => statDisplay.statChange("Interest", -1, "red"));
statDisplay.create("llinterest", () => statDisplay.statChange("Interest", -2, "red"));
statDisplay.create("lllinterest", () => statDisplay.statChange("Interest", -3, "red"));
statDisplay.create("ginterest", () => statDisplay.statChange("Interest", 1, "green"));
statDisplay.create("gginterest", () => statDisplay.statChange("Interest", 2, "green"));
statDisplay.create("ggginterest", () => statDisplay.statChange("Interest", 3, "green"));

statDisplay.create("ldaring", () => statDisplay.statChange("Daring", -1, "red"));
statDisplay.create("lldaring", () => statDisplay.statChange("Daring", -2, "red"));
statDisplay.create("llldaring", () => statDisplay.statChange("Daring", -3, "red"));
statDisplay.create("gdaring", () => statDisplay.statChange("Daring", 1, "green"));
statDisplay.create("ggdaring", () => statDisplay.statChange("Daring", 2, "green"));
statDisplay.create("gggdaring", () => statDisplay.statChange("Daring", 3, "green"));

statDisplay.create("gknowledge", () => statDisplay.statChange("Knowledge", 1, "green"));
statDisplay.create("gbodywriting", () => statDisplay.statChange("Bodywriting", 1, "purple"));
statDisplay.create("ggbodywriting", () => statDisplay.statChange("Bodywriting", 2, "purple"));
statDisplay.create("gggbodywriting", () => statDisplay.statChange("Bodywriting", 3, "purple"));
statDisplay.create("ghallucinogens", () => statDisplay.statChange("Hallucinogens", 1, "lewd"));
statDisplay.create("gghallucinogens", () => statDisplay.statChange("Hallucinogens", 2, "lewd"));
statDisplay.create("ggghallucinogens", () => statDisplay.statChange("Hallucinogens", 3, "lewd"));

statDisplay.create("lobey", () => statDisplay.statChange("Obedience", -1, "red"));
statDisplay.create("llobey", () => statDisplay.statChange("Obedience", -2, "red"));
statDisplay.create("lllobey", () => statDisplay.statChange("Obedience", -3, "red"));
statDisplay.create("gobey", () => statDisplay.statChange("Obedience", 1, "pink"));
statDisplay.create("ggobey", () => statDisplay.statChange("Obedience", 2, "pink"));
statDisplay.create("gggobey", () => statDisplay.statChange("Obedience", 3, "pink"));

statDisplay.create("lhunger", () => statDisplay.statChange("Hunger", -1, "green"));
statDisplay.create("llhunger", () => statDisplay.statChange("Hunger", -2, "green"));
statDisplay.create("lllhunger", () => statDisplay.statChange("Hunger", -3, "green"));
statDisplay.create("ghunger", () => statDisplay.statChange("Hunger", 1, "red"));
statDisplay.create("gghunger", () => statDisplay.statChange("Hunger", 2, "red"));
statDisplay.create("ggghunger", () => statDisplay.statChange("Hunger", 3, "red"));

statDisplay.create("gacceptance", () => statDisplay.statChange("Acceptance", 1, "green"));
statDisplay.create("ginsecurity", type => {
	if (type === "breasts_tiny" && V.player.gender === "f") return "";
	if (V["acceptance_" + type] <= 999) return statDisplay.statChange("Insecurity", 1, "red");
	return "";
});

statDisplay.create("gwillpower", () => statDisplay.statChange("Willpower", 1, "green"));
statDisplay.create("ggwillpower", () => statDisplay.statChange("Willpower", 2, "green"));
statDisplay.create("gggwillpower", () => statDisplay.statChange("Willpower", 3, "green"));

statDisplay.create("lphysique", () => statDisplay.statChange("Physique", -1, "red"));
statDisplay.create("llphysique", () => statDisplay.statChange("Physique", -2, "red"));
statDisplay.create("lllphysique", () => statDisplay.statChange("Physique", -3, "red"));
statDisplay.create("gphysique", () => statDisplay.statChange("Physique", 1, "green"));
statDisplay.create("ggphysique", () => statDisplay.statChange("Physique", 2, "green"));
statDisplay.create("gggphysique", () => statDisplay.statChange("Physique", 3, "green"));

statDisplay.create("gtanned", () => statDisplay.statChange("Tanned", 1, "green"));
statDisplay.create("ggtanned", () => statDisplay.statChange("Tanned", 2, "green"));
statDisplay.create("gggtanned", () => statDisplay.statChange("Tanned", 3, "green"));

// Conditions that modify variables like this should preferably not be in the same widget as text output
statDisplay.create("lcorruption", threat => {
	if (V.earSlime.startedThreats && !threat) V.earSlime.startedThreats = true;
	return statDisplay.statChange("Corruption", -1, "teal", () => V.earSlime.corruption > V.earSlime.growth / 2);
});
statDisplay.create("llcorruption", threat => {
	if (V.earSlime.startedThreats && !threat) V.earSlime.startedThreats = true;
	return statDisplay.statChange("Corruption", -2, "teal", () => V.earSlime.corruption > V.earSlime.growth / 2);
});
statDisplay.create("lllcorruption", threat => {
	if (V.earSlime.startedThreats && !threat) V.earSlime.startedThreats = true;
	return statDisplay.statChange("Corruption", -3, "teal", () => V.earSlime.corruption > V.earSlime.growth / 2);
});
statDisplay.create("gcorruption", () => statDisplay.statChange("Corruption", 1, "pink", () => V.earSlime.corruption < 100));
statDisplay.create("ggcorruption", () => statDisplay.statChange("Corruption", 2, "pink", () => V.earSlime.corruption < 100));
statDisplay.create("gggcorruption", () => statDisplay.statChange("Corruption", 3, "pink", () => V.earSlime.corruption < 100));

statDisplay.create("lawareness", () => {
	if (V.innocencestate === 1) {
		return statDisplay.statChange("Innocence", 1, "blue");
	}
	return statDisplay.statChange("Awareness", -1, "blue");
});
statDisplay.create("llawareness", () => {
	if (V.innocencestate === 1) {
		return statDisplay.statChange("Innocence", 2, "blue");
	}
	return statDisplay.statChange("Awareness", -2, "blue");
});
statDisplay.create("lllawareness", () => {
	if (V.innocencestate === 1) {
		return statDisplay.statChange("Innocence", 3, "blue");
	}
	return statDisplay.statChange("Awareness", -3, "blue");
});
statDisplay.create("gawareness", () => {
	if (V.innocencestate === 1) {
		return statDisplay.statChange("Innocence", -1, "blue");
	}
	return statDisplay.statChange("Awareness", 1, "lblue");
});
statDisplay.create("ggawareness", () => {
	if (V.innocencestate === 1) {
		return statDisplay.statChange("Innocence", -2, "blue");
	}
	return statDisplay.statChange("Awareness", 2, "lblue");
});
statDisplay.create("gggawareness", () => {
	if (V.innocencestate === 1) {
		return statDisplay.statChange("Innocence", -3, "blue");
	}
	return statDisplay.statChange("Awareness", 3, "lblue");
});

statDisplay.create("lspurity", () => {
	const result = document.createDocumentFragment();
	if (C.npc.Sydney.purity >= 1) {
		result.append(statDisplay.statChange("Sydney's Purity", -1, "purple"));
	} else {
		result.append(statDisplay.statChange("Sydney's Corruption", 1, "purple"));
	}
	if (C.npc.Sydney.purity <= 50 && T.lustincrdisplay !== 1) {
		result.append(statDisplay.statChange("Lust", 1, "lewd"));
	}
	T.warnstate = -1;
	return result;
});
statDisplay.create("llspurity", () => {
	const result = document.createDocumentFragment();
	if (C.npc.Sydney.purity >= 1) {
		result.append(statDisplay.statChange("Sydney's Purity", -2, "purple"));
	} else {
		result.append(statDisplay.statChange("Sydney's Corruption", 2, "purple"));
	}
	if (C.npc.Sydney.purity <= 50 && T.lustincrdisplay !== 1) {
		result.append(statDisplay.statChange("Lust", 1, "lewd"));
	}
	T.warnstate = -2;
	return result;
});
statDisplay.create("lllspurity", () => {
	const result = document.createDocumentFragment();
	if (C.npc.Sydney.purity >= 1) {
		result.append(statDisplay.statChange("Sydney's Purity", -3, "purple"));
	} else {
		result.append(statDisplay.statChange("Sydney's Corruption", 3, "purple"));
	}
	if (C.npc.Sydney.purity <= 50 && T.lustincrdisplay !== 1) {
		result.append(statDisplay.statChange("Lust", 1, "lewd"));
	}
	T.warnstate = -3;
	return result;
});
statDisplay.create("gspurity", () => {
	T.warnstate = 1;
	if (C.npc.Sydney.purity >= 1) {
		return statDisplay.statChange("Sydney's Purity", 1, "teal");
	}
	return statDisplay.statChange("Sydney's Corruption", -1, "teal");
});
statDisplay.create("ggspurity", () => {
	T.warnstate = 2;
	if (C.npc.Sydney.purity >= 1) {
		return statDisplay.statChange("Sydney's Purity", 2, "teal");
	}
	return statDisplay.statChange("Sydney's Corruption", -2, "teal");
});
statDisplay.create("gggspurity", () => {
	T.warnstate = 3;
	if (C.npc.Sydney.purity >= 1) {
		return statDisplay.statChange("Sydney's Purity", 3, "teal");
	}
	return statDisplay.statChange("Sydney's Corruption", -3, "teal");
});
statDisplay.create("lslust", () => {
	T.lustincrdisplay = 1;
	return statDisplay.statChange("Sydney's Lust", -1, "teal");
});
statDisplay.create("llslust", () => {
	T.lustincrdisplay = 1;
	return statDisplay.statChange("Sydney's Lust", -2, "teal");
});
statDisplay.create("lllslust", () => {
	T.lustincrdisplay = 1;
	return statDisplay.statChange("Sydney's Lust", -3, "teal");
});
statDisplay.create("gslust", () => {
	T.lustincrdisplay = 1;
	return statDisplay.statChange("Sydney's Lust", 1, "lewd");
});
statDisplay.create("ggslust", () => {
	T.lustincrdisplay = 1;
	return statDisplay.statChange("Sydney's Lust", 2, "lewd");
});
statDisplay.create("gggslust", () => {
	T.lustincrdisplay = 1;
	return statDisplay.statChange("Sydney's Lust", 3, "lewd");
});

statDisplay.create("lscience", () => statDisplay.statChange("Science", -1, "red"));
statDisplay.create("gscience", () => {
	const result = statDisplay.statChange("Science", 1, "green");
	result.append(" ");
	result.appendChild(gainSchoolStar("science_star"));
	return result;
});
statDisplay.create("ggscience", () => {
	const result = statDisplay.statChange("Science", 2, "green");
	result.append(" ");
	result.appendChild(gainSchoolStar("science_star"));
	return result;
});
statDisplay.create("gggscience", () => {
	const result = statDisplay.statChange("Science", 3, "green");
	result.append(" ");
	result.appendChild(gainSchoolStar("science_star"));
	return result;
});

statDisplay.create("lmaths", () => statDisplay.statChange("Maths", -1, "red"));
statDisplay.create("gmaths", () => {
	const result = statDisplay.statChange("Maths", 1, "green");
	result.append(" ");
	result.appendChild(gainSchoolStar("maths_star"));
	return result;
});
statDisplay.create("ggmaths", () => {
	const result = statDisplay.statChange("Maths", 2, "green");
	result.append(" ");
	result.appendChild(gainSchoolStar("maths_star"));
	return result;
});
statDisplay.create("gggmaths", () => {
	const result = statDisplay.statChange("Maths", 3, "green");
	result.append(" ");
	result.appendChild(gainSchoolStar("maths_star"));
	return result;
});

statDisplay.create("lenglish", () => statDisplay.statChange("English", -1, "red"));
statDisplay.create("genglish", () => {
	const result = statDisplay.statChange("English", 1, "green");
	result.append(" ");
	result.appendChild(gainSchoolStar("english_star"));
	return result;
});
statDisplay.create("ggenglish", () => {
	const result = statDisplay.statChange("English", 2, "green");
	result.append(" ");
	result.appendChild(gainSchoolStar("english_star"));
	return result;
});
statDisplay.create("gggenglish", () => {
	const result = statDisplay.statChange("English", 3, "green");
	result.append(" ");
	result.appendChild(gainSchoolStar("english_star"));
	return result;
});

statDisplay.create("lhistory", () => statDisplay.statChange("History", -1, "red"));
statDisplay.create("ghistory", () => {
	const result = statDisplay.statChange("History", 1, "green");
	result.append(" ");
	result.appendChild(gainSchoolStar("history_star"));
	return result;
});
statDisplay.create("gghistory", () => {
	const result = statDisplay.statChange("History", 2, "green");
	result.append(" ");
	result.appendChild(gainSchoolStar("history_star"));
	return result;
});
statDisplay.create("ggghistory", () => {
	const result = statDisplay.statChange("History", 3, "green");
	result.append(" ");
	result.appendChild(gainSchoolStar("history_star"));
	return result;
});

statDisplay.create("ghousekeeping", (amount, silent = false) => {
	if (V.statsdisable === "t") return "";
	if (amount === undefined || V.housekeeping < amount) {
		return statDisplay.statChange("Housekeeping", 1, "green");
	} else if (silent === "silent") {
		return "";
	} else if (V.housekeeping >= amount) {
		return " You're too skilled for this to improve your housekeeping.";
	}
	return "";
});
statDisplay.create("gghousekeeping", amount => statDisplay.statChange("Housekeeping", 2, "green", () => amount === undefined || V.housekeeping < amount));
statDisplay.create("ggghousekeeping", amount => statDisplay.statChange("Housekeeping", 3, "green", () => amount === undefined || V.housekeeping < amount));

statDisplay.create("ldom", npc => {
	let targetName = "";
	if ((V.npc.includes("Robin") && !npc) || npc === "Robin") {
		return statDisplay.statChange("Robin's Confidence", -1, "lblue");
	} else if (npc) targetName = npc + "'s";
	else if (V.npc.length >= 2) targetName = V.npc[0] + "'s";
	return statDisplay.statChange(`${targetName} Dominance`, -1, "lblue");
});
statDisplay.create("lldom", npc => {
	let targetName = "";
	if ((V.npc.includes("Robin") && !npc) || npc === "Robin") {
		return statDisplay.statChange("Robin's Confidence", -2, "lblue");
	} else if (npc) targetName = npc + "'s";
	else if (V.npc.length >= 2) targetName = V.npc[0] + "'s";
	return statDisplay.statChange(`${targetName} Dominance`, -2, "lblue");
});
statDisplay.create("llldom", npc => {
	let targetName = "";
	if ((V.npc.includes("Robin") && !npc) || npc === "Robin") {
		return statDisplay.statChange("Robin's Confidence", -3, "lblue");
	} else if (npc) targetName = npc + "'s";
	else if (V.npc.length >= 2) targetName = V.npc[0] + "'s";
	return statDisplay.statChange(`${targetName} Dominance`, -3, "lblue");
});
statDisplay.create("gdom", npc => {
	let targetName = "";
	if ((V.npc.includes("Robin") && !npc) || npc === "Robin") {
		return statDisplay.statChange("Robin's Confidence", 1, "purple");
	} else if (npc) targetName = npc + "'s";
	else if (V.npc.length >= 2) targetName = V.npc[0] + "'s";
	return statDisplay.statChange(`${targetName} Dominance`, 1, "purple");
});
statDisplay.create("ggdom", npc => {
	let targetName = "";
	if ((V.npc.includes("Robin") && !npc) || npc === "Robin") {
		return statDisplay.statChange("Robin's Confidence", 2, "purple");
	} else if (npc) targetName = npc + "'s";
	else if (V.npc.length >= 2) targetName = V.npc[0] + "'s";
	return statDisplay.statChange(`${targetName} Dominance`, 2, "purple");
});
statDisplay.create("gggdom", npc => {
	let targetName = "";
	if ((V.npc.includes("Robin") && !npc) || npc === "Robin") {
		return statDisplay.statChange("Robin's Confidence", 3, "purple");
	} else if (npc) targetName = npc + "'s";
	else if (V.npc.length >= 2) targetName = V.npc[0] + "'s";
	return statDisplay.statChange(`${targetName} Dominance`, 3, "purple");
});

statDisplay.create("lrespect", () => statDisplay.statChange("Respect", -1, "red"));
statDisplay.create("llrespect", () => statDisplay.statChange("Respect", -2, "red"));
statDisplay.create("lllrespect", () => statDisplay.statChange("Respect", -3, "red"));
statDisplay.create("grespect", arg =>
	statDisplay.statChange("Respect", 1, "green", () => arg === undefined || (arg === "scum" && V.pirate_rank !== 0) || (arg === "mate" && V.pirate_rank !== 1))
);
statDisplay.create("ggrespect", arg =>
	statDisplay.statChange("Respect", 2, "green", () => arg === undefined || (arg === "scum" && V.pirate_rank !== 0) || (arg === "mate" && V.pirate_rank !== 1))
);
statDisplay.create("gggrespect", arg =>
	statDisplay.statChange("Respect", 3, "green", () => arg === undefined || (arg === "scum" && V.pirate_rank !== 0) || (arg === "mate" && V.pirate_rank !== 1))
);

statDisplay.create("ladeviancy", () => statDisplay.statChange("Alex's Deviancy", -1, "green"));
statDisplay.create("lladeviancy", () => statDisplay.statChange("Alex's Deviancy", -2, "green"));
statDisplay.create("llladeviancy", () => statDisplay.statChange("Alex's Deviancy", -3, "green"));
statDisplay.create("gadeviancy", () => statDisplay.statChange("Alex's Deviancy", 1, "red"));
statDisplay.create("ggadeviancy", () => statDisplay.statChange("Alex's Deviancy", 2, "red"));
statDisplay.create("gggadeviancy", () => statDisplay.statChange("Alex's Deviancy", 3, "red"));

// These rely on the 'statChange' function in 'stat-changes.js'
statDisplay.create("gharmony", (amount = 1) => statChange.harmony(amount));
statDisplay.create("lharmony", (amount = 1) => statChange.harmony(-amount));
statDisplay.create("gferocity", (amount = 1) => statChange.ferocity(amount));
statDisplay.create("lferocity", (amount = 1) => statChange.ferocity(-amount));
statDisplay.create("incgpenisinsecurity", amount => statChange.gainPenisInsecurity(amount));
statDisplay.create("incggpenisinsecurity", () => statChange.gainPenisInsecurity(20));
statDisplay.create("gpenisacceptance", statChange.gainPenisAcceptance);
statDisplay.create("wolfpacktrust", statChange.wolfpacktrust);
statDisplay.create("wolfpackfear", statChange.wolfpackfear);
