var ConstantsLoader = (() => {
	const allowedTypes = ['boolean', 'bigint', 'number', 'string'];

	function init(data) {
		/* Use a modified cloning function to protect data. */
		return clone(data);
	}

	function clone(obj) {
		const fragment = Object.create({});
		Object.entries(obj).forEach(([key, value]) => {
			if (typeof value === 'object') {
				/* Sub object within object. */
				Object.defineProperty(fragment, key, {
					value: clone(value),
					writable: false,
					configurable: false
				});
			} else if (allowedTypes.includes(typeof value)) {
				/* A value type, ready for getter conversion. */
				Object.defineProperty(fragment, key, {
					get: function() {
						return value;
					},
					configurable: false
				});
			}
		});
		return fragment;
	}

	return Object.seal({
		init
	});
})();
