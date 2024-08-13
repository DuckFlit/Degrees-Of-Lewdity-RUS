Object.defineProperty(Array.prototype, "shuffle", {
	configurable: true,
	writable: true,

	value() {
		for (let i = this.length - 1; i > 0; i--) {
			const j = Math.floor(State.random() * (i + 1));
			[this[i], this[j]] = [this[j], this[i]];
		}
	},
});

Object.defineProperty(Array.prototype, "select", {
	configurable: true,
	writable: true,

	value(index) {
		if (this == null) {
			throw new TypeError("Array.prototype.select called on null or undefined");
		}
		if (typeof index !== "number") {
			throw new Error("Array.prototype.select index parameter must be a number");
		}
		const start = 0;
		const end = this.length - 1;
		const safeIndex = start > index ? start : end < index ? end : index;
		return this[safeIndex];
	},
});

/* Returns copy of array minus the values in arguments. */
Object.defineProperty(Array.prototype, "except", {
	configurable: true,
	writable: true,

	value() {
		if (this == null) {
			throw new TypeError("Array.prototype.except called on null or undefined");
		}
		if (arguments.length === 0) {
			return this;
		}

		const needles = Array.prototype.concat.apply([], arguments);

		return this.filter(obj => {
			for (const n of needles) {
				if (obj === n) return false;
			}
			return true;
		});
	},
});

Object.defineProperty(Array.prototype, "formatList", {
	configurable: true,
	writable: true,
	value(options) {
		let { conjunction, useOxfordComma, separator } = Object.assign(
			{
				conjunction: "and",
				useOxfordComma: false,
				separator: ", ",
			},
			options
		);
		if (this == null) {
			throw new TypeError("Array.prototype.formatList called on null or undefined.");
		}
		if (this.length === 0) {
			return "";
		}
		conjunction += " ";
		if (this.length <= 2) return this.join(" " + conjunction);
		const oxConj = (useOxfordComma ? separator : " ") + conjunction;
		return this.slice(0, -1).join(separator) + oxConj + this.last();
	},
});

// replace sugarcube methods with ones using prng instead of Math.random
$(() => {
	"use strict";
	function _random(/* [min ,] max */) {
		let min, max, useMath;

		switch (arguments.length) {
			case 0:
				throw new Error("_random called with insufficient parameters");
			case 1:
				min = 0;
				max = arguments[0];
				break;
			default:
				min = arguments[0];
				max = arguments[1];
				useMath = arguments[2];
				break;
		}

		if (min > max) [min, max] = [max, min];
		const _source = useMath ? Math.random : State.random;
		return Math.floor(_source() * (max - min + 1)) + min;
	}

	delete Array.prototype.random;
	Object.defineProperty(Array.prototype, "random", {
		configurable: true,
		writable: true,

		value(useMath) {
			// lazy equality for null
			if (this == null) throw new TypeError("Array.prototype.random called on null or undefined");

			const length = this.length >>> 0;
			if (length === 0) return;

			return this[_random(0, length - 1, useMath)];
		},
	});

	delete Array.prototype.pluck;
	Object.defineProperty(Array.prototype, "pluck", {
		configurable: true,
		writable: true,
		value(useMath) {
			// lazy equality for null
			if (this == null) throw new TypeError("Array.prototype.pluck called on null or undefined");

			const length = this.length >>> 0;
			if (length === 0) return;

			return Array.prototype.splice.call(this, _random(0, length - 1, useMath), 1)[0];
		},
	});

	Object.defineProperty(Array.prototype, "pluckWith", {
		configurable: true,
		writable: true,

		value(predicate) {
			if (this == null) {
				throw new TypeError("Array.prototype.pluckWith called on null or undefined");
			}
			if (typeof predicate !== "function") {
				throw new Error("Array.prototype.pluckWith predicate parameter must be a function");
			}
			const indices = [];
			this.forEach((e, i) => {
				if (predicate.call(this, e, i, this)) {
					indices.push(i);
				}
			});
			if (indices.length === 0) return;
			const index = indices.random();
			return this.splice(index, 1)[0];
		},
	});
});

/**
 * Compare two arrays of objects based on a specified property.
 *
 * @param {Array} otherArray The array to compare with the calling array.
 * @param {string} property The property of the objects to compare.
 * @returns {boolean} Returns true if both arrays are equal in length and their objects have identical properties; otherwise, false.
 */
Object.defineProperty(Array.prototype, "isEqualByProperty", {
	configurable: true,
	writable: true,

	value(otherArray, property) {
		if (this == null) {
			throw new TypeError("Array.prototype.isEqualByProperty called on null or undefined");
		}
		if (!Array.isArray(otherArray)) {
			throw new TypeError("The first argument must be an array");
		}
		if (typeof property !== "string") {
			throw new TypeError("The second argument must be a string");
		}
		if (this.length !== otherArray.length) {
			return false;
		}
		for (let i = 0; i < this.length; i++) {
			if (this[i][property] !== otherArray[i][property]) {
				return false;
			}
		}
		return true;
	},
});

Object.defineProperty(Array.prototype, "isEqual", {
	configurable: true,
	writable: true,

	value(otherArray) {
		if (this == null) {
			throw new TypeError("Array.prototype.isEqual called on null or undefined");
		}
		if (!Array.isArray(otherArray)) {
			throw new TypeError("The first argument must be an array");
		}

		if (this.length !== otherArray.length) {
			return false;
		}

		for (let i = 0; i < this.length; i++) {
			if (this[i] !== otherArray[i]) {
				return false;
			}
		}
		return true;
	},
});
