// eslint-disable-next-line no-unused-vars
function masturbationAudience() {
	const br = () => document.createElement("br");
	const sWikifier = text => {
		if (T.noMasturbationOutput) return;
		fragment.append(Wikifier.wikifyEval(text));
	};
	const fragment = document.createDocumentFragment();

	if (V.masturbationAudience >= 1) {
		const npc = random(1, Math.clamp(V.masturbationAudience, 1, 6));
		const comment = masturbationAudienceLines(npc);
		const audienceMutual = V.masturbationAudienceMutualAllowed && V.audiencearousal >= 50;
		if (V.masturbationAudience > 6) {
			sWikifier(
				`<span class="lewd">A crowd is watching you.${
					audienceMutual ? " The lewd sounds you hear clearly mean that many of them are masturbating." : ""
				}</span> `
			);
		}
		if (V.npc[npc - 1]) {
			sWikifier(
				`<span class="lewd"><<person${npc}>>You can feel <<combatperson>>'s eyes${V.masturbationAudience > 1 ? ", alongside others," : ""} on you.${
					audienceMutual && V.masturbationAudience <= 6
						? ` <<He>> mirrors${V.mouth === 0 || V.mouth === "disabled" ? " " : " some of"} your actions.`
						: ""
				}</span>`
			);
		} else if (V.masturbationAudience === 1) {
			sWikifier(
				`<span class="lewd"><<person${npc}>>You can feel the <<persons>> eyes on you${
					audienceMutual ? ` as <<he>> mirrors${V.mouth === 0 || V.mouth === "disabled" ? " " : " some of"} your actions` : ""
				}.</span>`
			);
		} else if (V.masturbationAudience <= 6) {
			sWikifier(`<span class="lewd"><<person${npc}>>You can feel the ${V.masturbationAudience > 4 ? "many " : ""}eyes watching you.</span>`);
		}
		fragment.append(" ");
		if (comment) {
			sWikifier(comment);
		}
	}
	if (fragment.textContent) {
		fragment.append(br());
		fragment.append(br());
	}

	return fragment;
}

