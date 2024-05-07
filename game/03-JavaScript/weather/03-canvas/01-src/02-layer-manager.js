/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

Weather.Sky.Layers = (() => {
	const _layers = new Map();

	function addLayer(params) {
		const optionalParams = {
			defaultParameters: {},
		};
		params = { ...optionalParams, ...params };
		if (_layers.has(params.name)) {
			console.error(new Error(`Layer with name '${params.name}' already exists and will be overwritten.`));
		}

		if (!params.effects) {
			console.error(new Error(`Layer '${params.name} contain no effects.`));
			return;
		}

		const layer = new Weather.Sky.Layer(params.name, params.blur, params.zIndex, params.animation);
		params.effects.map(p => layer.addEffect(p.effect, p.params, p.bindings, p.drawCondition, p.compositeOperation));

		_layers.set(params.name, layer);
		return layer.loadPromises;
	}

	function sortByZIndex() {
		const sortedLayers = new Map([..._layers.entries()].sort((a, b) => a[1].zIndex - b[1].zIndex));
		_layers.clear();
		sortedLayers.forEach((value, key) => {
			_layers.set(key, value);
		});
	}

	return {
		add: addLayer,
		sortByZIndex,
		layers: _layers,
	};
})();
//window.Layers = Layers;
