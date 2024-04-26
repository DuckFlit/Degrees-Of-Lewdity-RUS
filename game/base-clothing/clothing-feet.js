/* For any item that has a colour_combat tag, set it to 0 if that item ever gets its own combat sprites. */
function initFeet() {
	setup.clothes.feet = [
		{
			index: 0,
			name: "ничего",
			name_cap: "Ничего",
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
			description: "Ничего",
			shop: [],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			cursed: 0,
			notuck: 1,
			location: 0,
			iconFile: 0,
			accIcon: 0,
			mainImage: 0,
		},
		{
			index: 1,
			name: "школьная обувь",
			name_cap: "Школьная обувь",
			variable: "schoolshoes",
			integrity: 200,
			integrity_max: 200,
			fabric_strength: 20,
			reveal: 1,
			word: "n",
			plural: 1,
			colour: 0,
			colour_options: [],
			colour_combat: "black",
			type: ["school"],
			gender: "n",
			warmth: 10,
			cost: 2500,
			description: "Умная и подходящая для школы, но не является обязательной.",
			shop: ["clothing", "school"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			cursed: 0,
			notuck: 1,
			location: 0,
			iconFile: "school_shoes.png",
			accIcon: 0,
		},

		{
			index: 2,
			name: "туфли для смокинга",
			name_cap: "Туфли для смокинга",
			variable: "tuxedoshoes",
			integrity: 200,
			integrity_max: 200,
			fabric_strength: 20,
			reveal: 1,
			word: "n",
			plural: 1,
			colour: 0,
			colour_options: [],
			colour_combat: "black",
			type: ["formal"],
			gender: "m",
			femininity: -100,
			warmth: 15,
			cost: 10000,
			description: "Умные и утонченные.",
			shop: ["clothing"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			cursed: 0,
			notuck: 1,
			location: 0,
			iconFile: "tuxedo_shoes.png",
			accIcon: 0,
		},

		{
			index: 3,
			name: "наручники на лодыжках",
			name_cap: "Наручники на лодыжках",
			variable: "anklecuffs",
			integrity: 400,
			integrity_max: 400,
			fabric_strength: 20,
			reveal: 200,
			word: "n",
			plural: 1,
			colour: 0,
			colour_options: [],
			colour_combat: "black",
			type: ["fetish", "shackle"],
			gender: "n",
			warmth: 0,
			cost: 10000,
			description: "Потребуется специальный инструмент для разблокировки.",
			shop: [],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			cursed: 1,
			notuck: 1,
			location: 0,
			iconFile: 0,
			accIcon: 0,
		},

		{
			index: 4,
			name: "сандалии",
			name_cap: "Сандалии",
			variable: "sandals",
			integrity: 100,
			integrity_max: 100,
			fabric_strength: 20,
			reveal: 1,
			word: "n",
			plural: 1,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			type: ["normal"],
			gender: "n",
			warmth: 0,
			cost: 2000,
			description: "В них будет прохладно летом.",
			shop: ["clothing"],
			accessory: 1,
			accessory_colour: 0,
			accessory_colour_options: [],
			accessory_colour_combat: "brown",
			cursed: 0,
			notuck: 1,
			location: 0,
			iconFile: "sandals.png",
			accIcon: 0,
		},

		{
			index: 5,
			name: "парадные босоножки",
			name_cap: "Парадные босоножки",
			variable: "dresssandals",
			integrity: 100,
			integrity_max: 100,
			fabric_strength: 20,
			reveal: 1,
			word: "n",
			plural: 1,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			type: ["formal"],
			gender: "f",
			femininity: 200,
			warmth: 0,
			cost: 10000,
			description: "Модные и утонченные.",
			shop: ["clothing"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			cursed: 0,
			notuck: 1,
			location: 0,
			iconFile: "dress_sandals.png",
			accIcon: 0,
		},

		{
			index: 6,
			name: "кроссовки",
			name_cap: "Кроссовки",
			variable: "trainers",
			integrity: 250,
			integrity_max: 250,
			fabric_strength: 20,
			reveal: 1,
			word: "n",
			plural: 1,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			type: ["athletic"],
			gender: "n",
			warmth: 10,
			cost: 3000,
			description: "Непринужденные и практичные.",
			shop: ["clothing"],
			accessory: 1,
			accessory_colour: 0,
			accessory_colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			accessory_colour_sidebar: 1,
			cursed: 0,
			notuck: 1,
			location: 0,
			iconFile: "trainers.png",
			accIcon: "trainers_acc.png",
		},

		{
			index: 7,
			name: "ведьмины туфли",
			name_cap: "Ведьмины туфли",
			variable: "witch",
			integrity: 200,
			integrity_max: 200,
			fabric_strength: 20,
			reveal: 1,
			word: "n",
			plural: 1,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			colour_combat: 0,
			type: ["costume"],
			gender: "f",
			femininity: 200,
			warmth: 20,
			cost: 4000,
			description: "Милые и пугающие.",
			shop: ["forest"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			cursed: 0,
			notuck: 1,
			location: 0,
			iconFile: "witch_shoes.png",
			accIcon: "witch_shoes_acc.png",
		},

		{
			index: 8,
			name: "резиновые сапоги",
			name_cap: "Резиновые сапоги",
			variable: "wellies",
			integrity: 200,
			integrity_max: 200,
			fabric_strength: 20,
			reveal: 1,
			word: "n",
			plural: 1,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			type: ["normal", "rugged"],
			gender: "n",
			warmth: 50,
			cost: 5000,
			description: "Водонепроницаемые.",
			shop: ["clothing"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			cursed: 0,
			notuck: 0,
			location: 0,
			iconFile: "wellies.png",
			accIcon: 0,
		},

		{
			index: 9,
			name: "каблуки на платформе",
			name_cap: "Каблуки на платформе",
			variable: "platformheels",
			integrity: 200,
			integrity_max: 200,
			fabric_strength: 20,
			reveal: 800,
			word: "n",
			plural: 1,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "custom"],
			colour_sidebar: 1,
			type: ["formal", "serving", "bimbo", "heels"],
			gender: "f",
			femininity: 200,
			warmth: 10,
			cost: 5000,
			description: "Ты чувствуешь себя совсем девчушкой.",
			shop: ["adult"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			cursed: 0,
			notuck: 0,
			location: 0,
			iconFile: "platform_heels.png",
			accIcon: 0,
		},

		{
			index: 10,
			name: "кошачьи каблуки",
			name_cap: "Кошачьи каблуки",
			variable: "kittenheels",
			integrity: 200,
			integrity_max: 200,
			fabric_strength: 20,
			reveal: 50,
			word: "n",
			plural: 1,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			type: ["formal", "heels"],
			gender: "f",
			femininity: 200,
			warmth: 10,
			cost: 10000,
			description: "Они зовутся кошачьим каблуком, потому что их длина всего три сантиметра.",
			shop: ["clothing"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			cursed: 0,
			notuck: 1,
			location: 0,
			iconFile: "kitten_heels.png",
			accIcon: 0,
		},

		{
			index: 11,
			name: "босоножки на танкетке",
			name_cap: "Босоножки на танкетке",
			variable: "wedgesandals",
			integrity: 100,
			integrity_max: 100,
			fabric_strength: 20,
			reveal: 400,
			word: "n",
			plural: 1,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			type: ["normal", "heels"],
			gender: "f",
			femininity: 200,
			warmth: 0,
			cost: 3500,
			description: "Отлично подходят для пляжа.",
			shop: ["clothing"],
			accessory: 1,
			accessory_colour: 0,
			accessory_colour_options: [],
			accessory_colour_combat: 0,
			cursed: 0,
			notuck: 1,
			location: 0,
			iconFile: "wedge_sandals.png",
			accIcon: 0,
		},

		{
			index: 12,
			name: "court heels",
			name_cap: "Court heels",
			variable: "courtheels",
			integrity: 200,
			integrity_max: 200,
			fabric_strength: 20,
			reveal: 500,
			word: "n",
			plural: 1,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			type: ["formal", "serving", "heels"],
			gender: "f",
			femininity: 200,
			warmth: 10,
			cost: 12500,
			description: "Quite tall and very grown-up.",
			shop: ["clothing", "adult"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			cursed: 0,
			notuck: 1,
			location: 0,
			iconFile: "court_heels.png",
			accIcon: 0,
		},

		{
			index: 13,
			name: "heeled boots",
			name_cap: "Heeled boots",
			variable: "bootheels",
			integrity: 200,
			integrity_max: 200,
			fabric_strength: 20,
			reveal: 600,
			word: "n",
			plural: 1,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			type: ["fetish", "serving", "heels"],
			gender: "f",
			femininity: 200,
			warmth: 20,
			cost: 16000,
			description: "A powerful choice.",
			shop: ["clothing", "adult"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			cursed: 0,
			notuck: 0,
			location: 0,
			iconFile: "heeled_boots.png",
			accIcon: 0,
		},

		{
			index: 14,
			name: "stripper heels",
			name_cap: "Stripper heels",
			variable: "stripperheels",
			integrity: 200,
			integrity_max: 200,
			fabric_strength: 20,
			reveal: 800,
			word: "n",
			plural: 1,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			type: ["dance", "fetish", "heels"],
			gender: "f",
			femininity: 200,
			warmth: 10,
			cost: 25000,
			description: "Crazy tall and very slutty.",
			shop: ["adult"],
			accessory: 1,
			accessory_colour: 0,
			accessory_colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			accessory_colour_sidebar: 1,
			cursed: 0,
			notuck: 1,
			location: 0,
			iconFile: "stripper_heels.png",
			accIcon: 0,
		},

		{
			index: 15,
			name: "horsebit loafers",
			name_cap: "Horsebit loafers",
			variable: "horsebitloafers",
			integrity: 200,
			integrity_max: 200,
			fabric_strength: 20,
			reveal: 1,
			word: "n",
			plural: 1,
			colour: 0,
			colour_options: [],
			colour_combat: "black",
			type: ["normal"],
			gender: "m",
			femininity: -100,
			warmth: 10,
			cost: 20000,
			description: "A pair of black horsebit loafers.",
			shop: ["clothing"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			cursed: 0,
			notuck: 1,
			location: 0,
			iconFile: "horsebit_loafers.png",
			accIcon: 0,
		},

		{
			index: 16,
			name: "cordovan loafers",
			name_cap: "Cordovan loafers",
			variable: "cordovanloafers",
			integrity: 300,
			integrity_max: 300,
			fabric_strength: 20,
			reveal: 1,
			word: "n",
			plural: 1,
			colour: 0,
			colour_options: [],
			colour_combat: "black",
			type: ["normal"],
			gender: "m",
			femininity: -100,
			warmth: 10,
			cost: 40000,
			description: "A pair of shell cordovan loafers. Pricey, but very high quality.",
			shop: ["clothing"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			cursed: 0,
			notuck: 1,
			location: 0,
			iconFile: "cordovan_loafers.png",
			accIcon: 0,
		},

		{
			index: 17,
			name: "bunny slippers",
			name_cap: "Bunny slippers",
			variable: "bunny",
			integrity: 100,
			integrity_max: 100,
			fabric_strength: 20,
			reveal: 1,
			word: "n",
			plural: 1,
			colour: 0,
			colour_options: [],
			colour_combat: "white",
			type: ["sleep"],
			gender: "f",
			femininity: 200,
			warmth: 40,
			cost: 2000,
			description: "Keeps your toes warm.",
			shop: ["clothing", "adult"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			cursed: 0,
			notuck: 1,
			location: 0,
			iconFile: "bunny_slippers.png",
			accIcon: 0,
		},

		{
			index: 18,
			name: "combat boots",
			name_cap: "Combat boots",
			variable: "combat",
			integrity: 500,
			integrity_max: 500,
			fabric_strength: 50,
			reveal: 1,
			word: "n",
			plural: 1,
			colour: 0,
			colour_options: [],
			colour_combat: "black",
			type: ["normal", "rugged"],
			gender: "m",
			femininity: -100,
			warmth: 20,
			cost: 20000,
			description: "Made from robust, high-quality materials.",
			shop: ["clothing"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			cursed: 0,
			notuck: 0,
			location: 0,
			iconFile: "combat_boots.png",
			accIcon: 0,
		},

		{
			index: 19,
			name: "field boots",
			name_cap: "Field boots",
			variable: "field",
			integrity: 400,
			integrity_max: 400,
			fabric_strength: 40,
			reveal: 1,
			word: "n",
			plural: 1,
			colour: 0,
			colour_options: [],
			colour_combat: "black",
			type: ["normal", "riding"],
			gender: "n",
			femininity: 0,
			warmth: 20,
			cost: 14500,
			description: "Flexible. For professional riding.",
			shop: ["clothing"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			cursed: 0,
			notuck: 0,
			location: 0,
			iconFile: "field_boots.png",
			accIcon: 0,
		},

		{
			index: 20,
			name: "paddock boots",
			name_cap: "Paddock boots",
			variable: "paddock",
			integrity: 300,
			integrity_max: 300,
			fabric_strength: 40,
			reveal: 1,
			word: "n",
			plural: 1,
			colour: 0,
			colour_options: [],
			colour_combat: "black",
			type: ["normal", "riding"],
			gender: "n",
			femininity: 0,
			warmth: 20,
			cost: 8000,
			description: "For casual riding.",
			shop: ["clothing"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			cursed: 0,
			notuck: 0,
			location: 0,
			iconFile: "paddock_boots.png",
			accIcon: 0,
		},

		{
			index: 21,
			name: "work boots",
			name_cap: "Work boots",
			variable: "work",
			integrity: 300,
			integrity_max: 300,
			fabric_strength: 40,
			reveal: 1,
			word: "n",
			plural: 1,
			colour: 0,
			colour_options: [],
			colour_combat: "brown",
			type: ["normal", "rugged"],
			gender: "n",
			femininity: 0,
			warmth: 20,
			cost: 6000,
			description: "Protects your toes.",
			shop: ["clothing"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			cursed: 0,
			notuck: 0,
			location: 0,
			iconFile: "work_boots.png",
			accIcon: 0,
		},

		{
			index: 22,
			name: "flippers",
			name_cap: "Flippers",
			variable: "flippers",
			integrity: 200,
			integrity_max: 200,
			fabric_strength: 60,
			reveal: 1,
			word: "n",
			plural: 1,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			type: ["swim", "diving", "unstealthy"],
			gender: "n",
			femininity: 0,
			warmth: 30,
			cost: 2000,
			description: "Lets you dive faster.",
			shop: ["clothing"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			cursed: 0,
			notuck: 1,
			location: 0,
			iconFile: "flippers.png",
			accIcon: 0,
		},

		{
			index: 23,
			name: "ice skates",
			name_cap: "Ice skates",
			variable: "iceskates",
			integrity: 100,
			integrity_max: 100,
			fabric_strength: 20,
			reveal: 1,
			word: "n",
			plural: 1,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			type: ["normal"],
			gender: "n",
			femininity: 0,
			warmth: 0,
			cost: 10000,
			description: "Sturdy, yet elegant, like those that perform in them.",
			shop: ["clothing"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			cursed: 0,
			notuck: 0,
			location: 0,
			iconFile: "ice_skates.png",
			accIcon: 0,
		},

		{
			index: 24,
			name: "long boots",
			name_cap: "Long boots",
			variable: "long",
			integrity: 200,
			integrity_max: 200,
			fabric_strength: 60,
			reveal: 1,
			word: "n",
			plural: 1,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			type: ["normal"],
			gender: "n",
			femininity: 0,
			warmth: 40,
			cost: 4500,
			description: "Covers your knees.",
			shop: ["clothing", "adult"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			cursed: 0,
			notuck: 0,
			location: 0,
			iconFile: "long_boots.png",
			accIcon: 0,
		},

		{
			index: 25,
			name: "light-up trainers",
			name_cap: "Light-up trainers",
			variable: "lightuptrainers",
			integrity: 250,
			integrity_max: 250,
			fabric_strength: 20,
			reveal: 200,
			word: "n",
			plural: 1,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			type: ["normal", "unstealthy"],
			gender: "n",
			warmth: 10,
			cost: 4500,
			description: "For better visibility.",
			shop: ["clothing"],
			accessory: 1,
			accessory_colour: 0,
			accessory_colour_options: [],
			cursed: 0,
			notuck: 1,
			location: 0,
			iconFile: "light-up_trainers.png",
			accIcon: "light-up_trainers_acc.png",
		},

		{
			index: 26,
			name: "ball and chain",
			name_cap: "Ball and chain",
			variable: "ballchain",
			integrity: 400,
			integrity_max: 400,
			fabric_strength: 20,
			reveal: 200,
			word: "n",
			plural: 0,
			colour: 0,
			colour_options: [],
			colour_combat: "black",
			type: ["fetish", "shackle"],
			gender: "n",
			warmth: 0,
			cost: 10000,
			description: "Requires a special tool to unlock.",
			shop: [],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			cursed: 1,
			notuck: 1,
			location: 0,
			iconFile: 0,
			accIcon: 0,
		},

		{
			index: 27,
			name: "cowboy boots",
			name_cap: "Cowboy boots",
			variable: "cowboy",
			integrity: 350,
			integrity_max: 350,
			fabric_strength: 40,
			reveal: 1,
			word: "n",
			plural: 1,
			colour: 0,
			colour_options: [],
			colour_combat: "brown",
			type: ["normal", "riding"],
			gender: "m",
			femininity: -200,
			warmth: 30,
			cost: 8500,
			description: "Spurs included.",
			shop: ["clothing"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			cursed: 0,
			notuck: 0,
			location: 0,
			iconFile: "cowboy_boots.png",
			accIcon: 0,
		},

		{
			index: 28,
			name: "high top trainers",
			name_cap: "High top trainers",
			variable: "hightops",
			integrity: 300,
			integrity_max: 300,
			fabric_strength: 20,
			reveal: 1,
			word: "n",
			plural: 1,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			type: ["normal"],
			gender: "n",
			warmth: 10,
			cost: 6000,
			description: "Fashionable and practical.",
			shop: ["clothing"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			cursed: 0,
			notuck: 1,
			location: 0,
			iconFile: "trainers.png",
			accIcon: "trainers_acc.png",
		},

		{
			index: 29,
			name: "belly dancer's shoes",
			name_cap: "Belly dancer's shoes",
			variable: "belly",
			integrity: 200,
			integrity_max: 200,
			fabric_strength: 20,
			reveal: 200,
			word: "n",
			plural: 1,
			colour: 0,
			colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			type: ["costume"],
			gender: "f",
			femininity: 200,
			warmth: 20,
			cost: 4000,
			description: "Jingles when you walk.",
			shop: ["forest"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			cursed: 0,
			notuck: 1,
			location: 0,
			iconFile: "belly_dancers_shoes.png",
			accIcon: 0,
		},

		{
			index: 30,
			name: "canvas loafers",
			name_cap: "Canvas loafers",
			variable: "canvas loafers",
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
			gender: "m",
			femininity: -100,
			warmth: 10,
			cost: 3500,
			description: "Casual and practical.",
			shop: ["clothing"],
			accessory: 1,
			accessory_colour: 0,
			accessory_colour_options: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			accessory_colour_sidebar: 1,
			cursed: 0,
			notuck: 1,
			location: 0,
			iconFile: "canvas_loafers.png",
			accIcon: "canvas_loafers_acc.png",
		},
		{
			index: 31,
			name: "thigh-high heeled boots",
			name_cap: "Thigh-high heeled boots",
			variable: "thighhigh_heels",
			integrity: 200,
			integrity_max: 200,
			fabric_strength: 20,
			reveal: 500,
			word: "n",
			plural: 1,
			colour: 0,
			colour_options: ["black", "tan", "grey", "brown", "blue", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			type: ["heels"],
			gender: "f",
			femininity: 200,
			warmth: 40,
			cost: 10000,
			description: "Covers your knees.",
			shop: ["clothing"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			cursed: 0,
			notuck: 0,
			location: 0,
			iconFile: "thighhigh_heels.png",
			accIcon: 0,
		},
		{
			index: 32,
			name: "fur boots",
			name_cap: "Fur boots",
			variable: "fur_boots",
			integrity: 200,
			integrity_max: 200,
			fabric_strength: 20,
			reveal: 250,
			word: "n",
			plural: 1,
			colour: 0,
			colour_options: ["black", "tan", "grey", "brown", "blue", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom"],
			colour_sidebar: 1,
			type: ["heels"],
			gender: "f",
			femininity: 200,
			warmth: 30,
			cost: 7500,
			description: "For attracting attention in clubs.",
			shop: ["clothing"],
			accessory: 1,
			accessory_colour: 0,
			accessory_colour_options: ["white", "brown", "black", "tan", "custom"],
			accessory_colour_sidebar: 1,
			cursed: 0,
			notuck: 0,
			location: 0,
			iconFile: "fur_boots.png",
			accIcon: "fur_boots_acc.png",
		},
		{
			index: 33,
			name: "mary janes",
			name_cap: "Mary janes",
			variable: "maryjanes",
			integrity: 300,
			integrity_max: 300,
			fabric_strength: 20,
			reveal: 200,
			word: "n",
			plural: 1,
			colour: 0,
			colour_options: ["black", "brown", "tan", "white", "light pink", "light blue", "lilac", "custom"],
			colour_sidebar: 1,
			type: ["school"],
			gender: "f",
			femininity: 200,
			warmth: 0,
			cost: 2500,
			description: "Умная и подходящая для школы, но не является обязательной.",
			shop: ["clothing"],
			accessory: 1,
			accessory_colour: 0,
			accessory_colour_options: ["steel", "blue steel", "bronze", "gold", "silver", "black", "white"],
			accessory_colour_sidebar: 1,
			cursed: 0,
			notuck: 1,
			location: 0,
			iconFile: "mary_janes.png",
			accIcon: "mary_janes_acc.png",
		},
		{
			index: 34,
			name: "platform mary janes",
			name_cap: "Platform mary janes",
			variable: "platformmaryjanes",
			integrity: 300,
			integrity_max: 300,
			fabric_strength: 20,
			reveal: 200,
			word: "n",
			plural: 1,
			colour: 0,
			colour_options: ["black", "brown", "tan", "white", "light pink", "light blue", "lilac", "custom"],
			colour_sidebar: 1,
			type: ["school"],
			gender: "f",
			femininity: 200,
			warmth: 0,
			cost: 4500,
			description: "Suitable for school, but not required.",
			shop: ["clothing", "adult"],
			accessory: 1,
			accessory_colour: 0,
			accessory_colour_options: ["steel", "blue steel", "bronze", "gold", "silver", "black", "white"],
			accessory_colour_sidebar: 1,
			cursed: 0,
			notuck: 1,
			location: 0,
			iconFile: "platform_mary_janes.png",
			accIcon: "platform_mary_janes_acc.png",
		},
	];

	/*
		Clothes that modders add go into this array, this should be empty in the base game at all times.
		These items should have a `modder` variable with a the modders name in a short string
	*/
	setup.moddedClothes.feet = [];

	setup.moddedClothes.feet.forEach((x, i) => (x.index = setup.clothes.feet.length + i));
	setup.clothes.feet.push(...setup.moddedClothes.feet);
}
window.initFeet = initFeet;
