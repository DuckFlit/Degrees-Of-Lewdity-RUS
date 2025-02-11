const ZIndices = {
	flatlight: -4,
	gradientlight: -3,
	glowlight: -2,
	spotlight: -1,
	bg: 0,
	over_head_back: 0,
	head_back: 1,
	basehead: 5,
	tail: 9,
	backhair: 10,
	back_lower: 15,
	base: 20,
	facebase: 21,
	tanBody: 22,
	hirsute: 25,
	eyes: 30,
	sclera: 31,
	iris: 32,
	irisacc: 33,
	eyelids: 34,
	lashes: 35,
	mouth: 40,
	armsidle: 30,
	handsidle: 31.5,
	under_upper_arms: 32,
	bellyBase: 33,
	breasts: 35,
	breastsparasite: 36,
	tanbreasts: 30,
	blush: 50,
	freckles: 51,
	mascara_running: 51.5,
	skin: 52,
	toast: 53,
	tears: 55,
	hair: 60,
	penis_chastity: 64,
	pbhair: 64,
	penisunderclothes: 64.3,
	pbhairballsunderclothes: 64.6,
	genitals: 65,
	penis: 104, // when exposed
	pbhairballs: 104.3, // when exposed
	parasite: 104.6, // when exposed
	underParasite: 66,
	legs: 66.6,
	under_lower: 67,
	legs_high: 67.6,
	under_lower_top: 68,
	under_upper: 70,
	under_upper_top: 72,
	under_upper_top_high: 73,
	under_upper_top_acc: 74,
	under_lower_high: 75,
	under_lower_top_high: 77,
	under_lower_top_high_acc: 78,
	under: 75,
	feet: 85,
	lower: 90,
	lower_tucked_feet: 95,
	lower_top: 92,
	upper_arms: 94,
	lower_belly: 94.5,
	upper: 95,
	upper_tucked: 89,
	upper_arms_tucked: 88.5,
	upper_top: 97,
	bellyClothes: 98,
	bellyClothesShadow: 99,
	lower_cover: 100,

	collar: 103,
	neck: 103,

	over_lower: 103.3,
	over_upper: 103.6,
	over_upper_arms: 103.9,

	handheld: 104,
	arms_cover: 105,
	under_upper_arms_cover: 109,
	hands: 110,
	upper_arms_cover: 112,
	over_upper_arms_cover: 113,
	lower_high: 115,
	lower_top_high: 117,

	hairforwards: 132,
	fronthair: 133,
	ears: 132.5,
	semencough: 135,
	backbrow: 58,
	brow: 138,
	horns: 140,
	face: 145,
	head: 150,
	over_head: 152,

	old_over_upper: 164,

	tailPenisCover: 165,
	tailPenisCoverOverlay: 166,
};
window.ZIndices = ZIndices;

Renderer.Animations["sex-2f-idle"] = {
	keyframes: [
		{
			frame: 0,
			duration: 1000,
		},
		{
			frame: 2,
			duration: 1000,
		},
	],
};

Renderer.Animations["sex-2f-vfast"] = {
	frames: 2,
	duration: 80,
};

Renderer.Animations["sex-1f-idle"] = {
	keyframes: [
		{
			frame: 1,
			duration: 1000,
		},
	],
};

Renderer.Animations["sex-1f2-idle"] = {
	keyframes: [
		{
			frame: 2,
			duration: 1000,
		},
	],
};

Renderer.Animations["sex-4f-slow"] = {
	frames: 4,
	duration: 330,
};

Renderer.Animations["sex-4f-mid"] = {
	frames: 4,
	duration: 170,
};

Renderer.Animations["sex-4f-fast"] = {
	frames: 4,
	duration: 110,
};

Renderer.Animations["sex-4f-vfast"] = {
	frames: 4,
	duration: 80,
};

Renderer.Animations["machine-4f"] = {
	frames: 4,
	duration: 80,
};

Renderer.Animations["machine-4f-slow"] = {
	frames: 4,
	duration: 200,
};

Renderer.Animations["machine-4f-mid"] = {
	frames: 4,
	duration: 170,
};

Renderer.Animations["machine-4f-fast"] = {
	frames: 4,
	duration: 110,
};

Renderer.Animations["machine-4f-vfast"] = {
	frames: 4,
	duration: 80,
};

Renderer.Animations["machine-2f-slow"] = {
	keyframes: [
		{
			frame: 0,
			duration: 200,
		},
		{
			frame: 2,
			duration: 200,
		},
	],
};

Renderer.Animations["prop-4f-tank"] = {
	frames: 4,
	duration: 60,
};

Renderer.Animations["sex-6f-slow"] = {
	frames: 6,
	duration: 330,
};

Renderer.Animations["sex-6f-mid"] = {
	frames: 6,
	duration: 170,
};

Renderer.Animations["sex-6f-fast"] = {
	frames: 6,
	duration: 110,
};

Renderer.Animations["sex-6f-vfast"] = {
	frames: 6,
	duration: 80,
};

Renderer.Animations["sex-8f-slow"] = {
	frames: 8,
	duration: 110,
};

Renderer.Animations["sex-8f-mid"] = {
	frames: 8,
	duration: 80,
};

Renderer.Animations["sex-8f-fast"] = {
	frames: 8,
	duration: 60,
};

Renderer.Animations["sex-8f-vfast"] = {
	frames: 8,
	duration: 40,
};

Renderer.Animations["sex-10f-slow"] = {
	frames: 10,
	duration: 330,
};

Renderer.Animations["sex-10f-mid"] = {
	frames: 10,
	duration: 170,
};

Renderer.Animations["sex-10f-fast"] = {
	frames: 10,
	duration: 110,
};

Renderer.Animations["sex-10f-vfast"] = {
	frames: 10,
	duration: 70,
};

Renderer.Animations["sex-17f-slow"] = {
	frames: 17,
	duration: 170,
};

Renderer.Animations["sex-17f-mid"] = {
	frames: 17,
	duration: 110,
};

Renderer.Animations["sex-17f-fast"] = {
	frames: 17,
	duration: 80,
};
