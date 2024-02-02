// /* eslint-disable no-undef */

// //Change this to factory
// setup.WeatherLayers = {
// 	fog: {
// 		effects: [
// 			// {
// 			// 	effect: "fogEffect",
// 			// 	params: { colorTop: "red", alpha: 0.5 },
// 			// 	bindings: {
// 			// 		dayFactor: () => WeatherCanvas.dayFactor,
// 			// 	},
// 			// },
// 		],
// 	},
// 	sky: {
// 		effects: [
// 			{
// 				// Moon
// 				effect: "skyGradiant",
// 				params: {
// 					color: {
// 						// Daylight
// 						colorPos: {
// 							close: "#141452", // Sky color around the sun
// 							far: "#00001c", // Base sky color
// 						},
// 						// Twilight
// 						colorMed: {
// 							close: "#141452", // Sky color around the sun
// 							far: "#00001c", // Base sky color
// 						},
// 						// Darkness
// 						colorNeg: {
// 							close: "#14145200", // Sky color based on the moon state - will use this color during full moon
// 							far: "#00001c00", // Base sky color, when there is no moon
// 						},
// 					},
// 				},
// 				bindings: {
// 					orbital: () => WeatherCanvas.orbitals.moon,
// 				},
// 			},
// 			{
// 				effect: "skyGradiant",
// 				params: {
// 					color: {
// 						colorPos: {
// 							close: "#ccccff", // Sky color around the sun
// 							far: "#408aca", // Base sky color
// 						},
// 						colorMed: {
// 							close: "#d47d12", // Sky color around the sun
// 							far: "#6c6d94", // Base sky color
// 						},
// 						colorNeg: {
// 							close: "#14145200", // Sky color based on the moon state - will use this color during full moon
// 							far: "#00001c00", // Base sky color, when there is no moon
// 						},
// 					},
// 				},
// 				bindings: {
// 					orbital: () => WeatherCanvas.orbitals.sun,
// 				},
// 			},
// 		],
// 	},
// };
