setup.shopDetails = {
	normal: {
		name: "Normal",
		desc: "Suitable for everyday use.",
		details: "none",
	},
	formal: {
		name: "Formal",
		desc: "Suitable for important occasions, and for good etiquette among certain company.",
		details: "Required attire for specific events and fancy dates.",
	},
	school: {
		name: "School",
		desc: "Sanctioned uniform of the local school.",
		details: "Upperwear and lowerwear is required attire for attending class. Wearing additional school-trait clothes will slightly reduce delinquency.",
	},
	glasses: {
		name: "Glasses",
		desc: "Helps you focus.",
		details: "Increases the rate at which school skills are improved.",
	},
	cool: {
		name: "Cool",
		desc: "Makes you more popular, but some teachers may dislike it.",
		details: "Increases the rate at which school status is improved. May cause negative events from teachers who disapprove.",
	},
	swim: {
		name: "Swim",
		desc: "Fares well underwater.",
		details: "Helps you succeed at swimming skill checks. Prevents moisture from seeping through your clothes.",
	},
	diving: {
		name: "Diving",
		desc: "Helps keep you warm underwater.",
		details: "Prevents stress from rising when swimming in cold water.",
	},
	dance: {
		name: "Dance",
		desc: "Flexible enough to withstand the rigours of the dance floor.",
		details: "Won't tear while dancing, while non-dance clothes may be damaged.",
	},
	costume: {
		name: "Costume",
		desc: "People may look at this askance outside the right situations.",
		details: "Triggers unique dialogue or actions in certain events.",
	},
	serving: {
		name: "Serving",
		desc: "Encourages tips when working as a bartender, waiter or waitress if visible.",
		details: "Increases the amount of money gained from each tip by 20% per item with the trait.",
	},
	fetish: {
		name: "Fetish",
		desc: "Intrinsically lewd.",
		details: "Increases the minimum arousal threshold.",
	},
	sleep: {
		name: "Sleep",
		desc: "Soft and cosy. May improve the quality of your sleep.",
		details: "Reduces additional fatigue while sleeping. Sleeping in clothes other than sleepwear, underwear, and eerie items will negate this effect.",
	},
	mask: {
		name: "Mask",
		desc: "Conceals your identity. Won't fool the police or people who know you.",
		details: "Stops fame from increasing, both positive and negative.",
	},
	holy: {
		name: "Holy",
		desc: "Sacred to the local faith.",
		details: "Increases purity gains and losses.",
	},
	dark: {
		name: "Dark",
		desc: "Considered obscene by the local faith.",
		details: "Increases awareness gains and losses.",
	},
	binding: {
		name: "Binding",
		desc: "Keeps your arms firmly secure and helpless.",
		details: "Prevents you from using your arms.",
	},
	stealthy: {
		name: "Stealthy",
		desc: "Makes your crimes harder to trace.",
		details: "Decreases the amount of crime gained from thievery.",
	},
	sticky_fingers: {
		name: "Sticky fingers",
		desc: "More likely to get your way, and keep that which isn't yours.",
		details: "Helps you succeed at skulduggery skill checks.",
	},
	rainproof: {
		name: "Rainproof",
		desc: "Protects you from the rain.",
		details: "Prevents your clothes from becoming soaked by rain and snow.",
	},
	tanLines: {
		name: "Tan lines",
		desc: "Shields your skin from the sun while tanning.",
		details: `Will leave behind tan lines. "Visual representation of the player's and NPCs' skin colour" and "Tanning changes due to sun exposure" must be enabled in the Options menu.`,
	},
	bimbo: {
		name: "Special",
		desc: "Something seems special about this set of clothing.",
		details: `Feminises your body type, increases breast and butt size, and reduces penis size. Increases progress towards the "Lustful" trait.`,
	},
	himbo: {
		name: "Special",
		desc: "Protects you from the rain.",
		details: `Masculinises your body type, reduces breast and butt size, and increases penis size. Increases progress towards the "Lustful" trait.`,
	},
	heels: {
		name: "High heeled",
		desc: "Difficult to get around in, unless you have skilled feet.",
		details:
			"Improves kicking power during combat. Reduces travel speed. May cause fatigue and failed athletics checks in the farmlands, moor, and forest.",
	},
	rugged: {
		name: "Rugged",
		desc: "Helps you keep your footing in tough environments.",
		details: "Helps you succeed at athletics checks in the farmlands, moor, and forest.",
	},
	chest_bind: {
		name: "Chest binding",
		desc: "Fits tight around your chest, concealing your breasts.",
		details: `Reduces your apparent breast size. Breast sizes above "modest" won't appear perfectly flat, and will instead appear to be five sizes smaller.`,
	},
	eerie: {
		name: "Eerie",
		get desc() {
			return V.transformdisable === "f"
				? "Protects a specific transformation. Transformations progress and decay at midnight."
				: "There's something peculiar about this object.";
		},
		get details() {
			return V.transformdisable === "f" ? "Prevents its associated transformation from decaying." : "Enable transformations to make use of this trait.";
		},
	},
	shade: {
		name: "Shade",
		desc: "Blocks the sun.",
		details: "Protects your skin from passive tanning.",
	},
	asylum: {
		name: "Asylum",
		desc: "Clothes from the local asylum.",
		details: "none",
	},
	prison: {
		name: "Prison",
		desc: "Clothes from the local prison.",
		details: "none",
	},
	sticky: {
		name: "Sticky",
		desc: "Stuck to your skin.",
		details: "Can't be easily removed during combat.",
	},
	"strap-on": {
		name: "Strap-on",
		desc: "Fits around your waist.",
		details: "Can be used to penetrate others.",
	},
	covered: {
		name: "Covered",
		desc: "Protects various body parts.",
		details:
			"Concealed skin cannot be written on. Facewear with this trait protects your mouth against kissing, penetration, and oral activities. Underwear with this trait will not be considered lewd when exposed. Legwear with this trait will cover your undergarments. Lowerwear with this trait will cover your upper half, allowing you to wear them with nothing on top.",
	},
	naked: {
		name: "Naked",
		desc: "So revealing, you may as well be wearing nothing at all.",
		details: "Exposes everything.",
	},
	athletic: {
		name: "Athletic",
		desc: "Sporty.",
		details: "Increases the rate at which the athletics skill is improved.",
	},
	riding: {
		name: "Riding",
		desc: "Suitable for equestrians.",
		details: "Boosts thigh skill gained from horseback riding lessons.",
	},
	maid: {
		name: "Maid",
		desc: "Makes you look the part of a housekeeper.",
		details: "Helps you succeed at housekeeping skill checks.",
	},
	chastity: {
		name: "Chastity",
		desc: "Protects your innocence, whether you want it or not.",
		details: "Locks away your genitals, preventing use.",
	},
	cage: {
		name: "Cage",
		desc: "Protects your innocence, whether you want it or not.",
		details: "Locks away your genitals, preventing use.",
	},
	hidden: {
		name: "Hidden",
		desc: "Keeps your privates private.",
		details: "No one can see what kind of genitals you have.",
	},
	gag: {
		name: "Gag",
		desc: "Protects your mouth, but also limits its use.",
		details: "Prevents kissing, penetration, and other oral activities. Makes it impossible to speak.",
	},
	leash: {
		name: "Leash",
		desc: "A convenient handle to yank you around with.",
		details: "Lets people manhandle you in certain events.",
	},
	pushup: {
		name: "Push up",
		desc: "Makes your breasts appear bigger.",
		details: "Makes your breasts appear to be two sizes larger.",
	},
	bellyHide: {
		name: "Belly hiding",
		desc: "Hides pregnant bellies, up to a point.",
		details: "none",
	},
	bellyShow: {
		name: "Belly showing",
		desc: "Exposes your belly. Makes pregnancy more obvious.",
		details: "none",
	},
	constricting: {
		name: "Constricting",
		desc: "Unable to be worn after a certain point during pregnancy.",
		details: "none",
	},
	bookbag: {
		name: "Bookbag",
		desc: "For carrying school textbooks.",
		details: "Allows you to study before class. Helps avoid negative school events related to textbooks.",
	},
	waterproof: {
		name: "Waterproof",
		desc: "Impermeable.",
		details: "Prevents moisture from seeping through your clothes.",
	},
	esoteric: {
		name: "Esoteric",
		desc: "Reveals what cannot be.",
		details: "Enables hallucinations regardless of awareness level, trauma, or hallucinogens.",
	},
	unstealthy: {
		name: "Unstealthy",
		desc: "Makes it more difficult to hide.",
		details: "Increases the amount of crime gained during thievery.",
	},
};

setup.hairDetails = {
	loose: {
		desc: "Hair that falls loosely around your face. Grows to be long.",
	},
	short: {
		desc: "Hair that looks short when styled, even when your hair has grown long.",
	},
	curly: {
		desc: "Curly hair.",
	},
	sleek: {
		desc: "Straight hair.",
	},
	textured: {
		desc: "Afro-textured hair.",
	},
	wavy: {
		desc: "Not quite curly, not quite straight.",
	},
	pigtails: {
		desc: "Two bunches of hair that hang on either side of the head.",
	},
	buns: {
		desc: "Hair that has been coiled around itself and secured in place.",
	},
	braids: {
		desc: "Interwoven strands of hair. Includes styles that aren't technically braids, such as dreadlocks.",
	},
	ponytail: {
		desc: "Hair gathered at the back of the head.",
	},
};