function masturbationAudienceLines(npc) {
	if (!V.masturbationAudienceReactions) V.masturbationAudienceReactions = [];
	if (V.masturbationAudienceReactions.length >= 8) V.masturbationAudienceReactions.deleteAt(0);
	if (V.arousal >= V.arousalmax) {
		V.masturbationAudienceReactions.push("orgasm");
		V.audiencearousal += Math.clamp(2 * V.masturbationAudience, 2, 10);
		return masturbationAudienceLineText(npc, "orgasm");
	}

	if (!V.masturbationAudienceReactions.includes("mouthOral")) {
		/* Do nothing */
	} else if (["mpenisentrance", "mchastityparasiteentrance", "mvaginaentrance", "mpenis"].includes(V.mouth)) {
		V.masturbationAudienceReactions.push("mouthOral");
		V.audiencearousal += 1;
		return masturbationAudienceLineText(npc, "mouthOral");
	}

	if (["mrest"].includesAny(V.masturbationActions.leftaction, V.masturbationActions.rightaction) && random(0, 100) >= 66) {
		V.masturbationAudienceReactions.push("rest");
		if (V.audiencearousal > 10) V.audiencearousal -= 1;
		return masturbationAudienceLineText(npc, "rest");
	}

	if (
		["mpenisentrance", "mpenisglans", "mpenisshaft"].includesAny(V.masturbationActions.leftaction, V.masturbationActions.rightaction) &&
		random(0, 100) >= 20 * (V.masturbationAudienceReactions.filter(a => a === "penis").length + 1)
	) {
		V.masturbationAudienceReactions.push("penis");
		V.audiencearousal += 1;
		return masturbationAudienceLineText(npc, "penis");
	}

	if (
		["mchastityparasiteentrance", "mchastityparasiterub", "mchastityparasitesqueeze"].includesAny(
			V.masturbationActions.leftaction,
			V.masturbationActions.rightaction
		) &&
		random(0, 100) >= 20 * (V.masturbationAudienceReactions.filter(a => a === "chastitypenis").length + 1)
	) {
		V.masturbationAudienceReactions.push("chastitypenis");
		V.audiencearousal += 1;
		return masturbationAudienceLineText(npc, "chastitypenis");
	}

	if (
		[
			"mvaginaentrance",
			"mvaginafingerstarttwo",
			"mvagina",
			"mvaginaclit",
			"mvaginarub",
			"mvaginafingeraddtwo",
			"mvaginafingeradd",
			"mvaginatease",
		].includesAny(V.masturbationActions.leftaction, V.masturbationActions.rightaction) &&
		random(0, 100) >= 20 * (V.masturbationAudienceReactions.filter(a => a === "vagina").length + 1)
	) {
		V.masturbationAudienceReactions.push("vagina");
		V.audiencearousal += 1;
		return masturbationAudienceLineText(npc, "vagina");
	}

	if (
		["manusentrance"].includesAny(V.leftarm, V.rightarm) &&
		random(0, 100) >= 20 * (V.masturbationAudienceReactions.filter(a => a === "anusEntrance").length + 1)
	) {
		V.masturbationAudienceReactions.push("anusEntrance");
		V.audiencearousal += 1;
		return masturbationAudienceLineText(npc, "anusEntrance");
	}

	if (["manus"].includesAny(V.leftarm, V.rightarm) && random(0, 100) >= 20 * (V.masturbationAudienceReactions.filter(a => a === "anus").length + 1)) {
		V.masturbationAudienceReactions.push("anus");
		V.audiencearousal += 1;
		return masturbationAudienceLineText(npc, "anus");
	}

	if (
		["mchest"].includesAny(V.masturbationActions.leftaction, V.masturbationActions.rightaction) &&
		random(0, 100) >= 20 * (V.masturbationAudienceReactions.filter(a => a === "chest").length + 1)
	) {
		V.masturbationAudienceReactions.push("chest");
		V.audiencearousal += 1;
		return masturbationAudienceLineText(npc, "chest");
	}

	if (V.masturbationAudienceReactions.includes("penisSize")) {
		/* Do nothing */
	} else if (V.exposed >= 2 && V.player.penisExist && !playerChastity("hidden")) {
		V.masturbationAudienceReactions.push("penisSize");
		V.audiencearousal += 1;
		switch (V.player.penissize) {
			case -2:
			case -1:
			case 0:
				wikifier("insecurity", '"penis_tiny"', 1);
				break;
			case 1:
				wikifier("insecurity", '"penis_small"', 1);
				break;
			case 2:
				break;
			case 3:
				if (V.player.gender !== "m") wikifier("insecurity", '"penis_big"', 1);
				break;
			case 4:
				wikifier("insecurity", '"penis_big"', 1);
				break;
		}
		return masturbationAudienceLineText(npc, "penisSize" + V.player.penissize);
	}

	if (V.masturbationAudienceReactions.includes("breastSize")) {
		/* Do nothing */
	} else if (V.player.breastsize === 0) {
		V.masturbationAudienceReactions.push("breastSize");
		V.audiencearousal += 1;
		if (V.player.gender_appearance !== "m") {
			wikifier("insecurity", '"breasts_tiny"', 1);
		}
		return masturbationAudienceLineText(npc, "breastSizeFlat");
	} else if (V.player.breastsize <= 5) {
		V.masturbationAudienceReactions.push("breastSize");
		V.audiencearousal += 1;
		if ((V.player.gender_appearance === "m" && V.worn.upper.exposed >= 2) || V.player.gender_appearance !== "m") {
			wikifier("insecurity", '"breasts_small"', 1);
		}
		return masturbationAudienceLineText(npc, "breastSizeSmall");
	} else if (V.player.breastsize <= 7) {
		V.masturbationAudienceReactions.push("breastSize");
		V.audiencearousal += 1;
		if (V.player.gender_appearance === "m") {
			wikifier("insecurity", '"breasts_big"', 1);
		}
		return masturbationAudienceLineText(npc, "breastSizeNormal");
	} else if (V.player.breastsize <= 10) {
		V.masturbationAudienceReactions.push("breastSize");
		V.audiencearousal += 1;
		wikifier("insecurity", '"breasts_big"', 1);
		return masturbationAudienceLineText(npc, "breastSizeLarge");
	} else {
		V.masturbationAudienceReactions.push("breastSize");
		V.audiencearousal += 1;
		wikifier("insecurity", '"breasts_big"', 2);
		return masturbationAudienceLineText(npc, "breastSizeHuge");
	}

	return "";
}

