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

	return {
		generateKeyPoints,
		get currentWeatherType() {
			return Weather.WeatherConditions.getWeather();
		},
	};
})();
window.Weather = Weather;
