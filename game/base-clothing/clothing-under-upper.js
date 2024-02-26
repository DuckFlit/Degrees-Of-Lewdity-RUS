/* For any item that has a colour_combat tag, set it to 0 if that item ever gets its own combat sprites.

Warmth checklist:
	Base: 0
	Covers breasts fully: +1
	Covers at least ⅔ of upper body: +1
	Covers arms: +1

	Materials:
	Thin: -1
	Normal: 0
	Thick: +1

	Max warmth: 4
*/
function initUnderUpper() {
	setup.clothes.under_upper = [
		{
			index: 0,
			name: "naked",
			name_cap: "Naked",
			variable: "naked",
			integrity: 0,
			integrity_max: 0,
			fabric_strength: 0,
			reveal: 1000,
			bustresize: 0,
			word: "n",
			one_piece: 0,
			strap: 0,
			open: 0,
			state: 0,
			state_base: 0,
			state_top: 0,
			state_top_base: 0,
			plural: 0,
			colour: 0,
			colour_options: [],
			exposed: 1,
			exposed_base: 1,
			type: ["naked"],
			set: "under_upper",
			gender: "n",
			warmth: 0,
			cost: 0,
			description: "naked",
			shop: [],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			sleeve_img: 0,
			breast_img: 0,
			cursed: 0,
			location: 0,
			iconFile: 0,
			accIcon: 0,
			mainImage: 0,
		},

		{
			index: 1,
			name: "bikini top",
			name_cap: "Bikini top",
			variable: "bikini",
			integrity: 20,
			integrity_max: 20,
			fabric_strength: 20,
			reveal: 900,
			bustresize: 0,
			word: "n",
			one_piece: 0,
			strap: 1,
			open: 1,
			state: "midriff",
			state_base: "midriff",
			state_top: "chest",
			state_top_base: "chest",
			plural: 0,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			exposed: 0,
			exposed_base: 0,
			type: ["swim", "tanLines"],
			set: "under_upper",
			gender: "f",
			femininity: 300,
			warmth: 1,
			cost: 2000,
			description: "Revealing swimwear.",
			shop: ["clothing"],
			shopGroup: "bikinitop",
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			sleeve_img: 0,
			breast_img: 1,
			cursed: 0,
			location: 0,
			iconFile: "bikini_top.png",
			accIcon: 0,
		},

		{
			index: 2,
			name: "school swimsuit",
			name_cap: "School swimsuit",
			variable: "schoolswimsuit",
			integrity: 40,
			integrity_max: 40,
			fabric_strength: 30,
			reveal: 600,
			bustresize: 0,
			word: "a",
			one_piece: 1,
			strap: 0,
			open: 1,
			state: "waist",
			state_base: "waist",
			state_top: "chest",
			state_top_base: "chest",
			plural: 0,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			exposed: 0,
			exposed_base: 0,
			type: ["swim", "school", "tanLines"],
			set: "school swimsuit",
			gender: "f",
			femininity: 300,
			warmth: 3,
			cost: 2500,
			description: "Proper school swimwear.",
			shop: ["clothing", "school"],
			shopGroup: "schoolswimsuit",
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			sleeve_img: 0,
			breast_img: 1,
			cursed: 0,
			location: 0,
			iconFile: "school_swimsuit.png",
			accIcon: 0,
			outfitPrimary: { under_lower: "school swimsuit bottom" },
		},

		{
			index: 3,
			name: "leotard",
			name_cap: "Leotard",
			variable: "leotard",
			integrity: 100,
			integrity_max: 100,
			fabric_strength: 30,
			reveal: 600,
			bustresize: 0,
			word: "a",
			one_piece: 1,
			strap: 0,
			open: 0,
			state: "waist",
			state_base: "waist",
			state_top: "chest",
			state_top_base: "chest",
			plural: 0,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			colour_combat: 0,
			exposed: 0,
			exposed_base: 0,
			type: ["dance", "covered"],
			set: "leotard",
			gender: "n",
			warmth: 2,
			cost: 3000,
			description: "Form fitting.",
			shop: ["clothing", "adult"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			sleeve_img: 1,
			breast_img: 1,
			cursed: 0,
			location: 0,
			iconFile: "leotard.png",
			accIcon: 0,
			outfitPrimary: { under_lower: "leotard bottom" },
		},

		{
			index: 4,
			name: "unitard",
			name_cap: "Unitard",
			variable: "unitard",
			oldVariable: [{ name: "full body leotard", variable: "leotardfull" }],
			integrity: 100,
			integrity_max: 100,
			fabric_strength: 30,
			reveal: 500,
			bustresize: 0,
			word: "a",
			one_piece: 1,
			strap: 0,
			open: 0,
			state: "waist",
			state_base: "waist",
			state_top: "chest",
			state_top_base: "chest",
			plural: 0,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			colour_combat: 0,
			exposed: 0,
			exposed_base: 0,
			type: ["dance", "covered"],
			set: "unitard",
			gender: "n",
			warmth: 4,
			cost: 3500,
			description: "Form fitting. Covers your legs.",
			shop: ["clothing", "adult"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			sleeve_img: 1,
			breast_img: 1,
			cursed: 0,
			location: 0,
			iconFile: "unitard.png",
			accIcon: 0,
			outfitPrimary: { under_lower: "unitard bottom" },
		},

		{
			index: 5,
			name: "skimpy leotard",
			name_cap: "Skimpy leotard",
			variable: "leotardskimpy",
			integrity: 80,
			integrity_max: 80,
			fabric_strength: 30,
			reveal: 600,
			bustresize: 0,
			word: "a",
			one_piece: 1,
			strap: 0,
			open: 0,
			state: "waist",
			state_base: "waist",
			state_top: "chest",
			state_top_base: "chest",
			plural: 0,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			colour_combat: 0,
			exposed: 0,
			exposed_base: 0,
			type: ["dance", "covered"],
			set: "skimpy leotard",
			gender: "n",
			warmth: 2,
			cost: 2500,
			description: "Form fitting. Shows off your thighs.",
			shop: ["clothing", "adult"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			sleeve_img: 0,
			breast_img: 1,
			cursed: 0,
			location: 0,
			iconFile: "skimpy_leotard.png",
			accIcon: 0,
			outfitPrimary: { under_lower: "skimpy leotard bottom" },
		},

		{
			index: 6,
			name: "foreign school swimsuit",
			name_cap: "Foreign school swimsuit",
			variable: "schoolswimsuitj",
			integrity: 40,
			integrity_max: 40,
			fabric_strength: 30,
			reveal: 600,
			bustresize: 0,
			word: "a",
			one_piece: 1,
			strap: 0,
			open: 1,
			state: "waist",
			state_base: "waist",
			state_top: "chest",
			state_top_base: "chest",
			plural: 0,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			exposed: 0,
			exposed_base: 0,
			type: ["swim", "school", "tanLines"],
			set: "foreign school swimsuit",
			gender: "f",
			femininity: 300,
			warmth: 3,
			cost: 2500,
			description: "Official uniform swimsuit for the local school, but in a style popular in a foreign country.",
			shop: ["clothing", "school"],
			accessory: 1,
			accessory_colour: 0,
			accessory_colour_options: [],
			accessory_colour_combat: "white",
			sleeve_img: 0,
			breast_img: 1,
			cursed: 0,
			location: 0,
			iconFile: "foreign_school_swimsuit.png",
			accIcon: 0,
			outfitPrimary: { under_lower: "foreign school swimsuit bottom" },
		},

		{
			index: 7,
			name: "swimsuit",
			name_cap: "Swimsuit",
			variable: "swimsuit",
			integrity: 60,
			integrity_max: 60,
			fabric_strength: 30,
			reveal: 700,
			bustresize: 0,
			word: "a",
			one_piece: 1,
			strap: 1,
			open: 1,
			state: "waist",
			state_base: "waist",
			state_top: "chest",
			state_top_base: "chest",
			plural: 0,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			exposed: 0,
			exposed_base: 0,
			type: ["swim"],
			set: "swimsuit",
			gender: "f",
			femininity: 300,
			warmth: 3,
			cost: 7500,
			description: "Sexy.",
			shop: ["clothing"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			sleeve_img: 0,
			breast_img: 1,
			cursed: 0,
			location: 0,
			iconFile: "swimsuit.png",
			accIcon: 0,
			outfitPrimary: { under_lower: "swimsuit bottom" },
		},

		{
			index: 8,
			name: "bunny leotard",
			name_cap: "Bunny leotard",
			variable: "leotardbunny",
			integrity: 120,
			integrity_max: 120,
			fabric_strength: 30,
			reveal: 800,
			bustresize: 0,
			word: "a",
			one_piece: 1,
			strap: 0,
			open: 1,
			state: "waist",
			state_base: "waist",
			state_top: "chest",
			state_top_base: "chest",
			plural: 0,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			colour_combat: 0,
			exposed: 0,
			exposed_base: 0,
			type: ["costume", "serving", "dance"],
			set: "leotardbunny",
			gender: "f",
			femininity: 300,
			warmth: 2,
			cost: 5000,
			description: "Waitress attire. Tougher than it looks. Part of a bunny outfit, and has a fluffy white tail on the back to prove it.",
			shop: ["adult"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			sleeve_img: 0,
			breast_img: 1,
			cursed: 0,
			location: 0,
			iconFile: "bunny_leotard.png",
			accIcon: 0,
			outfitPrimary: { under_lower: "bunny leotard bottom" },
		},

		{
			index: 9,
			name: "catgirl bra",
			name_cap: "Catgirl bra",
			variable: "catgirlbra",
			integrity: 100,
			integrity_max: 100,
			fabric_strength: 30,
			reveal: 500,
			bustresize: 0,
			word: "a",
			one_piece: 0,
			strap: 1,
			open: 1,
			state: "midriff",
			state_base: "midriff",
			state_top: "chest",
			state_top_base: "chest",
			plural: 0,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			exposed: 0,
			exposed_base: 0,
			type: ["costume", "serving"],
			set: "under_upper",
			gender: "f",
			femininity: 300,
			warmth: 1,
			cost: 3000,
			description: "For when a regular bra just isn't cute enough.",
			shop: ["clothing", "adult"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			sleeve_img: 0,
			breast_img: 1,
			cursed: 0,
			location: 0,
			iconFile: "catgirl_bra.png",
			accIcon: 0,
			mainImage: 0,
		},

		{
			index: 10,
			name: "lace bra",
			name_cap: "Lace bra",
			variable: "lacebra",
			integrity: 80,
			integrity_max: 80,
			fabric_strength: 30,
			reveal: 600,
			bustresize: 0,
			word: "a",
			one_piece: 0,
			strap: 1,
			open: 1,
			state: "midriff",
			state_base: "midriff",
			state_top: "chest",
			state_top_base: "chest",
			plural: 0,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "pale tangerine", "teal", "pale white", "pale yellow", "custom"],
			colour_sidebar: 1,
			exposed: 0,
			exposed_base: 0,
			type: ["normal"],
			set: "under_upper",
			gender: "f",
			femininity: 300,
			warmth: 1,
			cost: 1000,
			description: "Hints at what lies beneath.",
			shop: ["clothing", "adult"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			sleeve_img: 0,
			breast_img: 1,
			cursed: 0,
			location: 0,
			iconFile: "lace_bra.png",
			accIcon: 0,
		},

		{
			index: 11,
			name: "microkini top",
			name_cap: "Microkini top",
			variable: "microkini",
			integrity: 80,
			integrity_max: 80,
			fabric_strength: 30,
			reveal: 900,
			bustresize: 0,
			word: "a",
			one_piece: 0,
			strap: 1,
			open: 1,
			state: "midriff",
			state_base: "midriff",
			state_top: "chest",
			state_top_base: "chest",
			plural: 0,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			exposed: 0,
			exposed_base: 0,
			type: ["swim"],
			set: "under_upper",
			gender: "f",
			femininity: 300,
			warmth: 0,
			cost: 2400,
			description: "Skirts the borders of decency.",
			shop: ["clothing", "adult"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			sleeve_img: 0,
			breast_img: 1,
			cursed: 0,
			location: 0,
			iconFile: "microkini_top.png",
			accIcon: 0,
		},

		{
			index: 12,
			name: "plain bra",
			name_cap: "Plain bra",
			variable: "plainbra",
			integrity: 100,
			integrity_max: 100,
			fabric_strength: 30,
			reveal: 400,
			bustresize: 0,
			word: "a",
			one_piece: 0,
			strap: 1,
			open: 1,
			state: "midriff",
			state_base: "midriff",
			state_top: "chest",
			state_top_base: "chest",
			plural: 0,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "pale tangerine", "teal", "pale white", "pale yellow", "custom"],
			colour_sidebar: 1,
			exposed: 0,
			exposed_base: 0,
			type: ["normal"],
			set: "under_upper",
			gender: "f",
			femininity: 300,
			warmth: 1,
			cost: 500,
			description: "No-nonsense.",
			shop: ["clothing", "school"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			sleeve_img: 0,
			breast_img: 1,
			cursed: 0,
			location: 0,
			iconFile: "plain_bra.png",
			accIcon: 0,
		},

		{
			index: 13,
			name: "sports bra",
			name_cap: "Sports bra",
			variable: "sportsbra",
			integrity: 150,
			integrity_max: 150,
			fabric_strength: 30,
			reveal: 300,
			bustresize: -1,
			word: "a",
			one_piece: 0,
			strap: 0,
			open: 1,
			state: "midriff",
			state_base: "midriff",
			state_top: "chest",
			state_top_base: "chest",
			plural: 0,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			exposed: 0,
			exposed_base: 0,
			type: ["normal", "athletic", "covered"],
			set: "under_upper",
			gender: "f",
			femininity: 300,
			warmth: 1,
			cost: 2000,
			description: "Supportive.",
			shop: ["clothing"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			sleeve_img: 0,
			breast_img: 1,
			cursed: 0,
			location: 0,
			iconFile: "sports_bra.png",
			accIcon: 0,
		},

		{
			index: 14,
			name: "mesh shirt",
			name_cap: "Mesh shirt",
			variable: "mesh",
			integrity: 50,
			integrity_max: 50,
			fabric_strength: 30,
			reveal: 900,
			bustresize: 0,
			word: "a",
			one_piece: 0,
			strap: 0,
			open: 0,
			state: "midriff",
			state_base: "midriff",
			state_top: "chest",
			state_top_base: "chest",
			plural: 0,
			colour: 0,
			colour_options: [],
			colour_combat: "black",
			exposed: 0,
			exposed_base: 0,
			type: ["fetish"],
			set: "under_upper",
			gender: "n",
			warmth: 0,
			cost: 3500,
			description: "Doesn't conceal a thing.",
			shop: ["adult"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			sleeve_img: 1,
			breast_img: 0,
			cursed: 0,
			location: 0,
			iconFile: "mesh_shirt.png",
			accIcon: 0,
		},

		{
			index: 15,
			name: "corset",
			name_cap: "Corset",
			variable: "corset",
			integrity: 180,
			integrity_max: 180,
			fabric_strength: 30,
			reveal: 1000,
			bustresize: 2,
			word: "a",
			one_piece: 0,
			strap: 0,
			open: 1,
			state: "midriff",
			state_base: "midriff",
			state_top: "waist",
			state_top_base: "waist",
			plural: 0,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			exposed: 1,
			exposed_base: 1,
			type: ["fetish", "naked", "pushup", "constricting"],
			set: "under_upper",
			gender: "n",
			warmth: 1,
			cost: 2500,
			description: "Constricts your tummy and emphasises your chest.",
			shop: ["clothing", "adult"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			sleeve_img: 0,
			breast_img: 1,
			cursed: 0,
			location: 0,
			iconFile: "corset.png",
			accIcon: 0,
		},

		{
			index: 16,
			name: "striped bra",
			name_cap: "Striped bra",
			variable: "stripedbra",
			integrity: 100,
			integrity_max: 100,
			fabric_strength: 15,
			reveal: 500,
			bustresize: 0,
			word: "a",
			one_piece: 0,
			strap: 1,
			open: 1,
			state: "midriff",
			state_base: "midriff",
			state_top: "chest",
			state_top_base: "chest",
			plural: 0,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			exposed: 0,
			exposed_base: 0,
			type: ["normal"],
			set: "under_upper",
			gender: "f",
			femininity: 300,
			warmth: 1,
			cost: 600,
			description: "Brimming with personality.",
			shop: ["clothing", "adult"],
			accessory: 1,
			accessory_colour: 0,
			accessory_colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			accessory_colour_sidebar: 1,
			sleeve_img: 0,
			breast_img: 1,
			breast_acc_img: 1,
			cursed: 0,
			location: 0,
			iconFile: "striped_bra.png",
			accIcon: "striped_bra_acc.png",
		},

		{
			index: 17,
			name: "chest wrap",
			name_cap: "Chest wrap",
			variable: "chestwrap",
			integrity: 200,
			integrity_max: 200,
			fabric_strength: 15,
			reveal: 300,
			bustresize: -5,
			word: "a",
			one_piece: 0,
			strap: 0,
			open: 1,
			state: "midriff",
			state_base: "midriff",
			state_top: "chest",
			state_top_base: "chest",
			plural: 0,
			colour: 0,
			colour_options: [],
			colour_combat: 0,
			exposed: 0,
			exposed_base: 0,
			type: ["chest_bind", "constricting", "covered"],
			set: "under_upper",
			gender: "n",
			femininity: 0,
			warmth: 1,
			cost: 600,
			description: "Flattens and protects.",
			shop: ["clothing", "adult"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			sleeve_img: 0,
			breast_img: 1,
			cursed: 0,
			location: 0,
			iconFile: "chest_wrap.png",
			accIcon: 0,
		},

		{
			index: 18,
			name: "arm sleeves",
			name_cap: "Arm sleeves",
			variable: "armsleeves",
			integrity: 80,
			integrity_max: 80,
			fabric_strength: 15,
			reveal: 1000,
			bustresize: 0,
			word: "n",
			one_piece: 0,
			strap: 0,
			open: 1,
			state: "chest",
			state_base: "chest",
			state_top: "neck",
			state_top_base: "neck",
			plural: 1,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			exposed: 1,
			exposed_base: 1,
			type: ["naked"],
			gender: "n",
			femininity: 0,
			warmth: 1,
			cost: 1500,
			description: "Protect your arms.",
			shop: ["clothing"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			sleeve_img: 1,
			breast_img: 0,
			cursed: 0,
			location: 0,
			iconFile: "arm_sleeves.png",
			accIcon: 0,
		},

		{
			index: 19,
			name: "classic bikini top",
			name_cap: "Classic bikini top",
			variable: "classicbikini",
			integrity: 20,
			integrity_max: 20,
			fabric_strength: 20,
			reveal: 900,
			bustresize: 0,
			word: "n",
			one_piece: 0,
			strap: 1,
			open: 1,
			state: "midriff",
			state_base: "midriff",
			state_top: "chest",
			state_top_base: "chest",
			plural: 0,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			exposed: 0,
			exposed_base: 0,
			type: ["swim", "tanLines"],
			set: "under_upper",
			gender: "f",
			femininity: 300,
			warmth: 0,
			cost: 2000,
			description: "Revealing swimwear. Not kind to the well-endowed.",
			shop: ["clothing"],
			shopGroup: "bikinitop",
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			sleeve_img: 0,
			breast_img: 0,
			cursed: 0,
			location: 0,
			iconFile: "classic_bikini_top.png",
			accIcon: 0,
		},

		{
			index: 20,
			name: "classic school swimsuit",
			name_cap: "Classic school swimsuit",
			variable: "classicschoolswimsuit",
			integrity: 40,
			integrity_max: 40,
			fabric_strength: 30,
			reveal: 600,
			bustresize: 0,
			word: "a",
			one_piece: 1,
			strap: 0,
			open: 1,
			state: "waist",
			state_base: "waist",
			state_top: "chest",
			state_top_base: "chest",
			plural: 0,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			exposed: 0,
			exposed_base: 0,
			type: ["swim", "school", "tanLines"],
			set: "classic school swimsuit",
			gender: "f",
			femininity: 300,
			warmth: 3,
			cost: 2500,
			description: "Proper school swimwear. Vintage.",
			shop: ["clothing"],
			shopGroup: "schoolswimsuit",
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			sleeve_img: 0,
			breast_img: 0,
			cursed: 0,
			location: 0,
			iconFile: "classic_school_swimsuit.png",
			accIcon: 0,
			outfitPrimary: { under_lower: "classic school swimsuit bottom" },
		},

		{
			index: 21,
			name: "swim shirt",
			name_cap: "Swim shirt",
			variable: "swimshirt",
			integrity: 100,
			integrity_max: 100,
			fabric_strength: 20,
			reveal: 200,
			bustresize: -5,
			word: "a",
			one_piece: 0,
			strap: 0,
			open: 0,
			state: "waist",
			state_base: "waist",
			state_top: "chest",
			state_top_base: "chest",
			plural: 0,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "custom"],
			colour_sidebar: 1,
			exposed: 0,
			exposed_base: 0,
			type: ["swim", "school", "chest_bind", "constricting", "covered"],
			set: "under_upper",
			gender: "m",
			femininity: -100,
			warmth: 3,
			cost: 6000,
			description: "Protects you from the sun while swimming.",
			shop: ["clothing", "school"],
			accessory: 1,
			accessory_integrity_img: 1,
			accessory_colour: 0,
			accessory_colour_options: [],
			sleeve_img: 1,
			breast_img: 0,
			cursed: 0,
			location: 0,
			iconFile: "swim_shirt.png",
			accIcon: 0,
		},

		{
			index: 22,
			name: "vest",
			name_cap: "Vest",
			variable: "vest",
			integrity: 150,
			integrity_max: 150,
			fabric_strength: 20,
			reveal: 300,
			bustresize: 0,
			word: "a",
			one_piece: 0,
			strap: 0,
			open: 0,
			state: "waist",
			state_base: "waist",
			state_top: "chest",
			state_top_base: "chest",
			plural: 0,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "custom"],
			colour_sidebar: 1,
			exposed: 0,
			exposed_base: 0,
			type: ["normal", "covered"],
			set: "under_upper",
			gender: "m",
			femininity: -200,
			warmth: 2,
			cost: 1200,
			description: "No-nonsense.",
			shop: ["clothing"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			sleeve_img: 0,
			breast_img: 0,
			cursed: 0,
			location: 0,
			iconFile: "vest.png",
			accIcon: 0,
		},

		{
			index: 23,
			name: "strapless bra",
			name_cap: "Strapless bra",
			variable: "straplessbra",
			integrity: 100,
			integrity_max: 100,
			fabric_strength: 30,
			reveal: 500,
			bustresize: 0,
			word: "a",
			one_piece: 0,
			strap: 0,
			open: 1,
			state: "midriff",
			state_base: "midriff",
			state_top: "chest",
			state_top_base: "chest",
			plural: 0,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "pale tangerine", "teal", "pale white", "pale yellow", "custom"],
			colour_sidebar: 1,
			exposed: 0,
			exposed_base: 0,
			type: ["normal"],
			set: "under_upper",
			gender: "f",
			femininity: 300,
			warmth: 1,
			cost: 1000,
			description: "Frees your shoulders.",
			shop: ["clothing", "adult"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			sleeve_img: 0,
			breast_img: 1,
			cursed: 0,
			location: 0,
			iconFile: "strapless_bra.png",
			accIcon: 0,
		},

		{
			index: 24,
			name: "school swim top",
			name_cap: "School swim top",
			variable: "schoolswimtop",
			integrity: 50,
			integrity_max: 50,
			fabric_strength: 30,
			reveal: 500,
			bustresize: 0,
			word: "a",
			one_piece: 0,
			strap: 0,
			open: 0,
			state: "midriff",
			state_base: "midriff",
			state_top: "chest",
			state_top_base: "chest",
			plural: 0,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "pale tangerine", "teal", "pale white", "pale yellow", "custom"],
			colour_sidebar: 1,
			exposed: 0,
			exposed_base: 0,
			type: ["swim", "school"],
			set: "under_upper",
			gender: "f",
			femininity: 300,
			warmth: 2,
			cost: 3000,
			description: "Imitates a foreign school uniform.",
			shop: ["clothing", "school"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			sleeve_img: 0,
			breast_img: 1,
			cursed: 0,
			location: 0,
			iconFile: "school_swim_top.png",
			accIcon: 0,
		},

		{
			index: 25,
			name: "tape",
			name_cap: "Tape",
			variable: "tape",
			integrity: 10,
			integrity_max: 10,
			fabric_strength: 30,
			reveal: 990,
			bustresize: 0,
			word: "n",
			one_piece: 0,
			strap: 0,
			open: 1,
			state: "midriff",
			state_base: "midriff",
			state_top: "chest",
			state_top_base: "chest",
			plural: 0,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "pale tangerine", "teal", "pale white", "pale yellow", "custom"],
			colour_sidebar: 1,
			exposed: 1,
			exposed_base: 1,
			type: ["costume", "sticky", "naked"],
			set: "under_upper",
			gender: "f",
			femininity: 300,
			warmth: 0,
			cost: 2000,
			description: "Barely there.",
			shop: ["clothing", "adult"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			sleeve_img: 0,
			breast_img: 1,
			breast_combat: 1,
			cursed: 0,
			location: 0,
			iconFile: "tape.png",
			accIcon: 0,
		},

		{
			index: 26,
			name: "cow bra",
			name_cap: "Cow bra",
			variable: "cow",
			integrity: 100,
			integrity_max: 100,
			fabric_strength: 30,
			reveal: 500,
			bustresize: 0,
			word: "n",
			one_piece: 0,
			strap: 1,
			open: 1,
			state: "midriff",
			state_base: "midriff",
			state_top: "chest",
			state_top_base: "chest",
			plural: 0,
			colour: 0,
			colour_options: [],
			exposed: 0,
			exposed_base: 0,
			type: ["costume"],
			set: "under_upper",
			gender: "f",
			femininity: 300,
			warmth: 1,
			cost: 2000,
			description: "Supportive.",
			shop: ["forest"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			sleeve_img: 0,
			breast_img: 1,
			cursed: 0,
			location: 0,
			iconFile: "cow_bra.png",
			accIcon: 0,
		},

		{
			index: 27,
			name: "chest binder",
			name_cap: "Chest binder",
			variable: "chestbinder",
			integrity: 200,
			integrity_max: 200,
			fabric_strength: 30,
			reveal: 100,
			bustresize: -7,
			word: "a",
			one_piece: 0,
			strap: 1,
			open: 1,
			state: "midriff",
			state_base: "midriff",
			state_top: "chest",
			state_top_base: "chest",
			plural: 0,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "pale white", "pale yellow", "custom"],
			colour_sidebar: 1,
			exposed: 0,
			exposed_base: 0,
			type: ["chest_bind", "constricting", "covered"],
			set: "under_upper",
			gender: "n",
			femininity: 0,
			warmth: 2,
			cost: 6000,
			description: "Flattens and protects.",
			shop: ["clothing", "adult"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			sleeve_img: 0,
			breast_img: 1,
			cursed: 0,
			location: 0,
			iconFile: "chest_binder.png",
			accIcon: 0,
		},

		{
			index: 28,
			name: "undershirt",
			name_cap: "Undershirt",
			variable: "undershirt",
			integrity: 100,
			integrity_max: 100,
			fabric_strength: 20,
			reveal: 200,
			bustresize: 0,
			word: "a",
			one_piece: 0,
			strap: 0,
			open: 0,
			state: "waist",
			state_base: "waist",
			state_top: "chest",
			state_top_base: "chest",
			plural: 0,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "custom"],
			colour_sidebar: 1,
			exposed: 0,
			exposed_base: 0,
			type: ["normal", "covered"],
			set: "under_upper",
			gender: "m",
			femininity: -100,
			warmth: 4,
			cost: 2500,
			description: "Warm and close-fitting.",
			shop: ["clothing"],
			accessory: 1,
			accessory_integrity_img: 1,
			accessory_colour: 0,
			accessory_colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "custom"],
			accessory_colour_sidebar: 1,
			sleeve_img: 1,
			breast_img: 0,
			cursed: 0,
			location: 0,
			iconFile: "undershirt.png",
			accIcon: "undershirt_acc.png",
		},

		{
			index: 29,
			name: "see-through swimsuit",
			name_cap: "See-through swimsuit",
			variable: "seethroughswimsuit",
			integrity: 40,
			integrity_max: 40,
			fabric_strength: 30,
			reveal: 800,
			bustresize: 0,
			word: "a",
			one_piece: 1,
			strap: 0,
			open: 1,
			state: "waist",
			state_base: "waist",
			state_top: "chest",
			state_top_base: "chest",
			plural: 0,
			colour: 0,
			colour_options: ["black", "blue steel", "grey", "light pink", "light blue", "light green", "red", "pink", "purple", "tangerine", "teal", "custom"],
			colour_sidebar: 1,
			exposed: 0,
			exposed_base: 0,
			type: ["swim", "tanLines"],
			set: "see-through swimsuit",
			gender: "f",
			femininity: 300,
			warmth: 1,
			cost: 2500,
			description: "Frames your torso.",
			shop: ["adult"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			sleeve_img: 0,
			breast_img: 1,
			cursed: 0,
			location: 0,
			iconFile: "see-through_swimsuit.png",
			accIcon: 0,
			outfitPrimary: { under_lower: "see-through swim bottoms" },
		},

		{
			index: 30,
			name: "push up bra",
			name_cap: "Push up bra",
			variable: "pushupbra",
			integrity: 100,
			integrity_max: 100,
			fabric_strength: 30,
			reveal: 600,
			bustresize: 2,
			word: "a",
			one_piece: 0,
			strap: 1,
			open: 1,
			state: "midriff",
			state_base: "midriff",
			state_top: "chest",
			state_top_base: "chest",
			plural: 0,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "pale tangerine", "teal", "pale white", "pale yellow", "custom"],
			colour_sidebar: 1,
			exposed: 0,
			exposed_base: 0,
			type: ["normal", "pushup"],
			set: "under_upper",
			gender: "f",
			femininity: 300,
			warmth: 1,
			cost: 2000,
			description: "Makes your breasts appear bigger.",
			shop: ["clothing"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			sleeve_img: 0,
			breast_img: 1,
			cursed: 0,
			location: 0,
			iconFile: "pushup_bra.png",
			accIcon: 0,
		},

		{
			index: 31,
			name: "shibari ropes",
			name_cap: "Shibari ropes",
			variable: "shibari",
			integrity: 200,
			integrity_max: 200,
			fabric_strength: 30,
			reveal: 600,
			bustresize: 0,
			word: "a",
			one_piece: 1,
			strap: 0,
			open: 0,
			state: "waist",
			state_base: "waist",
			state_top: "waist",
			state_top_base: "waist",
			plural: 1,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			exposed: 1,
			exposed_base: 1,
			type: ["fetish", "naked"],
			set: "shibari",
			gender: "n",
			warmth: 0,
			cost: 10000,
			description: "For those into rope play.",
			shop: ["adult"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			sleeve_img: 0,
			breast_img: 0,
			cursed: 0,
			location: 0,
			iconFile: "shibari_ropes.png",
			accIcon: 0,
			outfitPrimary: { under_lower: "shibari ropes bottom" },
		},

		{
			index: 32,
			name: "turtleneck leotard",
			name_cap: "Turtleneck leotard",
			variable: "leotardturtleneck",
			integrity: 100,
			integrity_max: 100,
			fabric_strength: 30,
			reveal: 500,
			bustresize: 0,
			word: "a",
			one_piece: 1,
			strap: 0,
			open: 0,
			state: "waist",
			state_base: "waist",
			state_top: "chest",
			state_top_base: "chest",
			plural: 0,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			colour_combat: 0,
			exposed: 0,
			exposed_base: 0,
			type: ["dance", "covered"],
			set: "turtleneck leotard",
			gender: "n",
			warmth: 2,
			cost: 3500,
			description: "Form fitting. Covers your neck.",
			shop: ["clothing", "adult"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			sleeve_img: 0,
			breast_img: 1,
			cursed: 0,
			location: 0,
			iconFile: "leotardturtleneck.png",
			accIcon: 0,
			outfitPrimary: { under_lower: "turtleneck leotard bottom" },
		},
		{
			index: 33,
			name: "camisole",
			name_cap: "Camisole",
			variable: "camisole",
			integrity: 150,
			integrity_max: 150,
			fabric_strength: 20,
			reveal: 500,
			bustresize: 0,
			word: "a",
			one_piece: 0,
			strap: 0,
			open: 0,
			state: "waist",
			state_base: "waist",
			state_top: "chest",
			state_top_base: "chest",
			plural: 0,
			colour: 0,
			colour_options: ["black", "white", "light pink", "lilac", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "custom"],
			colour_sidebar: 1,
			exposed: 0,
			exposed_base: 0,
			type: ["normal", "covered"],
			set: "under_upper",
			gender: "f",
			femininity: 200,
			warmth: 2,
			cost: 1200,
			description: "Versatile and supportive.",
			shop: ["clothing"],
			accessory: 1,
			accessory_colour: 0,
			accessory_colour_options: ["black", "white", "light pink", "lilac", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "custom"],
			accessory_colour_sidebar: 1,
			sleeve_img: 0,
			breast_img: 0,
			cursed: 0,
			location: 0,
			iconFile: "camisole.png",
			accIcon: "camisole_acc.png",
		},
		{
			index: 34,
			name: "latex leotard",
			name_cap: "Latex leotard",
			variable: "latexleotard",
			integrity: 100,
			integrity_max: 100,
			fabric_strength: 30,
			reveal: 600,
			bustresize: 0,
			word: "a",
			one_piece: 1,
			strap: 0,
			open: 0,
			state: "waist",
			state_base: "waist",
			state_top: "chest",
			state_top_base: "chest",
			plural: 0,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			colour_combat: 0,
			exposed: 0,
			exposed_base: 0,
			type: ["dance", "fetish", "waterproof"],
			set: "latexleotard",
			gender: "n",
			warmth: 1,
			cost: 3000,
			description: "Form fitting.",
			shop: ["clothing", "adult"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			sleeve_img: 0,
			breast_img: 1,
			cursed: 0,
			location: 0,
			iconFile: "bunny_leotard.png",
			accIcon: 0,
			outfitPrimary: { under_lower: "latex leotard bottom" },
		},
		{
			index: 35,
			name: "bunny-tie bikini top",
			name_cap: "Bunny-tie bikini top",
			variable: "buntiebikinitop",
			integrity: 20,
			integrity_max: 20,
			fabric_strength: 20,
			reveal: 900,
			bustresize: 0,
			word: "n",
			one_piece: 0,
			strap: 1,
			open: 1,
			state: "midriff",
			state_base: "midriff",
			state_top: "chest",
			state_top_base: "chest",
			plural: 0,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			exposed: 0,
			exposed_base: 0,
			type: ["swim"],
			set: "under_upper",
			gender: "f",
			femininity: 300,
			warmth: 1,
			cost: 2000,
			description: "Revealing swimwear.",
			shop: ["clothing"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			sleeve_img: 0,
			breast_img: 1,
			cursed: 0,
			location: 0,
			iconFile: "bunny_tie_bikini_top.png",
			accIcon: 0,
		},
	];

	/*
		Clothes that modders add go into this array, this should be empty in the base game at all times.
		These items should have a `modder` variable with a the modders name in a short string
	*/
	setup.moddedClothes.under_upper = [];

	setup.moddedClothes.under_upper.forEach((x, i) => (x.index = setup.clothes.under_upper.length + i));
	setup.clothes.under_upper.push(...setup.moddedClothes.under_upper);
}
window.initUnderUpper = initUnderUpper;
