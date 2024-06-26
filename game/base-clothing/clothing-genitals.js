/* For any item that has a colour_combat tag, set it to 0 if that item ever gets its own combat sprites. */
function initGenitals() {
	setup.clothes.genitals = [
		{
			index: 0,
			name: "ничего",
			name_cap: "Ничего",
			variable: "naked",
			integrity: 0,
			integrity_max: 0,
			fabric_strength: 0,
			reveal: 1,
			word: "n",
			plural: 0,
			colour: 0,
			colour_options: [],
			exposed: 1,
			exposed_base: 1,
			vagina_exposed: 1,
			vagina_exposed_base: 1,
			anus_exposed: 1,
			anus_exposed_base: 1,
			type: ["naked"],
			gender: "n",
			cost: 0,
			description: "ничего",
			shop: [],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			back_img: 0,
			cursed: 0,
			location: 0,
			hideUnderLower: [],
			iconFile: 0,
			accIcon: 0,
			mainImage: 0,
		},
		{
			index: 1,
			name: "пояс верности",
			name_cap: "Пояс верности",
			variable: "chastitybelt",
			integrity: 2000,
			integrity_max: 2000,
			fabric_strength: 15,
			reveal: 1000,
			word: "a",
			one_piece: 0,
			state: "waist",
			state_base: "waist",
			plural: 1,
			colour: 0,
			colour_options: [],
			colour_combat: 0,
			exposed: 0,
			exposed_base: 0,
			vagina_exposed: 0,
			vagina_exposed_base: 0,
			anus_exposed: 1,
			anus_exposed_base: 1,
			type: ["chastity", "hidden", "constricting"],
			anal_shield: 0,
			set: "genitals",
			gender: "f",
			femininity: 300,
			cost: 0,
			description: "Ограничительный.",
			shop: [],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			penis_img: 0,
			high_img: 0,
			cursed: 1,
			location: 0,
			hideUnderLower: ["leotard bottom", "unitard bottom"],
			altDamage: "metal",
			iconFile: 0,
			accIcon: 0,
		},
		{
			index: 2,
			name: "клетка целомудрия",
			name_cap: "Клетка целомудрия",
			variable: "chastitycage",
			integrity: 2000,
			integrity_max: 2000,
			fabric_strength: 15,
			reveal: 1000,
			word: "a",
			one_piece: 0,
			state: "waist",
			state_base: "waist",
			plural: 1,
			colour: 0,
			colour_options: [],
			colour_combat: 0,
			exposed: 1,
			exposed_base: 1,
			vagina_exposed: 0,
			vagina_exposed_base: 0,
			anus_exposed: 1,
			anus_exposed_base: 1,
			type: ["chastity", "cage"],
			anal_shield: null,
			set: "genitals",
			gender: "m",
			cost: 0,
			description: "Ограничительный.",
			shop: [],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			penis_img: 0,
			high_img: 0,
			cursed: 1,
			location: 0,
			hideUnderLower: [
				"plain panties",
				"bikini bottoms",
				"lace panties",
				"briefs",
				"school swimsuit bottom",
				"school swim shorts",
				"leotard bottom",
				"unitard bottom",
				"skimpy leotard bottom",
				"foreign school swimsuit bottom",
				"swimsuit bottom",
				"bunny leotard bottom",
				"boyshorts",
				"catgirl panties",
				"G-string",
				"microkini bottom",
				"speedo",
				"striped panties",
				"thong",
				"classic plain panties",
				"classic bikini bottoms",
				"classic lace panties",
				"classic briefs",
				"classic school swimsuit bottom",
				"denim panties",
				"denim thong",
			],
			altDamage: "metal",
			iconFile: 0,
			accIcon: 0,
		},
		{
			index: 3,
			name: "золотой пояс верности",
			name_cap: "Золотой пояс верности",
			variable: "goldchastitybelt",
			integrity: 6000,
			integrity_max: 6000,
			fabric_strength: 15,
			reveal: 1000,
			word: "a",
			one_piece: 0,
			state: "waist",
			state_base: "waist",
			plural: 1,
			colour: 0,
			colour_options: [],
			colour_combat: 0,
			exposed: 0,
			exposed_base: 0,
			vagina_exposed: 0,
			vagina_exposed_base: 0,
			anus_exposed: 1,
			anus_exposed_base: 1,
			type: ["chastity", "hidden", "constricting"],
			anal_shield: 0,
			set: "genitals",
			gender: "f",
			femininity: 300,
			cost: 0,
			description: "Роскошный и Ограничительный.",
			shop: [],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			penis_img: 0,
			high_img: 0,
			cursed: 1,
			location: 0,
			hideUnderLower: ["leotard bottom", "unitard bottom"],
			altDamage: "metal",
			iconFile: 0,
			accIcon: 0,
		},
		{
			index: 4,
			name: "фетишистский пояс верности",
			name_cap: "Фетишистский пояс верности",
			variable: "chastitybeltfetish",
			integrity: 1500,
			integrity_max: 1500,
			fabric_strength: 12,
			reveal: 1000,
			word: "a",
			one_piece: 0,
			state: "waist",
			state_base: "waist",
			plural: 1,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "white", "yellow", "tangerine", "cyan"],
			colour_sidebar: 1,
			colour_combat: 0,
			exposed: 0,
			exposed_base: 0,
			vagina_exposed: 0,
			vagina_exposed_base: 0,
			anus_exposed: 1,
			anus_exposed_base: 1,
			type: ["chastity", "hidden", "constricting"],
			anal_shield: 0,
			set: "genitals",
			gender: "f",
			femininity: 300,
			cost: 10000,
			description: "Ограничительный.",
			shop: [],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			penis_img: 0,
			high_img: 0,
			cursed: 0,
			location: 0,
			hideUnderLower: ["leotard bottom", "unitard bottom"],
			altDamage: "plastic",
			iconFile: "chastity_belt.png",
			accIcon: 0,
		},
		{
			index: 5,
			name: "фетишистская клетка целомудрия",
			name_cap: "Фетишистская клетка целомудрия",
			variable: "chastitycagefetish",
			integrity: 1500,
			integrity_max: 1500,
			fabric_strength: 12,
			reveal: 10000,
			word: "a",
			one_piece: 0,
			state: "waist",
			state_base: "waist",
			plural: 1,
			colour: 0,
			colour_options: ["black", "grey", "blue", "brown", "green", "pink", "purple", "red", "yellow", "tangerine", "cyan"],
			colour_sidebar: 1,
			colour_combat: 0,
			exposed: 1,
			exposed_base: 1,
			vagina_exposed: 0,
			vagina_exposed_base: 0,
			anus_exposed: 1,
			anus_exposed_base: 1,
			type: ["chastity", "cage"],
			anal_shield: null,
			set: "genitals",
			gender: "m",
			cost: 10000,
			description: "Ограничительный.",
			shop: [],
			accessory: 1,
			accessory_colour: 0,
			accessory_colour_options: [],
			penis_img: 0,
			high_img: 0,
			cursed: 0,
			location: 0,
			hideUnderLower: [
				"plain panties",
				"bikini bottoms",
				"lace panties",
				"briefs",
				"school swimsuit bottom",
				"school swim shorts",
				"leotard bottom",
				"unitard bottom",
				"skimpy leotard bottom",
				"foreign school swimsuit bottom",
				"swimsuit bottom",
				"bunny leotard bottom",
				"boyshorts",
				"catgirl panties",
				"G-string",
				"microkini bottom",
				"speedo",
				"striped panties",
				"thong",
				"classic plain panties",
				"classic bikini bottoms",
				"classic lace panties",
				"classic briefs",
				"classic school swimsuit bottom",
			],
			altDamage: "plastic",
			iconFile: 0,
			accIcon: "chastity_cage.png",
		},
		{
			index: 6,
			name: "маленькая клетка целомудрия",
			name_cap: "Маленькая клетка целомудрия",
			variable: "smallchastitycage",
			integrity: 4000,
			integrity_max: 4000,
			fabric_strength: 20,
			reveal: 1000,
			word: "a",
			one_piece: 0,
			state: "waist",
			state_base: "waist",
			plural: 1,
			colour: 0,
			colour_options: ["pink"],
			colour_sidebar: 1,
			colour_combat: 0,
			exposed: 1,
			exposed_base: 1,
			vagina_exposed: 0,
			vagina_exposed_base: 0,
			anus_exposed: 1,
			anus_exposed_base: 1,
			type: ["chastity", "cage", "shrinking"],
			anal_shield: null,
			set: "genitals",
			gender: "m",
			cost: 0,
			description: "Сильно ограничительная.",
			shop: [],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			penis_img: 0,
			high_img: 0,
			cursed: 1,
			location: 0,
			hideUnderLower: [
				"plain panties",
				"bikini bottoms",
				"lace panties",
				"briefs",
				"school swimsuit bottom",
				"school swim shorts",
				"leotard bottom",
				"unitard bottom",
				"skimpy leotard bottom",
				"foreign school swimsuit bottom",
				"swimsuit bottom",
				"bunny leotard bottom",
				"boyshorts",
				"catgirl panties",
				"G-string",
				"microkini bottom",
				"highwaisted microkini bottom",
				"speedo",
				"striped panties",
				"thong",
				"classic plain panties",
				"classic bikini bottoms",
				"classic lace panties",
				"classic briefs",
				"classic school swimsuit bottom",
			],
			altDamage: "metal",
			iconFile: 0,
			accIcon: 0,
		},
		{
			index: 7,
			name: "плоская клетка целомудрия",
			name_cap: "Плоская клетка целомудрия",
			variable: "flatchastitycage",
			integrity: 6000,
			integrity_max: 6000,
			fabric_strength: 30,
			reveal: 1000,
			word: "a",
			one_piece: 0,
			state: "waist",
			state_base: "waist",
			plural: 1,
			colour: 0,
			colour_options: ["pink"],
			colour_sidebar: 1,
			colour_combat: 0,
			exposed: 1,
			exposed_base: 1,
			vagina_exposed: 0,
			vagina_exposed_base: 0,
			anus_exposed: 1,
			anus_exposed_base: 1,
			type: ["chastity", "cage", "shrinking"],
			anal_shield: null,
			set: "genitals",
			gender: "m",
			cost: 0,
			description: "Полностью ограничивает вас.",
			shop: [],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			penis_img: 0,
			high_img: 0,
			cursed: 1,
			location: 0,
			hideUnderLower: [
				"plain panties",
				"bikini bottoms",
				"lace panties",
				"briefs",
				"school swimsuit bottom",
				"school swim shorts",
				"leotard bottom",
				"unitard bottom",
				"skimpy leotard bottom",
				"foreign school swimsuit bottom",
				"swimsuit bottom",
				"bunny leotard bottom",
				"boyshorts",
				"catgirl panties",
				"G-string",
				"microkini bottom",
				"highwaisted microkini bottom",
				"speedo",
				"striped panties",
				"thong",
				"classic plain panties",
				"classic bikini bottoms",
				"classic lace panties",
				"classic briefs",
				"classic school swimsuit bottom",
			],
			altDamage: "metal",
			iconFile: 0,
			accIcon: 0,
		},
		{
			index: 8,
			name: "паразит целомудрия",
			name_cap: "Паразит целомудрия",
			variable: "slimechastitycage",
			integrity: 500,
			integrity_max: 500,
			fabric_strength: 10,
			reveal: 1000,
			word: "a",
			one_piece: 0,
			state: "waist",
			state_base: "waist",
			plural: 1,
			colour: 0,
			colour_options: ["red"],
			colour_sidebar: 1,
			colour_combat: 0,
			exposed: 1,
			exposed_base: 1,
			vagina_exposed: 0,
			vagina_exposed_base: 0,
			anus_exposed: 1,
			anus_exposed_base: 1,
			type: ["chastity", "cage", "shrinking"],
			anal_shield: null,
			set: "genitals",
			gender: "f",
			cost: 0,
			description: "Полностью ограждительный, восстанавливается ежедневно.",
			shop: [],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			penis_img: 0,
			high_img: 0,
			cursed: 1,
			location: 0,
			hideUnderLower: [
				"plain panties",
				"bikini bottoms",
				"lace panties",
				"briefs",
				"school swimsuit bottom",
				"school swim shorts",
				"leotard bottom",
				"unitard bottom",
				"skimpy leotard bottom",
				"foreign school swimsuit bottom",
				"swimsuit bottom",
				"bunny leotard bottom",
				"boyshorts",
				"catgirl panties",
				"G-string",
				"microkini bottom",
				"speedo",
				"striped panties",
				"thong",
				"classic plain panties",
				"classic bikini bottoms",
				"classic lace panties",
				"classic briefs",
				"classic school swimsuit bottom",
			],
			altDamage: "parasite",
			iconFile: 0,
			accIcon: 0,
			penisSize: true,
		},
	];

	/*
		Clothes that modders add go into this array, this should be empty in the base game at all times.
		These items should have a `modder` variable with a the modders name in a short string
	*/
	setup.moddedClothes.genitals = [];

	setup.moddedClothes.genitals.forEach((x, i) => (x.index = setup.clothes.genitals.length + i));
	setup.clothes.genitals.push(...setup.moddedClothes.genitals);
}
window.initGenitals = initGenitals;
