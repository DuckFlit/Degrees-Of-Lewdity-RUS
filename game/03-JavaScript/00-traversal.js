// @ts-check

/**
 * @param {object?} source The tree to traverse.
 * @param {string} key The key of the current source node.
 * @param {string[]} parents List of keys that when matched to a node's key traverses its children.
 * @param {function(object, key):object} callback
 * @returns {object}
 */
function traverse(source, key, parents, callback) {
	console.debug("Traversing: Source", source, "Key", key, "Parents", parents);
	// Ensure node is setup correctly for later travesal or configuration
	const output = {};
	if (source == null) {
		console.debug(`Source node ${key} is empty`);
		return null;
	}
	Object.entries(source).forEach(([key, value]) => {
		const isParent = parents.includes(key) || key === "root";
		if (isParent) {
			const result = traverse(value, key, parents, callback);
			if (result == null) {
				return;
			}
			console.debug(`Adding branch to output at ${key}:`, result);
			output[key] = result;
			return;
		}
		const result = callback(source, key);
		if (result == null) {
			return;
		}
		console.debug(`Adding value to output at ${key}:`, result);
		output[key] = result;
	});
	console.debug(`Output for node ${key}:`, output);
	return output;
}
window.traverse = traverse;

/**
 * @param {object?} source The tree to traverse.
 * @param {object?} target The tree to compare with the source.
 * @param {string} key The key of the current source node.
 * @param {string[]} parents List of keys that when matched to a node's key traverses its children.
 * @param {function(object, object, key):object} callback
 * @returns {object}
 */
function traversePair(source, target, key, parents, callback) {
	console.debug("Traversing: Source", source, "Target", target, "Key", key, "Parents", parents);
	// Ensure node is setup correctly for later travesal or configuration
	const output = {};
	if (source == null) {
		console.debug(`Source node ${key} is empty`);
		return null;
	}
	if (target == null) {
		console.debug(`Target node ${key} is empty`);
		return null;
	}
	Object.entries(source).forEach(([key, value]) => {
		const isParent = parents.includes(key) || key === "root";
		if (isParent) {
			const result = traversePair(value, target[key], key, parents, callback);
			if (result == null) {
				return;
			}
			console.debug(`Adding branch to output at ${key}:`, result);
			output[key] = result;
			return;
		}
		const result = callback(source, target, key);
		if (result == null) {
			return;
		}
		console.debug(`Adding value to output at ${key}:`, result);
		output[key] = result;
	});
	console.debug(`Output for node ${key}:`, output);
	return output;
}
window.traversePair = traversePair;
