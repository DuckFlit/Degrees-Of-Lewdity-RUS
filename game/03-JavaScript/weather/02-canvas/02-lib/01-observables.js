/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */

Weather.Observables = (() => {
	class UpdateScheduler {
		constructor() {
			this.updates = new Set();
			this.scheduled = false;
		}

		scheduleUpdate(update) {
			this.updates.add(update);

			if (!this.scheduled) {
				this.scheduled = true;
				Promise.resolve().then(() => this.executeUpdates());
			}
		}

		executeUpdates() {
			for (const update of this.updates) {
				update();
			}
			this.updates.clear();
			this.scheduled = false;
		}
	}

	// Prevents multiple of the same update function to execute at the same time
	function batchedUpdate(fn) {
		scheduler.scheduleUpdate(fn);
	};

	const observables = ObservableValue.fromObject({
		location: null,
		bus: null,
		time: null,
		weather: null,
		precipitation: null,
		precipitationIntensity: null,
		snow: null,
		bloodMoon: null,
	});

	const scheduler = new UpdateScheduler();

	Weather.Sky.loaded.subscribe( () => {
		Weather.Sky.updateTooltip();

		$(document).on(":passageend", () => {
			observables.location.value = V.location;
			observables.bus.value = V.bus;
			observables.time.value = Time.date.timeStamp;
			observables.weather.value = Weather.name;
			observables.precipitation.value = Weather.precipitation;
			observables.precipitationIntensity.value = Weather.precipitationIntensity;
			observables.snow.value = Weather.isSnow;
			observables.bloodMoon.value = Weather.bloodMoon;
			if (Weather.Sky.loaded.value) Weather.Sky.updateTooltip();
		});
		
		const updateLocation = async () => {
			await Weather.Sky.getLayer("location").init();
			Weather.Sky.drawLayers("location");
			console.log("UPDATE LOCATION")
		};

		const updateWeather = async () => {
			await Weather.Sky.getLayer("clouds").init();
			await Weather.Sky.getLayer("cirrusClouds").init();
			await Weather.Sky.getLayer("overcastClouds").init();
			Weather.Sky.drawLayers("clouds", "cirrusClouds", "overcastClouds");
		};

		const updatePrecipitation = async () => {
			Weather.Sky.getLayer("precipitation").effects[0].stopAnimation();
			Weather.Sky.drawLayers("precipitation");
		};

		const drawAll = () => {
			Weather.Sky.updateOrbits();
			Weather.Sky.updateFade();
			Weather.Sky.updateTooltip();
			Weather.Sky.drawLayers();
		};
		
		/* LOCATION */
		observables.location.subscribe(() => batchedUpdate(updateLocation));
		observables.bus.subscribe(() => batchedUpdate(updateLocation));
		observables.bloodMoon.subscribe(() => batchedUpdate(updateLocation));
		observables.bloodMoon.subscribe((val) => console.warn("BVLOOD MOON", val));
		observables.snow.subscribe(() => batchedUpdate(updateLocation));

		/* WEATHER */
		observables.weather.subscribe(() => batchedUpdate(updateWeather));
		observables.precipitation.subscribe(() => batchedUpdate(updatePrecipitation));
		observables.precipitationIntensity.subscribe(() => batchedUpdate(updatePrecipitation));

		/* TIME */
		observables.time.subscribe(() => batchedUpdate(drawAll));
	});

	return {};
})();
