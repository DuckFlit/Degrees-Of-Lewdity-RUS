function buildEyeDetails() {
	let sentence = "";
	let concatFlag = false;
	const lenses = V.makeup.eyelenses;
	const colourMap = setup.colours.eyes_map;

	if (lenses.right !== 0 || lenses.left !== 0) {
		sentence += "You wear ";
		if (typeof lenses.left === 'string') {
			sentence += setup.colours.eyes_map[lenses.left].name;
			concatFlag = true;
		}
		if (typeof lenses.right === 'string') {
			if (concatFlag) sentence += ' and ';
			sentence += setup.colours.eyes_map[lenses.right].name;
			concatFlag = true;
		}
		if (concatFlag) {
			sentence += ' eye lenses ';
		}
		sentence += "on top of your ";
	} else {
		sentence += "You have ";
	}
	concatFlag = false;

	const leftEyeColour = colourMap[V.leftEyeColour];
	const rightEyeColour = colourMap[V.rightEyeColour];
	if (typeof leftEyeColour === 'object') {
		sentence += leftEyeColour.name;
		concatFlag = true;
	}
	if (typeof rightEyeColour === 'object' && V.leftEyeColour !== V.rightEyeColour) {
		if (concatFlag) sentence += ' and ';
		sentence += rightEyeColour.name;
		concatFlag = true;
	}
	if (concatFlag) sentence += ' eyes';
	return sentence += '.';
}
window.buildEyeDetails = buildEyeDetails;

/**
 * Attempts to extrapolate $eyecolour and $makeup.lenses into distinct units.
 * $makeup.lenses gets turned into an object { left : 0, right : 0 }, where the values are 0 or a string.
 * $eyecolour gets assigned to both $leftEyeColour and $rightEyeColour
 * @returns Nothing
 */
function restructureEyeColourVariable() {
	if (V.objectVersion.eyeRepair === undefined) {
		V.objectVersion.eyeRepair = 0;
	}
	switch (V.objectVersion.eyeRepair) {
		case 0:
			/* Both $leftEyeColour and $rightEyeColour should be the original colours for a character's eyes.
				This functon below sets it to $eyecolour, if that fails, $eyeselect, then defaults to purple, the default.
				For it to fail, it must be undefined, it is unlikely that $eyeselect is undefined, but it's likely possible. */
			const getColour = () => (typeof V.eyecolour === 'string' ? V.eyecolour : V.eyeselect) || 'purple';
			if (!V.leftEyeColour) {
				V.leftEyeColour = getColour();
			}
			if (!V.rightEyeColour) {
				V.rightEyeColour = getColour();
			}
			delete V.eyecolour;
			if (V.makeup == undefined) return;
			const lenses = V.makeup.eyelenses;
			/* If the lens variable is a string or number, we need to generate an object, with the value appended to both .right and .left 
				As the heterochromia introduced forces us to define both eye colours. */
			if (typeof lenses === 'string' || typeof lenses === 'number') {
				V.makeup.eyelenses = {
					'left' : lenses,
					'right' : lenses
				};
			/* Captures at least partially correct forms, that may have been generated over time, as well as the correct objects. */
			} else if (lenses !== null && typeof lenses === 'object') {
				/* If the properties of the lenses aren't the right typing at all, default them to 0. */
				if (typeof lenses.left !== 'string' && lenses.left !== 0) {
					lenses.left = 0;
				}
				if (typeof lenses.right !== 'string' && lenses.right !== 0) {
					lenses.right = 0;
				}
			} else {
				/* Finally, if the lens object is beyond repair, we create it anew. */
				V.makeup.eyelenses = {
					'left' : 0,
					'right' : 0
				};
			}
			V.objectVersion.eyeRepair = 1;
			break;
	}
}
window.restructureEyeColourVariable = restructureEyeColourVariable;

window.patchCorruptLensesColors = function() {
	if (V.custom_eyecolours != undefined){
		for (let index in V.custom_eyecolours)
			V.custom_eyecolours[index].canvasfilter.blend = window.colorNameTranslate(V.custom_eyecolours[index].variable, "hex")
	}
}

window.initCustomLenses = function (){ // push custom eye_colours into setup.colours.eyes and sync eye colour map
	let found, i, i2;
	for (i in V.custom_eyecolours){
	found = 0;
		for (i2 in setup.colours.eyes){
			if (setup.colours.eyes[i2].variable == V.custom_eyecolours[i].variable)
				found = 1;
		}
		if (found != 1)
			setup.colours.eyes.push(V.custom_eyecolours[i])
	}
	window.buildColourMap("eyes", "custom_eyecolours")
}

function hexToRgbArray(hex) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? [
	  parseInt(result[1], 16),
	  parseInt(result[2], 16),
	  parseInt(result[3], 16)
	] : null;
}

function ColorToHex(color) {
	var hexadecimal = color.toString(16);
	return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
}

