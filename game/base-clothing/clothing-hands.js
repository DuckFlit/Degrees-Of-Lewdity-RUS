/* For any item that has a colour_combat tag, set it to 0 if that item ever gets its own combat sprites.

Warmth checklist:
	Base: 0
	Covers hands: +1
	Covers arms: +1

	Materials
	Thin: -1
	Normal: 0
	Thick: +1

	Max warmth: 3
*/
function initHands() {
	setup.clothes.hands = [
		{
			index: 0,
			name: "naked",
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
			type: ["naked"],
			gender: "n",
			warmth: 0,
			cost: 0,
			description: "ничего",
			shop: [],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			back_img: 0,
			cursed: 0,
			location: 0,
			iconFile: 0,
			accIcon: 0,
			mainImage: 0,
		},

		{
			index: 1,
			name: "fingerless gloves",
			name_cap: "Варежки",
			variable: "fingerlessgloves",
			integrity: 50,
			integrity_max: 50,
			fabric_strength: 20,
			reveal: 1,
			word: "n",
			plural: 1,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			type: ["normal"],
			gender: "n",
			warmth: 1,
			cost: 1000,
			description: "Перчатки без разделения пальцев, которые согреют ваши руки.",
			shop: ["clothing"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			back_img: 0,
			cursed: 0,
			location: 0,
			iconFile: "fingerless_gloves.png",
			accIcon: 0,
			mainImage: 0,
			leftImage: 1,
			rightImage: 1,
		},

		{
			index: 2,
			name: "mittens",
			name_cap: "рукавицы",
			variable: "mittens",
			integrity: 200,
			integrity_max: 200,
			fabric_strength: 20,
			reveal: 1,
			word: "n",
			plural: 1,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			type: ["normal"],
			gender: "n",
			warmth: 2,
			cost: 400,
			description: "Они не рассчитаны на отдельные пальцы, но это не должно быть проблемой.",
			shop: ["clothing"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			back_img: 0,
			cursed: 0,
			location: 0,
			iconFile: "mittens.png",
			accIcon: 0,
			mainImage: 0,
			leftImage: 1,
			rightImage: 1,
		},

		{
			index: 3,
			name: "arm warmers",
			name_cap: "Митенки",
			variable: "armwarmers",
			integrity: 100,
			integrity_max: 100,
			fabric_strength: 20,
			reveal: 100,
			word: "n",
			plural: 1,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			type: ["normal"],
			gender: "n",
			warmth: 2,
			cost: 1000,
			description: "Держат руки в тепле.",
			shop: ["clothing"],
			accessory: 1,
			accessory_colour: 0,
			accessory_colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			accessory_colour_sidebar: 1,
			back_img: 0,
			cursed: 0,
			location: 0,
			iconFile: "arm_warmers.png",
			accIcon: "arm_warmers_acc.png",
			mainImage: 0,
			leftImage: 1,
			rightImage: 1,
		},

		{
			index: 4,
			name: "lace arm warmers",
			name_cap: "Кружевные митенки",
			variable: "lacewarmers",
			integrity: 30,
			integrity_max: 30,
			fabric_strength: 15,
			reveal: 500,
			word: "n",
			plural: 1,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "pale tangerine", "teal", "pale white", "pale yellow", "custom"],
			colour_sidebar: 1,
			type: ["formal"],
			gender: "f",
			femininity: 200,
			warmth: 2,
			cost: 2500,
			description: "Fashionable.",
			shop: ["clothing"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			back_img: 0,
			cursed: 0,
			location: 0,
			iconFile: "lace_arm_warmers.png",
			accIcon: 0,
			mainImage: 0,
			leftImage: 1,
			rightImage: 1,
		},

		{
			index: 5,
			name: "long leather gloves",
			name_cap: "Длинные кожаные перчатки",
			variable: "longleathergloves",
			integrity: 200,
			integrity_max: 200,
			fabric_strength: 20,
			reveal: 500,
			word: "n",
			plural: 1,
			colour: 0,
			colour_options: [
				"black",
				"wine",
				"navy blue",
				"silver",
				"gold",
				"blue",
				"green",
				"pink",
				"purple",
				"red",
				"tangerine",
				"teal",
				"white",
				"yellow",
				"brown",
				"custom",
			],
			colour_sidebar: 1,
			colour_combat: 0,
			type: ["normal", "sticky_fingers", "stealthy"],
			gender: "n",
			warmth: 2,
			cost: 8000,
			description: "Модные и удобные для ношения в карманах.",
			shop: ["clothing", "adult"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			back_img: 0,
			cursed: 0,
			location: 0,
			iconFile: "long_leather_gloves.png",
			accIcon: 0,
			mainImage: 0,
			leftImage: 1,
			rightImage: 1,
		},

		{
			index: 6,
			name: "cheerleader gloves",
			name_cap: "Перчатки черлидерши",
			variable: "pompoms",
			integrity: 200,
			integrity_max: 200,
			fabric_strength: 20,
			reveal: 300,
			word: "n",
			plural: 1,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "pale tangerine", "teal", "pale white", "pale yellow", "custom"],
			colour_sidebar: 1,
			type: ["costume"],
			gender: "f",
			femininity: 200,
			warmth: 1,
			cost: 1500,
			description: "Для подбадривания своей команды до победного.",
			shop: ["clothing", "school", "adult"],
			accessory: 1,
			accessory_colour: 0,
			accessory_colour_options: [],
			back_img: 0,
			cursed: 0,
			location: 0,
			iconFile: "fingerless_gloves.png",
			accIcon: "fingerless_gloves_acc.png",
			mainImage: 0,
			leftImage: 1,
			rightImage: 1,
		},

		{
			index: 7,
			name: "gold bracelets",
			name_cap: "Золотые браслеты",
			variable: "gold",
			integrity: 200,
			integrity_max: 200,
			fabric_strength: 20,
			reveal: 300,
			word: "n",
			plural: 1,
			colour: 0,
			colour_options: [],
			type: ["costume", "serving"],
			gender: "n",
			femininity: 0,
			warmth: 0,
			cost: 25000,
			description: "Привлекательны и экзотичны.",
			shop: ["adult"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			back_img: 0,
			cursed: 0,
			location: 0,
			iconFile: "gold_bracelets.png",
			accIcon: 0,
			mainImage: 0,
			leftImage: 1,
			rightImage: 1,
		},

		{
			index: 8,
			name: "cow sleeves",
			name_cap: "Коровьи рукава",
			variable: "cow",
			integrity: 100,
			integrity_max: 100,
			fabric_strength: 20,
			reveal: 100,
			word: "n",
			plural: 1,
			colour: 0,
			colour_options: [],
			type: ["costume"],
			gender: "n",
			warmth: 1,
			cost: 1000,
			description: "Милый принт в виде коровы.",
			shop: ["forest"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			back_img: 0,
			cursed: 0,
			location: 0,
			iconFile: "cow_sleeves.png",
			accIcon: "",
			mainImage: 0,
			leftImage: 1,
			rightImage: 1,
		},

		{
			index: 9,
			name: "work gloves",
			name_cap: "Рабочие перчатки",
			variable: "workgloves",
			integrity: 200,
			integrity_max: 200,
			fabric_strength: 20,
			reveal: 1,
			word: "n",
			plural: 1,
			colour: 0,
			colour_options: [],
			colour_sidebar: 0,
			type: ["normal"],
			gender: "n",
			warmth: 2,
			cost: 1500,
			description: "Дляс того что бы запачкать свои руки.",
			shop: ["clothing"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			back_img: 0,
			cursed: 0,
			location: 0,
			iconFile: "work_gloves.png",
			accIcon: 0,
			mainImage: 0,
			leftImage: 1,
			rightImage: 1,
		},
		{
			index: 10,
			name: "sexy nun's gloves",
			name_cap: "Перчатки сексуальной монашки",
			variable: "nunlewd",
			integrity: 100,
			integrity_max: 100,
			fabric_strength: 20,
			reveal: 100,
			word: "a",
			plural: 1,
			colour: 0,
			colour_options: [],
			colour_sidebar: 0,
			type: ["holy", "costume", "fetish"],
			gender: "f",
			warmth: 1,
			cost: 3000,
			description: "Отлично подходит для искоренения греха.",
			shop: ["forest"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			back_img: 0,
			cursed: 0,
			location: 0,
			iconFile: "sexy_nuns_gloves.png",
			accIcon: 0,
			mainImage: 0,
			leftImage: 1,
			rightImage: 1,
		},
		{
			index: 11,
			name: "wrist cuffs",
			name_cap: "Наручники на запястьях",
			variable: "wristcuffs",
			integrity: 100,
			integrity_max: 100,
			fabric_strength: 20,
			reveal: 500,
			word: "n",
			plural: 1,
			colour: 0,
			colour_options: [],
			type: ["costume", "serving"],
			gender: "n",
			femininity: 0,
			warmth: 0,
			cost: 800,
			description: "Достаточно сексуалены для кролика из плейбоя, достаточно элегантны для прислуги.",
			shop: ["adult"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			back_img: 0,
			cursed: 0,
			location: 0,
			iconFile: "wrist_cuffs.png",
			accIcon: 0,
			mainImage: 0,
			leftImage: 1,
			rightImage: 1,
		},
		{
			index: 12,
			name: "gold shackles",
			name_cap: "Gold shackles",
			variable: "goldshackles",
			integrity: 200,
			integrity_max: 200,
			fabric_strength: 20,
			reveal: 300,
			word: "n",
			plural: 1,
			colour: 0,
			colour_options: [],
			type: ["holy", "fetish"],
			gender: "n",
			femininity: 0,
			warmth: 0,
			cost: 25000,
			description: "Bound by obsession. Bound by vanity.",
			shop: [],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			back_img: 0,
			cursed: 1,
			location: 0,
			iconFile: "gold_bracelets.png",
			accIcon: 0,
			mainImage: 0,
			leftImage: 1,
			rightImage: 1,
		},
	];

	/*
		Clothes that modders add go into this array, this should be empty in the base game at all times.
		These items should have a `modder` variable with a the modders name in a short string
	*/
	setup.moddedClothes.hands = [];

	setup.moddedClothes.hands.forEach((x, i) => (x.index = setup.clothes.hands.length + i));
	setup.clothes.hands.push(...setup.moddedClothes.hands);
}
window.initHands = initHands;
