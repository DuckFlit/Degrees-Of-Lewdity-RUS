/* eslint-disable no-undef */
Weather.Sky.Layers.add({
	name: "sun",
	zIndex: 2,
	blur: {
		max: 5,
		factor: () => normalise(Weather.overcast, 1, 0.1),
	},
	effects: [
		{
			effect: "skyOrbital",
			drawCondition: () => Weather.Sky.orbitals.sun.factor > -0.5 && !Weather.Sky.skyDisabled,
			params: {
				images: { orbital: "img/misc/sky/sun.png" },
			},
			bindings: {
				position() {
					return Weather.Sky.orbitals.sun.position;
				},
			},
		},
		{
			effect: "outerRadialGlow",
			drawCondition: () => Weather.Sky.orbitals.sun.factor > -0.5 && !Weather.Sky.skyDisabled,
			params: {
				outerRadius: 24, // The radius of the outer glow
				colorInside: { dark: "#f07218ee", med: "#f07218ee", bright: "#f2fad766" },
				colorOutside: { dark: "#f0721800", med: "#f0721800", bright: "#f2fad700" },
			},
			bindings: {
				position() {
					return Weather.Sky.orbitals.sun.position;
				},
				factor() {
					return Weather.Sky.orbitals.sun.factor;
				},
				diameter() {
					// Reference this layer and above effect image
					return Weather.Sky.getLayer("sun").effects[0].images.orbital.width;
				},
			},
		},
	],
});

Weather.Sky.Layers.add({
	name: "sunGlow",
	zIndex: 11,
	effects: [
		{
			effect: "outerRadialGlow",
			drawCondition: () => Weather.Sky.orbitals.sun.factor > -0.7 && !Weather.isOvercast && !Weather.Sky.skyDisabled,
			params: {
				outerRadius: 64, // The radius of the outer glow
				colorInside: { dark: "#fd634d00", med: "#faff8710", bright: "#fbffdb55" },
				colorOutside: { dark: "#fd634d00", med: "#faff8700", bright: "#fbffdb00" },
				cutCenter: false,
				diameter: 28,
			},
			bindings: {
				position() {
					return Weather.Sky.orbitals.sun.position;
				},
				factor() {
					return Weather.Sky.orbitals.sun.factor;
				},
			},
		},
	],
});
