/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/*

- Option to increase number of temp months more than 2
- Option to increase number of weather days more than 2 - min 2 max 28
Minimum 2 check

	- Only use winter-images after it has snowed once
	- if it melts (at least 5 hours of warm temperature) back to normal images until it snow again
	- based on variable snowAccumulation (mm), depends on temperature + time
*/

Weather.WeatherConditions = (() => {
	function isWeather(weatherType) {
		return weatherType.toLowerCase() === getWeather().name.toLowerCase();
	}

	function getWeather(date) {
		if (T.currentWeather === undefined) {
			date = new DateTime(date ?? Time.date);
			generateWeather(date);
			T.currentWeather = interpolateWeather(date);
			console.log("T.currentWeather", T.currentWeather);
		}
		return T.currentWeather;
	}

	function setWeather(weatherType, instant = false) {
		delete T.currentWeather;
		const weatherTypeIndex = Weather.Settings.weatherTypes.findIndex(wt => wt.name === weatherType.toLowerFirst());
		if (weatherTypeIndex === -1 || V.weatherObj.keypointsArr.length < 1) {
			return;
		}
		V.weatherObj.keypointsArr[0] = {
			timestamp: Time.date.timeStamp,
			value: weatherTypeIndex,
		};
		getWeather();
		Weather.Sky.redraw(Time.date, instant);
	}

	function interpolateWeather(date) {
		const currentTimeStamp = date.timeStamp;

		let currentKeyPoint = null;
		let nextKeyPoint = null;

		// Get the current and next weather key points
		for (const keyPoint of V.weatherObj.keypointsArr) {
			if (keyPoint.timestamp <= currentTimeStamp) {
				currentKeyPoint = keyPoint;
			}
			if (keyPoint.timestamp > currentTimeStamp && !nextKeyPoint) {
				nextKeyPoint = keyPoint;
			}
		}

		currentKeyPoint = currentKeyPoint ?? { timestamp: currentTimeStamp, value: nextKeyPoint.value };

		// Failsafe if no next key point is found for the day, assume weather stays the same
		if (!nextKeyPoint) {
			return currentKeyPoint ? currentKeyPoint.value : "clear";
		}
		const currentValueNumeric = Weather.Settings.weatherTypes[currentKeyPoint.value].value;
		const nextValueNumeric = Weather.Settings.weatherTypes[nextKeyPoint.value].value;

		// Calculate the fraction of time passed between the current and next key points
		const fraction = (currentTimeStamp - currentKeyPoint.timestamp) / (nextKeyPoint.timestamp - currentKeyPoint.timestamp);

		// Interpolate the weather value
		const interpolatedValueNumeric = Math.round(currentValueNumeric + (nextValueNumeric - currentValueNumeric) * fraction);

		if (V.weatherObj?.cur !== null) {
			const currentIndex = Math.floor(V.weatherObj.cur / 10);
			const currentOvercast = V.weatherObj.cur % 10 === 1;
			const currentWeatherType = Weather.Settings.weatherTypes[currentIndex];
			if (currentWeatherType.value === interpolatedValueNumeric) {
				// Decode the index and overcast variable
				return createObjectByIndex(currentIndex, currentOvercast);
			}
		}
		return findClosestWeatherType(interpolatedValueNumeric);
	}

	function findClosestWeatherType(interpolatedValue) {
		const closestTypes = Weather.Settings.weatherTypes.reduce(
			(acc, type, index) => {
				const difference = Math.abs(type.value - interpolatedValue);
				if (difference < acc.minDifference) {
					return { minDifference: difference, types: [index] };
				}
				if (difference === acc.minDifference) {
					acc.types.push(index);
				}
				return acc;
			},
			{ minDifference: Number.MAX_VALUE, types: [] }
		).types;

		// Randomly choose one type if there are multiple options with the same int value
		const chosenIndex = closestTypes[random(0, closestTypes.length - 1)];
		console.log("index1", chosenIndex);
		const newObj = createObjectByIndex(chosenIndex);
		console.log("newObj.overcast", newObj.overcast);
		
		// Saves both the index and overcast variable
		V.weatherObj.cur = chosenIndex * 10 + (newObj.overcast ? 1 : 0);
		return newObj;
	}

	function createObjectByIndex(index, overcast) {
		const obj = Weather.Settings.weatherTypes[index];
		console.log("OBJ", obj);
		console.log("index", index);
		return {
			defines: obj,
			name: obj.name,
			overcast: overcast ?? obj.overcast(),
			tanningModifier: obj.tanningModifier,
			precipitationIntensity: obj.precipitationIntensity,
		};
	}

	function generateWeather(currentDate) {
		const daysToGenerate = Weather.Settings.forecast.daysToGenerate;

		if (!V.weatherObj.keypointsArr.length) {
			V.weatherObj.keypointsArr = [];
			generateWeatherKeypoints(currentDate, daysToGenerate);
		}

		// Check if more keypoints are needed
		const lastKeypoint = V.weatherObj.keypointsArr[V.weatherObj.keypointsArr.length - 1];
		const lastDate = new DateTime(lastKeypoint.timestamp);
		const targetDate = new DateTime(currentDate).addDays(daysToGenerate);
		const dayDifferenceFromKeypoint = (targetDate.timeStamp - lastDate.timeStamp) / Time.secondsPerDay;

		// Generate a new keypoints array in case of a "time-jump" more than 'daysToGenerate' number of days
		if (dayDifferenceFromKeypoint > 20) {
			generateWeatherKeypoints(currentDate, daysToGenerate);
			return;
		}

		// Trim old keypoints
		while (V.weatherObj.keypointsArr.length > 1 && V.weatherObj.keypointsArr[1].timestamp <= currentDate.timeStamp) {
			V.weatherObj.keypointsArr.shift();
		}

		// Generate new keypoints so that it always saves 'daysToGenerate' number of days
		if (dayDifferenceFromKeypoint > 0) {
			generateWeatherKeypoints(lastDate.addDays(1), dayDifferenceFromKeypoint);
		}
	}

	function generateWeatherKeypoints(startDate, daysToGenerate) {
		const minKeyPointsPerDay = Weather.Settings.forecast.minKeyPointsPerDay;
		const maxKeyPointsPerDay = Weather.Settings.forecast.maxKeyPointsPerDay;
		const timeApart = Weather.Settings.forecast.minTimeApartKeyPoints;

		// Iterate over each day to add weather keypoints
		for (let dayCount = 0; dayCount < daysToGenerate; dayCount++) {
			const date = new DateTime(startDate).addDays(dayCount);
			const numKeyPoints = random(minKeyPointsPerDay, maxKeyPointsPerDay);
			let lastTime = -timeApart;
			// Create numKeyPoints number of keypoints for each day
			for (let i = 0; i < numKeyPoints; i++) {
				const timeWindow = 24 * 60 - lastTime - timeApart;
				// Randomly determine the keypoint time within the available time slot
				const time = lastTime + timeApart + random(1, timeWindow / (numKeyPoints - i));
				const value = getRandomWeatherValue();

				const timestamp = new DateTime(date.year, date.month, date.day, Math.floor(time / 60), time % 60).timeStamp;
				V.weatherObj.keypointsArr.push({ timestamp, value });
				lastTime = time;
			}
		}
	}

	function getRandomWeatherValue() {
		const currentSeason = Time.season;
		const options = Weather.Settings.weatherTypes.map((weatherType, index) => {
			const weight = weatherType.probability[currentSeason];
			return [index, weight];
		});

		return weightedRandom(...options);
	}

	return Object.create({
		get keysObject() {
			const arr = V.weatherObj.keypointsArr;
			return arr.map(item => {
				const date = new DateTime(item.timestamp);
				const weatherName = Weather.Settings.weatherTypes[item.value].name;
				return {
					type: weatherName,
					date: `${date.day}/${date.month} ${ampm(date.hour, date.minute)}`,
					value: item.value,
				};
			});
		},
		getWeather,
		setWeather,
		isWeather,
		generateWeatherKeypoints,
	});
})();
