/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/*

- Add function:
	- setWeather: Should replace current weather, but then smoothly transition to a new weather after a while.

	- Only use winter-images after it has snowed once
	- if it melts (at least 5 hours of warm temperature) back to normal images until it snow again


	Change variable names - use object - then use getters in Weather namespace 
*/

Weather.Temperature = (() => {
	const monthlyTemperatureRanges = [
		[-8, 7], // Jan
		[-5, 9], // Feb
		[4, 12], // Mar
		[6, 16], // Apr
		[9, 18], // May
		[12, 21], // Jun
		[14, 24], // Jul
		[14, 22], // Aug
		[11, 20], // Sep
		[9, 16], // Oct
		[-1, 10], // Nov
		[-4, 7], // Dec
	];

	// Sets current temperate (at start of day) to this temperature
	// However, the actual temperature might vary, since it interpolates to the next day's temperature during the day
	// After this is set it will still interpolate to the next temperature, which shifts midnight
	// To keep a certain temperature for a longer duration without too much interpolation - set the temperature for the day after too by using the optional date parameter.
	function set(temperature, date) {
		if (V.monthlyTemperatures.length < 1) return;
		if (date === undefined) date = Time.date;
		const modifiers = calculateModifiers(date.date);
		V.monthlyTemperatures[0].temperatures[date.monthDay] = temperature - modifiers;
	}

	function add(temperature, date) {
		if (V.monthlyTemperatures.length < 1) return;
		if (date === undefined) date = Time.date;
		set(V.monthlyTemperature[0].temperatures[date.monthDay] + temperature, date);
	}

	function getFahrenheit(date) {
		return Math.round(((getCelcius(date) * 9) / 5 + 32) * 100) / 100;
	}

	function getCelcius(date) {
		date = new DateTime(date ?? Time.date);

		// Will only generate if the array doesn't already exist, or if the month doesn't match
		generateMonthlyTemperatures(date);
		const baselineTemperature = interpolateDailyTemperature(date);
		const modifiers = calculateModifiers(date);
		return Math.round((baselineTemperature + modifiers) * 100) / 100;
	}

	function interpolateDailyTemperature(date) {
		const tomorrowDate = new DateTime(date).addDays(1);
		const tomorrowKey = date.month !== tomorrowDate.month ? 1 : 0;

		const todayTemp = V.monthlyTemperatures[0].temperatures[date.day];
		const tomorrowTemp = V.monthlyTemperatures[tomorrowKey].temperatures[tomorrowDate.day] || todayTemp;

		const deltaTemp = tomorrowTemp - todayTemp;

		// Linear interpolation
		return todayTemp + deltaTemp * date.fractionOfDay;
	}

	function calculateModifiers(date) {
		const sunModifier = calculateSunModifier(date.fractionOfDay);
		const seasonModifier = calculateSeasonModifier(date);
		const weatherModifier = getWeatherModifier("clear");
		const locationModifier = getLocationModifier();
		return Math.round(locationModifier + (1.5 * sunModifier + 2 * seasonModifier) * weatherModifier * 100) / 100;
	}

	function calculateSunModifier(fraction) {
		return 2 * (1 - Math.abs(fraction - 0.5) * 2) - 1;
	}

	function calculateSeasonModifier(date) {
		const totalDaysInYear = DateTime.getDaysOfYear(date.year);
		return -2 * Math.pow((Time.getDayOfYear(date) - totalDaysInYear / 2) / (totalDaysInYear / 2), 2) + 1;
	}

	function getWeatherModifier(weatherCondition) {
		// to Weather (temperatureModifier)
		const weatherMultipliers = {
			clear: 2,
			lightClouds: 1.5,
			clouds: 1.2,
			overcast: 1,
			lightPrecipitation: 1,
			heavyPrecipitation: 1,
		};
		return weatherMultipliers[weatherCondition] || 1.0;
	}

	function getLocationModifier() {
		// Location modifiers here
		switch (V.location) {
			case "town":
				return 3;
			default:
				return 0;
		}
	}

	function generateMonthlyTemperatures(date) {
		if (V.monthlyTemperatures.length === 2 && V.monthlyTemperatures[0].month === date.month) return;

		// Remove past months and adjust array for the current time
		while (V.monthlyTemperatures.length > 0 && V.monthlyTemperatures[0].month !== date.month) {
			V.monthlyTemperatures.shift();
		}

		// Ensure current and next month data are present
		while (V.monthlyTemperatures.length < 2) {
			let monthDate = new DateTime(date);
			if (V.monthlyTemperatures.length > 0) {
				monthDate = monthDate.addMonths(1);
			}
			V.monthlyTemperatures.push(generateDailyTemperatures(monthDate));
		}
	}

	function generateDailyTemperatures(date) {
		const keyPointsMap = generateTemperatureKeyPoints(date);

		let lastTemp;
		if (V.monthlyTemperatures.length > 0) {
			const prevMonthData = V.monthlyTemperatures[V.monthlyTemperatures.length - 1];
			lastTemp = prevMonthData.temperatures[prevMonthData.temperatures.length - 1];
		} else {
			lastTemp = Array.from(keyPointsMap.values()).pop();
		}
		const monthlyTemperatures = [];
		let lastDay = 0;
		for (const [day, temp] of keyPointsMap) {
			const interpolatedTemps = interpolateBetweenTemperatureKeys(lastDay, day, lastTemp, temp);
			for (let d = lastDay; d < day; d++) {
				monthlyTemperatures[d] = interpolatedTemps[d];
			}
			lastDay = day;
			lastTemp = temp;
		}

		return { month: date.month, temperatures: monthlyTemperatures };
	}

	function generateTemperatureKeyPoints(date) {
		const minDays = 4; // Minimum key points
		const maxDays = 6; // Max key points - don't set too high if timeApart is a high value
		const timeApart = 3; // Minimum days between each keypoint
		const daysInMonth = DateTime.getDaysOfMonthFromYear(date.year)[date.month - 1];
		const numberOfKeyPoints = random(minDays - 1, maxDays - 1);
		const keyPoints = new Map();

		while (keyPoints.size < numberOfKeyPoints) {
			const randomDay = random(timeApart + 1, daysInMonth - timeApart);

			const isFarEnough = Array.from(keyPoints.keys()).every(kp => Math.abs(kp - randomDay) >= timeApart);
			if (isFarEnough) {
				keyPoints.set(randomDay, getRandomTemperature(monthlyTemperatureRanges[date.month - 1]));
			}
		}
		// Add the last key point
		keyPoints.set(daysInMonth + 1, getRandomTemperature(monthlyTemperatureRanges[date.month - 1]));
		return new Map([...keyPoints.entries()].sort((a, b) => a[0] - b[0]));
	}

	function getRandomTemperature([minTemp, maxTemp]) {
		return randomFloat(minTemp, maxTemp);
	}

	function interpolateBetweenTemperatureKeys(startPoint, endPoint, startTemp, endTemp) {
		const temperatures = {};
		const deltaTemp = endTemp - startTemp;
		const deltaPoint = endPoint - startPoint;

		// Linear interpolation
		for (let point = startPoint; point <= endPoint; point++) {
			const t = (point - startPoint) / deltaPoint;
			temperatures[point] = startTemp + t * deltaTemp;
		}

		return temperatures;
	}

	return Object.create({
		monthlyTemperatureRanges,
		getCelcius,
		getFahrenheit,
		set,
		add,
	});
})();
// window.Weather.Temperature = Weather.Temperature;