window.eyeColorGradiant = function (rgb_beginning, rgb_end, p){ // rgb can be RGB value in an array, or hex value in string
	let w = p * 2 - 1;
	let w1 = (w + 1) / 2.0;
	let w2 = 1 - w1;
	let rgb, rgb_hex;

	if (typeof rgb_beginning == "string" && rgb_beginning[0] == "#")
		rgb_beginning = hexToRgbArray(rgb_beginning)
	if (typeof rgb_end == "string" && rgb_end[0] == "#")
		rgb_end = hexToRgbArray(rgb_end)
	rgb = [ parseInt(rgb_beginning[0] * w2 + rgb_end[0] * w1),
			parseInt(rgb_beginning[1] * w2 + rgb_end[1] * w1),
		   	parseInt(rgb_beginning[2] * w2 + rgb_end[2] * w1)];
	rgb_hex = "#" + ColorToHex(rgb[0]) + ColorToHex(rgb[1]) + ColorToHex(rgb[2])
	return rgb_hex;
}

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
	return array;
}

var green = "#36f029"
var yellow = "#fbff26"
var blue = "#26ccff"
var orange = "#f59b25"

window.determineCatEyeStages = function () { // to change the amount of changes, you only need to change the stages variable. same for target_colours
	let target_colours = shuffleArray([green, yellow, blue, orange]) // can add or edit colours
	let stages = 4; // amount of stages we'll have before reaching final colour
	let total_percentage = 0.5 +  (Math.random() / 4) // Represent how much of the targeted_colour, the current eye_colours will need to adapt into. 0-1 value, where 1 == 100%;
	var index = 0;
	let base_colour = [setup.colours.eyes_map[V.leftEyeColour].canvasfilter.blend, setup.colours.eyes_map[V.rightEyeColour].canvasfilter.blend] // base eye colours [left, right]

	for(let i = target_colours.length-1; i>=2; i--) // only keep two colours, randomly chosen
		target_colours.splice(Math.floor(Math.random()*target_colours.length), 1);
	if (V.rightEyeColour == "light blue" && target_colours[1] == blue) // right eye is the one we see the most. if this eye is light blue, and the target_colour is also blue, player might not see a difference and that would be a shame.
		target_colours = [target_colours[1], target_colours[0]]		   // So we swap left/right eye colours.
	index = 0
	while (index++ < stages){
		let eyes_result = [window.eyeColorGradiant(base_colour[0], target_colours[0], (total_percentage / stages) * index), // left eye
						   window.eyeColorGradiant(base_colour[1], target_colours[1], (total_percentage / stages) * index)] // right eye
		for (let i in eyes_result){
			let colour_name = window.colorNamer(eyes_result[i])
			let colour_object = {
				variable: "cat_tf_stage_"+(index-1)+(i == 0 ? "_left" : "_right"),
				name: window.colorNameTranslate(colour_name, "spaced name"),
				name_cap: window.colorNameTranslate(colour_name, "spaced name").toUpperFirst(),
				csstext: colour_name,
				natural: true,
				lens: false,
				canvasfilter: {
					blend: eyes_result[i],
					brightness: 0.27
				}
			}
			for (let x in V.custom_eyecolours){ // create new object for our new colour eye
				if (V.custom_eyecolours[x].variable == "cat_tf_stage_"+(index-1)+(i == 0 ? "_left" : "_right"))
					V.custom_eyecolours[x] = colour_object
				else if (x == V.custom_eyecolours.length - 1)
					V.custom_eyecolours.push(colour_object)
			}
			if (V.custom_eyecolours.length == 0)
				V.custom_eyecolours.push(colour_object)
		}
	}
	window.initCustomLenses() // sync new eye colours
}

window.defineCustomEyeColourStyle = function() {
	var normal_eyes = {left:V.leftEyeColour, right:V.rightEyeColour};
	for (var side of ["left", "right"]){
		if (V.makeup.eyelenses[side] != 0){ // custom eyes colours
			let colour_array = (V.makeup.eyelenses[side].includes("colorWheelTemporary") ? setup.colours.eyes : V.custom_eyecolours)
			for (let colour of colour_array){
				if (colour.variable == V.makeup.eyelenses[side]){
					if (side == "left")
						T.custom_eyelenses_left_style = "filter: " + (V.makeup.eyelenses[side].includes("colorWheelTemporary") ? window.colorNameTranslate(colour.csstext, "hue") : window.colorNameTranslate(V.makeup.eyelenses[side], "hue"))
					else
						T.custom_eyelenses_right_style = "filter: " + (V.makeup.eyelenses[side].includes("colorWheelTemporary") ? window.colorNameTranslate(colour.csstext, "hue") : window.colorNameTranslate(V.makeup.eyelenses[side], "hue"))
				}
			}
		}
		else if (normal_eyes[side] != 0 && (normal_eyes[side].includes("colorWheelTemporary") == true || normal_eyes[side].includes("cat_tf_stage") == true)){ // normal eyes colours
			let colour_array = (normal_eyes[side].includes("cat_tf_stage") == true ? V.custom_eyecolours : setup.colours.eyes)
			for (let colour of colour_array){
				if (colour.variable == normal_eyes[side]){
					if (side == "left")
						T.custom_eyelenses_left_style = "filter: " + window.colorNameTranslate(colour.csstext, "hue")
					else
						T.custom_eyelenses_right_style = "filter: " + window.colorNameTranslate(colour.csstext, "hue")
				}
			}
		}
	}
}