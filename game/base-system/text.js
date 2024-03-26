/* eslint-disable no-undef */
const statDisplay = (() => {
	function statChange(statType, amount, colorClass, condition = () => true) {
		amount = Number(amount);
		if (V.statdisable === "t" || !condition()) return "";

		const prefix = amount < 0 ? "- " : "+ ";
		return ` | <span class="${colorClass}">${prefix.repeat(Math.abs(amount))}${statType}</span>`;
	}

	function grace(amount, expectedRank) {
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

			// Allows the player to lose grace in events only if they are at or above a certain rank
			// if (amount < 0 && playerRankValue < expectedRankValue) displayGrace = false;
		}

		if (displayGrace) {
			return statChange("Grace", amount, amount > 0 ? "green" : "red");
		}
		return "";
	}
	DefineMacroS("ggrace", expectedRank => grace(1, expectedRank));
	DefineMacroS("gggrace", expectedRank => grace(2, expectedRank));
	DefineMacroS("ggggrace", expectedRank => grace(3, expectedRank));
	DefineMacroS("lgrace", expectedRank => grace(-1, expectedRank));
	DefineMacroS("llgrace", expectedRank => grace(-2, expectedRank));
	DefineMacroS("lllgrace", expectedRank => grace(-3, expectedRank));

	DefineMacroS("lstress", () => statChange("Stress", -1, "green"));
	DefineMacroS("llstress", () => statChange("Stress", -2, "green"));
	DefineMacroS("lllstress", () => statChange("Stress", -3, "green"));
	DefineMacroS("gstress", () => statChange("Stress", 1, "red"));
	DefineMacroS("ggstress", () => statChange("Stress", 2, "red"));
	DefineMacroS("gggstress", () => statChange("Stress", 3, "red"));

	DefineMacroS("ltiredness", () => statChange("Fatigue", -1, "green"));
	DefineMacroS("lltiredness", () => statChange("Fatigue", -2, "green"));
	DefineMacroS("llltiredness", () => statChange("Fatigue", -3, "green"));
	DefineMacroS("gtiredness", () => statChange("Fatigue", 1, "red"));
	DefineMacroS("ggtiredness", () => statChange("Fatigue", 2, "red"));
	DefineMacroS("gggtiredness", () => statChange("Fatigue", 3, "red"));

	DefineMacroS("larousal", () => statChange("Arousal", -1, "green"));
	DefineMacroS("llarousal", () => statChange("Arousal", -2, "green"));
	DefineMacroS("lllarousal", () => statChange("Arousal", -3, "green"));
	DefineMacroS("garousal", () => statChange("Arousal", 1, "red"));
	DefineMacroS("ggarousal", () => statChange("Arousal", 2, "red"));
	DefineMacroS("gggarousal", () => statChange("Arousal", 3, "red"));

	DefineMacroS("ltrauma", () => statChange("Trauma", -1, "green"));
	DefineMacroS("lltrauma", () => statChange("Trauma", -2, "green"));
	DefineMacroS("llltrauma", () => statChange("Trauma", -3, "green"));
	DefineMacroS("gtrauma", () => statChange("Trauma", 1, "red"));
	DefineMacroS("ggtrauma", () => statChange("Trauma", 2, "red"));
	DefineMacroS("gggtrauma", () => statChange("Trauma", 3, "red"));

	DefineMacroS("llewdity", () => statChange("Lewdity", -1, "lewd"));
	DefineMacroS("lllewdity", () => statChange("Lewdity", -2, "lewd"));
	DefineMacroS("llllewdity", () => statChange("Lewdity", -3, "lewd"));
	DefineMacroS("glewdity", () => statChange("Lewdity", 1, "lewd"));
	DefineMacroS("gglewdity", () => statChange("Lewdity", 2, "lewd"));
	DefineMacroS("ggglewdity", () => statChange("Lewdity", 3, "lewd"));

	DefineMacroS("lpain", () => statChange("Pain", -1, "green"));
	DefineMacroS("llpain", () => statChange("Pain", -2, "green"));
	DefineMacroS("lllpain", () => statChange("Pain", -3, "green"));
	DefineMacroS("gpain", () => statChange("Pain", 1, "red"));
	DefineMacroS("ggpain", () => statChange("Pain", 2, "red"));
	DefineMacroS("gggpain", () => statChange("Pain", 3, "red"));

	DefineMacroS("lpurity", () => statChange("Purity", -1, "red"));
	DefineMacroS("llpurity", () => statChange("Purity", -2, "red"));
	DefineMacroS("lllpurity", () => statChange("Purity", -3, "red"));
	DefineMacroS("gpurity", () => statChange("Purity", 1, "green"));
	DefineMacroS("ggpurity", () => statChange("Purity", 2, "green"));
	DefineMacroS("gggpurity", () => statChange("Purity", 3, "green"));

	DefineMacroS("ldelinquency", () => statChange("Delinquency", -1, "green"));
	DefineMacroS("lldelinquency", () => statChange("Delinquency", -2, "green"));
	DefineMacroS("llldelinquency", () => statChange("Delinquency", -3, "green"));
	DefineMacroS("gdelinquency", () => statChange("Delinquency", 1, "red"));
	DefineMacroS("ggdelinquency", () => statChange("Delinquency", 2, "red"));
	DefineMacroS("gggdelinquency", () => statChange("Delinquency", 3, "red"));

	DefineMacroS("lcool", () => statChange("Status", -1, "red"));
	DefineMacroS("llcool", () => statChange("Status", -2, "red"));
	DefineMacroS("lllcool", () => statChange("Status", -3, "red"));
	DefineMacroS("gcool", () => statChange("Status", 1, "green"));
	DefineMacroS("ggcool", () => statChange("Status", 2, "green"));
	DefineMacroS("gggcool", () => statChange("Status", 3, "green"));

	DefineMacroS("lsaltiness", () => statChange("Saltiness", -1, "red"));
	DefineMacroS("llsaltiness", () => statChange("Saltiness", -2, "red"));
	DefineMacroS("lllsaltiness", () => statChange("Saltiness", -3, "red"));
	DefineMacroS("gsaltiness", () => statChange("Saltiness", 1, "green"));
	DefineMacroS("ggsaltiness", () => statChange("Saltiness", 2, "green"));
	DefineMacroS("gggsaltiness", () => statChange("Saltiness", 3, "green"));

	DefineMacroS("lchaos", () => statChange("Chaos", -1, "red"));
	DefineMacroS("llchaos", () => statChange("Chaos", -2, "red"));
	DefineMacroS("lllchaos", () => statChange("Chaos", -3, "red"));
	DefineMacroS("gchaos", () => statChange("Chaos", 1, "green"));
	DefineMacroS("ggchaos", () => statChange("Chaos", 2, "green"));
	DefineMacroS("gggchaos", () => statChange("Chaos", 3, "green"));

	DefineMacroS("ltrust", () => statChange("Trust", -1, "red"));
	DefineMacroS("lltrust", () => statChange("Trust", -2, "red"));
	DefineMacroS("llltrust", () => statChange("Trust", -3, "red"));
	DefineMacroS("gtrust", () => statChange("Trust", 1, "green"));
	DefineMacroS("ggtrust", () => statChange("Trust", 2, "green"));
	DefineMacroS("gggtrust", () => statChange("Trust", 3, "green"));

	DefineMacroS("loxygen", () => statChange("Oxygen", -1, "blue"));
	DefineMacroS("goxygen", () => statChange("Oxygen", 1, "teal"));

	DefineMacroS("lcontrol", () => statChange("Control", -1, "red"));
	DefineMacroS("llcontrol", () => statChange("Control", -2, "red"));
	DefineMacroS("lllcontrol", () => statChange("Control", -3, "red"));
	DefineMacroS("gcontrol", () => statChange("Control", 1, "green"));
	DefineMacroS("ggcontrol", () => statChange("Control", 2, "green"));
	DefineMacroS("gggcontrol", () => statChange("Control", 3, "green"));
	DefineMacroS("lcombatcontrol", () => statChange("Control", -1, "red"));
	DefineMacroS("llcombatcontrol", () => statChange("Control", -2, "red"));
	DefineMacroS("lllcombatcontrol", () => statChange("Control", -3, "red"));
	DefineMacroS("gcombatcontrol", () => statChange("Control", 1, "green", () => V.control < V.controlstart));
	DefineMacroS("ggcombatcontrol", () => statChange("Control", 2, "green", () => V.control < V.controlstart));
	DefineMacroS("gggcombatcontrol", () => statChange("Control", 3, "green", () => V.control < V.controlstart));

	DefineMacroS("gmystery", () => statChange("????", 1, "red"));
	DefineMacroS("gschool", () => statChange("School", 1, "green"));

	DefineMacroS("gswimming", () => statChange("Swimming", 1, "green"));
	DefineMacroS("ggswimming", () => statChange("Swimming", 2, "green"));
	DefineMacroS("gggswimming", () => statChange("Swimming", 3, "green"));

	DefineMacroS("gathletics", () => statChange("Athletics", 1, "green"));
	DefineMacroS("ggathletics", () => statChange("Athletics", 2, "green"));
	DefineMacroS("gggathletics", () => statChange("Athletics", 3, "green"));

	DefineMacroS("gdanceskill", () => statChange("Dance skill", 1, "green"));
	DefineMacroS("ggdanceskill", () => statChange("Dance skill", 2, "green"));
	DefineMacroS("gggdanceskill", () => statChange("Dance skill", 3, "green"));

	DefineMacroS("gtending", () => statChange("Tending", 1, "green"));
	DefineMacroS("ggtending", () => statChange("Tending", 2, "green"));
	DefineMacroS("gggtending", () => statChange("Tending", 3, "green"));

	DefineMacroS("ltreasure", () => statChange("Decreases chance of finding treasure", 0, "purple"));
	DefineMacroS("gtreasure", () => statChange("Increases chance of finding treasure", 0, "green"));

	DefineMacroS("lharass", () => statChange("Decreases chance of harassment", 0, "teal"));
	DefineMacroS("gharass", () => statChange("Increases chance of harassment", 0, "pink"));
	DefineMacroS("noharass", () => statChange("No chance of harassment", 0, "green"));

	DefineMacroS("llove", npc => statChange(npc ? `${npc}'s Love` : "Love", -1, "red"));
	DefineMacroS("lllove", npc => statChange(npc ? `${npc}'s Love` : "Love", -2, "red"));
	DefineMacroS("llllove", npc => statChange(npc ? `${npc}'s Love` : "Love", -3, "red"));
	DefineMacroS("glove", npc => statChange(npc ? `${npc}'s Love` : "Love", 1, "green"));
	DefineMacroS("gglove", npc => statChange(npc ? `${npc}'s Love` : "Love", 2, "green"));
	DefineMacroS("ggglove", npc => statChange(npc ? `${npc}'s Love` : "Love", 3, "green"));

	DefineMacroS("llust", npc => statChange(npc ? `${npc}'s Lust` : "Lust", -1, "teal"));
	DefineMacroS("lllust", npc => statChange(npc ? `${npc}'s Lust` : "Lust", -2, "teal"));
	DefineMacroS("llllust", npc => statChange(npc ? `${npc}'s Lust` : "Lust", -3, "teal"));
	DefineMacroS("glust", npc => statChange(npc ? `${npc}'s Lust` : "Lust", 1, "lewd"));
	DefineMacroS("gglust", npc => statChange(npc ? `${npc}'s Lust` : "Lust", 2, "lewd"));
	DefineMacroS("ggglust", npc => statChange(npc ? `${npc}'s Lust` : "Lust", 3, "lewd"));

	DefineMacroS("lrtrauma", override => statChange("Robin's Trauma", -1, "green", () => C.npc.Robin.trauma > 0 || override));
	DefineMacroS("llrtrauma", override => statChange("Robin's Trauma", -2, "green", () => C.npc.Robin.trauma > 0 || override));
	DefineMacroS("lllrtrauma", override => statChange("Robin's Trauma", -3, "green", () => C.npc.Robin.trauma > 0 || override));
	DefineMacroS("grtrauma", override => statChange("Robin's Trauma", 1, "green", () => C.npc.Robin.trauma >= 20 || override));
	DefineMacroS("ggrtrauma", override => statChange("Robin's Trauma", 2, "green", () => C.npc.Robin.trauma >= 20 || override));
	DefineMacroS("gggrtrauma", override => statChange("Robin's Trauma", 3, "green", () => C.npc.Robin.trauma >= 20 || override));

	DefineMacroS("lattention", () => statChange("Attention", -1, "lewd"));
	DefineMacroS("llattention", () => statChange("Attention", -2, "lewd"));
	DefineMacroS("lllattention", () => statChange("Attention", -3, "lewd"));
	DefineMacroS("gattention", loc => statChange("Attention", 1, "lewd", () => !loc || (loc === "prison" && !V.daily.prison.attentionDay)));
	DefineMacroS("ggattention", loc => statChange("Attention", 2, "lewd", () => !loc || (loc === "prison" && !V.daily.prison.attentionDay)));
	DefineMacroS("gggattention", loc => statChange("Attention", 3, "lewd", () => !loc || (loc === "prison" && !V.daily.prison.attentionDay)));

	DefineMacroS("laggro", () => statChange("Remy's Encroachment", -1, "green", () => V.farm));
	DefineMacroS("llaggro", () => statChange("Remy's Encroachment", -2, "green", () => V.farm));
	DefineMacroS("lllaggro", () => statChange("Remy's Encroachment", -3, "green", () => V.farm));
	DefineMacroS("gaggro", () => statChange("Remy's Encroachment", 1, "red", () => V.farm));
	DefineMacroS("ggaggro", () => statChange("Remy's Encroachment", 2, "red", () => V.farm));
	DefineMacroS("gggaggro", () => statChange("Remy's Encroachment", 3, "red", () => V.farm));

	DefineMacroS("lksuspicion", () => statChange("Jealousy", -1, "green"));
	DefineMacroS("llksuspicion", () => statChange("Jealousy", -2, "green"));
	DefineMacroS("lllksuspicion", () => statChange("Jealousy", -3, "green"));
	DefineMacroS("gksuspicion", () => statChange("Jealousy", 1, "red"));
	DefineMacroS("ggksuspicion", () => statChange("Jealousy", 2, "red"));
	DefineMacroS("gggksuspicion", () => statChange("Jealousy", 3, "red"));

	DefineMacroS("lsuspicion", () => statChange("Suspicion", -1, "green"));
	DefineMacroS("llsuspicion", () => statChange("Suspicion", -2, "green"));
	DefineMacroS("lllsuspicion", () => statChange("Suspicion", -3, "green"));
	DefineMacroS("gsuspicion", () => statChange("Suspicion", 1, "red"));
	DefineMacroS("ggsuspicion", () => statChange("Suspicion", 2, "red"));
	DefineMacroS("gggsuspicion", () => statChange("Suspicion", 3, "red"));

	DefineMacroS("larage", () => statChange("Rage", -1, "green", () => V.averyragerevealed));
	DefineMacroS("llarage", () => statChange("Rage", -2, "green", () => V.averyragerevealed));
	DefineMacroS("lllarage", () => statChange("Rage", -3, "green", () => V.averyragerevealed));
	DefineMacroS("garage", () => statChange("Rage", 1, "red", () => V.averyragerevealed));
	DefineMacroS("ggarage", () => statChange("Rage", 2, "red", () => V.averyragerevealed));
	DefineMacroS("gggarage", () => statChange("Rage", 3, "red", () => V.averyragerevealed));

	DefineMacroS("lendear", () => statChange("Endearment", -1, "pink"));
	DefineMacroS("llendear", () => statChange("Endearment", -2, "pink"));
	DefineMacroS("lllendear", () => statChange("Endearment", -3, "pink"));
	DefineMacroS("gendear", () => statChange("Endearment", 1, "teal"));
	DefineMacroS("ggendear", () => statChange("Endearment", 2, "teal"));
	DefineMacroS("gggendear", () => statChange("Endearment", 3, "teal"));

	DefineMacroS("lhope", () => statChange("Hope", -1, "pink"));
	DefineMacroS("llhope", () => statChange("Hope", -2, "pink"));
	DefineMacroS("lllhope", () => statChange("Hope", -3, "pink"));
	DefineMacroS("ghope", () => statChange("Hope", 1, "teal"));
	DefineMacroS("gghope", () => statChange("Hope", 2, "teal"));
	DefineMacroS("ggghope", () => statChange("Hope", 3, "teal"));

	DefineMacroS("lreb", () => statChange("Rebelliousness", -1, "blue"));
	DefineMacroS("llreb", () => statChange("Rebelliousness", -2, "blue"));
	DefineMacroS("lllreb", () => statChange("Rebelliousness", -3, "blue"));
	DefineMacroS("greb", () => statChange("Rebelliousness", 1, "def"));
	DefineMacroS("ggreb", () => statChange("Rebelliousness", 2, "def"));
	DefineMacroS("gggreb", () => statChange("Rebelliousness", 3, "def"));

	DefineMacroS("ghandskill", () => statChange("Hand skill", 1, "green"));
	DefineMacroS("goralskill", () => statChange("Oral skill", 1, "green"));
	DefineMacroS("gthighskill", () => statChange("Thigh skill", 1, "green"));
	DefineMacroS("gbottomskill", () => statChange("Ass skill", 1, "green"));
	DefineMacroS("gvaginalskill", () => statChange("Vaginal skill", 1, "green"));
	DefineMacroS("gpenileskill", () => statChange("Penile skill", 1, "green"));
	DefineMacroS("ganalskill", () => statChange("Anal skill", 1, "green"));
	DefineMacroS("gfeetskill", () => statChange("Feet skill", 1, "green"));
	DefineMacroS("gchestskill", () => statChange("Chest skill", 1, "green"));

	DefineMacroS("lstockholm", () => statChange("Stockholm Syndrome", -1, "lblue"));
	DefineMacroS("llstockholm", () => statChange("Stockholm Syndrome", -2, "lblue"));
	DefineMacroS("lllstockholm", () => statChange("Stockholm Syndrome", -3, "lblue"));
	DefineMacroS("gstockholm", () => statChange("Stockholm Syndrome", 1, "blue"));
	DefineMacroS("ggstockholm", () => statChange("Stockholm Syndrome", 2, "blue"));
	DefineMacroS("gggstockholm", () => statChange("Stockholm Syndrome", 3, "blue"));

	DefineMacroS("lshame", () => statChange("Shame", -1, "green"));
	DefineMacroS("llshame", () => statChange("Shame", -2, "green"));
	DefineMacroS("lllshame", () => statChange("Shame", -3, "green"));
	DefineMacroS("gshame", () => statChange("Shame", 1, "red"));
	DefineMacroS("ggshame", () => statChange("Shame", 2, "red"));
	DefineMacroS("gggshame", () => statChange("Shame", 3, "red"));

	DefineMacroS("lfarm", () => statChange("Farm yield", -1, "red"));
	DefineMacroS("llfarm", () => statChange("Farm yield", -2, "red"));
	DefineMacroS("lllfarm", () => statChange("Farm yield", -3, "red"));
	DefineMacroS("gfarm", () => statChange("Farm yield", 1, "green"));
	DefineMacroS("ggfarm", () => statChange("Farm yield", 2, "green"));
	DefineMacroS("gggfarm", () => statChange("Farm yield", 3, "green"));

	DefineMacroS("gnet", () => statChange("Net proficiency", 1, "green"));
	DefineMacroS("gbaton", () => statChange("Baton proficiency", 1, "green"));
	DefineMacroS("ggbaton", () => statChange("Baton proficiency", 2, "green"));
	DefineMacroS("gggbaton", () => statChange("Baton proficiency", 3, "green"));
	DefineMacroS("gwhip", () => statChange("Whip proficiency", 1, "green"));
	DefineMacroS("ggwhip", () => statChange("Whip proficiency", 2, "green"));
	DefineMacroS("gggwhip", () => statChange("Whip proficiency", 3, "green"));

	DefineMacroS("lsecurity", () => statChange("Security", -1, "green"));
	DefineMacroS("llsecurity", () => statChange("Security", -2, "green"));
	DefineMacroS("lllsecurity", () => statChange("Security", -3, "green"));
	DefineMacroS("gsecurity", () => statChange("Security", 1, "red"));
	DefineMacroS("ggsecurity", () => statChange("Security", 2, "red"));
	DefineMacroS("gggsecurity", () => statChange("Security", 3, "red"));

	DefineMacroS("limpatience", () => statChange("Impatience", -1, "green"));
	DefineMacroS("llimpatience", () => statChange("Impatience", -2, "green"));
	DefineMacroS("lllimpatience", () => statChange("Impatience", -3, "green"));
	DefineMacroS("gimpatience", () => statChange("Impatience", 1, "red"));
	DefineMacroS("ggimpatience", () => statChange("Impatience", 2, "red"));
	DefineMacroS("gggimpatience", () => statChange("Impatience", 3, "red"));

	DefineMacroS("linterest", () => statChange("Interest", -1, "red"));
	DefineMacroS("llinterest", () => statChange("Interest", -2, "red"));
	DefineMacroS("lllinterest", () => statChange("Interest", -3, "red"));
	DefineMacroS("ginterest", () => statChange("Interest", 1, "green"));
	DefineMacroS("gginterest", () => statChange("Interest", 2, "green"));
	DefineMacroS("ggginterest", () => statChange("Interest", 3, "green"));

	DefineMacroS("ldaring", () => statChange("Daring", -1, "red"));
	DefineMacroS("lldaring", () => statChange("Daring", -2, "red"));
	DefineMacroS("llldaring", () => statChange("Daring", -3, "red"));
	DefineMacroS("gdaring", () => statChange("Daring", 1, "green"));
	DefineMacroS("ggdaring", () => statChange("Daring", 2, "green"));
	DefineMacroS("gggdaring", () => statChange("Daring", 3, "green"));

	DefineMacroS("gknowledge", () => statChange("Knowledge", 1, "green"));
	DefineMacroS("gbodywriting", () => statChange("Bodywriting", 1, "purple"));
	DefineMacroS("ggbodywriting", () => statChange("Bodywriting", 2, "purple"));
	DefineMacroS("gggbodywriting", () => statChange("Bodywriting", 3, "purple"));
	DefineMacroS("ghallucinogens", () => statChange("Hallucinogens", 1, "lewd"));
	DefineMacroS("gghallucinogens", () => statChange("Hallucinogens", 2, "lewd"));
	DefineMacroS("ggghallucinogens", () => statChange("Hallucinogens", 3, "lewd"));

	DefineMacroS("lobey", () => statChange("Obedience", -1, "red"));
	DefineMacroS("llobey", () => statChange("Obedience", -2, "red"));
	DefineMacroS("lllobey", () => statChange("Obedience", -3, "red"));
	DefineMacroS("gobey", () => statChange("Obedience", 1, "pink"));
	DefineMacroS("ggobey", () => statChange("Obedience", 2, "pink"));
	DefineMacroS("gggobey", () => statChange("Obedience", 3, "pink"));

	DefineMacroS("lhunger", () => statChange("Hunger", -1, "green"));
	DefineMacroS("llhunger", () => statChange("Hunger", -2, "green"));
	DefineMacroS("lllhunger", () => statChange("Hunger", -3, "green"));
	DefineMacroS("ghunger", () => statChange("Hunger", 1, "red"));
	DefineMacroS("gghunger", () => statChange("Hunger", 2, "red"));
	DefineMacroS("ggghunger", () => statChange("Hunger", 3, "red"));

	DefineMacroS("gacceptance", () => statChange("Acceptance", 1, "green"));

	DefineMacroS("gwillpower", () => statChange("Willpower", 1, "green"));
	DefineMacroS("ggwillpower", () => statChange("Willpower", 2, "green"));
	DefineMacroS("gggwillpower", () => statChange("Willpower", 3, "green"));

	DefineMacroS("lphysique", () => statChange("Physique", -1, "red"));
	DefineMacroS("llphysique", () => statChange("Physique", -2, "red"));
	DefineMacroS("lllphysique", () => statChange("Physique", -3, "red"));
	DefineMacroS("gphysique", () => statChange("Physique", 1, "green"));
	DefineMacroS("ggphysique", () => statChange("Physique", 2, "green"));
	DefineMacroS("gggphysique", () => statChange("Physique", 3, "green"));

	DefineMacroS("gtanned", () => statChange("Tanned", 1, "green"));
	DefineMacroS("ggtanned", () => statChange("Tanned", 2, "green"));
	DefineMacroS("gggtanned", () => statChange("Tanned", 3, "green"));

	// Conditions that modify variables like this should preferably not be in the same widget as text output
	DefineMacroS("lcorruption", threat => {
		if (V.earSlime.startedThreats && !threat) V.earSlime.startedThreats = true;
		return statChange("Corruption", -1, "teal", () => V.earSlime.corruption > V.earSlime.growth / 2);
	});
	DefineMacroS("llcorruption", threat => {
		if (V.earSlime.startedThreats && !threat) V.earSlime.startedThreats = true;
		return statChange("Corruption", -2, "teal", () => V.earSlime.corruption > V.earSlime.growth / 2);
	});
	DefineMacroS("lllcorruption", threat => {
		if (V.earSlime.startedThreats && !threat) V.earSlime.startedThreats = true;
		return statChange("Corruption", -3, "teal", () => V.earSlime.corruption > V.earSlime.growth / 2);
	});
	DefineMacroS("gcorruption", () => statChange("Corruption", 1, "pink", () => V.earSlime.corruption < 100));
	DefineMacroS("ggcorruption", () => statChange("Corruption", 2, "pink", () => V.earSlime.corruption < 100));
	DefineMacroS("gggcorruption", () => statChange("Corruption", 3, "pink", () => V.earSlime.corruption < 100));

	DefineMacroS("lawareness", () => {
		if (V.innocencestate === 1) {
			return statChange("Innocence", 1, "blue");
		}
		return statChange("Awareness", -1, "blue");
	});
	DefineMacroS("llawareness", () => {
		if (V.innocencestate === 1) {
			return statChange("Innocence", 2, "blue");
		}
		return statChange("Awareness", -2, "blue");
	});
	DefineMacroS("lllawareness", () => {
		if (V.innocencestate === 1) {
			return statChange("Innocence", 3, "blue");
		}
		return statChange("Awareness", -3, "blue");
	});
	DefineMacroS("gawareness", () => {
		if (V.innocencestate === 1) {
			return statChange("Innocence", -1, "blue");
		}
		return statChange("Awareness", 1, "lblue");
	});
	DefineMacroS("ggawareness", () => {
		if (V.innocencestate === 1) {
			return statChange("Innocence", -2, "blue");
		}
		return statChange("Awareness", 2, "lblue");
	});
	DefineMacroS("gggawareness", () => {
		if (V.innocencestate === 1) {
			return statChange("Innocence", -3, "blue");
		}
		return statChange("Awareness", 3, "lblue");
	});

	DefineMacroS("lspurity", () => {
		let result;
		if (C.npc.Sydney.purity >= 1) {
			result = statChange("Sydney's Purity", -1, "purple");
		} else {
			result = statChange("Sydney's Corruption", 1, "purple");
		}
		if (C.npc.Sydney.purity <= 50 && T.lustincrdisplay !== 1) {
			result += statChange("Lust", 1, "lewd");
		}
		T.warnstate = -1;
		return result;
	});
	DefineMacroS("llspurity", () => {
		let result;
		if (C.npc.Sydney.purity >= 1) {
			result = statChange("Sydney's Purity", -2, "purple");
		} else {
			result = statChange("Sydney's Corruption", 2, "purple");
		}
		if (C.npc.Sydney.purity <= 50 && T.lustincrdisplay !== 1) {
			result += statChange("Lust", 1, "lewd");
		}
		T.warnstate = -2;
		return result;
	});
	DefineMacroS("lllspurity", () => {
		let result;
		if (C.npc.Sydney.purity >= 1) {
			result = statChange("Sydney's Purity", -3, "purple");
		} else {
			result = statChange("Sydney's Corruption", 3, "purple");
		}
		if (C.npc.Sydney.purity <= 50 && T.lustincrdisplay !== 1) {
			result += statChange("Lust", 1, "lewd");
		}
		T.warnstate = -3;
		return result;
	});
	DefineMacroS("gspurity", () => {
		T.warnstate = 1;
		if (C.npc.Sydney.purity >= 1) {
			return statChange("Sydney's Purity", 1, "teal");
		}
		return statChange("Sydney's Corruption", -1, "teal");
	});
	DefineMacroS("ggspurity", () => {
		T.warnstate = 2;
		if (C.npc.Sydney.purity >= 1) {
			return statChange("Sydney's Purity", 2, "teal");
		}
		return statChange("Sydney's Corruption", -2, "teal");
	});
	DefineMacroS("gggspurity", () => {
		T.warnstate = 3;
		if (C.npc.Sydney.purity >= 1) {
			return statChange("Sydney's Purity", 3, "teal");
		}
		return statChange("Sydney's Corruption", -3, "teal");
	});

	DefineMacroS("lslust", () => {
		T.lustincrdisplay = 1;
		return statChange("Sydney's Lust", -1, "teal");
	});
	DefineMacroS("llslust", () => {
		T.lustincrdisplay = 1;
		return statChange("Sydney's Lust", -2, "teal");
	});
	DefineMacroS("lllslust", () => {
		T.lustincrdisplay = 1;
		return statChange("Sydney's Lust", -3, "teal");
	});
	DefineMacroS("gslust", () => {
		T.lustincrdisplay = 1;
		return statChange("Sydney's Lust", 1, "lewd");
	});
	DefineMacroS("ggslust", () => {
		T.lustincrdisplay = 1;
		return statChange("Sydney's Lust", 2, "lewd");
	});
	DefineMacroS("gggslust", () => {
		T.lustincrdisplay = 1;
		return statChange("Sydney's Lust", 3, "lewd");
	});

	DefineMacroS("lscience", () => statChange("Science", -1, "red"));
	DefineMacroS("gscience", () => {
		const result = statChange("Science", 1, "green");
		return `${result} ${gainSchoolStar("science_star")}`;
	});
	DefineMacroS("ggscience", () => {
		const result = statChange("Science", 2, "green");
		return `${result} ${gainSchoolStar("science_star")}`;
	});
	DefineMacroS("gggscience", () => {
		const result = statChange("Science", 3, "green");
		return `${result} ${gainSchoolStar("science_star")}`;
	});

	DefineMacroS("lmaths", () => statChange("Maths", -1, "red"));
	DefineMacroS("gmaths", () => {
		const result = statChange("Maths", 1, "green");
		return `${result} ${gainSchoolStar("maths_star")}`;
	});
	DefineMacroS("ggmaths", () => {
		const result = statChange("Maths", 2, "green");
		return `${result} ${gainSchoolStar("maths_star")}`;
	});
	DefineMacroS("gggmaths", () => {
		const result = statChange("Maths", 3, "green");
		return `${result} ${gainSchoolStar("maths_star")}`;
	});

	DefineMacroS("lenglish", () => statChange("English", -1, "red"));
	DefineMacroS("genglish", () => {
		const result = statChange("English", 1, "green");
		return `${result} ${gainSchoolStar("english_star")}`;
	});
	DefineMacroS("ggenglish", () => {
		const result = statChange("English", 2, "green");
		return `${result} ${gainSchoolStar("english_star")}`;
	});
	DefineMacroS("gggenglish", () => {
		const result = statChange("English", 3, "green");
		return `${result} ${gainSchoolStar("english_star")}`;
	});

	DefineMacroS("lhistory", () => statChange("History", -1, "red"));
	DefineMacroS("ghistory", () => {
		const result = statChange("History", 1, "green");
		return `${result} ${gainSchoolStar("history_star")}`;
	});
	DefineMacroS("gghistory", () => {
		const result = statChange("History", 2, "green");
		return `${result} ${gainSchoolStar("history_star")}`;
	});
	DefineMacroS("ggghistory", () => {
		const result = statChange("History", 3, "green");
		return `${result} ${gainSchoolStar("history_star")}`;
	});

	DefineMacroS("ghousekeeping", amount => {
		if (amount !== undefined || V.housekeeping < amount) {
			return statChange("Housekeeping", 1, "green");
		} else if (V.statsdisable === "f" && V.housekeeping >= amount) {
			return "You're too skilled for this to improve your housekeeping.";
		}
		return "";
	});
	DefineMacroS("gghousekeeping", amount => statChange("Housekeeping", 2, "green", () => amount !== undefined || V.housekeeping < amount));
	DefineMacroS("ggghousekeeping", amount => statChange("Housekeeping", 3, "green", () => amount !== undefined || V.housekeeping < amount));

	DefineMacroS("ldom", npc => {
		let targetName = "";
		if ((V.npc.includes("Robin") && !npc) || npc === "Robin") {
			return statChange("Robin's Confidence", -1, "lblue");
		} else if (npc) targetName = npc + "'s";
		else if (V.npc.length >= 2) targetName = V.npc[0] + "'s";
		return statChange(`${targetName} Dominance`, -1, "lblue");
	});
	DefineMacroS("lldom", npc => {
		let targetName = "";
		if ((V.npc.includes("Robin") && !npc) || npc === "Robin") {
			return statChange("Robin's Confidence", -2, "lblue");
		} else if (npc) targetName = npc + "'s";
		else if (V.npc.length >= 2) targetName = V.npc[0] + "'s";
		return statChange(`${targetName} Dominance`, -2, "lblue");
	});
	DefineMacroS("llldom", npc => {
		let targetName = "";
		if ((V.npc.includes("Robin") && !npc) || npc === "Robin") {
			return statChange("Robin's Confidence", -3, "lblue");
		} else if (npc) targetName = npc + "'s";
		else if (V.npc.length >= 2) targetName = V.npc[0] + "'s";
		return statChange(`${targetName} Dominance`, -3, "lblue");
	});
	DefineMacroS("gdom", npc => {
		let targetName = "";
		if ((V.npc.includes("Robin") && !npc) || npc === "Robin") {
			return statChange("Robin's Confidence", 1, "purple");
		} else if (npc) targetName = npc + "'s";
		else if (V.npc.length >= 2) targetName = V.npc[0] + "'s";
		return statChange(`${targetName} Dominance`, 1, "purple");
	});
	DefineMacroS("ggdom", npc => {
		let targetName = "";
		if ((V.npc.includes("Robin") && !npc) || npc === "Robin") {
			return statChange("Robin's Confidence", 2, "purple");
		} else if (npc) targetName = npc + "'s";
		else if (V.npc.length >= 2) targetName = V.npc[0] + "'s";
		return statChange(`${targetName} Dominance`, 2, "purple");
	});
	DefineMacroS("gggdom", npc => {
		let targetName = "";
		if ((V.npc.includes("Robin") && !npc) || npc === "Robin") {
			return statChange("Robin's Confidence", 3, "purple");
		} else if (npc) targetName = npc + "'s";
		else if (V.npc.length >= 2) targetName = V.npc[0] + "'s";
		return statChange(`${targetName} Dominance`, 3, "purple");
	});

	DefineMacroS("lrespect", () => statChange("Respect", -1, "red"));
	DefineMacroS("llrespect", () => statChange("Respect", -2, "red"));
	DefineMacroS("lllrespect", () => statChange("Respect", -3, "red"));
	DefineMacroS("grespect", arg =>
		statChange("Respect", 1, "green", () => (arg === "scum" && V.pirate_rank !== 0) || (arg === "mate" && V.pirate_rank !== 1))
	);
	DefineMacroS("ggrespect", arg =>
		statChange("Respect", 2, "green", () => (arg === "scum" && V.pirate_rank !== 0) || (arg === "mate" && V.pirate_rank !== 1))
	);
	DefineMacroS("gggrespect", arg =>
		statChange("Respect", 3, "green", () => (arg === "scum" && V.pirate_rank !== 0) || (arg === "mate" && V.pirate_rank !== 1))
	);

	DefineMacroS("ladeviancy", () => statChange("Alex's Deviancy", -1, "green"));
	DefineMacroS("lladeviancy", () => statChange("Alex's Deviancy", -2, "green"));
	DefineMacroS("llladeviancy", () => statChange("Alex's Deviancy", -3, "green"));
	DefineMacroS("gadeviancy", () => statChange("Alex's Deviancy", 1, "red"));
	DefineMacroS("ggadeviancy", () => statChange("Alex's Deviancy", 2, "red"));
	DefineMacroS("gggadeviancy", () => statChange("Alex's Deviancy", 3, "red"));

	return {
		statChange,
	};
})();
window.statDisplay = statDisplay;
