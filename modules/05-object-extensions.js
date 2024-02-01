// Original: https://raw.githubusercontent.com/saikojosh/Object-Assign-Deep/master/objectAssignDeep.js
// Refactored and optimized by Xao 2024-01-18

/*
 * Allows deep cloning of plain objects that contain primitives, nested plain objects, or nested plain arrays.
 *
 * You can control which properties to merge with an optional filter function.
 * Array merging can be set to concatenate arrays ('merge'), remove duplicates ('merge-deduplicate'), or replace (default).
 *
 *  * Examples:
 * // Use optional arrayBehaviour
 * obj1.mergeDeep(obj2, { arrayBehaviour: 'merge-deduplicate' });
 *
 * // Use filter to exclude number properties
 * obj1.mergeDeep(obj2, (key, value) => typeof value !== 'number');
 */

const ObjectAssignDeep = (function () {
	/*
	 * A unified way of returning a string that describes the type of the given variable.
	 */
	function getTypeOf(input) {
		return Object.prototype.toString.call(input).slice(8, -1).toLowerCase();
	}

	/*
	 * Branching logic which calls the correct function to clone the given value base on its type.
	 */
	function cloneValue(value) {
		switch (getTypeOf(value)) {
			case "object":
				return cloneObject(value);
			case "array":
				return value.map(cloneValue);
			case "date":
				return new Date(value.getTime());
			case "regexp":
				return new RegExp(value.source, value.flags);
			case "map":
				return new Map(value);
			case "set":
				return new Set(value);
			default:
				return value;
		}
	}

	/*
	 * Enumerates the properties of the given object (ignoring the prototype chain) and returns a new object, with each of
	 * its values cloned (i.e. references broken).
	 */
	function cloneObject(input) {
		return Object.keys(input).reduce((obj, key) => {
			obj[key] = cloneValue(input[key]);
			return obj;
		}, {});
	}

	function mergeObjects(target, source, options) {
		return Object.keys(source).reduce((obj, key) => {
			obj[key] = getTypeOf(source[key]) === "object" ? mergeObjects(target[key] || {}, source[key], options) : source[key];
			return obj;
		}, target);
	}

	function mergeArrays(target, source, options) {
		switch (options.arrayBehaviour) {
			case "merge-deduplicate":
				return Array.from(new Set(target.concat(source)));
			case "merge":
				return target.concat(source);
			default:
				return source.slice();
		}
	}

	function executeDeepMerge(target, objects, arrayBehaviour, filterFn) {
		objects.forEach(object => {
			Object.keys(object).forEach(key => {
				if (filterFn && !filterFn(key, object[key])) return;

				const valueType = getTypeOf(object[key]);
				if (valueType === "object") {
					target[key] = mergeObjects(target[key] || {}, object[key], { arrayBehaviour });
				} else if (valueType === "array" && getTypeOf(target[key]) === "array") {
					target[key] = mergeArrays(target[key], object[key], { arrayBehaviour });
				} else {
					target[key] = cloneValue(object[key]);
				}
			});
		});
		return target;
	}

	return { executeDeepMerge };
})();

Object.defineProperty(Object.prototype, "deepMerge", {
	configurable: true,
	writable: true,
	value(...objects) {
		const lastArg = objects[objects.length - 1];
		const arrayBehaviour = typeof lastArg === "string" ? objects.pop() : "replace";
		const filterFn = typeof objects[objects.length - 1] === "function" ? objects.pop() : null;

		return ObjectAssignDeep.executeDeepMerge(this, objects, arrayBehaviour, filterFn);
	},
});
