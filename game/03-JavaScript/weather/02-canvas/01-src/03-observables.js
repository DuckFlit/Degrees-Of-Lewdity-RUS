Weather.Observables = (() => {
	// Schedules the updates so that the same layers don't update multiple times by different bindings
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
			// Always cause "all" updates to execute last
			const allUpdate = this.updates.get("all");
			this.updates.delete("all");

			this.updates.forEach(update => update());
			this.updates.clear();

			if (allUpdate) allUpdate();

			this.scheduled = false;
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
						scheduler.scheduleUpdate(layer, async () => {
							await Weather.Sky.getLayer(layer).init();
							Weather.Sky.drawLayers(layer);
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
		checkForUpdate: setBindings,
	};
})();
