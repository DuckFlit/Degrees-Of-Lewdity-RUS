/* eslint-disable no-undef */
WeatherLayers.add({
	name: "sun",
	zIndex: 2,
	blur: {
		max: 5,
		factor: () => Weather.Sky.fadables.overcast.factor,
	},
	effects: [
		{
			effect: "skyOrbital",
			drawCondition: () => Weather.Sky.orbitals.sun.factor > -0.5,
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
			drawCondition: () => Weather.Sky.orbitals.sun.factor > -0.5,
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

WeatherLayers.add({
	name: "sunGlow",
	zIndex: 11,
	effects: [
		{
			effect: "outerRadialGlow",
			drawCondition: () => Weather.Sky.orbitals.sun.factor > -0.7 && !Weather.overcast,
			params: {
				outerRadius: 64, // The radius of the outer glow
				colorInside: { dark: "#fd634d00", med: "#f7ff4a50", bright: "#fbffdb50" },
				colorOutside: { dark: "#ffffff00", med: "#ffffff00", bright: "#ffffff00" },
				cutCenter: false,
				diameter: 32,
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
