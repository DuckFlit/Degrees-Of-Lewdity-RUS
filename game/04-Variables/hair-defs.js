setup.hair = {
	hairtype: [
		{
			name: "default",
			list: [
				"default",
				"loose",
				"straight",
				"swept left",
				"curl",
				"defined curl",
				"neat",
				"curly side up",
				"heart braid",
				"ruffled",
			],
			devolve: ["ruffled"],
		},
		{
			name: "single tail",
			list: ["flat ponytail", "ponytail", "side tail left", "side tail right"],
			devolve: ["ponytail"],
		},
		{
			name: "double tail",
			list: ["pigtails", "twintails", "curly pigtails", "sailor buns", "loop braid"],
			devolve: ["twintails"],
		},
		{
			name: "single braid",
			list: ["braid left", "braid right"],
			devolve: ["braid left"],
		},
		{
			name: "double braid",
			list: ["twin braids"],
			devolve: ["twin braids"],
		},
		{
			name: "short",
			list: ["messy", "short", "short spiky"],
			devolve: ["messy", "short spiky"],
		},
		{
			/* immune to being ruined (because devolve list is empty) */
			name: "special",
			list: ["dreads", "bubble tails"],
			devolve: [],
		},
	],
	fringetype: [
		{
			name: "default",
			list: [
				"default",
				"thin flaps",
				"wide flaps",
				"hime",
				"loose",
				"messy",
				"overgrown",
				"ringlets",
				"split",
				"straight",
				"swept left",
				"back",
				"parted",
				"flat",
				"quiff",
				"straight curl",
				"ringlet curl",
				"curtain",
				"trident",
			],
			devolve: ["messy", "trident", "thin flaps"],
		},
	],
};
