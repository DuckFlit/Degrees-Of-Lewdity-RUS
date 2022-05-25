Object.defineProperty(Array.prototype, 'pluckWith', {
	configurable : true,
	writable     : true,

	value(predicate) {
		if (this == null) {
			throw new TypeError('Array.prototype.pluckWith called on null or undefined');
		}
		if (typeof predicate !== 'function') {
			throw new Error('Array.prototype.pluckWith predicate parameter must be a function');
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
	}
});

Object.defineProperty(Array.prototype, 'select', {
	configurable : true,
	writable     : true,

	value(index) {
		if (this == null) {
			throw new TypeError('Array.prototype.select called on null or undefined');
		}
		if (typeof index !== 'number') {
			throw new Error('Array.prototype.select index parameter must be a number');
		}
		const start = 0;
		const end = this.length - 1;
		const safeIndex = (start > index)
			? start
			: (end < index)
				? end
				: index;
		return this[safeIndex];
	}
});
