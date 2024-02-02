/* eslint-disable no-undef */
WeatherLayers.add({
	name: "sky",
	zIndex: 0, // zIndex value
	effects: [
		{
			/* Night sky */
			effect: "skyGradiant",
			drawCondition: () => !Weather.bloodMoon,
			params: {
				radius: 82,
			},
			bindings: {
				color() {
					// Make it brighter when moon is lit
					const colorCloseMin = ColourUtils.interpolateColor("#00001c00", "#1c1c6100", WeatherCanvas.moonBrightnessFactor);
					const colorClose = ColourUtils.interpolateColor("#00001c", "#1c1c61", WeatherCanvas.moonBrightnessFactor);
					return {
						colorMin: { close: colorCloseMin, far: "#00001c00" },
						colorMed: { close: colorClose, far: "#00001c" },
						colorMax: { close: colorClose, far: "#00001c" },
					};
				},
				position() {
					return WeatherCanvas.orbitals.moon.position;
				},
				factor() {
					return WeatherCanvas.orbitals.moon.factor;
				},
			},
		},
		{
			/* Blood sky */
			effect: "skyGradiant",
			drawCondition: () => Weather.bloodMoon,
			params: {
				color: {
					colorMin: { close: "#4d000000", far: "#21070700" },
					colorMed: { close: "#4d0000", far: "#210707" },
					colorMax: { close: "#4d0000", far: "#210707" },
				},
				radius: 82,
			},
			bindings: {
				position() {
					return WeatherCanvas.orbitals.moon.position;
				},
				factor() {
					return WeatherCanvas.orbitals.moon.factor;
				},
			},
		},
		{
			/* Day sky */
			effect: "skyGradiant",
			params: {
				color: {
					colorMin: { close: "#14145200", far: "#00001c00" },
					colorMed: { close: "#d47d12", far: "#6c6d94" },
					colorMax: { close: "#ccccff", far: "#408aca" },
				},
				radius: 128,
			},
			bindings: {
				position() {
					return WeatherCanvas.orbitals.sun.position;
				},
				factor() {
					return WeatherCanvas.orbitals.sun.factor;
				},
			},
		},
	],
});
