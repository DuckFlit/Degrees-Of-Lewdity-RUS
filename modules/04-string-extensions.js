/**
 * Returns a new string with the first character in lower case
 *
 * @param {string} str The string to modify
 * @returns {string} New modified string
 */
Object.defineProperty(String.prototype, "toLowerFirst", {
	configurable: true,
	writable: true,

	value() {
		if (this.length === 0) return this;
		return this.charAt(0).toLowerCase() + this.slice(1);
	},
});
