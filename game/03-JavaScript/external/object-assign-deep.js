// // https://raw.githubusercontent.com/saikojosh/Object-Assign-Deep/master/objectAssignDeep.js
// // Refactored and optimized by Xao 2024-01-18

// /*
//  * OBJECT ASSIGN DEEP
//  * Allows deep cloning of plain objects that contain primitives, nested plain objects, or nested plain arrays.
//  */

// /*
//  * A unified way of returning a string that describes the type of the given variable.
//  */
// function getTypeOf(input) {
//     return Object.prototype.toString.call(input).slice(8, -1).toLowerCase();
// }

// /*
//  * Branching logic which calls the correct function to clone the given value base on its type.
//  */
// function cloneValue(value, existingValue) {
//     const type = getTypeOf(value);

//     // Only clone if there's an existing value that's an object or array
//     if (existingValue && (getTypeOf(existingValue) === "object" || getTypeOf(existingValue) === "array")) {
//         switch (type) {
//             case 'object': return quickCloneObject(value);
//             case 'array': return quickCloneArray(value);
//             case 'date': return new Date(value.getTime());
//             case 'regexp': return new RegExp(value.source, value.flags);
//             case 'map': return new Map(value);
//             case 'set': return new Set(value);
//             default: return value;
//         }
//     }
//     return value;
// }

// /*
//  * Enumerates the given array and returns a new array, with each of its values cloned (i.e. references broken).
//  */
// function quickCloneArray(input) {
// 	return input.map(cloneValue);
// }

// /*
//  * Enumerates the properties of the given object (ignoring the prototype chain) and returns a new object, with each of
//  * its values cloned (i.e. references broken).
//  */
// function quickCloneObject(input) {
// 	const output = {};
// 	for (const key in input) {
// 		if (!Object.hasOwn(input, key)) {
// 			continue;
// 		}
// 		output[key] = cloneValue(input[key]);
// 	}
// 	return output;
// }

// function mergeObjects(target, source, options) {
//     Object.keys(source).forEach(key => {
//         if (getTypeOf(source[key]) === "object") {
//             target[key] = mergeObjects(target[key] || {}, source[key], options);
//         } else {
//             target[key] = source[key];
//         }
//     });
//     return target;
// }

// function mergeArrays(target, source, options) {
//     if (options.arrayBehaviour === "merge-deduplicate") {
//         const newArray = target.concat(source);
//         return newArray.filter((item, index) => newArray.indexOf(item) === index);
//     }
//     else if (options.arrayBehaviour === "merge") {
//         return target.concat(source);
//     }
//     return source.slice();
// }

// function executeDeepMerge(target, objects, options) {
//     objects.forEach(object => {
//         Object.keys(object).forEach(key => {
//             const value = object[key];
//             const existingValueType = getTypeOf(target[key]);
//             const valueType = getTypeOf(value);

//             if (valueType === "object") {
//                 target[key] = mergeObjects(target[key] || {}, value, options);
//             } else if (valueType === "array" && existingValueType === "array") {
//                 target[key] = mergeArrays(target[key], value, options);
//             } else {
//                 target[key] = cloneValue(value, target[key]);
//             }
//         });
//     });
//     return target;
// }

// /*
//  * Merge all the supplied objects into the target object, breaking all references, including those of nested objects
//  * and arrays, and even objects nested inside arrays. Like Object.assign(), the first parameter is mutated.
//  * Properties in later objects will always overwrite.
//  */
// // Object.prototype.assignDeep = function(...objects) {
// //     return executeDeepMerge(this, objects);
// // };
// function objectAssignDeep(target, ...objects) {
// 	return executeDeepMerge(target, objects);
// }
// window.objectAssignDeep = objectAssignDeep;

// Object.prototype.assignDeep = function(...objects) {
// 	return executeDeepMerge(this, objects);
// };
