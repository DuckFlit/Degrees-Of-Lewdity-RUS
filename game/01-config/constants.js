const constants = {
	crime: {
		max: 50000,
		min: 0
	},
	penisSize: {
		max: 5,
		min: -2
	}
}

/* Hoist Constants to the top (For statevars.js) */
var Constants = ConstantsLoader.init(constants);
window.Constants = Constants;