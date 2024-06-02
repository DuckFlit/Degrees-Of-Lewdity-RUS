/* For any item that has a colour_combat tag, set it to 0 if that item ever gets its own combat sprites.

Warmth checklist:
	Base: 0
	Normal: 0
	Thick: +1
	Very thick: +2

	Max warmth: 2
*/
function initNeck() {
	setup.clothes.neck = [
		{
			index: 0,
			name: "naked",
			name_cap: "Naked",
			variable: "naked",
			integrity: 10,
			integrity_max: 10,
			fabric_strength: 20,
			reveal: 1,
			word: "a",
			plural: 0,
			colour: 0,
			colour_options: [],
			type: ["naked"],
			gender: "n",
			warmth: 0,
			cost: 0,
			description: "naked",
			shop: [],
			collared: 0,
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			cursed: 0,
			location: 0,
			iconFile: 0,
			accIcon: 0,
			mainImage: 0,
		},

		{
			index: 1,
			name: "collar",
			name_cap: "Collar",
			variable: "collar",
			integrity: 400,
			integrity_max: 400,
			fabric_strength: 20,
			reveal: 1000,
			word: "n",
			plural: 1,
			colour: 0,
			colour_options: [],
			colour_combat: 0,
			type: ["fetish"],
			gender: "n",
			warmth: 0,
			cost: 20000,
			description: "Requires a special tool to unlock.",
			shop: [],
			collared: 1,
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			cursed: 1,
			location: 0,
			iconFile: "collar.png",
			accIcon: 0,
		},

		{
			index: 2,
			name: "bunny collar",
			name_cap: "Bunny collar",
			variable: "bunnycollar",
			integrity: 100,
			integrity_max: 100,
			fabric_strength: 20,
			reveal: 300,
			word: "n",
			plural: 1,
			colour: 0,
			colour_options: [],
			colour_combat: "white",
			type: ["costume", "serving"],
			gender: "n",
			warmth: 0,
			cost: 3000,
			description: "A collar and tie. Part of the bunny outfit.",
			shop: ["adult"],
			collared: 0,
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			cursed: 0,
			location: 0,
			iconFile: "bunny_collar.png",
			accIcon: 0,
		},

		{
			index: 3,
			name: "holy pendant",
			name_cap: "Holy pendant",
			variable: "holypendant",
			integrity: 100,
			integrity_max: 100,
			fabric_strength: 20,
			reveal: 1,
			word: "n",
			plural: 1,
			colour: 0,
			colour_options: [],
			colour_combat: "yellow",
			type: ["holy"],
			gender: "n",
			warmth: 0,
			cost: 1000,
			description: "Heavy. So you don't forget you're wearing it.",
			shop: ["forest"],
			collared: 0,
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			cursed: 0,
			location: 0,
			iconFile: "holy_pendant.png",
			accIcon: 0,
		},

		{
			index: 4,
			name: "dark pendant",
			name_cap: "Dark pendant",
			variable: "darkpendant",
			integrity: 100,
			integrity_max: 100,
			fabric_strength: 20,
			reveal: 1,
			word: "n",
			plural: 1,
			colour: 0,
			colour_options: [],
			colour_combat: "black",
			type: ["dark"],
			gender: "n",
			warmth: 0,
			cost: 10000,
			description: "Absorbs all light.",
			shop: ["forest"],
			collared: 0,
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			cursed: 0,
			location: 0,
			iconFile: "dark_pendant.png",
			accIcon: 0,
		},

		{
			index: 5,
			name: "stone pendant",
			name_cap: "Stone pendant",
			variable: "stonependant",
			integrity: 100,
			integrity_max: 100,
			fabric_strength: 20,
			reveal: 1,
			word: "n",
			plural: 1,
			colour: 0,
			colour_options: [],
			colour_combat: "black",
			type: ["holy"],
			gender: "n",
			warmth: 0,
			cost: 2000,
			description: "An old holy symbol on a simple string.",
			shop: ["forest"],
			collared: 0,
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			cursed: 0,
			location: 0,
			iconFile: "stone_pendant.png",
			accIcon: 0,
		},

		{
			index: 6,
			name: "gold choker",
			name_cap: "Gold choker",
			variable: "goldchoker",
			integrity: 100,
			integrity_max: 100,
			fabric_strength: 20,
			reveal: 300,
			word: "a",
			plural: 0,
			colour: 0,
			colour_options: [],
			colour_combat: 0,
			type: ["costume", "serving"],
			gender: "n",
			warmth: 0,
			cost: 25000,
			description: "Exotic and eye-catching.",
			shop: ["adult"],
			collared: 0,
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			cursed: 0,
			location: 0,
			iconFile: "gold_choker.png",
			accIcon: 0,
		},

		{
			index: 7,
			name: "cat bell collar",
			name_cap: "Cat bell collar",
			variable: "cat",
			integrity: 100,
			integrity_max: 100,
			fabric_strength: 20,
			reveal: 300,
			word: "a",
			plural: 0,
			colour: 0,
			colour_options: [],
			colour_combat: "red",
			type: ["costume", "serving", "unstealthy", "eerie"],
			gender: "n",
			warmth: 0,
			cost: 1500,
			description: "Jingles.",
			shop: ["clothing", "adult"],
			collared: 0,
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			cursed: 0,
			location: 0,
			iconFile: "cat_bell_collar.png",
			accIcon: 0,
		},

		{
			index: 8,
			name: "cow bell",
			name_cap: "Cow bell",
			variable: "cow",
			integrity: 100,
			integrity_max: 100,
			fabric_strength: 20,
			reveal: 300,
			word: "a",
			plural: 0,
			colour: 0,
			colour_options: [],
			colour_combat: 0,
			type: ["costume", "eerie", "unstealthy"],
			gender: "n",
			warmth: 0,
			cost: 1500,
			description: "Jangles.",
			shop: ["forest"],
			collared: 0,
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			cursed: 0,
			location: 0,
			iconFile: "cow_bell.png",
			accIcon: 0,
		},

		{
			index: 9,
			name: "lace choker",
			name_cap: "Lace choker",
			variable: "lacechoker",
			integrity: 40,
			integrity_max: 40,
			fabric_strength: 20,
			reveal: 100,
			word: "a",
			plural: 0,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			colour_combat: "black",
			type: ["formal"],
			gender: "f",
			femininity: 100,
			warmth: 0,
			cost: 1800,
			description: "Glamorous.",
			shop: ["clothing", "adult"],
			shopGroup: "lacechoker",
			collared: 0,
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			cursed: 0,
			location: 0,
			iconFile: "lace_choker.png",
			accIcon: 0,
		},

		{
			index: 10,
			name: "spiked collar",
			name_cap: "Spiked collar",
			variable: "spiked",
			integrity: 40,
			integrity_max: 40,
			fabric_strength: 20,
			reveal: 100,
			word: "a",
			plural: 0,
			colour: 0,
			colour_options: [],
			colour_combat: "black",
			type: ["fetish", "costume", "eerie"],
			gender: "n",
			femininity: 0,
			warmth: 0,
			cost: 1500,
			description: "Menaces with spikes of steel.",
			shop: ["clothing", "adult"],
			collared: 0,
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			cursed: 0,
			location: 0,
			iconFile: "spiked_collar.png",
			accIcon: 0,
		},

		{
			index: 11,
			name: "heart choker",
			name_cap: "Heart choker",
			variable: "heartchoker",
			integrity: 100,
			integrity_max: 100,
			fabric_strength: 20,
			reveal: 100,
			word: "a",
			plural: 0,
			colour: 0,
			colour_options: [],
			colour_combat: "black",
			type: ["normal"],
			gender: "f",
			femininity: 200,
			warmth: 0,
			cost: 2100,
			description: "Cute.",
			shop: ["clothing", "adult"],
			collared: 0,
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			cursed: 0,
			location: 0,
			iconFile: "heart_choker.png",
			accIcon: 0,
		},

		{
			index: 12,
			name: "ringed collar",
			name_cap: "Ringed collar",
			variable: "ringedcollar",
			integrity: 100,
			integrity_max: 100,
			fabric_strength: 20,
			reveal: 200,
			word: "a",
			plural: 0,
			colour: 0,
			colour_options: [],
			colour_combat: "black",
			type: ["fetish"],
			gender: "n",
			femininity: 0,
			warmth: 0,
			cost: 2500,
			description: "Ready for leashing.",
			shop: ["clothing", "adult"],
			collared: 0,
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			cursed: 0,
			location: 0,
			iconFile: "ringed_collar.png",
			accIcon: 0,
		},

		{
			index: 13,
			name: "necktie",
			name_cap: "Necktie",
			variable: "tie",
			integrity: 100,
			integrity_max: 100,
			fabric_strength: 20,
			reveal: 100,
			word: "a",
			plural: 0,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			type: ["formal"],
			gender: "m",
			femininity: -100,
			warmth: 0,
			cost: 3000,
			description: "Classic accessory for office workers.",
			shop: ["clothing", "adult"],
			collared: 0,
			has_collar: 1,
			accessory: 1,
			accessory_colour: 0,
			accessory_colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			accessory_colour_sidebar: 1,
			cursed: 0,
			location: 0,
			iconFile: "necktie.png",
			accIcon: "necktie_acc.png",
		},

		{
			index: 14,
			name: "suspenders",
			name_cap: "Suspenders",
			variable: "suspenders",
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
			gender: "m",
			femininity: -100,
			warmth: 0,
			cost: 2000,
			description: "They hold your pants.",
			shop: ["clothing", "adult"],
			collared: 0,
			accessory: 1,
			accessory_colour: 0,
			accessory_colour_options: ["steel", "blue steel", "bronze", "gold", "silver"],
			accessory_colour_sidebar: 1,
			mask_img: 1,
			cursed: 0,
			location: 0,
			iconFile: "suspenders.png",
			accIcon: 0,
			altposition: "none",
			altdisabled: [],
		},

		{
			index: 15,
			name: "cloth choker",
			name_cap: "Cloth choker",
			variable: "clothchoker",
			integrity: 100,
			integrity_max: 100,
			fabric_strength: 20,
			reveal: 100,
			word: "a",
			plural: 0,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			type: ["normal"],
			gender: "f",
			femininity: 100,
			warmth: 0,
			cost: 1500,
			description: "Brimming with personality.",
			shop: ["clothing", "adult"],
			collared: 0,
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			cursed: 0,
			location: 0,
			iconFile: "cloth_choker.png",
			accIcon: 0,
		},

		{
			index: 16,
			name: "scarf",
			name_cap: "Scarf",
			variable: "scarf",
			integrity: 100,
			integrity_max: 100,
			fabric_strength: 20,
			reveal: 100,
			word: "a",
			plural: 0,
			colour: 0,
			colour_options: [
				"black",
				"navy blue",
				"blue",
				"neon blue",
				"wine",
				"brown",
				"green",
				"pink",
				"light pink",
				"purple",
				"lilac",
				"red",
				"tangerine",
				"teal",
				"white",
				"yellow",
				"custom",
			],
			colour_sidebar: 1,
			type: ["normal"],
			gender: "n",
			femininity: 0,
			warmth: 2,
			cost: 1200,
			description: "Snug.",
			shop: ["clothing"],
			collared: 0,
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			cursed: 0,
			location: 0,
			iconFile: "scarf.png",
			accIcon: 0,
		},

		{
			index: 17,
			name: "gold chain",
			name_cap: "Gold chain",
			variable: "chaingold",
			integrity: 100,
			integrity_max: 100,
			fabric_strength: 500,
			reveal: 100,
			word: "a",
			plural: 0,
			colour: 0,
			colour_options: [],
			colour_sidebar: 0,
			type: ["normal"],
			gender: "m",
			femininity: -200,
			warmth: 0,
			cost: 11000,
			description: "Luxurious men's jewellery.",
			shop: ["clothing", "adult"],
			collared: 0,
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			cursed: 0,
			location: 0,
			iconFile: "gold_chain.png",
			accIcon: 0,
		},

		{
			index: 18,
			name: "iron chain",
			name_cap: "Iron chain",
			variable: "chainiron",
			integrity: 100,
			integrity_max: 100,
			fabric_strength: 1000,
			reveal: 1,
			word: "a",
			plural: 0,
			colour: 0,
			colour_options: [],
			colour_sidebar: 0,
			type: ["normal"],
			gender: "m",
			femininity: -200,
			warmth: 0,
			cost: 300,
			description: "Men's jewellery.",
			shop: ["clothing", "adult"],
			collared: 0,
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			cursed: 0,
			location: 0,
			iconFile: "iron_chain.png",
			accIcon: 0,
		},

		{
			index: 19,
			name: "holy stole",
			name_cap: "Holy stole",
			variable: "holystole",
			integrity: 100,
			integrity_max: 100,
			fabric_strength: 100,
			reveal: 1,
			word: "a",
			plural: 0,
			colour: 0,
			colour_options: [],
			type: ["holy"],
			gender: "n",
			femininity: 0,
			warmth: 1,
			cost: 10000,
			description: "Ecclesiastical attire.",
			shop: ["forest"],
			collared: 0,
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			cursed: 0,
			location: 0,
			iconFile: "holy_stole.png",
			accIcon: 0,
		},

		{
			index: 20,
			name: "free use collar",
			name_cap: "Free use collar",
			variable: "freeuse",
			integrity: 400,
			integrity_max: 400,
			fabric_strength: 20,
			reveal: 1000,
			word: "n",
			plural: 1,
			colour: 0,
			colour_options: [],
			colour_combat: 0,
			type: ["fetish"],
			gender: "n",
			warmth: 0,
			cost: 0,
			description: "Requires a special tool to unlock.",
			shop: [],
			collared: 1,
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			cursed: 1,
			location: 0,
			iconFile: "collar.png",
			accIcon: 0,
		},

		{
			index: 21,
			name: "collar with leash",
			name_cap: "Collar with leash",
			variable: "collarleash",
			integrity: 400,
			integrity_max: 400,
			fabric_strength: 20,
			reveal: 1000,
			word: "n",
			plural: 1,
			colour: 0,
			colour_options: [],
			colour_combat: 0,
			type: ["fetish", "leash"],
			gender: "n",
			warmth: 0,
			cost: 20000,
			description: "Requires a special tool to unlock.",
			shop: [],
			collared: 1,
			accessory: 1,
			accessory_colour: 0,
			accessory_colour_options: [],
			cursed: 1,
			location: 0,
			iconFile: "collar.png",
			accIcon: 0,
		},

		{
			index: 22,
			name: "free use collar with leash",
			name_cap: "Free use collar with leash",
			variable: "freeuseleash",
			integrity: 400,
			integrity_max: 400,
			fabric_strength: 20,
			reveal: 1000,
			word: "n",
			plural: 1,
			colour: 0,
			colour_options: [],
			colour_combat: 0,
			type: ["fetish", "leash"],
			gender: "n",
			warmth: 0,
			cost: 0,
			description: "Requires a special tool to unlock.",
			shop: [],
			collared: 1,
			accessory: 1,
			accessory_colour: 0,
			accessory_colour_options: [],
			cursed: 1,
			location: 0,
			iconFile: "collar.png",
			accIcon: 0,
		},

		{
			index: 23,
			name: "ivory necklace",
			name_cap: "Ivory necklace",
			variable: "ivorynecklace",
			integrity: 100,
			integrity_max: 100,
			fabric_strength: 100,
			reveal: 1,
			word: "a",
			plural: 0,
			colour: 0,
			colour_options: [],
			type: ["holy", "dark", "eerie", "esoteric"],
			gender: "n",
			femininity: 0,
			warmth: 0,
			cost: 200000,
			description: "A sacred relic, once worn by a high-ranking member of an ancient order. You can see your reflection in the gemstones. You look pale.",
			shop: [],
			collared: 0,
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			cursed: 0,
			location: 0,
			iconFile: "ivory_necklace.png",
			accIcon: 0,
		},

		{
			index: 24,
			name: "leather collar with leash",
			name_cap: "Leather collar with leash",
			variable: "collarleashfetish",
			integrity: 400,
			integrity_max: 400,
			fabric_strength: 20,
			reveal: 1000,
			word: "n",
			plural: 1,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			colour_combat: 0,
			type: ["fetish", "leash"],
			gender: "n",
			warmth: 0,
			cost: 24000,
			description: "Requires a special tool to unlock, but you own the key.",
			shop: ["adult"],
			collared: 1,
			accessory: 1,
			accessory_colour: 0,
			accessory_colour_options: [],
			cursed: 0,
			location: 0,
			iconFile: "collar.png",
			accIcon: 0,
		},

		{
			index: 25,
			name: "leather collar",
			name_cap: "Leather Collar",
			variable: "collarfetish",
			integrity: 400,
			integrity_max: 400,
			fabric_strength: 20,
			reveal: 1000,
			word: "n",
			plural: 1,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			colour_combat: 0,
			type: ["fetish"],
			gender: "n",
			warmth: 0,
			cost: 20000,
			description: "Requires a special tool to unlock, but you own the key.",
			shop: ["adult"],
			collared: 1,
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			cursed: 0,
			location: 0,
			iconFile: "collar_no_leash.png",
			accIcon: 0,
		},

		{
			index: 26,
			name: "spiked collar with leash",
			name_cap: "Spiked collar with leash",
			variable: "spikedleash",
			integrity: 40,
			integrity_max: 40,
			fabric_strength: 20,
			reveal: 100,
			word: "a",
			plural: 0,
			colour: 0,
			colour_options: [],
			colour_combat: "black",
			type: ["fetish", "costume", "eerie", "leash"],
			gender: "n",
			femininity: 0,
			warmth: 0,
			cost: 1500,
			description: "Menaces with spikes of steel.",
			shop: ["clothing"],
			collared: 1,
			accessory: 1,
			accessory_colour: 0,
			accessory_colour_options: [],
			cursed: 0,
			location: 0,
			iconFile: "spiked_collar.png",
			accIcon: 0,
		},

		{
			index: 27,
			name: "short tie",
			name_cap: "Short tie",
			variable: "shorttie",
			integrity: 100,
			integrity_max: 100,
			fabric_strength: 20,
			reveal: 100,
			word: "a",
			plural: 0,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			type: ["formal"],
			gender: "m",
			femininity: -100,
			warmth: 0,
			cost: 3000,
			description: "Smart and sophisticated.",
			shop: ["clothing", "adult"],
			collared: 0,
			accessory: 1,
			accessory_colour: 0,
			accessory_colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			accessory_colour_sidebar: 1,
			cursed: 0,
			location: 0,
			iconFile: "necktie.png",
			accIcon: "necktie_acc.png",
		},

		{
			index: 28,
			name: "fur boa",
			name_cap: "Fur boa",
			variable: "boa",
			integrity: 100,
			integrity_max: 100,
			fabric_strength: 20,
			reveal: 100,
			word: "a",
			plural: 0,
			colour: 0,
			colour_options: [
				"black",
				"navy blue",
				"wine",
				"blue",
				"brown",
				"green",
				"pink",
				"light pink",
				"purple",
				"lilac",
				"red",
				"tangerine",
				"teal",
				"white",
				"yellow",
				"custom",
			],
			colour_sidebar: 1,
			type: ["normal"],
			gender: "n",
			warmth: 2,
			cost: 3000,
			description: "Soft and stylish.",
			shop: ["clothing"],
			collared: 0,
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			accessory_colour_sidebar: 0,
			cursed: 0,
			location: 0,
			iconFile: "boa.png",
		},

		{
			index: 29,
			name: "sailor ribbon",
			name_cap: "Sailor ribbon",
			variable: "serafuku ribbon",
			integrity: 100,
			integrity_max: 100,
			fabric_strength: 20,
			reveal: 100,
			word: "a",
			plural: 0,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			type: ["normal"],
			gender: "n",
			warmth: 0,
			cost: 1000,
			description: "Worn in a style popular with sailors and schoolgirls.",
			shop: ["forest"],
			collared: 0,
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			accessory_colour_sidebar: 0,
			cursed: 0,
			location: 0,
			iconFile: "serafuku_ribbon.png",
			accIcon: 0,
		},

		{
			index: 30,
			name: "love locket",
			name_cap: "Love locket",
			variable: "lovelocket",
			integrity: 40,
			integrity_max: 40,
			fabric_strength: 20,
			reveal: 300,
			word: "a",
			plural: 0,
			colour: 0,
			colour_options: ["bronze", "gold", "silver"],
			colour_sidebar: 1,
			colour_combat: "gold",
			type: ["normal"],
			gender: "n",
			femininity: 0,
			warmth: 0,
			cost: 3500,
			description: "Opens to reveal space for a photo. Customise at a mirror.",
			shop: ["clothing"],
			collared: 0,
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			cursed: 0,
			location: 0,
			iconFile: "love_locket.png",
			accIcon: 0,
		},
		{
			index: 31,
			name: "classic lace choker",
			name_cap: "Classic lace choker",
			variable: "lacechokerold",
			integrity: 40,
			integrity_max: 40,
			fabric_strength: 20,
			reveal: 100,
			word: "a",
			plural: 0,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			colour_combat: "black",
			type: ["formal"],
			gender: "f",
			femininity: 100,
			warmth: 0,
			cost: 1800,
			description: "Glamorous.",
			shop: ["clothing", "adult"],
			shopGroup: "lacechoker",
			collared: 0,
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			cursed: 0,
			location: 0,
			iconFile: "lace_choker.png",
			accIcon: 0,
		},
		{
			index: 32,
			name: "bowtie",
			name_cap: "Bowtie",
			variable: "bowtie",
			integrity: 100,
			integrity_max: 100,
			fabric_strength: 20,
			reveal: 100,
			word: "a",
			plural: 0,
			colour: 0,
			colour_options: ["black", "navy blue", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			type: ["formal"],
			gender: "m",
			femininity: -100,
			warmth: 0,
			cost: 3000,
			description: "Classic accessory for office workers.",
			shop: ["clothing", "adult"],
			collared: 0,
			has_collar: 1,
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			accessory_colour_sidebar: 0,
			cursed: 0,
			location: 0,
			iconFile: "bowtie.png",
			accIcon: 0,
		},
		{
			index: 33,
			name: "ribbon tie",
			name_cap: "Ribbon tie",
			variable: "ribbontie",
			integrity: 100,
			integrity_max: 100,
			fabric_strength: 20,
			reveal: 100,
			word: "a",
			plural: 0,
			colour: 0,
			colour_options: [
				"black",
				"blue",
				"brown",
				"green",
				"pink",
				"light pink",
				"purple",
				"lilac",
				"red",
				"tangerine",
				"teal",
				"white",
				"yellow",
				"custom",
			],
			colour_sidebar: 1,
			type: ["formal"],
			gender: "f",
			femininity: 100,
			warmth: 0,
			cost: 3000,
			description: "Classic accessory for office workers.",
			shop: ["clothing", "adult"],
			collared: 0,
			has_collar: 1,
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			accessory_colour_sidebar: 0,
			cursed: 0,
			location: 0,
			iconFile: "ribbon_tie.png",
			accIcon: 0,
		},
		{
			index: 34,
			name: "whistle",
			name_cap: "Whistle",
			variable: "whistle",
			integrity: 200,
			integrity_max: 200,
			fabric_strength: 20,
			reveal: 100,
			word: "a",
			plural: 0,
			colour: 0,
			colour_options: [],
			type: ["normal"],
			gender: "n",
			femininity: 0,
			warmth: 0,
			cost: 300,
			description: "Not effective as a rape whistle.",
			shop: ["clothing"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			accessory_colour_sidebar: 0,
			cursed: 0,
			location: 0,
			iconFile: "whistle.png",
			accIcon: 0,
		},
	];

	/*
		Clothes that modders add go into this array, this should be empty in the base game at all times.
		These items should have a `modder` variable with a the modders name in a short string
	*/
	setup.moddedClothes.neck = [];

	setup.moddedClothes.neck.forEach((x, i) => (x.index = setup.clothes.neck.length + i));
	setup.clothes.neck.push(...setup.moddedClothes.neck);
}
window.initNeck = initNeck;
