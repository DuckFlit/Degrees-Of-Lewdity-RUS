/* eslint-disable no-undef */
WeatherLayers.add({
	name: "sun",
	zIndex: 2, // zIndex value
	effects: [
		{
			effect: "skyOrbital",
			drawCondition: () => WeatherCanvas.orbitals.sun.factor > -0.5,
			params: {
				images: { orbital: "img/misc/sky/sun.png" },
			},
			bindings: {
				position() {
					return WeatherCanvas.orbitals.sun.position;
				},
			},
		},
		{
			effect: "outerRadialGlow",
			drawCondition: () => WeatherCanvas.orbitals.sun.factor > -0.5,
			params: {
				outerRadius: 24, // The radius of the outer glow
				colorInside: { dark: "#f07218ee", bright: "#f2fad766" },
				colorOutside: { dark: "#f0721800", bright: "#f2fad700" },
			},
			bindings: {
				position() {
					return WeatherCanvas.orbitals.sun.position;
				},
				factor() {
					return WeatherCanvas.orbitals.sun.factor;
				},
				diameter() {
					// Reference this layer and above effect image
					return WeatherCanvas.getLayer("sun").effects[0].images.orbital.width;
				},
			},
		},
	],
});
