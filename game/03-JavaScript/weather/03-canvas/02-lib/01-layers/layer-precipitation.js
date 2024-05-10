/* eslint-disable no-undef */
Weather.Sky.Layers.add({
	name: "precipitation",
	zIndex: 10,
	animation: {
		updateRate: 50, // Updates every 100ms
	},
	effects: [
		/* Rain */
		{
			effect: "precipitation",
			drawCondition: () => !Weather.Sky.skyDisabled && Weather.overcast && Weather.precipitationIntensity > 1 && Weather.precipitation === "rain",
			params: {
				frameWidth: 42,
				images: {
					precipitation: "img/misc/sky/effects/rain.png",
				},
				position: {
					diagonalOffset: -8,
					offset: -8,
				},
				frameDelay: 100,
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
		/* Sparse rain */
		{
			effect: "precipitation",
			drawCondition: () =>
				!Weather.Sky.skyDisabled &&
				Weather.WeatherGeneration.getWeather().overcast > 0.25 &&
				Weather.precipitationIntensity > 0 &&
				Weather.precipitationIntensity <= 1 &&
				Weather.precipitation === "rain",
			params: {
				frameWidth: 42,
				images: {
					precipitation: "img/misc/sky/effects/rain_sparse.png",
				},
				position: {
					diagonalOffset: -8,
					offset: -8,
				},
				frameDelay: 150,
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
			drawCondition: () => !Weather.Sky.skyDisabled && Weather.overcast && Weather.precipitationIntensity > 1 && Weather.precipitation === "snow",
			params: {
				frameWidth: 32,
				images: {
					precipitation: "img/misc/sky/effects/snow.png",
				},
				position: {
					diagonalOffset: 0,
					offset: 0,
				},
				frameDelay: 150,
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
		/* Sparse Snow */
		{
			effect: "precipitation",
			drawCondition: () =>
				!Weather.Sky.skyDisabled &&
				Weather.WeatherGeneration.getWeather().overcast > 0.25 &&
				Weather.precipitationIntensity > 0 &&
				Weather.precipitationIntensity <= 1 &&
				Weather.precipitation === "snow",
			params: {
				frameWidth: 32,
				images: {
					precipitation: "img/misc/sky/effects/snow_sparse.png",
				},
				position: {
					diagonalOffset: 0,
					offset: 0,
				},
				frameDelay: 200,
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
			effect: "colorOverlay",
			drawCondition: () => !Weather.Sky.skyDisabled,
			compositeOperation: "source-atop",
			params: {
				color: {
					nightDark: "#000412ee",
					nightBright: "#000412dd",
					day: "#97a9e8aa",
					dawnDusk: "#7a511895",
					bloodMoon: "#c70000cc",
				},
			},
			bindings: {
				sunFactor() {
					return Weather.Sky.orbitals.sun.factor * interpolate(1, 0.8, Math.max(0, normalise(Weather.Sky.orbitals.sun.factor, 1, 0)));
				},
				moonFactor() {
					return Weather.Sky.moonBrightnessFactor;
				},
				bloodMoon() {
					return Weather.bloodMoon;
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
