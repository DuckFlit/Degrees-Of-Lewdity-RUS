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
