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
	// Sets current temperate (at start of day) to this temperature
	// However, the actual temperature might vary, since it interpolates to the next day's temperature during the day
	// After this is set it will still interpolate to the next temperature, which shifts midnight
	// To keep a certain temperature for a longer duration without too much interpolation - set the temperature for the day after too by using the optional date parameter.
	function set(temperature, date) {
		date = new DateTime(date ?? Time.date);
		if (V.weatherObj.monthlyTemperatures.length < 1) return;
		const modifiers = calculateModifiers(date);
		V.weatherObj.monthlyTemperatures[0].t[date.day] = temperature - modifiers;
		const baseTemperature = interpolateDailyTemperature(date);
		T.baseTemperature = round(baseTemperature, 2);
	}

	function add(temperature, date) {
		date = new DateTime(date ?? Time.date);
		if (V.weatherObj.monthlyTemperatures.length < 1) return;
		V.weatherObj.monthlyTemperatures[0].t[date.day] += temperature;
		const baseTemperature = interpolateDailyTemperature(date);
		T.baseTemperature = round(baseTemperature, 2);
	}

	function toFahrenheit(temperature) {
		return round((temperature * 9) / 5 + 32, 2);
	}

	function toCelsius(temperature) {
		return round(((temperature - 32) * 5) / 9, 2);
	}

	function isFreezing() {
		return getCelsius() < 0;
	}

	function getBaseTemperature(date) {
		if (T.baseTemperature === undefined) {
			// Will only generate if the array doesn't already exist, or if the month doesn't match
			generateMonthlyTemperatures();
			const baseTemperature = interpolateDailyTemperature(date);
			T.baseTemperature = round(baseTemperature, 2);
		}
		return T.baseTemperature;
	}

	/*
		Returns outside temperature
	*/
	function getCelsius() {
		if (T.temperatureOverride?.outside) return T.temperatureOverride.outside;
		if (T.currentTemperature === undefined) {
			const date = new DateTime(Time.date);
			const baseTemperature = getBaseTemperature(date);
			const modifiers = calculateModifiers(date);
			T.currentTemperature = round(baseTemperature + modifiers, 2);
		}
		return T.currentTemperature;
	}

	/*
		The water temperature uses the base temperature, without modifiers
	*/
	function getWaterTemperature() {
		if (T.temperatureOverride?.water) return T.temperatureOverride.water;
		const date = new DateTime(Time.date);
		const baseTemperature = getBaseTemperature(date);
		const lowerLimit = -1;
		const upperLimit = 28;
		const midPoint = 10;
		const k = 0.15; // Curve smoothness

		const temperatureDifference = baseTemperature - midPoint;
		const adjustment = k * temperatureDifference;

		// Exponential function
		const waterTemperature = lowerLimit + (upperLimit - lowerLimit) / (1 + Math.exp(-adjustment));
		return round(waterTemperature, 2);
	}

	/*
		Modifies the inside-temperature slightly depending on the outside temperature.
		It uses a logarithmic function to simulate heating / AC being turned on when the temperature varies enough.
		Lowering the modifierFactor makes the deviation from the target temperature less pronounced. (lower deviation from target)
	*/
	function getInsideTemperature() {
		if (T.temperatureOverride?.inside) return T.temperatureOverride.inside;
		const date = new DateTime(Time.date);
		const baseTemperature = getBaseTemperature(date);
		const targetTemperature = 23;
		const modifierFactor = 0.4;

		// Logarithmic function for more effect at extremes (low and high temperatures)
		const deviation = Math.abs(baseTemperature - targetTemperature);
		const modifier = Math.pow(Math.log1p(deviation), 2) * Math.sign(baseTemperature - targetTemperature) * modifierFactor;

		return round(targetTemperature + modifier, 2);
	}

	function interpolateDailyTemperature(date) {
		if (!V.weatherObj.monthlyTemperatures.some(monthObj => monthObj.m === date.month)) {
			console.error("Warning: Cannot interpolate between dates outside the current monthlyTemperature array.");
			return V.weatherObj.monthlyTemperatures[0].t[0];
		}

		const tomorrowDate = new DateTime(date).addDays(1);
		const tomorrowKey = date.month !== tomorrowDate.month ? 1 : 0;

		const todayTemp = V.weatherObj.monthlyTemperatures[0].t[date.day];
		const tomorrowTemp = V.weatherObj.monthlyTemperatures[tomorrowKey].t[tomorrowDate.day] || todayTemp;

		const deltaTemp = tomorrowTemp - todayTemp;

		// Linear interpolation
		return todayTemp + deltaTemp * date.fractionOfDay;
	}

	function calculateModifiers(date) {
		const sunModifier = calculateSunModifier(date.fractionOfDay);
		const seasonModifier = calculateSeasonModifier(date);
		const weatherModifier = getWeatherModifier(Weather.name);
		const locationModifier = getLocationModifier();
		return round(locationModifier + (1.5 * sunModifier + 2 * seasonModifier) * weatherModifier, 2);
	}

	function calculateSunModifier(fraction) {
		return 2 * (1 - Math.abs(fraction - 0.5) * 2) - 1;
	}

	function calculateSeasonModifier(date) {
		const totalDaysInYear = DateTime.getDaysOfYear(date.year);
		return -2 * Math.pow((Time.getDayOfYear(date) - totalDaysInYear / 2) / (totalDaysInYear / 2), 2) + 1;
	}

	function getWeatherModifier(weatherCondition) {
		return Weather.Settings.weatherTypes.find(type => type.name === weatherCondition)?.temperatureModifier ?? 1.0;
	}

	function getLocationModifier() {
		// Location modifiers placeholder
		switch (V.location) {
			case "town":
				return 3;
			default:
				return 0;
		}
	}

	function generateMonthlyTemperatures() {
		const date = Time.date;
		if (V.weatherObj.monthlyTemperatures.length === 2 && V.weatherObj.monthlyTemperatures[0].m === date.month) return;

		// Remove past months and adjust array for the current time
		while (V.weatherObj.monthlyTemperatures.length > 0 && V.weatherObj.monthlyTemperatures[0].m !== date.month) {
			V.weatherObj.monthlyTemperatures.shift();
		}

		// Ensure current and next month data are present
		while (V.weatherObj.monthlyTemperatures.length < 2) {
			let monthDate = new DateTime(date);
			if (V.weatherObj.monthlyTemperatures.length > 0) {
				monthDate = monthDate.addMonths(1);
			}
			V.weatherObj.monthlyTemperatures.push(generateDailyTemperatures(monthDate));
		}
	}

	function generateDailyTemperatures(date) {
		const keyPointsMap = generateTemperatureKeyPoints(date);

		let lastTemp;
		if (V.weatherObj.monthlyTemperatures.length > 0) {
			const prevMonthData = V.weatherObj.monthlyTemperatures[V.weatherObj.monthlyTemperatures.length - 1];
			lastTemp = prevMonthData.t[prevMonthData.t.length - 1];
		} else {
			lastTemp = Array.from(keyPointsMap.values()).pop();
		}
		const monthlyTemperatures = [];
		let lastDay = 0;
		for (const [day, temp] of keyPointsMap) {
			const interpolatedTemps = interpolateBetweenTemperatureKeys(lastDay, day, lastTemp, temp);
			for (let d = lastDay; d < day; d++) {
				monthlyTemperatures[d] = round(interpolatedTemps[d], 2);
			}
			lastDay = day;
			lastTemp = temp;
		}

		return { m: date.month, t: monthlyTemperatures };
	}

	function generateTemperatureKeyPoints(date) {
		const timeApart = Math.clamp(Weather.Settings.forecast.temperature.minTimeApartKeyPoints, 0, 27);
		const maxDays = Math.clamp(Weather.Settings.forecast.temperature.maxKeyPointsPerMonth, 1, Math.floor(28 / timeApart));
		const minDays = Math.clamp(Weather.Settings.forecast.temperature.minKeyPointsPerMonth, 1, maxDays);

		const daysInMonth = DateTime.getDaysOfMonthFromYear(date.year)[date.month - 1];
		const numberOfKeyPoints = random(minDays - 1, maxDays - 1);
		const keyPoints = new Map();

		const temperatureRange = Weather.Settings.months[date.month - 1].temperatureRange;
		while (keyPoints.size < numberOfKeyPoints) {
			const randomDay = random(timeApart + 1, daysInMonth - timeApart);

			const isFarEnough = Array.from(keyPoints.keys()).every(kp => Math.abs(kp - randomDay) >= timeApart);
			if (isFarEnough) {
				keyPoints.set(randomDay, getRandomTemperature(temperatureRange));
			}
		}
		// Add the last key point
		keyPoints.set(daysInMonth + 1, getRandomTemperature(temperatureRange));
		return new Map([...keyPoints.entries()].sort((a, b) => a[0] - b[0]));
	}

	function getRandomTemperature([minTemp, maxTemp]) {
		return randomFloat(minTemp, maxTemp);
	}

	/**
	 *
	 * @param {*} startPoint
	 * @param {*} endPoint
	 * @param {*} startTemp
	 * @param {*} endTemp
	 * @returns
	 */
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
		isFreezing,
		getBaseTemperature,
		getCelsius,
		getInsideTemperature,
		getWaterTemperature,
		toFahrenheit,
		toCelsius,
		set,
		add,
		override: {
			get outside() {
				return T.temperatureOverride?.outside;
			},
			set outside(value) {
				T.temperatureOverride = { outside: value };
			},
			get inside() {
				return T.temperatureOverride?.inside;
			},
			set inside(value) {
				T.temperatureOverride = { inside: value };
			},
			get water() {
				return T.temperatureOverride?.water;
			},
			set water(value) {
				T.temperatureOverride = { water: value };
			},
		},
	});
})();
