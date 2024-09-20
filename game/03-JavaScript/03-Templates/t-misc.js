/* ?animal */
Template.add("animal", () =>
	either(
		"bee",
		"elephant",
		"bunny",
		"octopus",
		"chimp",
		"squid",
		"mollusc",
		"monkey",
		"wasp",
		"baboon",
		"wolf",
		"bear",
		"elk",
		"seal",
		"dolphin",
		"whale",
		"jellyfish",
		"cat",
		"lion",
		"tiger",
		"cheetah",
		"wild dog",
		"panther",
		"mole",
		"badger",
		"honey badger",
		"duck",
		"goose",
		"sparrows",
		"robin",
		"perch",
		"pike",
		"salmon",
		"sturgeon",
		"frog",
		"newt",
		"crocodile",
		"toad",
		"hawk",
		"eagle",
		"cuttlefish",
		"python",
		"anaconda",
		"adder",
		"cobra",
		"sturgeon",
		"trout",
		"salmon",
		"tuna",
		"deer",
		"oyster"
	)
);

/* ?animals */
Template.add("animals", () =>
	either(
		"bees",
		"elephants",
		"bunnies",
		"octopi",
		"chimps",
		"squid",
		"molluscs",
		"monkeys",
		"wasps",
		"baboons",
		"wolves",
		"bears",
		"elk",
		"seals",
		"dolphins",
		"whales",
		"jellyfish",
		"cats",
		"lions",
		"tigers",
		"cheetahs",
		"wild dogs",
		"panthers",
		"moles",
		"badgers",
		"honey badgers",
		"ducks",
		"geese",
		"sparrows",
		"robins",
		"perch",
		"pike",
		"salmon",
		"sturgeon",
		"frogs",
		"newts",
		"crocodiles",
		"toads",
		"hawks",
		"eagles",
		"cuttlefish",
		"pythons",
		"anacondas",
		"adders",
		"cobras",
		"sturgeon",
		"trout",
		"salmon",
		"tuna",
		"deer",
		"oysters"
	)
);

/* ?garden */
Template.add("garden", () => either("prune flowers", "prune trees", "prune bushes", "water flowers", "remove weeds"));

/* ?admires */
Template.add("admires", () => either("leers at", "admires", "ogles", "eyes up"));

/* ?gwylanItem */
Template.add("gwylanItem", () =>
	either(
		"trophy",
		"baseball",
		"baseball bat",
		"snow globe",
		"magic 8-ball",
		"ping-pong paddle",
		"chess set",
		"piggy bank",
		"mug",
		"cookie tin",
		"frying pan",
		"backscratcher",
		"pencil case",
		"lunch box",
		"lava lamp",
		"flashlight",
		"cuckoo clock",
		"Rubix cube",
		"globe",
		"water gun",
		"dictionary",
		"hand mirror",
		"novelty camera",
		"ziplock bag filled with seashells",
		"miniature stepladder",
		"bottle of lube",
		"knick-knack of unknown purpose"
	)
);

/* ?sin */
Template.add("sin", () => either("pride", "wrath", "envy", "lust", "gluttony", "greed", "sloth"));

/* ?chatter1 */
Template.add("chatter1", () =>
	either(
		"If you think about it, neither of us are really here.",

		"Hey, listen. You hear that? It's nothing.",

		"Don't knock it 'till you try it. Jazz metal just works.",

		"Winter's actually kinda hot, in a fossil kinda way.",

		"I'd let a wolf knot me, to be honest.",

		"If quizzes are quizzical, then what are tests?",

		"You. Me. That bookshelf. Library dodgeball. You in?",

		"I haven't seen a single recycling bin in this school. Unbelievable.",

		"The canteen food is actually pretty good. It's a guilty pleasure of mine.",

		"Oh, to be a caterpillar, unaware of the woes of the world.",

		"Someone said they saw a whale that had, like, tentacles, like a squid. Think squids and whales finally put their differences aside and got busy?"
	)
);

/* ?chatter2 */
Template.add("chatter2", () =>
	either(
		"Why am I friends with you?",

		"I told you to stop hanging out with me.",

		"What the fuck?",

		"I'm out of here.",

		"Can we please have a normal conversation for once?",

		"...What?",

		"Pretty sure you're not supposed to come to school drunk.",

		"I'm calling the police.",

		"I gotta get that restraining order. For real, this time.",

		"Can I peg you?",

		"Can you make like a tree and die for the winter?"
	)
);
