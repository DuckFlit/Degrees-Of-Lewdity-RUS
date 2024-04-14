Weather.Observables = (() => {
	// Schedules the updates so that the same layers don't update multiple times by different bindings
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
			this.updates.forEach(update => update());
			this.updates.clear();
			this.scheduled = false;
		}
	}

	const scheduler = new UpdateScheduler();
	const observables = {};

	Object.entries(setup.WeatherBindings).forEach(([key, config]) => {
		const observable = new ObservableValue(null);
		observables[key] = observable;

		observable.subscribe(value => {
			if (value === undefined) return;
			if (config.layers.includes("all")) {
				scheduler.scheduleUpdate(() => {
					Weather.Sky.updateOrbits();
					Weather.Sky.updateFade();
					Weather.Sky.updateTooltip();
					Weather.Sky.drawLayers();
				});
			} else {
				scheduler.scheduleUpdate(async () => {
					for (const layer of config.layers) {
						await Weather.Sky.getLayer(layer).init();
					}
					Weather.Sky.drawLayers(...config.layers);
				});
			}
		});
	});

	Weather.Sky.loaded.subscribe(() => {
		Weather.Sky.updateTooltip();

		$(document).on(":passageend", () => {
			Object.keys(observables).forEach(key => {
				observables[key].value = setup.WeatherBindings[key].variable();
			});
			if (Weather.Sky.loaded.value) Weather.Sky.updateTooltip();
		});
	});

	return {};
})();
