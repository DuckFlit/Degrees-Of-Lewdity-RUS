/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/*

- Add function:
	- Only use winter-images after it has snowed once
	- if it melts (at least 5 hours of warm temperature) back to normal images until it snow again
*/

const Weather = (() => {
	/* Helper functions */

	function generateKeyPoints({ date, minKeys, maxKeys, timeApart, rangeValue, totalSteps }) {
		const numberOfKeyPoints = random(minKeys - 1, maxKeys - 1);
		const keyPoints = new Map();

		while (keyPoints.size < numberOfKeyPoints) {
			const randomUnit = random(timeApart + 1, totalSteps - timeApart);

			const isFarEnough = Array.from(keyPoints.keys()).every(kp => Math.abs(kp - randomUnit) >= timeApart);
			if (isFarEnough) {
				keyPoints.set(randomUnit, rangeValue(date));
			}
		}
		// Add the last key point
		keyPoints.set(totalSteps + 1, rangeValue(date));
		return new Map([...keyPoints.entries()].sort((a, b) => a[0] - b[0]));
	}

	/**
	 * Returns tanning factor based on:
	 * sunIntensity (intensity from month of the year)
	 * weatherModifier (based on weather)
	 * locationModifier (based on location)
	 * clothingModifier (based on clothing)
	 * sunBlockModifier (based on used sun block)
	 * dayFactor (based on sun position in the sky) - always 0 at night
	 *
	 * @param {number} minutes
	 * @param {number} customSunIntensity If this is set - the calculations replaces the sun intensity with a specified one.
	 */
	function getTanningFactor(customSunIntensity = 0) {
		const sunIntensity = customSunIntensity || getSunIntensity();
		const clothingModifier = Object.values(V.worn).filter(item => item.type.includes("shade")).length ? 0.1 : 1;
		const sunBlockModifier = V.skinColor.sunBlock === true ? 0.1 : 1;
		const result = round(sunIntensity * clothingModifier * sunBlockModifier, 2);
		return {
			sun: sunIntensity,
			weather: V.outside ? Weather.current.tanningModifier : 1,
			location: V.location === "forest" ? 0.2 : 1,
			dayFactor: V.outside ? Time.date.simplifiedDayFactor : 1,
			clothing: clothingModifier,
			sunBlock: sunBlockModifier,
			result,
		};
	}

	function getSunIntensity() {
		const sunIntensity = Weather.Settings.months[Time.date.month - 1].sunIntensity * Weather.Sky.dayFactor;
		const weatherModifier = V.outside ? Weather.current.tanningModifier : 0;
		const locationModifier = V.location === "forest" ? 0.2 : 1;
		return V.outside ? sunIntensity * weatherModifier * locationModifier : 0;
	}

	function setAccumulatedSnow(minutes) {
		const precipitationIntensity = Weather.type.precipitationIntensity;
		const temperature = Weather.temperature; // Temperature in Celsius
		const snowfallRate = 0.8; // Snowfall rate in mm per minute per intensity
		const meltingRate = 0.04; // Melting rate in mm per minute per degree above freezing
		const maxSnow = 500; // max 500 mm of accumulated snow

		let accumulatedSnow = V.weatherObj.snow || 0;

		if (Weather.isFreezing && precipitationIntensity > 0) {
			// Accumulate snow
			accumulatedSnow += minutes * snowfallRate * precipitationIntensity;
			accumulatedSnow = Math.min(accumulatedSnow, maxSnow);
		} else if (temperature > 0) {
			// Melt snow
			accumulatedSnow -= minutes * meltingRate * temperature;
			accumulatedSnow = Math.max(accumulatedSnow, 0);
		}

		V.weatherObj.snow = Math.round(accumulatedSnow);
	}

	return {
		generateKeyPoints,
		getTanningFactor,
		setAccumulatedSnow,
		getSunIntensity,
		toFahrenheit: temperature => Weather.Temperature.toFahrenheit(temperature),
		toSelected: celsius => {
			return V.options.fahrenheit ? Weather.Temperature.toFahrenheit(celsius) : celsius;
		},
		toSelectedString: (celsius, decimals = 2) => {
			return V.options.fahrenheit ? `${round(Weather.Temperature.toFahrenheit(celsius), decimals)}°F` : `${round(celsius, decimals)}°C`;
		},
		setTemperature: temperature => Weather.Temperature.set(temperature),
		addTemperature: temperature => Weather.Temperature.add(temperature),
		set: (weatherType, instant, minutes) => Weather.WeatherConditions.setWeather(weatherType, instant, minutes),
		get: date => Weather.WeatherConditions.getWeather(date),
		is: weatherType => Weather.WeatherConditions.isWeather(weatherType),
		get Settings() {
			return setup.WeatherSettings;
		},
		get TooltipDescriptions() {
			return setup.WeatherTooltip;
		},
		get current() {
			return Weather.WeatherConditions.getWeather();
		},
		get name() {
			return Weather.WeatherConditions.getWeather().name;
		},
		get type() {
			return Weather.WeatherConditions.getWeather().defines;
		},
		get overcast() {
			return Weather.WeatherConditions.getWeather().overcast > 0.5;
		},
		get sunIntensity() {
			return getSunIntensity();
		},
		get precipitation() {
			if (Weather.WeatherConditions.getWeather().precipitationIntensity === 0) return "none";
			return Weather.isFreezing ? "snow" : "rain";
		},
		get precipitationIntensity() {
			return Weather.WeatherConditions.getWeather().precipitationIntensity;
		},
		get temperature() {
			return Weather.Temperature.getCelsius();
		},
		get isFreezing() {
			return Weather.Temperature.isFreezing();
		},
		get isSnow() {
			return V.weatherObj.snow > 15; // More than 15mm of snow
		},
		get insideTemperature() {
			return Weather.Temperature.getInsideTemperature();
		},
		get waterTemperature() {
			return Weather.Temperature.getWaterTemperature();
		},
		get bodyTemperature() {
			return Weather.BodyTemperature.current;
		},
		get wetness() {
			return Weather.BodyTemperature.wetness;
		},
		get bloodMoon() {
			const sunRise = Weather.Sky.orbitals.bloodMoon?.settings.riseTime - 1;
			const sunSet = Weather.Sky.orbitals.bloodMoon?.settings.setTime + 1;
			return (Time.date.day === Time.date.lastDayOfMonth && Time.date.hour >= sunRise) || (Time.date.day === 1 && Time.date.hour < sunSet);
		},
		get dayState() {
			const sunRise = Weather.Sky.orbitals.sun.settings.riseTime;
			const sunSet = Weather.Sky.orbitals.sun.settings.setTime;
			const hour = Time.hour;
			return hour < sunRise - 1 || hour >= sunSet + 1 ? "night" : hour >= sunSet - 1 ? "dusk" : hour >= sunRise + 1 ? "day" : "dawn";
		},
		get fog() {
			return V.weatherObj.fog;
		},
		set fog(value) {
			V.weatherObj.fog = value;
			Weather.Sky.drawLayers();
		},
		get lightsOn() {
			return Time.hour >= setup.SkySettings.lightsTime.on || Time.hour < setup.SkySettings.lightsTime.off;
		},
	};
})();
window.Weather = Weather;