function masturbationAudienceLineText(npc, lineType = "") {
	if (T.noMasturbationOutput) return "";
	const compatibleNamedNpcs = [];
	const npcSelected = V.NPCList[npc - 1];
	const namedNpc = compatibleNamedNpcs.includes(npcSelected.fullDescription) ? npcSelected.fullDescription : "";
	const resultArray = [];
	switch (lineType + namedNpc) {
		case "orgasm":
			resultArray.push(`"Your face is so cute when you cum."`, `"You better not stop now. I know you want another round."`);
			if (V.masturbationAudience > 1) {
				resultArray.push(`"Look at how much <<pshe>> is shaking. Must be a pretty intense orgasm."`);
			}
			if (V.masturbationAudience >= 3 && V.masturbationAudienceReactions >= 3) {
				resultArray.push(`"Cum for us, you pervert. Show everyone how lewd you are."`, `"Do you enjoy cumming in front of everyone?"`);
			}
			if (["mpenisentrance", "mpenis"].includes(V.mouth)) resultArray.push(`"How do you like the taste of your own cum?"`);
			if (["mvaginaentrance"].includes(V.mouth)) resultArray.push(`"How do you like the taste of your own juices?"`);
			if (V.masturbationAudienceReactions.filter(a => a === "orgasm").length > 2) {
				if (V.masturbationAudience > 1) {
					resultArray.push(`"This slut just keeps on cumming non-stop!"`);
				}
				resultArray.push(`"What's it like cumming so frequently!"`);
			}
			if (V.masturbationorgasm >= 5) {
				if (V.masturbationAudience > 1) {
					resultArray.push(`"This slut just keeps on cumming in front of ${V.masturbationAudience >= 4 ? "everyone" : "us"}?"`);
				} else {
					resultArray.push(`"You must love cumming in front of me."`);
				}
			}
			return resultArray.random();
		case "mouthOral":
			if (V.masturbationAudience > 1) {
				return `"Fuck, this slut's flexible!"`;
			} else {
				return `"Fuck, how flexible are you?"`;
			}
		case "rest":
			if (V.masturbationActions.leftaction === "mrest" && V.masturbationActions.rightaction === "mrest") {
				if (V.audiencearousal <= 0 && V.exposed <= 0) {
					// Likely needs to be re-written to fit the context, should not show in the first release
					return [`Are you feeling ok?`, `Do you need some help?`].random();
				} else {
					return [
						`Why did you stop? Keep playing with yourself in front of ${V.masturbationAudience > 1 ? "us" : "me"}.`,
						`Feeling tired already? Can I help?`,
					].random();
				}
			} else {
				return [
					`Are you going to use that free hand to play with yourself more?`,
					`You're already playing with yourself with one hand, but it'd be better with two.`,
				].random();
			}
		case "penis":
			resultArray.push(`"C'mon, squeeze it harder."`);
			if (V.masturbationAudience >= 4) {
				resultArray.push(
					`"Look how fast <<pshe>>'s stroking <<pherself>>."`,
					`"Does it feel good? Touching your dick in front of everyone, I mean."`,
					`"I think I can see some precum dripping."`,
					`"That's it, show everyone how you masturbate."`
				);
			} else {
				resultArray.push(
					`"Is stroking it like that in front of ${V.masturbationAudience > 1 ? "us" : "me"} fun?"`,
					`"Does it feel good? Touching your dick in front of ${V.masturbationAudience > 1 ? "us" : "me"}, I mean."`,
					`"Is that precum dripping from <<pher>> cock?"`
				);
			}
			return resultArray.random();
		case "chastitypenis":
			resultArray.push(`"What is that thing you're playing with?"`);
			if (V.mouth === 0 || V.mouth === "disabled") {
				resultArray.push(`"Are you drooling just from squeezing it?"`);
			}
			if (V.masturbationAudience >= 4) {
				resultArray.push(
					`"Look how hard <<pshes>> squeezing it."`,
					`"Looks like it feels really good. It makes you look real slutty."`,
					`"That's it, show everyone how you masturbate."`
				);
			} else {
				resultArray.push(
					`"Is squeezing it like that in front of ${V.masturbationAudience > 1 ? "us" : "me"} fun?"`,
					`"Does it feel good? Touching that thing in front of ${V.masturbationAudience > 1 ? "us" : "me"}, I mean."`
				);
			}
			return resultArray.random();
		case "vagina":
			if (V.masturbationAudience >= 4) {
				resultArray.push(
					`"Look how wet she is."`,
					`"Did you want an audience that badly?"`,
					`"<<pHer>> clit is so hard."`,
					`"Yeah <<girl>>, show everyone how you play with your pussy."`
				);
			} else {
				resultArray.push(
					`"Look how wet you are."`,
					`"Did you want ${V.masturbationAudience > 1 ? "us" : "me"} to watch that badly?"`,
					`"Your clit is so hard."`,
					`"Yeah <<girl>>, show ${V.masturbationAudience > 1 ? "us" : "me"} how you play with your pussy."`
				);
			}
			if (V.fingersInVagina <= 0) resultArray.push(`"C'mon, just shove some fingers in."`);
			if (between(V.fingersInVagina, 1, 3))
				resultArray.push(
					`"Is that all ${V.masturbationAudience > 1 ? "<<pshe>>" : "the fingers you"} can fit in${
						V.masturbationAudience > 1 ? " <<pher>>? Must be a virgin." : "?"
					}"`,
					`"Come on, add another finger already. I know you can fit more than that in there."`,
					`"I can give you more than some fingers if you come here."`
				);
			if (V.fingersInVagina >= 5) {
				resultArray.push(
					`"Didn't think ${V.masturbationAudience > 1 ? "<<pshe>>" : "you"}'d be able to fit ${
						V.masturbationAudience > 1 ? "<<pher>>" : "a"
					} whole fist in there, but I guess I was wrong. What a size ${V.player.gender_appearance === "f" ? "queen" : "king"}."`
				);
			}
			if (V.fingersInVagina >= 1) resultArray.push(`"We can hear all the lewd sounds coming from your pussy, <<girl>>.`);
			return resultArray.random();
		case "anusEntrance":
			resultArray.push(
				`"I got a nice view of ${V.masturbationAudience > 1 ? "<<pher>>" : "you"} touching ${V.masturbationAudience > 1 ? "<<pher>>" : "your"} ass."`,
				`"I've never seen such a spankable ass."`,
				`"C'mon, shove in some fingers already."`,
				`"Show ${V.masturbationAudience > 1 ? "us" : "me"} how you play with your ass, slut."`
			);
			if (npcSelected && npcSelected.penis && npcSelected.penis !== "none") {
				resultArray.push(`"Fuck, I wanna rub my cock between those cheeks."`);
			}
			return resultArray.random();
		case "anus":
			return [
				`"That's it? C'mon, you can fit more than that."`,
				`"Does playing with your ass feel that good? What a slut."`,
				`"${V.masturbationAudience > 1 ? "<<pShe>>" : "You"} must have a lot of experience with that ass."`,
				`"If you need more than some fingers, I can help you."`,
				`"Holy shit, ${V.masturbationAudience > 1 ? "<<pshe>>" : "you"} did manage to shove all ${
					V.masturbationAudience > 1 ? "<<pher>>" : "your"
				} fist inside. How much action has that ass seen?"`,
			].random();
		case "chest":
			resultArray.push(
				`"Squeeze those tits, slut."`,
				`"Look at how hard ${V.masturbationAudience > 1 ? "<<pher>>" : "your"} nipples are."`,
				`"Flaunting your chest for all to see? You really are a pervert."`,
				`"Can I rub those tits too?"`
			);
			if (npcSelected && npcSelected.penis && npcSelected.penis !== "none") {
				resultArray.push(`"Fuck, I wanna shove my cock between those tits."`);
			}
			return resultArray.random();
		case "penisSize-2": // empty case on purpose
		case "penisSize-1":
			return [
				`"Such a cute clit!"`,
				`"Bet it's hard to masturbate that thing with more than a finger and a thumb."`,
				`"I've never seen such a pathetic penis."`,
			]
				.random()
				.concat(`<<ginsecurity "penis_tiny">>`);
		case "penisSize0":
			return [
				`"${V.masturbationAudience > 1 ? "<<pShes>>" : "You're"} so tiny!"`,
				`"I can't believe it's so tiny!"`,
				`"I've never seen such a pathetic penis."`,
			]
				.random()
				.concat(`<<ginsecurity "penis_tiny">>`);
		case "penisSize1":
			return [
				`"${V.masturbationAudience > 1 ? "<<pShes>>" : "You're"} so small!"`,
				`"Such a small, cute penis."`,
				`"I thought ${V.masturbationAudience > 1 ? "<<pher>>" : "your"} penis would be bigger."`,
			]
				.random()
				.concat('<<ginsecurity "penis_small">>');
		case "penisSize2":
			return [
				`"I'd love a picture of ${V.masturbationAudience > 1 ? "<<pher>>" : "your"} cute penis."`,
				`"Don't be shy, everyone should know how beautiful your penis is."`,
				`"If you don't want your penis photographed, you shouldn't act like a slut."`,
			].random();
		case "penisSize3":
			return [
				`"${V.masturbationAudience > 1 ? "<<pShes>>" : "You're"} bigger than I expected."`,
				`"Don't be shy, you should be proud of your penis."`,
				`"${V.masturbationAudience > 1 ? "<<pHer>>" : "Your"} penis is the perfect size."`,
			]
				.random()
				.concat(V.player.gender !== "m" ? `<<ginsecurity "penis_big">>` : "");
		case "penisSize4":
			return [
				`"${V.masturbationAudience > 1 ? "<<pShes>>" : "You're"} huge!"`,
				`"${V.masturbationAudience > 1 ? "<<pHer>>" : "Your"} penis is freakishly big."`,
				`"I've never seen such a huge cock."`,
			]
				.random()
				.concat('<<ginsecurity "penis_big">>');
		case "breastSizeFlat":
			if (V.player.gender_appearance === "m") {
				if (V.worn.upper.exposed >= 2) {
					return [
						`"Boys have such cute nipples."`,
						`"That sleek chest of yours is a thing of beauty."`,
						`"Don't be shy, there's nothing lewd about your nipples."`,
					].random();
				} else {
					return [
						`"Take your top off, I wanna see that fine chest."`,
						`"I wish I could take a picture of what's under <<pher>> top."`,
						`"Even when you're clothed, I can tell you have a lovely chest."`,
					].random();
				}
			} else {
				if (V.worn.upper.exposed >= 2) {
					return [
						`"Your flat chest looks delicious."`,
						`"${V.masturbationAudience > 1 ? "<<pHer>>" : "Your"} chest is so flat, ${
							V.masturbationAudience > 1 ? "<<pshe>>" : "you"
						} could pass as a boy."`,
						`"Should I take pictures of <<pher>> cute chest? It'll be useful later."`,
					]
						.random()
						.concat(`<<ginsecurity "breasts_tiny">>`);
				} else {
					return [
						`"I can't wait to see under <<pher>> top."`,
						`"Do other girls tease you for your flat chest?"`,
						`"Don't worry, you're cute even without boobs."`,
					]
						.random()
						.concat(`<<ginsecurity "breasts_tiny">>`);
				}
			}
		case "breastSizeSmall":
			if (V.player.gender_appearance === "m") {
				if (V.worn.upper.exposed >= 2) {
					return [
						`"Your flabby chest is almost like a girl's."`,
						`"Look at those little tits. I bet the other boys pick on you."`,
						`"Don't be shy, there's nothing lewd about your boy nipples, even if they look like a girl's."`,
					]
						.random()
						.concat(`<<ginsecurity "breasts_small">>`);
				} else {
					return [
						`"Take your top off, I wanna see that fine chest."`,
						`"I wish I could take a picture of what's under <<pher>> top."`,
						`"Even when you're clothed, I can tell you have a lovely chest."`,
					].random();
				}
			} else {
				if (V.worn.upper.exposed >= 2) {
					return [
						`"<<pHer>> tiny breasts are so cute."`,
						`"Now however large your breasts grow, I'll have evidence of when they were small and cute."`,
						`"Don't be ashamed of your small breasts, they're adorable."`,
					]
						.random()
						.concat(`<<ginsecurity "breasts_small">>`);
				} else {
					return [
						`"I can see the shape of <<pher>> tiny breasts beneath <<pher>> $worn.upper.name."`,
						`"Take your top off, I want a clear view of your breasts."`,
						`"I can't wait to see <<pher>> little breasts, I bet they're superb."`,
					]
						.random()
						.concat(`<<ginsecurity "breasts_small">>`);
				}
			}
		case "breastSizeNormal":
			if (V.worn.upper.exposed >= 2) {
				return [`"Your breasts are very photogenic."`, `"Your breasts are mesmerising."`, `"This picture of your breasts will come in handy later."`]
					.random()
					.concat(V.player.gender === "m" ? `<<ginsecurity "breasts_big">>` : "");
			} else {
				return [
					`"Take ${V.masturbationAudience > 1 ? "<<pher>>" : "your"} top off, I want a clear look at ${
						V.masturbationAudience > 1 ? "<<pher>>" : "your"
					} breasts."`,
					`"Don't be embarrassed, it's not like your breasts are exposed yet."`,
					`"I can tell how lovely ${V.masturbationAudience > 1 ? "<<pher>>" : "your"} breasts are, even when they're clothed."`,
				]
					.random()
					.concat(V.player.gender === "m" ? `<<ginsecurity "breasts_big">>` : "");
			}
		case "breastSizeLarge":
			if (V.worn.upper.exposed >= 2) {
				return [
					`"${V.masturbationAudience > 1 ? "<<pHer>>" : "Your"} breasts flop about so beautifully."`,
					`"Those are some impressive mammaries."`,
					`"Don't be ashamed, you should be proud of such large breasts.`,
				]
					.random()
					.concat(`<<ginsecurity "breasts_big">>`);
			} else {
				return [
					`"Are ${V.masturbationAudience > 1 ? "<<pher>>" : "your"} breasts really as large as they seem? Only one way to find out."`,
					`"Take your top off. I want a look at your large breasts, so I can think about them later."`,
					`"Breasts that large are lewd even under clothes."`,
				]
					.random()
					.concat(`<<ginsecurity "breasts_big">>`);
			}
		case "breastSizeHuge":
			if (V.worn.upper.exposed >= 2) {
				return [
					`"Those are some gigantic udders."`,
					`"You could feed every baby in town with those."`,
					`"I should get photographic proof, no one would believe how big they were otherwise."`,
				]
					.random()
					.concat(`<<ginsecurity "breasts_big">>`);
			} else {
				return [
					`"You can't fake breasts this large, surely."`,
					`"Take your top off, I want a look at those massive things."`,
					`"Breasts this huge are lewd even under clothes."`,
				]
					.random()
					.concat(`<<ginsecurity "breasts_big">>`);
			}
	}
}
