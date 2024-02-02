/* eslint-disable no-undef */
WeatherLayers.add({
	name: "moon",
	zIndex: 3, // zIndex value
	effects: [
		{
			/* Regular moon */
			effect: "moonWithPhases",
			drawCondition: () => !Weather.bloodMoon,
			params: {
				opacity: {
					// Defines the opacity of the whole moon (including shadow part)
					// min is when factor is -1 while max is when factor is +1
					//min: 0.92,
					//max: 0.98,
					min: 1,
					max: 1,
				},
				glow: {
					color: "#ffffffbb",
					size: 9,
				},
				shadow: {
					opacity: {
						// Defines if the opacity of the shadow part of the moon - if opacity is 0, the moon is completely invisible when not lit
						// min is when factor is -1 while max is when factor is +1
						min: 0.04,
						max: 0.09,
					},
					// Angle the shadow eclipse travels in degrees
					angle: 10,
				},
				images: { orbital: "img/misc/sky/moon.png" },
			},
			bindings: {
				position() {
					return WeatherCanvas.orbitals.moon.position;
				},
				factor() {
					return WeatherCanvas.orbitals.moon.factor;
				},
				diameter() {
					// Reference this layer and above effect image
					return WeatherCanvas.getLayer("moon").effects[0].images.orbital.width;
				},
				moonPhaseFraction() {
					return Time.date.moonPhaseFraction;
				},
			},
		},
		{
			/* Blood moon */
			effect: "skyOrbital",
			drawCondition: () => Weather.bloodMoon,
			params: {
				images: { orbital: "img/misc/sky/blood-moon.png" },
			},
			bindings: {
				position() {
					return WeatherCanvas.orbitals.moon.position;
				},
			},
		},
	],
});
