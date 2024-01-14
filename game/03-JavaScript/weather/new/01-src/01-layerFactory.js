// /* eslint-disable no-undef */
// /* eslint-disable no-unused-vars */
// const WeatherC = {};
// WeatherC.Canvas = (() => {
// 	class ErrorList {
// 		constructor() {
// 			this.errors = [];
// 		}

// 		add(category, message, type = "warn") {
// 			this.errors.push({ category, message, type });
// 		}
// 	}

// 	const _layers = new Map();
// 	const _effects = [];
// 	const _errors = new ErrorList();

// 	const validateOptions = (options, requiredOptions, category) => {
// 		const err = [];
// 		for (const option of requiredOptions) {
// 			if (!options[option]) {
// 				err.push(option);
// 			}
// 		}
// 		if (!err.length) return true;
// 		_errors.add(category, "Could not create layer, invalid parameters: " + err.join(", "), "warn");
// 		return false;
// 	};

// 	// function addLayer(options) {
// 	// 	const requiredOptions = ["name", "zIndex", "draw"];
// 	// 	const optionalOptions = {
// 	// 		zIndex: 1,
// 	// 	};
// 	// 	options = { ...optionalOptions, ...options };
// 	// 	if (!validateOptions(options, requiredOptions, "Layers")) return;

// 	// 	const obj = new WeatherLayer(options);
// 	// 	if (_layers.has(options.name)) {
// 	// 		_errors.add("Layers", `Layer with name '${options.name}', already exists, and will be overwritten.`);
// 	// 	}
// 	// 	_layers.set(options.name, obj);
// 	// }

// 	function addLayer(name, zIndex) {
// 		const obj = new WeatherLayer(zIndex);
// 		if (_layers.has(name)) {
// 			_errors.add("Layers", `Layer with name '${name}', already exists, and will be overwritten.`);
// 		}
// 		_layers.set(name, obj);
// 	}


// 	// function enable / disable / draw

// 	return {
// 		addLayer,
// 		effects: _effects,
// 		layers: _layers,
// 		errors: _errors,
// 	};
// })();
// window.WeatherC = WeatherC;
