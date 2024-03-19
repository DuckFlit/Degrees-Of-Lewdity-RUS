function effectsWater() {
	DOL.Perflog.logWidgetStart("effectsWaterJs");
	const fragment = document.createDocumentFragment();

	const sWikifier = text => {
		fragment.append(Wikifier.wikifyEval(text + " "));
	};
	const span = (text, colour) => {
		const element = document.createElement("span");
		if (colour) element.classList.add(colour);
		element.textContent = text + " ";
		fragment.append(element);
	};
	const br = () => fragment.append(document.createElement("br"));

	let wetIntro = 0;
	let squidArousal = 0;

	switch (V.squidcount) {
		case 1:
			sWikifier('<span class="purple">You feel the squid tease your <<genitals>>.</span> <<garousal>><<arousal 100 "genitals">>');
			break;
		case 2:
			sWikifier(
				'<span class="purple">You feel the squids tease your <<genitals>> and chest.</span> <<garousal>><<arousal 100 "breasts">><<arousal 100 "genitals">>'
			);
			break;
		case 3:
			sWikifier(
				'<span class="purple">You feel the squids tease your <<genitals>> and <<breasts>>.</span> <<garousal>><<arousal 200 "breasts">><<arousal 100 "genitals">>'
			);
			break;
		case 4:
			sWikifier(
				'<span class="purple">You feel the squids tease your <<genitals>>, <<breasts>>, and <<bottom>>.</span> <<garousal>><<arousal 200 "breasts">><<arousal 100 "genitals">><<arousal 100 "bottom">>'
			);
			break;
		default:
			if (V.squidcount >= 5) {
				squidArousal = V.squidcount * 30;
				sWikifier(`<span class="purple">You feel ${V.squidcount} squids tease your <<genitals>>, <<breasts>>, <<bottom>>, and other parts of your body.</span>
				<<garousal>><<arousal ${squidArousal} "breasts">><<arousal ${squidArousal} "genitals">><<arousal ${squidArousal} "bottom">>`);
			}
			break;
	}
	if (!V.worn.upper.type.includes("naked") && !waterproofCheck(V.worn.upper)) {
		if (V.upperwet >= 100 && V.upperwetstage < 3) {
			V.upperwetstage = 3;
			wetIntro = 2;
			sWikifier(`<span class="lewd">Water soaks through your ${V.worn.upper.name}, exposing your <<undertop>>.</span>`);
		} else if (V.upperwet < 90 && V.upperwetstage >= 3) {
			V.upperwetstage = 2;
			sWikifier(`<span class="green">Your ${V.worn.upper.name} <<upperhas>> dried, concealing your <<undertop>>.</span>`);
		} else if (V.upperwet >= 80 && V.upperwetstage < 2) {
			V.upperwetstage = 2;
			wetIntro = 1;
			sWikifier(`<span class="purple">Your ${V.worn.upper.name} <<upperplural>> wet.</span>`);
		} else if (V.upperwet < 70 && V.upperwetstage >= 2) {
			V.upperwetstage = 1;
			sWikifier(`<span class="green">Your ${V.worn.upper.name} <<upperplural>> drying out.</span>`);
		} else if (V.upperwet >= 50 && V.upperwetstage < 1) {
			V.upperwetstage = 1;
			sWikifier(`<span class="blue">Your ${V.worn.upper.name} <<upperplural>> damp.</span>`);
		} else if (V.upperwet < 40 && V.upperwetstage >= 1) {
			V.upperwetstage = 0;
			sWikifier(`<span class="green">Your ${V.worn.upper.name} <<upperplural>> dry.</span>`);
		}
	}

	if (!V.worn.lower.type.includes("naked") && !waterproofCheck(V.worn.lower)) {
		if (V.lowerwet >= 100 && V.lowerwetstage < 3) {
			V.lowerwetstage = 3;
			wetIntro = 2;
			sWikifier(`<span class="lewd">Water soaks through your ${V.worn.lower.name}, exposing your <<undies>>.</span>`);
		} else if (V.lowerwet < 90 && V.lowerwetstage >= 3) {
			V.lowerwetstage = 2;
			sWikifier(`<span class="green">Your ${V.worn.lower.name} <<lowerhas>> dried, concealing your <<undies>>.</span>`);
		} else if (V.lowerwet >= 80 && V.lowerwetstage < 2) {
			V.lowerwetstage = 2;
			wetIntro = 1;
			sWikifier(`<span class="purple">Your ${V.worn.lower.name} <<lowerplural>> wet.</span>`);
		} else if (V.lowerwet < 70 && V.lowerwetstage >= 2) {
			V.lowerwetstage = 1;
			sWikifier(`<span class="green">Your ${V.worn.lower.name} <<lowerplural>> drying out.</span>`);
		} else if (V.lowerwet >= 50 && V.lowerwetstage < 1) {
			V.lowerwetstage = 1;
			sWikifier(`<span class="blue">Your ${V.worn.lower.name} <<lowerplural>> damp.</span>`);
		} else if (V.lowerwet < 40 && V.lowerwetstage >= 1) {
			V.lowerwetstage = 0;
			sWikifier(`<span class="green">Your ${V.worn.lower.name} <<lowerplural>> dry.</span>`);
		}
	}

	if (!V.worn.under_lower.type.includes("naked") && !playerChastity() && !waterproofCheck(V.worn.under_lower)) {
		if (V.underlowerwet >= 100 && V.underlowerwetstage < 3 && V.pantiesSoaked) {
			V.underlowerwetstage = 3;
			if (V.lowerwetstage === 3 || V.worn.lower.type.includes("naked")) {
				// If clothing above underwear is also wet, or missing
				wetIntro = 2;
				sWikifier(`<span class="lewd">Your bodily fluids soak through your ${V.worn.under_lower.name}, exposing your <<genitals>>.</span>`);
			} else if (setup.clothes.lower[clothesIndex("lower", V.worn.lower)].skirt === 1) {
				sWikifier(
					`<span class="lewd">Your bodily fluids soak through your ${V.worn.under_lower.name}, exposing your <<genitals>> to the air under your $worn.lower.name.</span>`
				);
			} else {
				span(`Your bodily fluids soak through your ${V.worn.under_lower.name}.`, "lewd");
			}
		} else if (V.underlowerwet >= 100 && V.underlowerwetstage < 3) {
			V.underlowerwetstage = 3;
			wetIntro = 2;
			sWikifier(`<span class="lewd">Water soaks through your ${V.worn.under_lower.name}, exposing your <<genitals>>.</span>`);
		} else if (V.underlowerwet < 90 && V.underlowerwetstage >= 3) {
			V.underlowerwetstage = 2;
			sWikifier(`<span class="green">Your ${V.worn.under_lower.name} <<underlowerhas>> dried, concealing your <<genitals>>.</span>`);
		} else if (V.underlowerwet >= 80 && V.underlowerwetstage < 2) {
			V.underlowerwetstage = 2;
			wetIntro = 1;
			sWikifier(`<span class="purple">Your ${V.worn.under_lower.name} <<underlowerplural>> wet.</span>`);
		} else if (V.underlowerwet < 70 && V.underlowerwetstage >= 2) {
			V.underlowerwetstage = 1;
			sWikifier(`<span class="green">Your ${V.worn.under_lower.name} <<underlowerplural>> drying out.</span>`);
		} else if (V.underlowerwet >= 50 && V.underlowerwetstage < 1) {
			V.underlowerwetstage = 1;
			sWikifier(`<span class="blue">Your ${V.worn.under_lower.name} <<underlowerplural>> damp.</span>`);
		} else if (V.underlowerwet < 40 && V.underlowerwetstage >= 1) {
			V.underlowerwetstage = 0;
			sWikifier(`<span class="green">Your ${V.worn.under_lower.name} <<underlowerplural>> dry.</span>`);
		}
	}

	if (!V.worn.under_upper.type.includes("naked") && !V.worn.under_upper.type.includes("chastity") && !waterproofCheck(V.worn.under_upper)) {
		if (V.underupperwet >= 100 && V.underupperwetstage < 3) {
			V.underupperwetstage = 3;
			wetIntro = 2;
			sWikifier(`<span class="lewd">Water soaks through your ${V.worn.under_upper.name}, exposing your <<breasts>>.</span>`);
		} else if (V.underupperwet < 90 && V.underupperwetstage >= 3) {
			V.underupperwetstage = 2;
			sWikifier(`<span class="green">Your ${V.worn.under_upper.name} <<underupperhas>> dried, concealing your <<breasts>>.</span>`);
		} else if (V.underupperwet >= 80 && V.underupperwetstage < 2) {
			V.underupperwetstage = 2;
			wetIntro = 1;
			sWikifier(`<span class="purple">Your ${V.worn.under_upper.name} <<underupperplural>> wet.</span>`);
		} else if (V.underupperwet < 70 && V.underupperwetstage >= 2) {
			V.underupperwetstage = 1;
			sWikifier(`<span class="green">Your ${V.worn.under_upper.name} <<underupperplural>> drying out.</span>`);
		} else if (V.underupperwet >= 50 && V.underupperwetstage < 1) {
			V.underupperwetstage = 1;
			sWikifier(`<span class="blue">Your ${V.worn.under_upper.name} <<underupperplural>> damp.</span>`);
		} else if (V.underupperwet < 40 && V.underupperwetstage >= 1) {
			V.underupperwetstage = 0;
			sWikifier(`<span class="green">Your ${V.worn.under_upper.name} <<underupperplural>> dry.</span>`);
		}
	}

	if (!V.possessed) {
		if (wetIntro >= 2) {
			sWikifier("<<exposure>>");
			if (V.exhibitionism >= 55) {
				span(
					!V.worn.face.type.includes("blindfold")
						? "You feel a lewd thrill as you look down and see your clothes clinging tight to your body, completely transparent."
						: "You feel a lewd thrill as your clothes cling tight to your body, completely transparent."
				);
			} else {
				span(
					!V.worn.face.type.includes("blindfold")
						? "You look down in horror at your clothes, which cling tight to your body and are completely transparent."
						: "Horror takes over you as you feel your clothes, which cling tight to your body and are completely transparent."
				);
			}
			sWikifier("<<covered>>");
			br();
			br();
		} else if (wetIntro >= 1) {
			if (V.exhibitionism >= 35) {
				span(
					!V.worn.face.type.includes("blindfold")
						? "You feel a lewd thrill as you look down and see your clothes clinging tight to your body, giving a hint of transparency."
						: "You feel a lewd thrill as your clothes cling tight to your body, giving a hint of transparency."
				);
			} else {
				span(
					!V.worn.face.type.includes("blindfold")
						? "You look down anxiously at your clothes, now clinging tightly to your body and giving a hint of transparency."
						: "You feel your clothes, now clinging tightly to your body and giving a hint of transparency."
				);
			}
			br();
			br();
		}
	}

	DOL.Perflog.logWidgetEnd("effectsWaterJs");
	return fragment;
}

