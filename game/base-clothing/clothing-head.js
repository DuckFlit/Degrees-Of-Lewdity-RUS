/* For any item that has a colour_combat tag, set it to 0 if that item ever gets its own combat sprites. */
function initHead() {
	setup.clothes.head = [
		{
			index: 0,
			name: "naked",
			name_cap: "Naked",
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
			description: "naked",
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
			name: "hairpin",
			name_cap: "Hairpin",
			variable: "hairpin",
			integrity: 50,
			integrity_max: 50,
			fabric_strength: 20,
			reveal: 1,
			word: "a",
			plural: 0,
			colour: 0,
			colour_options: [],
			colour_combat: 0,
			type: ["normal"],
			gender: "f",
			femininity: 200,
			warmth: 0,
			cost: 500,
			description: "Greatly accelerates hair growth.",
			shop: ["clothing", "school"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			back_img: 0,
			cursed: 0,
			location: 0,
			iconFile: "hairpin.png",
			accIcon: 0,
		},

		{
			index: 2,
			name: "beanie",
			name_cap: "Beanie",
			variable: "beanie",
			integrity: 100,
			integrity_max: 100,
			fabric_strength: 20,
			reveal: 1,
			word: "a",
			plural: 0,
			mask_img: 1,
			mask_img_ponytail: 1,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			type: ["cool"],
			gender: "n",
			warmth: 35,
			cost: 3000,
			description: "Makes status rise faster at school.",
			shop: ["clothing"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			back_img: 0,
			cursed: 0,
			location: 0,
			iconFile: "beanie.png",
			accIcon: 0,
		},

		{
			index: 3,
			name: "bunny ears",
			name_cap: "Bunny ears",
			variable: "bunnyears",
			integrity: 100,
			integrity_max: 100,
			fabric_strength: 20,
			reveal: 300,
			word: "a",
			plural: 1,
			colour: 0,
			colour_options: [],
			colour_combat: 0,
			type: ["costume", "serving"],
			gender: "n",
			warmth: 0,
			cost: 3000,
			description: "Cute ears on a headband. Part of a bunny outfit.",
			shop: ["adult"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			back_img: "combat",
			cursed: 0,
			location: 0,
			iconFile: "bunny_ears.png",
			accIcon: 0,
		},

		{
			index: 4,
			name: "nun's veil",
			name_cap: "Nun's veil",
			variable: "nun",
			integrity: 100,
			integrity_max: 100,
			fabric_strength: 20,
			reveal: 1,
			word: "a",
			plural: 0,
			mask_img: 1,
			colour: 0,
			colour_options: [],
			type: ["holy", "costume"],
			gender: "f",
			femininity: 200,
			warmth: 15,
			cost: 2500,
			description: "Protects your hair from unwanted attentions.",
			shop: ["clothing", "adult"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			back_img: 1,
			back_img_colour: "primary",
			cursed: 0,
			location: 0,
			iconFile: "nuns_veil.png",
			accIcon: 0,
		},

		{
			index: 5,
			name: "bow",
			name_cap: "Bow",
			variable: "bow",
			integrity: 100,
			integrity_max: 100,
			fabric_strength: 20,
			reveal: 1,
			word: "a",
			plural: 0,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "pale white", "pale yellow", "custom"],
			colour_sidebar: 1,
			type: ["normal"],
			gender: "f",
			femininity: 200,
			warmth: 0,
			cost: 900,
			description: "Cute.",
			shop: ["clothing", "adult"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			back_img: 0,
			cursed: 0,
			location: 0,
			iconFile: "bow.png",
			accIcon: 0,
		},

		{
			index: 6,
			name: "cap",
			name_cap: "Cap",
			variable: "cap",
			integrity: 100,
			integrity_max: 100,
			fabric_strength: 20,
			reveal: 1,
			word: "a",
			plural: 0,
			mask_img: 1,
			mask_img_ponytail: 1,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			type: ["normal", "shade"],
			gender: "n",
			warmth: 0,
			cost: 2000,
			description: "Shields you from the sun.",
			shop: ["clothing"],
			accessory: 1,
			accessory_colour: 0,
			accessory_colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			accessory_colour_sidebar: 1,
			back_img: 0,
			cursed: 0,
			location: 0,
			iconFile: "cap.png",
			accIcon: 0,
		},

		{
			index: 7,
			name: "witch hat",
			name_cap: "Witch hat",
			variable: "witch",
			integrity: 100,
			integrity_max: 100,
			fabric_strength: 20,
			reveal: 1,
			word: "a",
			plural: 0,
			mask_img: 1,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			type: ["costume", "shade"],
			gender: "n",
			warmth: 20,
			cost: 3000,
			description: "Patchy and fragrant.",
			shop: ["forest"],
			accessory: 1,
			accessory_colour: 0,
			accessory_colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			accessory_colour_sidebar: 1,
			back_img: 1,
			back_img_colour: "primary",
			cursed: 0,
			location: 0,
			iconFile: "witch_hat.png",
			accIcon: "witch_hat_acc.png",
		},

		{
			index: 8,
			name: "christmas hat",
			name_cap: "Christmas hat",
			variable: "christmas",
			integrity: 100,
			integrity_max: 100,
			fabric_strength: 20,
			reveal: 1,
			word: "a",
			plural: 0,
			mask_img: 1,
			mask_img_ponytail: 1,
			colour: 0,
			colour_options: [],
			colour_combat: 0,
			type: ["costume"],
			gender: "n",
			warmth: 40,
			cost: 5000,
			description: "'Tis the season.",
			shop: ["forest"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			back_img: 0,
			cursed: 0,
			location: 0,
			iconFile: "christmas_hat.png",
		},

		{
			index: 9,
			name: "chef hat",
			name_cap: "Chef hat",
			variable: "chef",
			integrity: 200,
			integrity_max: 200,
			fabric_strength: 20,
			reveal: 1,
			word: "a",
			plural: 0,
			mask_img: 1,
			colour: 0,
			colour_options: [],
			colour_combat: 0,
			type: ["costume", "serving"],
			gender: "n",
			warmth: 5,
			cost: 5000,
			description: "Keeps cream out of your hair.",
			shop: ["forest"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			back_img: 1,
			back_img_colour: "primary",
			cursed: 0,
			location: 0,
			iconFile: "chef_hat.png",
		},

		{
			index: 10,
			name: "cowboy hat",
			name_cap: "Cowboy hat",
			variable: "cowboy",
			integrity: 200,
			integrity_max: 200,
			fabric_strength: 20,
			reveal: 1,
			word: "a",
			plural: 0,
			mask_img: 1,
			colour: 0,
			colour_options: [],
			colour_combat: 0,
			type: ["costume", "shade"],
			gender: "n",
			warmth: 10,
			cost: 8000,
			description: "Protects you from the sun.",
			shop: ["clothing", "adult"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			back_img: 1,
			back_img_colour: "primary",
			cursed: 0,
			location: 0,
			iconFile: "cowboy_hat.png",
			accIcon: 0,
		},

		{
			index: 11,
			name: "fedora",
			name_cap: "Fedora",
			variable: "fedora",
			integrity: 200,
			integrity_max: 200,
			fabric_strength: 20,
			reveal: 1,
			word: "a",
			plural: 0,
			mask_img: 1,
			colour: 0,
			colour_options: [],
			colour_combat: 0,
			type: ["normal", "shade"],
			gender: "m",
			femininity: -100,
			warmth: 10,
			cost: 5000,
			description: "Suave.",
			shop: ["forest"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			back_img: 1,
			back_img_colour: "primary",
			cursed: 0,
			location: 0,
			iconFile: "fedora.png",
		},

		{
			index: 12,
			name: "beatnik hat",
			name_cap: "Beatnik hat",
			variable: "beatnik",
			integrity: 200,
			integrity_max: 200,
			fabric_strength: 20,
			reveal: 1,
			word: "a",
			plural: 0,
			mask_img: 1,
			colour: 0,
			colour_options: [],
			colour_combat: 0,
			type: ["cool"],
			gender: "m",
			femininity: -100,
			warmth: 10,
			cost: 8000,
			description: "Conforming isn't your style.",
			shop: ["clothing"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			back_img: 0,
			cursed: 0,
			location: 0,
			iconFile: "beatnik_hat.png",
		},

		{
			index: 13,
			name: "sou'wester",
			name_cap: "Sou'wester",
			variable: "sou",
			integrity: 200,
			integrity_max: 200,
			fabric_strength: 20,
			reveal: 1,
			word: "a",
			plural: 0,
			mask_img: 1,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			type: ["rainproof"],
			gender: "n",
			warmth: 15,
			cost: 4000,
			description: "Keeps the rain off.",
			shop: ["clothing"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			back_img: 1,
			back_img_colour: "primary",
			cursed: 0,
			location: 0,
			iconFile: "souwester.png",
		},

		{
			index: 14,
			name: "flower crown",
			name_cap: "Flower crown",
			variable: "flower",
			integrity: 50,
			integrity_max: 50,
			fabric_strength: 20,
			reveal: 1,
			word: "a",
			plural: 0,
			colour: 0,
			colour_options: [],
			colour_combat: 0,
			type: ["normal"],
			gender: "f",
			warmth: 0,
			cost: 0,
			description: "Floral.",
			shop: [],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			back_img: "combat",
			cursed: 0,
			location: 0,
			iconFile: "flower_crown.png",
		},

		{
			index: 15,
			name: "backwards cap",
			name_cap: "Backwards cap",
			variable: "backwardscap",
			integrity: 100,
			integrity_max: 100,
			fabric_strength: 20,
			reveal: 1,
			word: "a",
			plural: 0,
			mask_img: 1,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			type: ["normal", "shade"],
			gender: "n",
			warmth: 0,
			cost: 2000,
			description: "Protects your neck from the sun.",
			shop: ["clothing"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			back_img: 0,
			cursed: 0,
			location: 0,
			iconFile: "backwards_cap.png",
			accIcon: 0,
		},

		{
			index: 16,
			name: "alice band",
			name_cap: "Alice band",
			variable: "alice",
			integrity: 50,
			integrity_max: 50,
			fabric_strength: 20,
			reveal: 1,
			word: "a",
			plural: 0,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			type: ["normal"],
			gender: "f",
			femininity: 200,
			warmth: 0,
			cost: 1100,
			description: "Holds your hair back.",
			shop: ["clothing", "school", "adult"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			back_img: "combat",
			cursed: 0,
			location: 0,
			iconFile: "alice_band.png",
			accIcon: 0,
		},

		{
			index: 17,
			name: "straw hat",
			name_cap: "Straw hat",
			variable: "straw",
			integrity: 50,
			integrity_max: 50,
			fabric_strength: 20,
			reveal: 1,
			word: "a",
			plural: 0,
			mask_img: 1,
			colour: 0,
			colour_options: [],
			colour_combat: 0,
			type: ["normal", "shade"],
			gender: "n",
			femininity: 0,
			warmth: 0,
			cost: 700,
			description: "Keeps the sun off.",
			shop: ["clothing"],
			accessory: 1,
			accessory_colour: 0,
			accessory_colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			accessory_colour_sidebar: 1,
			back_img: 1,
			back_img_colour: "primary",
			cursed: 0,
			location: 0,
			iconFile: "straw_hat.png",
			accIcon: "straw_hat_acc.png",
		},

		{
			index: 18,
			name: "straw flower hat",
			name_cap: "Straw flower hat",
			variable: "strawflower",
			integrity: 50,
			integrity_max: 50,
			fabric_strength: 20,
			reveal: 1,
			word: "a",
			plural: 0,
			mask_img: 1,
			colour: 0,
			colour_options: [],
			colour_combat: 0,
			type: ["normal"],
			gender: "f",
			femininity: 100,
			warmth: 0,
			cost: 1500,
			description: "Keeps the sun off.",
			shop: [],
			accessory: 1,
			accessory_colour: 0,
			accessory_colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			accessory_colour_sidebar: 1,
			back_img: 1,
			back_img_colour: "primary",
			cursed: 0,
			location: 0,
			iconFile: 0,
			accIcon: 0,
		},

		{
			index: 19,
			name: "maid band",
			name_cap: "Maid band",
			variable: "maid",
			integrity: 50,
			integrity_max: 50,
			fabric_strength: 20,
			reveal: 1,
			word: "a",
			plural: 0,
			colour: 0,
			colour_options: [],
			colour_combat: 0,
			type: ["maid", "costume", "serving"],
			gender: "f",
			femininity: 200,
			warmth: 0,
			cost: 1200,
			description: "For looking cute while cleaning.",
			shop: ["clothing", "adult"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			back_img: "combat",
			cursed: 0,
			location: 0,
			iconFile: "maid_band.png",
			accIcon: 0,
		},

		{
			index: 20,
			name: "bun covers",
			name_cap: "Bun covers",
			variable: "bun",
			integrity: 50,
			integrity_max: 50,
			fabric_strength: 20,
			reveal: 1,
			word: "a",
			plural: 0,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			type: ["formal"],
			gender: "f",
			femininity: 200,
			warmth: 0,
			cost: 5000,
			description: "Exotic.",
			shop: ["clothing", "adult"],
			accessory: 1,
			accessory_colour: 0,
			accessory_colour_options: [],
			back_img: "combat",
			cursed: 0,
			location: 0,
			iconFile: "bun_covers.png",
			accIcon: 0,
		},

		{
			index: 21,
			name: "headband",
			name_cap: "Headband",
			variable: "band",
			integrity: 50,
			integrity_max: 50,
			fabric_strength: 20,
			reveal: 1,
			word: "a",
			plural: 0,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			type: ["cool"],
			gender: "n",
			femininity: 0,
			warmth: 0,
			cost: 1100,
			description: "Keeps hair from your eyes.",
			shop: ["clothing"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			back_img: "combat",
			cursed: 0,
			location: 0,
			iconFile: "headband.png",
			accIcon: 0,
		},

		{
			index: 22,
			name: "feathered cap",
			name_cap: "Feathered cap",
			variable: "feathered",
			integrity: 50,
			integrity_max: 50,
			fabric_strength: 20,
			reveal: 1,
			word: "a",
			plural: 0,
			mask_img: 1,
			colour: 0,
			colour_options: [],
			colour_combat: 0,
			type: ["costume", "shade"],
			gender: "m",
			femininity: -200,
			warmth: 10,
			cost: 2200,
			description: "For when you have something to be proud of.",
			shop: ["clothing", "adult"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			back_img: 1,
			back_img_colour: "primary",
			cursed: 0,
			location: 0,
			iconFile: "feathered_cap.png",
			accIcon: 0,
		},

		{
			index: 23,
			name: "large sailor's hat",
			name_cap: "Large sailor's hat",
			variable: "sailorbig",
			integrity: 50,
			integrity_max: 50,
			fabric_strength: 20,
			reveal: 1,
			word: "a",
			plural: 0,
			mask_img: 1,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			type: ["costume"],
			gender: "m",
			femininity: -200,
			warmth: 10,
			cost: 3000,
			description: "Shields you from the sun.",
			shop: ["clothing"],
			accessory: 1,
			accessory_colour: 0,
			accessory_colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			accessory_colour_sidebar: 1,
			back_img: 0,
			cursed: 0,
			location: 0,
			iconFile: "large_sailors_hat.png",
			accIcon: 0,
		},

		{
			index: 24,
			name: "small sailor's hat",
			name_cap: "Small sailor's hat",
			variable: "sailorsmall",
			integrity: 50,
			integrity_max: 50,
			fabric_strength: 20,
			reveal: 1,
			word: "a",
			plural: 0,
			mask_img: 1,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			type: ["costume"],
			gender: "m",
			femininity: -200,
			warmth: 10,
			cost: 2000,
			description: "Shields you from the sun.",
			shop: ["clothing", "adult"],
			accessory: 1,
			accessory_colour: 0,
			accessory_colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			accessory_colour_sidebar: 1,
			back_img: 0,
			cursed: 0,
			location: 0,
			iconFile: "small_sailors_hat.png",
			accIcon: 0,
		},

		{
			index: 25,
			name: "football helmet",
			name_cap: "Football helmet",
			variable: "football",
			integrity: 200,
			integrity_max: 200,
			fabric_strength: 60,
			reveal: 1,
			word: "a",
			plural: 0,
			mask_img: 1,
			mask_img_ponytail: 1,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			type: ["costume", "athletic"],
			gender: "m",
			femininity: -200,
			warmth: 30,
			cost: 2000,
			description: "Protective headwear. Used in a foreign sport.",
			shop: ["clothing", "school", "adult"],
			accessory: 1,
			accessory_colour: 0,
			accessory_colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			accessory_colour_sidebar: 1,
			back_img: "combat",
			cursed: 0,
			location: 0,
			iconFile: "football_helmet.png",
			accIcon: 0,
		},

		{
			index: 26,
			name: "big bow",
			name_cap: "Big bow",
			variable: "bigbow",
			integrity: 100,
			integrity_max: 100,
			fabric_strength: 20,
			reveal: 1,
			word: "a",
			plural: 0,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			type: ["normal"],
			gender: "f",
			femininity: 300,
			warmth: 0,
			cost: 1400,
			description: "Very cute.",
			shop: ["clothing", "adult"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			back_img: "combat",
			cursed: 0,
			location: 0,
			iconFile: "big_bow.png",
			accIcon: 0,
		},

		{
			index: 27,
			name: "riding helmet",
			name_cap: "Riding helmet",
			variable: "riding",
			integrity: 200,
			integrity_max: 200,
			fabric_strength: 30,
			reveal: 1,
			word: "a",
			plural: 0,
			mask_img: 1,
			mask_img_ponytail: 1,
			colour: 0,
			colour_options: [],
			colour_combat: 0,
			type: ["costume", "athletic", "riding"],
			gender: "n",
			femininity: 0,
			warmth: 30,
			cost: 16000,
			description: "Protective headwear.",
			shop: ["clothing"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			back_img: 1,
			back_img_colour: "primary",
			cursed: 0,
			location: 0,
			iconFile: "riding_helmet.png",
			accIcon: 0,
		},

		{
			index: 28,
			name: "top hat",
			name_cap: "Top hat",
			variable: "top",
			integrity: 150,
			integrity_max: 150,
			fabric_strength: 20,
			reveal: 1,
			word: "a",
			plural: 0,
			mask_img: 1,
			colour: 0,
			colour_options: [],
			colour_combat: 0,
			type: ["costume", "formal"],
			gender: "m",
			femininity: -200,
			warmth: 10,
			cost: 6000,
			description: "Old fashioned sophistication.",
			shop: ["clothing", "adult"],
			accessory: 1,
			accessory_colour: 0,
			accessory_colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			accessory_colour_sidebar: 1,
			back_img: 1,
			back_img_colour: "primary",
			cursed: 0,
			location: 0,
			iconFile: "top_hat.png",
			accIcon: 0,
		},

		{
			index: 29,
			name: "umbrella hat",
			name_cap: "Umbrella hat",
			variable: "umbrella",
			integrity: 120,
			integrity_max: 120,
			fabric_strength: 10,
			reveal: 100,
			word: "a",
			plural: 0,
			mask_img: 1,
			colour: 0,
			colour_options: [],
			colour_combat: 0,
			type: ["rainproof", "shade"],
			gender: "n",
			femininity: 0,
			warmth: 0,
			cost: 1500,
			description: "Keeps the rain off, but attracts attention.",
			shop: ["clothing"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			back_img: 1,
			back_img_colour: "primary",
			cursed: 0,
			location: 0,
			iconFile: "umbrella_hat.png",
			accIcon: 0,
		},

		{
			index: 30,
			name: "racing helmet",
			name_cap: "Racing helmet",
			variable: "racing",
			integrity: 200,
			integrity_max: 200,
			fabric_strength: 30,
			reveal: 1,
			word: "a",
			plural: 0,
			mask_img: 1,
			mask_img_ponytail: 1,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			type: ["costume", "athletic", "riding"],
			gender: "n",
			femininity: 0,
			warmth: 20,
			cost: 15000,
			description: "For serious riding.",
			shop: ["clothing"],
			accessory: 1,
			accessory_colour: 0,
			accessory_colour_options: [],
			accessory_colour_sidebar: 0,
			back_img: 1,
			back_img_colour: "primary",
			cursed: 0,
			location: 0,
			iconFile: "racing_helmet.png",
			accIcon: 0,
		},

		{
			index: 31,
			name: "feathered hair clip",
			name_cap: "Feathered hair clip",
			variable: "featheredhairclip",
			integrity: 200,
			integrity_max: 200,
			fabric_strength: 30,
			reveal: 1,
			word: "a",
			plural: 0,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			type: ["costume", "eerie"],
			gender: "n",
			femininity: 0,
			warmth: 0,
			cost: 1500,
			description: "Made with real feathers.",
			shop: ["forest"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			accessory_colour_sidebar: 0,
			back_img: 0,
			cursed: 0,
			location: 0,
			iconFile: "feathered_hair_clip.png",
			accIcon: 0,
		},

		{
			index: 32,
			name: "hoodie hood",
			name_cap: "Hoodie hood",
			variable: "hoodie",
			integrity: 180,
			integrity_max: 180,
			fabric_strength: 30,
			reveal: 100,
			word: "a",
			one_piece: 1,
			plural: 0,
			hood: 1,
			mask_img: 1,
			colour: 0,
			colour_options: [
				"black",
				"blue steel",
				"grey",
				"white",
				"light pink",
				"light blue",
				"light green",
				"sand",
				"red",
				"pink",
				"purple",
				"tangerine",
				"teal",
				"custom",
			],
			colour_sidebar: 1,
			type: ["normal"],
			set: "hoodie",
			gender: "n",
			warmth: 20,
			cost: 0,
			description: "Portable social isolator.",
			shop: ["clothing"],
			accessory: 1,
			accessory_colour: 0,
			accessory_colour_options: [
				"black",
				"blue steel",
				"grey",
				"white",
				"light pink",
				"light blue",
				"light green",
				"sand",
				"red",
				"pink",
				"purple",
				"tangerine",
				"teal",
				"custom",
			],
			accessory_colour_sidebar: 1,
			back_img: 1,
			back_img_colour: "secondary",
			cursed: 0,
			location: 0,
			outfitSecondary: ["upper", "hoodie"],
			iconFile: 0,
			accIcon: 0,
		},

		{
			index: 33,
			name: "tam o' shanter",
			name_cap: "Tam o' shanter",
			variable: "tam",
			integrity: 100,
			integrity_max: 100,
			fabric_strength: 30,
			reveal: 100,
			word: "a",
			plural: 0,
			mask_img: 1,
			hood: 0,
			colour: 0,
			colour_options: [],
			colour_combat: 0,
			type: ["normal"],
			gender: "m",
			femininity: -200,
			warmth: 25,
			cost: 4500,
			description: "For honest men and bonnie lasses.",
			shop: ["clothing"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			back_img: 1,
			back_img_colour: "primary",
			cursed: 0,
			location: 0,
			iconFile: "tam_o_shanter.png",
			accIcon: 0,
		},

		{
			index: 34,
			name: "cat hat",
			name_cap: "Cat hat",
			variable: "cat",
			integrity: 100,
			integrity_max: 100,
			fabric_strength: 30,
			reveal: 100,
			word: "a",
			plural: 0,
			mask_img: 1,
			mask_img_ponytail: 1,
			hood: 0,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			type: ["costume", "shade"],
			gender: "n",
			warmth: 25,
			cost: 3000,
			description: "Whiskers not included.",
			shop: ["clothing"],
			accessory: 1,
			accessory_colour: 0,
			accessory_colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			accessory_colour_sidebar: 1,
			back_img: 0,
			cursed: 0,
			location: 0,
			iconFile: "cat_hat.png",
			accIcon: 0,
		},

		{
			index: 35,
			name: "monster hood",
			name_cap: "Monster hood",
			variable: "monster",
			integrity: 100,
			integrity_max: 100,
			fabric_strength: 30,
			reveal: 100,
			word: "a",
			one_piece: 1,
			plural: 0,
			hood: 1,
			mask_img: 1,
			colour: 0,
			colour_options: ["apocalypse", "custom"],
			colour_sidebar: 1,
			type: ["costume"],
			set: "monsterhoodie",
			gender: "n",
			warmth: 25,
			cost: 0,
			description: "Rawr.",
			shop: ["clothing"],
			accessory: 1,
			accessory_colour: 0,
			accessory_colour_options: [],
			back_img: 0,
			cursed: 0,
			location: 0,
			iconFile: "",
			outfitSecondary: ["upper", "monster hoodie"],
			accIcon: 0,
		},

		{
			index: 36,
			name: "kitty ears",
			name_cap: "Kitty ears",
			variable: "kitty",
			integrity: 100,
			integrity_max: 100,
			fabric_strength: 30,
			reveal: 100,
			word: "n",
			one_piece: 0,
			plural: 1,
			hood: 0,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			type: ["costume"],
			gender: "n",
			warmth: 25,
			cost: 1500,
			description: "Cute.",
			shop: ["clothing", "adult"],
			accessory: 1,
			accessory_colour: 0,
			accessory_colour_options: [],
			back_img: "combat",
			cursed: 0,
			location: 0,
			iconFile: "kitty_ears.png",
			accIcon: "kitty_ears_acc.png",
		},

		{
			index: 37,
			name: "mini snowman",
			name_cap: "Mini snowman",
			variable: "minisnowman",
			integrity: 100,
			integrity_max: 100,
			fabric_strength: 5,
			reveal: 1,
			word: "n",
			one_piece: 0,
			plural: 0,
			hood: 0,
			colour: 0,
			colour_options: [],
			colour_combat: 0,
			type: ["costume"],
			gender: "n",
			warmth: 40,
			cost: 2500,
			description: "Surprisingly warm.",
			shop: ["forest"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			back_img: 0,
			cursed: 0,
			location: 0,
			iconFile: "mini_snowman.png",
			accIcon: 0,
		},

		{
			index: 38,
			name: "cow onesie hood",
			name_cap: "Cow onesie hood",
			variable: "cowonesie",
			integrity: 200,
			integrity_max: 200,
			fabric_strength: 30,
			reveal: 100,
			word: "a",
			one_piece: 1,
			plural: 0,
			hood: 1,
			mask_img: 1,
			colour: 0,
			colour_options: [],
			type: ["sleep", "costume"],
			gender: "n",
			warmth: 40,
			cost: 0,
			description: "Snug.",
			shop: ["clothing"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			back_img: 0,
			cursed: 0,
			location: 0,
			iconFile: "",
			outfitSecondary: ["upper", "cow onesie"],
			accIcon: 0,
		},

		{
			index: 39,
			name: "baseball cap",
			name_cap: "Baseball cap",
			variable: "baseball",
			integrity: 100,
			integrity_max: 100,
			fabric_strength: 20,
			reveal: 1,
			word: "a",
			plural: 0,
			mask_img: 1,
			mask_img_ponytail: 1,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			type: ["athletic", "shade"],
			gender: "n",
			warmth: 0,
			cost: 6000,
			description: "Shields you from the sun.",
			shop: ["clothing"],
			accessory: 1,
			accessory_colour: 0,
			accessory_colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			accessory_colour_sidebar: 1,
			back_img: 0,
			cursed: 0,
			location: 0,
			iconFile: "baseball_cap.png",
			accIcon: "baseball_cap_acc.png",
		},

		{
			index: 40,
			name: "rose",
			name_cap: "Rose",
			variable: "rose",
			integrity: 50,
			integrity_max: 50,
			fabric_strength: 20,
			reveal: 1,
			word: "a",
			plural: 0,
			colour: 0,
			colour_options: ["red", "white", "pink", "light pink", "purple", "yellow", "tangerine", "black", "custom"],
			colour_sidebar: 1,
			type: ["normal"],
			gender: "f",
			femininity: 200,
			warmth: 0,
			cost: 2000,
			description: "Smells fresh.",
			shop: ["forest"],
			accessory: 1,
			accessory_colour: 0,
			accessory_colour_options: [],
			accessory_colour_sidebar: 0,
			back_img: 0,
			cursed: 0,
			location: 0,
			iconFile: "rose.png",
			accIcon: "rose_acc.png",
		},

		{
			index: 41,
			name: "scarecrow hat",
			name_cap: "Scarecrow hat",
			variable: "scarecrow",
			integrity: 100,
			integrity_max: 100,
			fabric_strength: 20,
			reveal: 1,
			word: "a",
			plural: 0,
			mask_img: 1,
			colour: 0,
			colour_options: [],
			colour_sidebar: 0,
			type: ["costume", "shade"],
			gender: "n",
			warmth: 0,
			cost: 1000,
			description: "Worn by the empty-headed.",
			shop: ["forest"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			back_img: 0,
			cursed: 0,
			location: 0,
			iconFile: "scarecrow_hat.png",
		},

		{
			index: 42,
			name: "fish hairpin",
			name_cap: "Fish hairpin",
			variable: "fishhairpin",
			integrity: 50,
			integrity_max: 50,
			fabric_strength: 20,
			reveal: 1,
			word: "a",
			plural: 0,
			colour: 0,
			colour_options: [],
			colour_combat: 0,
			type: ["normal"],
			gender: "f",
			femininity: 100,
			warmth: 0,
			cost: 500,
			description: "Feels like real bone.",
			shop: ["clothing"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			back_img: 0,
			cursed: 0,
			location: 0,
			iconFile: "fish_hairpin.png",
			accIcon: 0,
		},

		{
			index: 43,
			name: "pink nurse hat",
			name_cap: "Pink nurse hat",
			variable: "pinknurse",
			integrity: 50,
			integrity_max: 50,
			fabric_strength: 20,
			reveal: 1,
			word: "a",
			plural: 0,
			colour: 0,
			colour_options: [],
			colour_combat: 0,
			type: ["costume"],
			gender: "f",
			femininity: 100,
			warmth: 0,
			cost: 1200,
			description: "Worn by nurses at the hospital.",
			shop: ["clothing"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			back_img: 0,
			cursed: 0,
			location: 0,
			iconFile: "pink_nurse.png",
			accIcon: 0,
		},

		{
			index: 44,
			name: "plastic nurse hat",
			name_cap: "Plastic nurse hat",
			variable: "plasticnurse",
			integrity: 50,
			integrity_max: 50,
			fabric_strength: 20,
			reveal: 100,
			word: "a",
			plural: 0,
			colour: 0,
			colour_options: [],
			colour_combat: 0,
			type: ["costume", "unstealthy"],
			gender: "f",
			femininity: 100,
			warmth: 0,
			cost: 1800,
			description: "Easy to clean.",
			shop: ["clothing"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			back_img: 0,
			cursed: 0,
			location: 0,
			iconFile: "plastic_nurse.png",
			accIcon: 0,
		},

		{
			index: 45,
			name: "transparent nurse hat",
			name_cap: "Transparent nurse hat",
			variable: "transparentnurse",
			integrity: 50,
			integrity_max: 50,
			fabric_strength: 20,
			reveal: 200,
			word: "a",
			plural: 0,
			colour: 0,
			colour_options: [],
			colour_combat: 0,
			type: ["costume"],
			gender: "f",
			femininity: 100,
			warmth: 0,
			cost: 2400,
			description: "Easy to clean.",
			shop: [],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			back_img: 0,
			cursed: 0,
			location: 0,
			iconFile: "transparent_nurse.png",
			accIcon: 0,
		},

		{
			index: 46,
			name: "bunny headband",
			name_cap: "Bunny headband",
			variable: "bunband",
			integrity: 100,
			integrity_max: 100,
			fabric_strength: 20,
			reveal: 100,
			word: "a",
			plural: 1,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			type: ["normal"],
			gender: "n",
			warmth: 0,
			cost: 3000,
			description: "Two cute bun tufts on a band.",
			shop: ["clothing"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			back_img: 1,
			back_img_colour: "primary",
			cursed: 0,
			location: 0,
			iconFile: "bunny_headband.png",
			accIcon: 0,
		},

		{
			index: 47,
			name: "daisy",
			name_cap: "Daisy",
			variable: "daisy",
			integrity: 50,
			integrity_max: 50,
			fabric_strength: 20,
			reveal: 1,
			word: "a",
			plural: 0,
			colour: 0,
			colour_options: [],
			colour_combat: "white",
			type: ["normal"],
			gender: "f",
			warmth: 0,
			cost: 100,
			description: "A single daisy, its stem can be threaded through hair.",
			shop: ["forest"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			back_img: 0,
			cursed: 0,
			location: 0,
			iconFile: "daisy.png",
		},

		{
			index: 48,
			name: "spirit mask",
			name_cap: "Spirit mask",
			variable: "spiritmask",
			integrity: 200,
			integrity_max: 200,
			fabric_strength: 30,
			reveal: 1,
			word: "a",
			plural: 0,
			colour: 0,
			colour_options: [],
			colour_sidebar: 0,
			type: ["costume", "eerie"],
			gender: "n",
			femininity: 0,
			warmth: 0,
			cost: 6000,
			description: "Doesn't fit over your face.",
			shop: ["forest"],
			accessory: 1,
			accessory_colour: 0,
			accessory_colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "yellow", "custom"],
			accessory_colour_sidebar: 1,
			back_img: 0,
			cursed: 0,
			location: 0,
			iconFile: "spirit_mask.png",
			accIcon: "spirit_mask_acc.png",
		},

		{
			index: 49,
			name: "raccoon cap",
			name_cap: "Raccoon cap",
			variable: "furcap m",
			integrity: 200,
			integrity_max: 200,
			fabric_strength: 30,
			reveal: 1,
			word: "a",
			plural: 0,
			colour: 0,
			colour_combat: 0,
			colour_options: ["black", "brown", "grey", "tan", "sand", "custom"],
			colour_sidebar: 1,
			type: ["normal"],
			gender: "m",
			femininity: -200,
			warmth: 35,
			cost: 2000,
			description: "Keeps your head warm.",
			shop: ["clothing"],
			accessory: 1,
			accessory_colour: 0,
			accessory_colour_options: ["black", "brown", "grey", "tan", "sand", "custom"],
			accessory_colour_sidebar: 1,
			back_img: 0,
			cursed: 0,
			location: 0,
			iconFile: "furcapm.png",
			accIcon: "furcapm_acc.png",
		},

		{
			index: 50,
			name: "fur cap",
			name_cap: "Fur cap",
			variable: "furcap f",
			integrity: 200,
			integrity_max: 200,
			fabric_strength: 30,
			reveal: 1,
			word: "a",
			plural: 0,
			colour: 0,
			colour_combat: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "yellow", "custom"],
			colour_sidebar: 1,
			type: ["normal"],
			gender: "f",
			femininity: 100,
			warmth: 35,
			cost: 6000,
			description: "Warm and fashionable.",
			shop: ["clothing"],
			accessory: 1,
			accessory_colour: 0,
			accessory_colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "yellow", "custom"],
			accessory_colour_sidebar: 1,
			back_img: 0,
			cursed: 0,
			location: 0,
			iconFile: "furcapf.png",
			accIcon: "furcapf_acc.png",
		},

		{
			index: 51,
			name: "conical hat",
			name_cap: "Conical hat",
			variable: "conicalhat",
			integrity: 200,
			integrity_max: 200,
			fabric_strength: 30,
			reveal: 1,
			word: "a",
			plural: 0,
			mask_img: 1,
			colour: 0,
			colour_options: [],
			colour_combat: 0,
			type: ["normal", "shade", "rainproof"],
			gender: "n",
			femininity: 0,
			warmth: 0,
			cost: 700,
			description: "Keeps the sun off.",
			shop: ["clothing"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			accessory_colour_sidebar: 1,
			back_img: 1,
			cursed: 0,
			location: 0,
			iconFile: "conical_hat.png",
		},

		{
			index: 52,
			name: "cat hoodie hood",
			name_cap: "Cat hoodie hood",
			variable: "cat hoodie",
			integrity: 180,
			integrity_max: 180,
			fabric_strength: 30,
			reveal: 100,
			word: "a",
			one_piece: 1,
			plural: 0,
			hood: 1,
			mask_img: 1,
			colour: 0,
			colour_options: ["black", "blue steel", "grey", "white", "light pink", "light blue", "light green", "sand", "red", "pink", "purple", "tangerine", "teal", "custom"],
			colour_sidebar: 1,
			type: ["normal"],
			set: "hoodie",
			gender: "n",
			warmth: 20,
			cost: 0,
			description: "You know, like nya?",
			shop: ["clothing"],
			accessory: 1,
			accessory_colour: 0,
			accessory_colour_options: [],
			accessory_colour_sidebar: 0,
			back_img: 1,
			cursed: 0,
			location: 0,
			outfitSecondary: ["upper", "hoodie"],
			iconFile: 0,
			accIcon: 0,
		},

		{
			index: 53,
			name: "bat beanie",
			name_cap: "Bat beanie",
			variable: "bat beanie",
			integrity: 100,
			integrity_max: 100,
			fabric_strength: 20,
			reveal: 1,
			word: "a",
			plural: 0,
			mask_img: 1,
			mask_img_ponytail: 1,
			colour: 0,
			colour_options: [],
			colour_sidebar: 0,
			type: ["normal"],
			gender: "n",
			warmth: 35,
			cost: 4500,
			description: "Spooky cute.",
			shop: ["clothing"],
			accessory: 1,
			accessory_colour: 0,
			accessory_colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			accessory_colour_sidebar: 1,
			back_img: 0,
			cursed: 0,
			location: 0,
			iconFile: "bat_beanie.png",
			accIcon: "bat_beanie_acc.png",
		},
	];

	/*
		Clothes that modders add go into this array, this should be empty in the base game at all times.
		These items should have a `modder` variable with a the modders name in a short string
	*/
	setup.moddedClothes.head = [];

	setup.moddedClothes.head.forEach((x, i) => (x.index = setup.clothes.head.length + i));
	setup.clothes.head.push(...setup.moddedClothes.head);
}
window.initHead = initHead;
