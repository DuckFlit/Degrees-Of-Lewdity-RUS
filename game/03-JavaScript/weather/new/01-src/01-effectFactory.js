/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const WeatherEffects = (() => {
	const _effects = new Map();

	function createEffect(params) {
		const optionalParams = {
			defaultParameters: {},
		};
		params = { ...optionalParams, ...params };

		if (_effects.has(params.name)) {
			WeatherCanvas.errors.add("Effects", `Effect with name '${params.name}', already exists, and will be overwritten.`);
		}

		const { name, ...context } = params;
		_effects.set(name, context);
	}

	return {
		effects: _effects,
		create: createEffect,
	};
})();
window.WeatherEffects = WeatherEffects;
