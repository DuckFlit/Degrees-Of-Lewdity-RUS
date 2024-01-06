/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/*

- Add function:
	- setWeather: Should replace current weather, but then smoothly transition to a new weather after a while.

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
	 */
	function getTanningFactor() {
		const sunIntensity = Weather.Settings.months[Time.date.month - 1].sunIntensity;
		const weatherModifier = Weather.current.tanningModifier;
		const locationModifier = V.location === "forest" ? 0.2 : 1;
		const clothingModifier = V.worn.head.type.includes("shade") ? 0.1 : 1;
		const sunBlockModifier = V.skinColor.sunBlock === true ? 0.1 : 1;
		return round(sunIntensity * weatherModifier * locationModifier * clothingModifier * sunBlockModifier * Math.max(Weather.Sky.dayFactor, 0), 2);
	}

	/**
	 * Temporary function that converts the new weather properties into the old weather variable
	 * Until rework is finished
	 * The new system is currently used for the side-images
	 * The old variable is still used in sugarcube events
	 */
	function setWeatherVar() {
		switch (Weather.name) {
			case "heavyClouds":
				V.weather = "overcast";
				break;
			case "lightPrecipitation":
			case "heavyPrecipitation":
			case "thunderstorm":
				V.weather = Weather.precipitation; // rain or snow
				break;
			default:
				V.weather = "clear";
		}
	}

	return {
		generateKeyPoints,
		getTanningFactor,
		setWeatherVar,
		get Settings() {
			return setup.WeatherSettings;
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
			return Weather.WeatherConditions.getWeather().overcast;
		},
		get precipitation() {
			return Weather.WeatherConditions.precipitation();
		},
		get temperature() {
			return Weather.Temperature.getCelcius();
		},
		get isFreezing() {
			return Weather.Temperature.isFreezing();
		},
		get insideTemperature() {
			return Weather.Temperature.getInsideTemperature();
		},
		get waterTemperature() {
			return Weather.Temperature.getWaterTemperature();
		},
		get bodyTemperature() {
			return Weather.BodyTemperature.get();
		},
		setTemperature: temperature => Weather.Temperature.set(temperature),
		addTemperature: temperature => Weather.Temperature.add(temperature),
		set: (weatherType, instant) => Weather.WeatherConditions.setWeather(weatherType, instant),
		get: date => Weather.WeatherConditions.getWeather(date),
		is: weatherType => Weather.WeatherConditions.isWeather(weatherType),
	};
})();
window.Weather = Weather;
