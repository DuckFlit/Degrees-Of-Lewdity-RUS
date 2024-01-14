// /* eslint-disable no-undef */
// /* eslint-disable no-unused-vars */
// const WeatherEffects = (() => {
// 	class ErrorList {
// 		constructor() {
// 			this.errors = [];
// 		}

// 		add(category, message, type = "warn") {
// 			this.errors.push({ category, message, type });
// 		}

// 		display() {
// 			this.errors.forEach(error => {
// 				console.log(error.message);
// 			});
// 		}
// 	}

// 	const _effects = new Map();
// 	const _errors = new ErrorList();

// 	const validateOptions = (options, requiredOptions, category) => {
// 		const err = [];
// 		for (const option of requiredOptions) {
// 			if (!options[option]) {
// 				err.push(option);
// 			}
// 		}
// 		if (!err.length) return true;
// 		_errors.add(category, "Could not create effect, invalid parameters: " + err.join(", "), "warn");
// 		_errors.display();
// 		return false;
// 	};

// 	function createEffect(options) {
// 		const requiredOptions = ["name", "init", "onDraw"];
// 		const optionalOptions = {
// 			parameters: {},
// 		};
// 		options = { ...optionalOptions, ...options };
// 		if (!validateOptions(options, requiredOptions, "Layers")) return;

// 		const obj = new WeatherEffect(options);
// 		if (_effects.has(options.name)) {
// 			_errors.add("Effects", `Effect with name '${options.name}', already exists, and will be overwritten.`);
// 		}
// 		_effects.set(options.name, obj);
// 		_errors.display();
// 	}

// 	return {
// 		effects: _effects,
// 		errors: _errors,
// 		create: createEffect,
// 	};
// })();
// window.WeatherEffects = WeatherEffects;
