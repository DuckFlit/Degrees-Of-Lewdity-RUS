Weather.Observables = (() => {
	// Schedules the updates so that the same layers don't update multiple times by different bindings
	// Uses promises since scheduled code is sometimes asyncronous
	class UpdateScheduler {
		constructor() {
			this.updates = new Map();
			this.scheduled = false;
		}

		scheduleUpdate(layerKey, update) {
			this.updates.set(layerKey, update);
			if (!this.scheduled) {
				this.scheduled = true;
				Promise.resolve().then(() => this.executeUpdates());
			}
		}

		executeUpdates() {
			const promises = [];

			this.updates.forEach((update, key) => {
				if (key !== "all") {
					const updatePromise = Promise.resolve().then(() => update(!!this.updates.get("all")));
					promises.push(updatePromise);
					this.updates.delete(key);
				}
			});

			// Wait for all layer updates to complete before executing "all" update
			Promise.all(promises).then(() => {
				const allUpdate = this.updates.get("all");
				if (allUpdate) {
					allUpdate();
				}
				this.updates.clear();
				this.scheduled = false;
			});
		}
	}

	const scheduler = new UpdateScheduler();
	const observables = {};

	Object.keys(setup.WeatherBindings).forEach(key => (observables[key] = new ObservableValue(null)));

	const setBindings = () => {
		if (Weather.Sky.loaded.value) Weather.Sky.updateTooltip();
		Object.entries(setup.WeatherBindings).forEach(([key, config]) => {
			const value = config.variable();
			observables[key].value = value;
		});
	};

	const subscribeToUpdates = () => {
		Object.entries(setup.WeatherBindings).forEach(([key, config]) => {
			observables[key].subscribe(value => {
				if (value === undefined) return;
				if (config.layers.includes("all")) {
					scheduler.scheduleUpdate("all", async () => {
						Weather.Sky.updateTooltip();
						Weather.Sky.updateOrbits();
						Weather.Sky.updateFade();
						Weather.Sky.drawLayers();
					});
				} else {
					config.layers.forEach(layer => {
						scheduler.scheduleUpdate(layer, async draw => {
							await Weather.Sky.getLayer(layer).init();
							if (!draw) Weather.Sky.drawLayers(layer);
						});
					});
				}
			});
		});
	};

	Weather.Sky.loaded.subscribe(() => {
		setBindings();
		subscribeToUpdates();
		$(document).on(":passageend", setBindings);
	});

	return {
		objects: observables,
		checkForUpdate: setBindings,
	};
})();
