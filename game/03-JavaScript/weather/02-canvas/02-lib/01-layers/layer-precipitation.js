/* eslint-disable no-undef */
WeatherLayers.add({
	name: "precipitation",
	zIndex: 10,
	effects: [
		/* Rain */
		{
			effect: "precipitation",
			drawCondition: () => !Weather.Sky.skyDisabled && Weather.overcast > 0.5 && Weather.precipitationIntensity >= 1 && Weather.precipitation === "rain",
			params: {
				frameWidth: 42,
				images: {
					precipitation: "img/misc/sky/effects/rain.png",
				},
				position: {
					diagonalOffset: -8,
					offset: -8,
				},
				fps: 9,
			},
			bindings: {
				onFrame() {
					return () => {
						Weather.Sky.drawLayers("precipitation");
					};
				},
				alpha() {
					return Math.clamp(Weather.Sky.orbitals.sun.factor + 1, 0.7, 1);
				},
			},
		},
		/* Snow */
		{
			effect: "precipitation",
			drawCondition: () => !Weather.Sky.skyDisabled && Weather.precipitationIntensity >= 1 && Weather.precipitation === "snow",
			params: {
				frameWidth: 32,
				images: {
					precipitation: "img/misc/sky/effects/snow.png",
				},
				position: {
					diagonalOffset: 0,
					offset: 0,
				},
				fps: 6,
			},
			bindings: {
				onFrame() {
					return () => {
						Weather.Sky.drawLayers("precipitation");
					};
				},
				alpha() {
					return Math.clamp(Weather.Sky.orbitals.sun.factor + 1, 0.6, 1);
				},
			},
		},
		{
			effect: "imageOverlay",
			drawCondition: () => !Weather.Sky.skyDisabled && Weather.overcast > 0.5 && Weather.precipitationIntensity >= 1 && Weather.precipitation === "rain",
			compositeOperation: "destination-out",
			params: {
				images: {
					overlay: "img/misc/sky/effects/masks/0.png",
				},
				movement: {
					speed: 0.5,
				},
				baseAlpha: 1,
			},
		},
		{
			effect: "imageOverlay",
			drawCondition: () => !Weather.Sky.skyDisabled && Weather.overcast > 0.5 && Weather.precipitationIntensity >= 1 && Weather.precipitation === "snow",
			compositeOperation: "destination-out",
			params: {
				images: {
					overlay: "img/misc/sky/effects/masks/1.png",
				},
				movement: {
					speed: 0.5,
				},
				baseAlpha: 1,
			},
		},
	],
});