Macro.add("effectswater", {
	handler() {
		const fragment = effectsWater();
		if (fragment) this.output.append(fragment);
	},
});

function effectsMakeup() {
	DOL.Perflog.logWidgetStart("effectsMakeupJs");
	const fragment = document.createDocumentFragment();

	const span = (text, colour) => {
		const element = document.createElement("span");
		if (colour) element.classList.add(colour);
		element.textContent = text + " ";
		fragment.append(element);
	};

	if (V.makeupWashed) {
		delete V.makeupWashed;
		span(`Your makeup is washed away${V.beauty >= (V.beautymax / 7) * 4 ? " revealing your natural beauty" : ""}.`, "teal");
		fragment.append(document.createElement("br"));
	}

	if (V.makeup.mascara && V.makeup.mascara_running < painToTearsLvl(V.pain) && !V.makeup.mascara.includes("waterproof")) {
		V.makeup.mascara_running = painToTearsLvl(V.pain);
	}

	DOL.Perflog.logWidgetEnd("effectsMakeupJs");
	return fragment;
}

function effects() {
	const fragment = document.createDocumentFragment();

	const sWikifier = text => {
		fragment.append(Wikifier.wikifyEval(text + " "));
	};
	const element = (element, text, colour) => {
		const result = document.createElement(element);
		if (colour) result.classList.add(colour);
		result.textContent = text + " ";
		fragment.append(result);
	};
	const br = () => fragment.append(document.createElement("br"));

	// Depricated as of current
	// if (V.newVersionData) sWikifier("<<newversionnotification>>");

	sWikifier("<<autoTakePillCheck>>");
	fragment.append(effectsWater());
	fragment.append(effectsMakeup());
	wikifier("temperature");

	V.speechcycle++;
	if (V.speechcycle >= 7) V.speechcycle = 0;

	if (!V.inwater && V.squidcount) {
		element("span", `The squid${V.squidcount > 1 ? "s" : ""} drop${V.squidcount > 1 ? "" : "s"} off you, seeking water.`, "blue");
		V.squidcount = 0;
	}
	V.inwater = 0;

	if (V.scienceproject === "ongoing" && V.scienceprojectdays === 0 && !V.scienceprojectwarning) {
		V.scienceprojectwarning = 1;
		element("span", `The science fair is being held in the town hall on Cliff Street today from ${ampm(9, 0)} until ${ampm(18, 0)}.`, "gold");
	}

	if (V.mathsproject === "ongoing" && V.mathsprojectdays === 0 && !V.mathsprojectwarning) {
		V.mathsprojectwarning = 1;
		element("span", `The maths competition is being held in the town hall on Cliff Street today from ${ampm(9, 0)} until ${ampm(18, 0)}.`, "gold");
	}

	if (V.englishPlay === "ongoing" && V.englishPlayDays === 0 && !V.englishPlayWarning) {
		V.englishPlayWarning = 1;
		element("span", `The school plays are being held on Cliff Street tonight from ${ampm(17, 0)} until ${ampm(21, 0)}.`, "gold");
	}

	if (V.innocencemessage === "start") {
		delete V.innocencemessage;
		element("span", "A profound sense of peace falls on your mind. You were upset a moment ago, but you can't remember why.", "red");
		element("i", "Your trauma has been replaced with innocence. Trauma will continue to accumulate, and will return should you run out of innocence.");
	} else if (V.innocencemessage === "end") {
		delete V.innocencemessage;
		element("span", "You have a terrible epiphany. The abuse you've endured can be ignored no longer.", "red");
		element("i", "Your innocence has been replaced by trauma.");
	}

	if (V.eventskipoverrule) V.eventskipoverrule = 0;

	if (V.underwatercheck > 0) {
		V.underwatercheck--;
	} else if (V.underwater === 1) {
		V.underwater = 0;
		sWikifier("<<oxygenrefresh>>");
	}

	sWikifier("<<updateHallucinations>>");
	switch (V.location) {
		case "town":
			if (V.flashbacktownready === 1 && V.controlled === 0) {
				delete V.flashbacktownready;
				sWikifier("<<flashbacktown>>");
			}
			break;
		case "home":
			if (V.flashbackhomeready === 1 && V.controlled === 0) {
				delete V.flashbackhomeready;
				sWikifier("<<flashbackhome>>");
			}
			break;
		case "beach":
			if (V.flashbackbeachready === 1 && V.controlled === 0) {
				delete V.flashbackbeachready;
				sWikifier("<<flashbackbeach>>");
			}
			break;
		case "underground":
			if (V.flashbackundergroundready === 1 && V.controlled === 0) {
				delete V.flashbackundergroundready;
				sWikifier("<<flashbackunderground>>");
			}
			break;
		case "school":
			if (V.flashbackschoolready === 1 && V.controlled === 0) {
				delete V.flashbackschoolready;
				sWikifier("<<flashbackschool>>");
			}
			break;
	}

	if (isPlayerNonparasitePregnancyEnding()) {
		sWikifier(
			`<span class="red">Your waters have broken.</span> ${
				["asylum", "prison", "hospital"].includes(V.location) ? "You need to find help, fast!" : "You need to head to the hospital, fast!"
			} <<ggstress>>`
		);
		br();
	}

	if (V.effectsmessage) {
		delete V.effectsmessage;

		if (V.recovered_from_pregnancy) {
			delete V.recovered_from_pregnancy;
			element("span", "You feel a familiar emptiness return in your womb.", "green");
		}

		if (V.skulduggerymessage) {
			const grade = ["S", "A+", "A", "B+", "B", "C+", "C", "D+", "D", "F+"];
			const colour = ["green", "teal", "teal", "lblue", "lblue", "blue", "blue", "purple", "purple", "pink"];
			element("span", "Your skulduggery has improved to", "gold");
			element("span", `${grade[V.skulduggerymessage - 1]}.`, colour[V.skulduggerymessage - 1]);
			delete V.skulduggerymessage;
			V.skulduggeryday = V.skulduggery;
		}

		if (V.hypnosis_deviancy_message) {
			delete V.hypnosis_deviancy_message;
			sWikifier(
				`<<hypnosisicon>> You weren't very deviant yesterday. ${
					V.hypnosis_traits.deviancy < 5 ? "The thought fills you with " : "The thought sends your mind "
				}`
			);
			switch (V.hypnosis_traits.deviancy) {
				case 1:
					element("span", "shame.", "lblue");
					break;
				case 2:
					element("span", "regret.", "blue");
					break;
				case 3:
					element("span", "guilt.", "purple");
					break;
				case 4:
					element("span", "intense guilt.", "pink");
					break;
				case 5:
					element("span", "whirring with guilt and anxiety.", "red");
					break;
			}
			sWikifier("<<gggtrauma>><<hypnosisicon>>");
		}

		// expects the use of $science_up_message, $maths_up_message, $english_up_message, $history_up_message, $science_down_message, $maths_down_message, $english_down_message, $history_down_message
		["science", "maths", "english", "history"].forEach(subject => {
			if (V[`${subject}_up_message`]) {
				delete V[`${subject}_up_message`];
				sWikifier(`You feel more confident at ${subject}. <<${subject}_skill_up_text>>`);
				br();
			} else if (V[`${subject}_down_message`]) {
				delete V[`${subject}_down_message`];
				element("span", `The ${subject} curriculum has outpaced your understanding${V[`${subject}trait`] > 0 ? ", weakening your trait" : ""}.`, "red");
				br();
			}
		});

		if (V.lactationmessage) {
			delete V.lactationmessage;
			if (V.lactating) {
				sWikifier('<span class="purple">Your <<breasts>> feel heavy and sensitive.</span>');
			} else {
				sWikifier('<span class="lblue">Your <<breasts>> feel light. They are no longer so sensitive.</span>');
			}
		}

		if (V.penisgrowthmessage !== undefined) {
			switch (V.penisgrowthmessage) {
				case 4:
					element("span", "Your penis has grown to a prodigious size.", "purple");
					break;
				case 3:
					element("span", "Your penis has grown larger.", "purple");
					break;
				case 2:
					element("span", "Your penis has grown to an unremarkable size.", "purple");
					break;
				case 1:
					element("span", "Your penis has grown, though it's still small.", "purple");
					break;
				case 0:
					element("span", "Your penis looks like it's recovering.", "purple");
					break;
				case -1:
					element("span", "Your penis looks like it's been given another chance.", "purple");
					break;
			}
			delete V.penisgrowthmessage;
		}

		if (V.penisshrinkmessage !== undefined) {
			if (V.worn.genitals.name === "chastity parasite") {
				switch (V.penisshrinkmessage) {
					case 3:
						element("span", "Your chastity parasite has shrunk, though it still hints of an impressive penis size.", "purple");
						break;
					case 2:
						element("span", "Your chastity parasite has shrunk, it hints of a much less unremarkable penis size.", "purple");
						break;
					case 1:
						element("span", "Your chastity parasite has become smaller.", "purple");
						break;
					case 0:
						element("span", "Your chastity parasite has become tiny.", "purple");
						break;
					case -1:
						element("span", "Your chastity parasite looks ridiculously tiny, you briefly wonder if your penis could still work.", "purple");
						break;
					case -2:
						element(
							"span",
							"Your chastity parasite looks like it could just have a clit inside, you briefly wonder if you still have a penis.",
							"purple"
						);
						break;
				}
			} else {
				switch (V.penisshrinkmessage) {
					case 3:
						element("span", "Your penis has shrunk, though it's still of an impressive size.", "purple");
						break;
					case 2:
						element("span", "Your penis has shrunk to an unremarkable size.", "purple");
						break;
					case 1:
						element("span", "Your penis has become smaller.", "purple");
						break;
					case 0:
						element("span", "Your penis has become tiny.", "purple");
						break;
					case -1:
						element("span", "Your penis looks like it may shrivel up.", "purple");
						break;
					case -2:
						element("span", "Your penis looks like it may never be used properly again.", "purple");
						break;
				}
			}
			delete V.penisshrinkmessage;
		}

		if (V.breastgrowthmessage !== undefined) {
			switch (V.breastgrowthmessage) {
				case 12:
					element("span", "Your large breasts feel heavy and might get in the way.", "purple");
					break;
				case 11:
					element("span", "Your large breasts feel heavy and impressive.", "purple");
					break;
				case 10:
				case 9:
					element("span", "Your breasts feel heavy.", "purple");
					break;
				case 8:
				case 7:
					element("span", "Your breasts feel a little heavier.", "purple");
					break;
				case 6:
				case 5:
					element("span", "Your small breasts will be obvious to those around you.", "purple");
					break;
				case 4:
				case 3:
					element("span", "Your small breasts might be obvious to others.", "purple");
					break;
				case 2:
				case 1:
					element("span", "Your chest feels odd; it might be growing.", "purple");
					break;
			}
			delete V.breastgrowthmessage;
		}

		if (V.milkFullPainMessage) {
			if (V.milkFullPain >= 275) {
				sWikifier(`<span class="red">You haven't been milked enough in some time. Your <<breasts>> throb painfully from being so full.</span>`);
			} else if (V.milkFullPain >= 250) {
				sWikifier(`<span class="red">You haven't been milked enough in a while. Your <<breasts>> are sore from being so full.</span>`);
			} else {
				sWikifier(`<span class="red">You haven't been milked enough recently. Your <<breasts>> feel a little sore from being so full.</span>`);
			}
			V.daily.milkFullPainMessage = true;
			delete V.milkFullPainMessage;
		}

		if (V.breastshrinkmessage !== undefined) {
			switch (V.breastshrinkmessage) {
				case 11:
					element("span", "Your large breasts feel lighter, but are still very large.", "purple");
					break;
				case 10:
				case 9:
					element("span", "Your breasts feel light, and are looking less impressive.", "purple");
					break;
				case 8:
				case 7:
					element("span", "Your breasts feel lighter.", "purple");
					break;
				case 6:
				case 5:
					element("span", "Your small breasts feel a little lighter.", "purple");
					break;
				case 4:
				case 3:
					element("span", "Your small breasts look less obvious.", "purple");
					break;
				case 2:
				case 1:
					element("span", "Your chest looks flatter.", "purple");
					break;
				case 0:
					element("span", "Your chest looks flat.", "purple");
					break;
			}
			delete V.breastshrinkmessage;
		}

		if (V.bottomgrowthmessage !== undefined) {
			switch (V.bottomgrowthmessage) {
				case 8:
					element("span", "Your large butt has become even larger.", "purple");
					break;
				case 7:
					element("span", "Your butt feels heavy.", "purple");
					break;
				case 6:
					element("span", "Your butt feels plump.", "purple");
					break;
				case 5:
					element("span", "Your butt feels round.", "purple");
					break;
				case 4:
					element("span", "Your butt feels plush.", "purple");
					break;
				case 3:
					element("span", "Your butt has gained a little weight.", "purple");
					break;
				case 2:
					element("span", "Your small butt sticks out more than you remember.", "purple");
					break;
				case 1:
					element("span", "Your butt doesn't feel so small any more.", "purple");
					break;
			}
			delete V.bottomgrowthmessage;
		}

		if (V.bottomshrinkmessage) {
			switch (V.bottomshrinkmessage) {
				case 7:
					element("span", "Your large butt feels a bit lighter.", "purple");
					break;
				case 6:
					element("span", "Your butt feels lighter.", "purple");
					break;
				case 5:
					element("span", "Your butt isn't quite as cushioned as before.", "purple");
					break;
				case 4:
					element("span", "Your butt has lost weight.", "purple");
					break;
				case 3:
					element("span", "Your butt feels a lot sleeker.", "purple");
					break;
				case 2:
				case 1:
					element("span", "Your butt feels small.", "purple");
					break;
				case 0:
					element("span", "Your butt feels tiny", "purple");
					break;
			}
			delete V.bottomshrinkmessage;
		}

		if (V.speech_attitude_bratty_message) {
			delete V.speech_attitude_bratty_message;
			element("span", "You've become too submissive to adopt a bratty demeanor in conversation.", "purple");
		}

		if (V.speech_attitude_meek_message) {
			delete V.speech_attitude_meek_message;
			element("span", "You've become too defiant to adopt a meek demeanor in conversation.", "purple");
		}

		if (V.pillsTaken) {
			element("span", "You take your daily pills.", "purple");
			if (V.pillsTakenLast) element("span", "You have run out of some of them.", "red");
			delete V.pillsTaken;
			delete V.pillsTakenLast;
		}

		if (V.hairGrowthApplied) {
			element("span", `You apply growth formula to your hair${V.hairGrowthAppliedLast ? "," : "."}`, "purple");
			if (V.hairGrowthAppliedLast) element("span", "but used the last of it.", "red");
			delete V.hairGrowthApplied;
			delete V.hairGrowthAppliedLast;
		}

		if (V.exhibitionism_message) {
			sWikifier(
				`<span class="lblue">You've spent time in public with no underwear on. You wonder if people can tell, and shiver at the thought.</span> <<exhibitionism1>>`
			);
			delete V.exhibitionism_message;
		}

		if (V.rebuy_success.length) {
			const rebuyMessage = {};
			V.rebuy_success.forEach(([item, location]) => {
				if (!rebuyMessage[location]) rebuyMessage[location] = [];
				rebuyMessage[location].push(item);
			});
			Object.entries(rebuyMessage).forEach(([location, items]) => {
				element(
					"span",
					`Your ${formatList(items, "and", true)} signal${items.length > 1 ? "s" : ""} for a replacement${
						V.wardrobes[location]
							? ` to the ${V.wardrobes[location].name}`
							: `. (Likely One-off update error, no need to report unless seen multiple times in the same save) ${
									Array.isArray(V.rebuy_success) ? JSON.stringify(V.rebuy_success) : ""
							  }`
					}.
				`,
					"lblue"
				);
			});
			V.rebuy_success = [];
		}

		if (V.rebuy_failure.length) {
			element(
				"span",
				`Your ${formatList(V.rebuy_failure, "and", true)} signal${
					V.rebuy_failure.length > 1 ? "s" : ""
				} for a replacement, but you don't have enough money.`,
				"purple"
			);
			V.rebuy_failure = [];
		}

		if (V.masochism_message) {
			switch (V.masochism_message) {
				case "up 1":
					element("span", "Your thoughts wander over the attacks you've suffered. You shiver.", "blue");
					element("i", "You've become a guilty masochist.", "blue");
					break;
				case "up 2":
					element("span", "Your thoughts turn to the attacks you've suffered. A thrill follows, unbeckoned.", "purple");
					element("i", "You've become a normal masochist.", "purple");
					break;
				case "up 3":
					element("span", "Your body yearns for more abuse.", "pink");
					element("i", "You've become a hardened masochist.", "pink");
					break;
				case "up 4":
					element("span", "Your body craves more abuse.", "red");
					element("i", "You've become a drooling masochist.", "red");
					break;
				case "down 0":
					element("i", "You are no longer a masochist.", "lblue");
					break;
				case "down 1":
					element("span", "You are no longer so masochistic, and can only be considered a", "blue");
					element("i", "guilty masochist.", "blue");
					break;
				case "down 2":
					element("span", "You are no longer so masochistic, and can only be considered a", "purple");
					element("i", "normal masochist.", "purple");
					break;
				case "down 3":
					element("span", "You are no longer so masochistic, and can only be considered a", "pink");
					element("i", "hardened masochist.", "pink");
					break;
			}
			delete V.masochism_message;
		}

		if (V.sadism_message) {
			switch (V.sadism_message) {
				case "up 1":
					element("span", "Your thoughts turn to the pain you've inflicted. You shiver.", "blue");
					element("i", "You've become a guilty sadist.", "blue");
					break;
				case "up 2":
					element("span", "Your thoughts turn to the pain you've inflicted. A thrill follows, unbeckoned.", "purple");
					element("i", "You've become a normal sadist.", "purple");
					break;
				case "up 3":
					element("span", "You yearn to hurt others.", "pink");
					element("i", "You've become a hardened sadist.", "pink");
					break;
				case "up 4":
					element("span", "If they want to play rough, so be it.", "red");
					element("i", "You've become a vengeful sadist.", "red");
					break;
				case "down 0":
					element("i", "You are no longer a sadist.", "lblue");
					break;
				case "down 1":
					element("span", "You are no longer so sadistic, and can only be considered a", "blue");
					element("i", "guilty sadist.", "blue");
					break;
				case "down 2":
					element("span", "You are no longer so sadistic, and can only be considered a", "purple");
					element("i", "normal sadist.", "purple");
					break;
				case "down 3":
					element("span", "You are no longer so sadistic, and can only be considered a", "pink");
					element("i", "hardened sadist.", "pink");
					break;
			}
			delete V.sadism_message;
		}

		if (V.school_crossdress_message) {
			switch (V.school_crossdress_message) {
				case 5:
					element("span", "Your crossdressing has become common knowledge at school. Everyone knows, including the teachers.", "red");
					break;
				case 4:
					element("span", "Rumours of your crossdressing are spreading throughout the school.", "pink");
					break;
				case 3:
					element("span", "Rumours of your crossdressing are spreading, and have become a popular topic of conversation at school.", "purple");
					break;
				case 2:
					element("span", "Whispers of your crossdressing are spreading through the school.", "blue");
					break;
				case 1:
					element("span", "A few cliques at school have begun whispering of your crossdressing.", "lblue");
					break;
			}
			delete V.school_crossdress_message;
		}

		if (V.school_herm_message) {
			switch (V.school_herm_message) {
				case 5:
					element("span", "Everyone at school has heard of your unique genitalia, including the teachers.", "red");
					break;
				case 4:
					element("span", "Rumours of your unique genitalia have spread throughout the school.", "pink");
					break;
				case 3:
					element(
						"span",
						"It sounds far-fetched to many, but the school is rife with gossip about a student with both boy and girl parts.",
						"purple"
					);
					break;
				case 2:
					element("span", "Rumours of a student with both boy and girl parts are spreading through the school.", "blue");
					break;
				case 1:
					element("span", "A few cliques at school have begun whispering about a student with both boy and girl parts.", "lblue");
					break;
			}
			delete V.school_herm_message;
		}

		// expects the use of $orgasm_trait_message, $molest_trait_message, $rape_trait_message, $bestiality_trait_message, $tentacle_trait_message, $vore_trait_message, $milk_trait_message and $cum_trait_message
		[
			["orgasm", "Hedonist", "Orgasm Addict"],
			["molest", "Graceful", "Plaything"],
			["rape", "Survivor", "Fucktoy"],
			["bestiality", "Tamer", "Bitch"],
			["tentacle", "Witch", "Prey"],
			["vore", "Daredevil", "Tasty"],
			["milk", "Milk Enthusiast", "Milk Addict"],
			["cum", "Cumoisseur", "Cum Dump"],
		].forEach(([variable, defiantName, submissiveName]) => {
			if (V[`${variable}_trait_message`]) {
				element("span", `You've gained the "${V.submissive <= 850 ? defiantName : submissiveName}" trait.`, "gold");
				delete V[`${variable}_trait_message`];
			}
		});

		if (V.nectarmessage) {
			switch (V.nectarmessage) {
				case "traitGain":
					element(
						"span",
						`You find yourself craving more sweet nectar. You've gained the "${V.submissive <= 850 ? "Dendrophile" : "Plant Lover"}" and`,
						"purple"
					);
					element("span", '"Nectar Addict"', "red");
					element("span", "traits.", "purple");
					break;
				case "traitLost":
					element(
						"span",
						`The cravings for nectar finally subside. You've lost the "${V.submissive <= 850 ? "Dendrophile" : "Plant Lover"}" and`,
						"lblue"
					);
					element("span", '"Nectar Addict"', "red");
					element("span", "traits.", "lblue");
					break;
				case "withdrawals":
					sWikifier(
						'<span class="red">Your body craves nectar, and has begun to suffer from withdrawals.</span> <<stress 12>><<ggstress>><<trauma 12>><<ggtrauma>><<physique_loss 4>><<lphysique>>'
					);
					br();
					break;
			}
			delete V.nectarmessage;
		}

		if (V.hiddenTransformMessage) {
			element(
				"span",
				V.hiddenTransformMessage === 1
					? "Your mental state is too fragile to continue hiding your inner self."
					: "Hiding your inner self takes a toll on your mental state.",
				"red"
			);
			delete V.hiddenTransformMessage;
		}

		if (V.prof_spray_message) {
			element("span", "Your spray was accurate. You didn't need to use a full cartridge, saving ammo.", "green");
			delete V.prof_spray_message;
		}

		if (V.community_message === "missed") {
			sWikifier('<span class="red">You missed community service. The police have taken note.</span><<crime "obstruction">>');
			delete V.community_message;
		}

		if (V.toy_message) {
			element("span", "Sex toys are becoming more popular throughout town.", "pruple");
			delete V.toy_message;
		}

		if (V.loveInterest_message === 1) {
			element("i", "You feel that having multiple lovers is wrong. You can no longer choose more than one love interest.", "blue");
			delete V.loveInterest_message;
			delete V.loveInterestAwareMessage;
		} else if (V.loveInterest_message === 2 && !V.loveInterestAwareMessage) {
			element("i", "Your mind is open to the possibility of multiple lovers. You may now choose a second love interest.", "pink");
			delete V.loveInterest_message;
			V.loveInterestAwareMessage = 1;
		}

		if (V.fallenangelmessage) {
			sWikifier('<span class="red">You feel dark presence clawing at your skin.</span> <<gstress>>');
			V.stress += V.stressmax;
			delete V.fallenangelmessage;
		}

		if (V.demonmessage) {
			sWikifier('<span class="red">You feel a terrible light sear through you.</span> <<gstress>>');
			V.stress += V.stressmax;
			delete V.demonmessage;
		}

		if (V.foxCrimeMessage) {
			element(
				"span",
				V.blackmoney >= 100
					? "You feel an animalistic satisfaction towards your growing collection of stolen goods."
					: "You feel an animalistic satisfaction as you commit such crimes.",
				"gold"
			);
			delete V.foxCrimeMessage;
		}

		if (V.bookoverduemessage) {
			if (V.bookoverduemessage === 1) {
				sWikifier(`<<crimeUp 5 "thievery">><<delinquency ${5 / 4}>>`);
				element("span", "You have a book severely overdue, and the police have been informed.", "red");
			} else {
				sWikifier(`<<delinquency ${3 / 4}>>`);
				element("span", "You have a book overdue, and have incurred delinquency.", "red");
			}
			delete V.bookoverduemessage;
		}

		if (V.wraithcompoundmessage) {
			element("span", "A fell mist hangs over Elk Street.", "red");
			delete V.wraithcompoundmessage;
		}

		if (V.earSlimebreastsParasite || V.earSlimePenisParasite || V.earSlimeClitParasite) {
			const parasiteCount = (V.earSlimebreastsParasite ? 1 : 0) + (V.earSlimePenisParasite ? 1 : 0) + (V.earSlimeClitParasite ? 1 : 0);
			let parasiteMessage = "";
			if (V.earSlimebreastsParasite) parasiteMessage += `A new parasite forms around your ${V.player.breastsize >= 1 ? "breasts" : "chest"}`;

			if (V.earSlimePenisParasite) {
				parasiteMessage += parasiteMessage ? " and the base of your penis" : "A new parasite forms around the base of your penis";
			}

			if (V.earSlimeClitParasite) {
				if (V.earSlime.focus === "pregnancy") {
					parasiteMessage += parasiteMessage ? " and <<pussy>>" : "A new parasite forms around your <<pussy>>";
				} else {
					const looks = playerChastity("vagina") ? "feels" : "looks";
					parasiteMessage += parasiteMessage
						? ` and clit. It ${looks} like you have your own penis now`
						: `A new parasite forms around the base of your clit, it ${looks} similar to a penis`;
				}
				element("span", `A satisfied warmth fills you. ${parasiteMessage}`, "blue");
				element("span", `You can tell that ${parasiteCount > 1 ? "they are" : "it's"} from the slimes in your ears.`);
				if (V.earSlimePenisParasite && V.earSlimePenisParasite !== 1) {
					element("span", `The previous ${V.earSlimePenisParasite} falls off shortly after it finishes growing.`, "red");
				}
				if (V.earSlimeClitParasite && V.earSlimeClitParasite !== 1) {
					element("span", `The previous ${V.earSlimeClitParasite} falls off shortly after it finishes growing.`, "red");
				}
				delete V.earSlimebreastsParasite;
				delete V.earSlimePenisParasite;
				delete V.earSlimeClitParasite;
			}
		}

		if (V.penisslimebrokenchastitymessage) {
			element(
				"span",
				`The parasite at the base of your genitals frees you from the${
					V.penisslimecagemessage === 1 ? ", and almost just as quickly, a new chastity parasite forms around your penis" : ""
				}.`,
				"purple"
			);
			delete V.penisslimecagemessage;
			delete V.penisslimebrokenchastitymessage;
		}

		if (V.penisslimecagemessage) {
			element(
				"span",
				V.penisslimecagemessage === 1 ? "A new chastity parasite forms around your penis." : "Your chastity parasite looks brand new again.",
				"pruple"
			);
			delete V.penisslimecagemessage;
		}

		if (V.pregnancyDailyEvent) {
			sWikifier("<<pregnancyDailyEvent>>");
			delete V.pregnancyDailyEvent;
		}

		if (V.daily.parasiteEvent) {
			let minDaysLeft;
			if (V.sexStats.vagina.pregnancy.type === "parasite") {
				minDaysLeft = V.sexStats.vagina.pregnancy.fetus.reduce((prev, curr) => (prev.daysLeft < curr.daysLeft ? prev.daysLeft : curr.daysLeft), 30);
			}
			if (V.sexStats.anus.pregnancy.type === "parasite") {
				minDaysLeft = V.sexStats.anus.pregnancy.fetus.reduce(
					(prev, curr) => (prev.daysLeft < curr.daysLeft ? prev.daysLeft : curr.daysLeft),
					minDaysLeft || 30
				);
			}
			const stressMulti = Math.clamp(2 - V.sexStats.anus.pregnancy.motherStatus + V.sexStats.vagina.pregnancy.motherStatus, 0, 2);
			const arousalMulti = Math.clamp(1 + V.sexStats.anus.pregnancy.motherStatus + V.sexStats.vagina.pregnancy.motherStatus, 1, 3);
			let arousalGain = 0;
			if (V.daily.parasiteEvent.includes("anus3") && V.daily.parasiteEvent.includes("vagina3")) V.daily.parasiteEvent.delete("vagina3");

			V.daily.parasiteEvent.forEach(event => {
				switch (event) {
					case "anus0":
					case "vagina0":
						if (V.pregnancyStats.parasiteDoctorEvents >= 4) {
							sWikifier(
								`You feel ${V.pregnancyStats.namesParasitesChild ? "your grown child" : "the grown parasite"} in your ${
									event === "anus0" ? "stomach" : "uterus"
								}. <<ggarousal>>`
							);
						} else {
							sWikifier(
								`You feel something large move around in your ${
									event === "anus0" ? "stomach" : "uterus"
								}. Might be best to go to the hospital again. <<ggarousal>>`
							);
						}
						arousalGain += 2000;
						break;
					case "anus1":
					case "vagina1":
						if (V.pregnancyStats.parasiteDoctorEvents >= 2) {
							sWikifier(
								`You feel one of ${V.pregnancyStats.namesParasitesChild ? "your children" : "the parasites"} move around in your ${
									event === "anus1" ? "stomach" : "uterus"
								}. <<ggarousal>>${stressMulti ? "<<gstress>>" : ""}`
							);
						} else {
							sWikifier(`You feel something move around in your ${event === "anus1" ? "stomach" : "uterus"}. Might be best to go to the hospital.
							<<ggarousal>>${stressMulti ? "<<gstress>>" : ""}`);
						}
						arousalGain += (arousalMulti * 500) / (minDaysLeft + 1);
						V.stress += 300 * stressMulti;
						break;
					case "anus2":
					case "vagina2":
						sWikifier(
							`Your ${
								event === "anus2" ? "stomach" : "uterus"
							} rumbles a little. You hope the noise hasn't attracted any attention. <<garousal>>${stressMulti ? "<<gstress>>" : ""}`
						);
						arousalGain += (arousalMulti * 250) / (minDaysLeft + 1);
						V.stress += 200 * stressMulti;
						break;
					case "anus3":
					case "vagina3":
						sWikifier(`You feel a little lightheaded for a moment.${stressMulti ? "<<gstress>>" : ""}`);
						V.stress += 100 * stressMulti;
						break;
				}
			});
			if (arousalGain) sWikifier(`<<arousal ${Math.clamp(arousalGain, 0, 10000)}>>`);
			br();
			delete V.daily.parasiteEvent;
		}
	}

	if (numberOfEarSlime() && V.earSlime.event) {
		if (V.earSlime.event.includes("get sperm into your") && V.earSlime.event.includes("completed") && V.earSlime.eventTimer <= 2) {
			element(
				"span",
				`The slime in your ear is pleased that you completed its task of getting sperm into your ${V.player.vaginaExist ? "vagina" : "anus"}.`,
				"green"
			);
			sWikifier(`<<pain -4>><<stress -6>><<trauma -12>><<lpain>><<lltrauma>><<lstress>>`);
			br();
			V.earSlime.event = "";
		} else if (V.earSlime.event.includes("get your own sperm into your") && V.earSlime.event.includes("completed") && V.earSlime.eventTimer <= 2) {
			element(
				"span",
				`The slime in your ear is pleased that you completed its task of getting your own sperm into your ${V.player.vaginaExist ? "vagina" : "anus"}.`,
				"green"
			);
			sWikifier(`<<pain -4>><<stress -6>><<trauma -12>><<lpain>><<lltrauma>><<lstress>>`);
			if (V.earSlime.growth >= 100 && V.earSlime.focus === "pregnancy" && V.worn.genitals.name === "naked") {
				sWikifier(`<span class="purple">A new chastity parasite forms around your penis.</span> <<genitalswear 8>>`);
				V.worn.genitals.origin = "ear slime";
			}
			br();
			V.earSlime.event = "";
		} else if (V.earSlime.eventTimer <= 2 || (V.earSlime.noSleep && Time.dayState !== "night")) {
			if (V.earSlime.startedThreats) {
				element("span", "The slime in your ear punishes you for failing to complete your task.", "red");
				sWikifier(`<<ggpain>><<ggtrauma>><<ggstress>><<pain 16>><<stress 12>><<trauma 12>>`);
				V.earSlime.defyCooldown += 4;
			} else {
				element("span", "The slime in your ear is upset you were unable to complete what you said you would do.", "cyan");
			}
			br();
			V.earSlime.event = "";
			V.earSlime.noSleep = false;
		}
	}

	sWikifier("<<integritycheck>><<exposure>>");

	V.orgasmdown -= 1;

	if (V.exposed >= 1 && V.exposedcheck === 1) {
		V.exposedcheck = 0;
		sWikifier("You feel self-conscious about your <<nudity>>.");
		br();
	}

	if (V.timer >= 1) V.timer--;
	// V.turnCount++;

	sWikifier("<<bindings>>");

	if (V.worn.genitals.cursed === 1 && V.worn.genitals.integrity <= 0) V.worn.genitals.type.push("broken");

	sWikifier("<<heelsUpdate>>");

	if (V.combat) sWikifier("<<pass 10 seconds>>");

	if (fragment.children.length) br();

	V.menu = 0;

	if (V.combat === 0 && V.ironmanmode === true) IronMan.scheduledSaves();

	return fragment;
}

Macro.add("effects", {
	handler() {
		DOL.Perflog.logWidgetStart("effectsJs");
		const fragment = effects();
		this.output.append(fragment);
		DOL.Perflog.logWidgetEnd("effectsJs");
	},
});
