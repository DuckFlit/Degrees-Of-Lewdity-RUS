window.statsConsole = function () {
	console.log("PenisGrowthTimer", SugarCube.State.variables.penisgrowthtimer);
	console.log("BreastGrowthTimer", SugarCube.State.variables.breastgrowthtimer);

}

jQuery(document).ready(function () {
	jQuery('#sidetooltip').appendTo("body");
});

(function (window, define, exports) {

	/* mousetrap v1.6.2 craig.is/killing/mice */
	(function (p, t, h) {
		function u(a, b, d) { a.addEventListener ? a.addEventListener(b, d, !1) : a.attachEvent("on" + b, d) } function y(a) { if ("keypress" == a.type) { var b = String.fromCharCode(a.which); a.shiftKey || (b = b.toLowerCase()); return b } return m[a.which] ? m[a.which] : q[a.which] ? q[a.which] : String.fromCharCode(a.which).toLowerCase() } function E(a) { var b = []; a.shiftKey && b.push("shift"); a.altKey && b.push("alt"); a.ctrlKey && b.push("ctrl"); a.metaKey && b.push("meta"); return b } function v(a) {
			return "shift" == a || "ctrl" == a || "alt" == a ||
				"meta" == a
		} function z(a, b) { var d, e = []; var c = a; "+" === c ? c = ["+"] : (c = c.replace(/\+{2}/g, "+plus"), c = c.split("+")); for (d = 0; d < c.length; ++d) { var k = c[d]; A[k] && (k = A[k]); b && "keypress" != b && B[k] && (k = B[k], e.push("shift")); v(k) && e.push(k) } c = k; d = b; if (!d) { if (!n) { n = {}; for (var h in m) 95 < h && 112 > h || m.hasOwnProperty(h) && (n[m[h]] = h) } d = n[c] ? "keydown" : "keypress" } "keypress" == d && e.length && (d = "keydown"); return { key: k, modifiers: e, action: d } } function C(a, b) { return null === a || a === t ? !1 : a === b ? !0 : C(a.parentNode, b) } function e(a) {
			function b(a) {
				a =
					a || {}; var b = !1, l; for (l in n) a[l] ? b = !0 : n[l] = 0; b || (w = !1)
			} function d(a, b, r, g, F, e) { var l, D = [], h = r.type; if (!f._callbacks[a]) return []; "keyup" == h && v(a) && (b = [a]); for (l = 0; l < f._callbacks[a].length; ++l) { var d = f._callbacks[a][l]; if ((g || !d.seq || n[d.seq] == d.level) && h == d.action) { var c; (c = "keypress" == h && !r.metaKey && !r.ctrlKey) || (c = d.modifiers, c = b.sort().join(",") === c.sort().join(",")); c && (c = g && d.seq == g && d.level == e, (!g && d.combo == F || c) && f._callbacks[a].splice(l, 1), D.push(d)) } } return D } function h(a, b, d, g) {
				f.stopCallback(b,
					b.target || b.srcElement, d, g) || !1 !== a(b, d) || (b.preventDefault ? b.preventDefault() : b.returnValue = !1, b.stopPropagation ? b.stopPropagation() : b.cancelBubble = !0)
			} function c(a) { "number" !== typeof a.which && (a.which = a.keyCode); var b = y(a); b && ("keyup" == a.type && x === b ? x = !1 : f.handleKey(b, E(a), a)) } function k(a, d, r, g) {
				function l(d) { return function () { w = d; ++n[a]; clearTimeout(p); p = setTimeout(b, 1E3) } } function e(d) { h(r, d, a); "keyup" !== g && (x = y(d)); setTimeout(b, 10) } for (var c = n[a] = 0; c < d.length; ++c) {
					var f = c + 1 === d.length ? e : l(g ||
						z(d[c + 1]).action); m(d[c], f, g, a, c)
				}
			} function m(a, b, c, g, e) { f._directMap[a + ":" + c] = b; a = a.replace(/\s+/g, " "); var h = a.split(" "); 1 < h.length ? k(a, h, b, c) : (c = z(a, c), f._callbacks[c.key] = f._callbacks[c.key] || [], d(c.key, c.modifiers, { type: c.action }, g, a, e), f._callbacks[c.key][g ? "unshift" : "push"]({ callback: b, modifiers: c.modifiers, action: c.action, seq: g, level: e, combo: a })) } var f = this; a = a || t; if (!(f instanceof e)) return new e(a); f.target = a; f._callbacks = {}; f._directMap = {}; var n = {}, p, x = !1, q = !1, w = !1; f._handleKey = function (a,
				c, e) { var g = d(a, c, e), f; c = {}; var l = 0, k = !1; for (f = 0; f < g.length; ++f)g[f].seq && (l = Math.max(l, g[f].level)); for (f = 0; f < g.length; ++f)g[f].seq ? g[f].level == l && (k = !0, c[g[f].seq] = 1, h(g[f].callback, e, g[f].combo, g[f].seq)) : k || h(g[f].callback, e, g[f].combo); g = "keypress" == e.type && q; e.type != w || v(a) || g || b(c); q = k && "keydown" == e.type }; f._bindMultiple = function (a, b, c) { for (var d = 0; d < a.length; ++d)m(a[d], b, c) }; u(a, "keypress", c); u(a, "keydown", c); u(a, "keyup", c)
		} if (p) {
			var m = {
				8: "backspace", 9: "tab", 13: "enter", 16: "shift", 17: "ctrl",
				18: "alt", 20: "capslock", 27: "esc", 32: "space", 33: "pageup", 34: "pagedown", 35: "end", 36: "home", 37: "left", 38: "up", 39: "right", 40: "down", 45: "ins", 46: "del", 91: "meta", 93: "meta", 224: "meta"
			}, q = { 106: "*", 107: "+", 109: "-", 110: ".", 111: "/", 186: ";", 187: "=", 188: ",", 189: "-", 190: ".", 191: "/", 192: "`", 219: "[", 220: "\\", 221: "]", 222: "'" }, B = { "~": "`", "!": "1", "@": "2", "#": "3", $: "4", "%": "5", "^": "6", "&": "7", "*": "8", "(": "9", ")": "0", _: "-", "+": "=", ":": ";", '"': "'", "<": ",", ">": ".", "?": "/", "|": "\\" }, A = {
				option: "alt", command: "meta", "return": "enter",
				escape: "esc", plus: "+", mod: /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? "meta" : "ctrl"
			}, n; for (h = 1; 20 > h; ++h)m[111 + h] = "f" + h; for (h = 0; 9 >= h; ++h)m[h + 96] = h.toString(); e.prototype.bind = function (a, b, d) { a = a instanceof Array ? a : [a]; this._bindMultiple.call(this, a, b, d); return this }; e.prototype.unbind = function (a, b) { return this.bind.call(this, a, function () { }, b) }; e.prototype.trigger = function (a, b) { if (this._directMap[a + ":" + b]) this._directMap[a + ":" + b]({}, a); return this }; e.prototype.reset = function () {
				this._callbacks = {};
				this._directMap = {}; return this
			}; e.prototype.stopCallback = function (a, b) { return -1 < (" " + b.className + " ").indexOf(" mousetrap ") || C(b, this.target) ? !1 : "INPUT" == b.tagName || "SELECT" == b.tagName || "TEXTAREA" == b.tagName || b.isContentEditable }; e.prototype.handleKey = function () { return this._handleKey.apply(this, arguments) }; e.addKeycodes = function (a) { for (var b in a) a.hasOwnProperty(b) && (m[b] = a[b]); n = null }; e.init = function () {
				var a = e(t), b; for (b in a) "_" !== b.charAt(0) && (e[b] = function (b) {
					return function () {
						return a[b].apply(a,
							arguments)
					}
				}(b))
			}; e.init(); p.Mousetrap = e; "undefined" !== typeof module && module.exports && (module.exports = e); "function" === typeof define && define.amd && define(function () { return e })
		}
	})("undefined" !== typeof window ? window : null, "undefined" !== typeof window ? document : null);

}).call(window, window);

Mousetrap.prototype.stopCallback = function (e, element, combo) {
	return false;
}

Mousetrap.bind(["z", "n", "enter"], function () {
	$("#passages #next a.macro-link").trigger("click");
});

Mousetrap.bind(["f"], function () {
	if (document.activeElement.tagName === "INPUT" && document.activeElement.type !== "radio"
		&& document.activeElement.type !== "checkbox")
		return;

	fixStuckAnimations();
});

Macro.add('time', {
	handler: function () {
		var time = V.time;
		var hour, daystate; // Never checked and always overwritten - no need to init with old value
		// Sanity check
		if (time < 0) time = 0;
		if (time >= 24 * 60) time = 23 * 59 + 59;
		hour = Math.floor(time / 60);
		if (hour < 6) {
			daystate = "night";
		} else if (hour < 9) {
			daystate = "dawn";
		} else if (hour < 18) {
			daystate = "day";
		} else if (hour < 21) {
			daystate = "dusk";
		} else {
			daystate = "night";
		}
		V.hour = hour;
		V.daystate = daystate;
	}
});

window.ensureIsArray = function(x, check = false) {
	if (check) x = ensure(x, []);
	if (Array.isArray(x)) return x;
	return [x];
}

window.ensure = function(x, y) {
	/* lazy comparison to include null. */
	return (x == undefined) ? y : x;
}

/**
 * Copies to targets keys from source that are not present there.
 * Shallow.
 * @param {object} target Object to extend
 * @param {object} source Default properties
 * @return {object} target
 */
function assignDefaults(target, source) {
	for (let k in source) {
		if (!source.hasOwnProperty(k)) continue;
		if (!(k in target)) target[k] = source[k];
	}
	return target;
}

/*
 * Similar to <<script>>, but preprocesses the contents, so $variables are accessible.
 * The variable "output" is also exposed (unlike <<run>>, <<set>>)
 *
 * Example:
 * <<twinescript>>
 *     output.textContent = $text
 * <</twinescript>>
 */
Macro.add('twinescript', {
	skipArgs : true,
	tags     : null,

	handler() {
		const output = document.createDocumentFragment();

		try {
			Scripting.evalTwineScript(this.payload[0].contents, output);
		}
		catch (ex) {
			return this.error(`bad evaluation: ${typeof ex === 'object' ? ex.message : ex}`);
		}

		// Custom debug view setup.
		if (Config.debug) {
			this.createDebugView();
		}

		if (output.hasChildNodes()) {
			this.output.appendChild(output);
		}
	}
});

/**
 * JS version of SugarCube's <<for _index, _value range _array>>.
 * Can iterate over
 *
 * Copied from SugarCube sources.
 * @param range
 * @param {function(key,value):void} handler
 */
function rangeIterate(range, handler) {
	let list;
	switch (typeof range) {
		case 'string':
			list = [];
			for (let i = 0; i < range.length; /* empty */) {
				const obj = Util.charAndPosAt(range, i);
				list.push([i, obj.char]);
				i = 1 + obj.end;
			}
			break;
		case 'object':
			if (Array.isArray(range)) {
				list = range.map((val, i) => [i, val]);
			}
			else if (range instanceof Set) {
				list = Array.from(range).map((val, i) => [i, val]);
			}
			else if (range instanceof Map) {
				list = Array.from(range);
			}
			else if (Util.toStringTag(range) === 'Object') {
				list = Object.keys(range).map(key => [key, range[key]]);
			}
			else {
				throw new Error(`unsupported range expression type: ${Util.toStringTag(range)}`);
			}
			break;
		default:
			throw new Error(`unsupported range expression type: ${typeof range}`);
	}
	for (let i = 0; i < list.length; i++) {
		let entry = list[i];
		handler(entry[0], entry[1]);
	}
}
window.rangeIterate = rangeIterate;

/**
 * Define macro, passing arguments to function and store them in $args, preserving & restoring previous $args
 */
function DefineMacro(macroName, macroFunction, tags, skipArgs) {
	Macro.add(macroName, {
		isWidget: true,
		tags: tags,
		skipArgs: skipArgs,
		handler: function () {
			DOL.Perflog.logWidgetStart(macroName);
			try {
				var oldArgs = State.temporary.args;
				State.temporary.args = this.args.slice();
				macroFunction.apply(this, this.args);
				if (typeof oldArgs === 'undefined') {
					delete State.temporary.args;
				} else {
					State.temporary.args = oldArgs;
				}
			} finally {
				DOL.Perflog.logWidgetEnd(macroName);
			}
		}
	});
}

/**
 * Define macro, where macroFunction returns text to wikify & print
 */
function DefineMacroS(macroName, macroFunction, tags, skipArgs, maintainContext) {
	DefineMacro(macroName, function () {
		$(this.output).wiki(macroFunction.apply(maintainContext ? this : null, this.args))
	}, tags, skipArgs);
}

/**
 * @param worn clothing article, State.variables.worn.XXXX
 * @param slot clothing article slot used
 * @return {string} condition key word ("tattered"|"torn|"frayed"|"full")
 */
window.integrityKeyword = function(worn, slot) {
	const i = worn.integrity/clothingData(slot,worn,'integrity_max');
	if (i <= 0.2) {
		return "tattered"
	} else if (i <= 0.5) {
		return "torn"
	} else if (i <= 0.9) {
		return "frayed"
	} else {
		return "full"
	}
}

/**
 * @param worn clothing article, State.variables.worn.XXXX
 * @param slot clothing article, State.variables.worn.XXXX
 * @return {string} printable integrity prefix
 */
window.integrityWord = function(worn, slot) {
	const kw = integrityKeyword(worn, slot);
	switch (kw) {
		case "tattered":
		case "torn":
		case "frayed":
			T.text_output = kw+" ";
			break;
		case "full":
		default:
			T.text_output = "";
	}
	return T.text_output;
}
DefineMacroS("integrityWord", integrityWord);

function underlowerintegrity() {
	return integrityWord(V.worn.under_lower,'under_lower');
}
DefineMacroS("underlowerintegrity", underlowerintegrity);

function underupperintegrity() {
	return integrityWord(V.worn.under_upper,'under_upper');
}
DefineMacroS("underupperintegrity", underupperintegrity);

function overlowerintegrity() {
	return integrityWord(V.worn.over_lower,'over_lower');
}
DefineMacroS("overlowerintegrity", overlowerintegrity);

function lowerintegrity() {
	return integrityWord(V.worn.lower,'lower');
}
DefineMacroS("lowerintegrity", lowerintegrity);

function overupperintegrity() {
	return integrityWord(V.worn.over_upper,'over_upper');
}
DefineMacroS("overupperintegrity", overupperintegrity);

function upperintegrity() {
	return integrityWord(V.worn.upper,'upper');
}
DefineMacroS("upperintegrity", upperintegrity);

function genitalsintegrity() {
	return integrityWord(V.worn.genitals,'genitals');
}
DefineMacroS("genitalsintegrity", genitalsintegrity);

function faceintegrity() {
	return integrityWord(V.worn.face,'face');
}
DefineMacroS("faceintegrity", faceintegrity);

/**
 * @param worn clothing article, State.variables.worn.XXXX
 * @return {string} printable clothing colour
 */
window.clothesColour = function(worn){
	if (!worn.colour) return T.text_output = "";
	if (worn.colour.startsWith("wet")){ //this might not be used anymore
		return T.text_output = worn.colour.slice(3);
	}
	if (worn.colour_sidebar){
		if (worn.colour == "custom") return T.text_output = getCustomColourName(worn.colourCustom);
		return T.text_output = worn.colour;
	}
	return T.text_output = "";
}

/**
 * @return {void}
 */
window.outfitChecks = function(){
	T.underOutfit = ((V.worn.under_lower.outfitSecondary) && V.worn.under_lower.outfitSecondary[1] === V.worn.under_upper.name);
	T.middleOutfit = ((V.worn.lower.outfitSecondary) && V.worn.lower.outfitSecondary[1] === V.worn.upper.name);
	T.overOutfit = ((V.worn.over_lower.outfitSecondary) && V.worn.over_lower.outfitSecondary[1] === V.worn.over_upper.name);

	T.underNaked = (V.worn.under_lower.name === "naked" && V.worn.under_upper.name === "naked");
	T.middleNaked = (V.worn.lower.name === "naked" && V.worn.upper.name === "naked");
	T.overNaked = (V.worn.over_lower.name === "naked" && V.worn.over_upper.name === "naked");
	T.topless = (V.worn.over_upper.name === "naked" && V.worn.upper.name === "naked" && V.worn.under_upper.name === "naked");
	T.bottomless = (V.worn.over_lower.name === "naked" && V.worn.lower.name === "naked" && V.worn.under_lower.name === "naked");
	T.fullyNaked = (T.topless && T.bottomless);
	return;
}

/**
 * @return {boolean} whether or not any main-body clothing is out of place or wet
 */
 window.checkForExposedClothing = function(){
	return setup.clothingLayer.torso.some( clothingLayer => {
		let wetstage = V[clothingLayer.replace("_","") + "wetstage"];
		return (V.worn[clothingLayer].state !== setup.clothes[clothingLayer][clothesIndex(clothingLayer, V.worn[clothingLayer])].state_base || wetstage >= 3);
	})
}

function processedSvg(width, height) {
	let svgElem = jQuery(document.createElementNS("http://www.w3.org/2000/svg", "svg"))
		.attr('xmlns',"http://www.w3.org/2000/svg")
		.attr('viewBox', '0 0 ' + width + ' ' + height)
		.css({ width: width, height: height })
		.wiki(this.payload[0].contents.replace(/^\n/, ""));

		let supportedChildElements = ['img', 'image', 'a', 'rect'];
		let commonAttributes = ['class', 'x', 'y', 'width', 'height', 'style', 'onclick'];

		//Some browsers really don't like working with svg elements unless you specify their namespace upon creation, raw insertion won't render.
		let fixSVGNameSpace = function(type, elem, newParent = null) {
			if(type == 'img')
				type = 'image';

			let oldElem = $(elem);
			let newElem = document.createElementNS('http://www.w3.org/2000/svg', type);

			//Set common attributes of new svg namespaced element
			for(let attr of commonAttributes) {
				if(oldElem.attr(attr))
					newElem.setAttribute(attr, oldElem.attr(attr));
			}

			//Set unique attributes of specific types of elements
			switch (type) {
				case 'image':
					newElem.setAttributeNS('http://www.w3.org/1999/xlink', 'href', oldElem.attr('href') || oldElem.attr('xlink:href') || '');
					break;
				case 'rect':
					//No unique properties
					break;
				case 'a':
					newElem.setAttributeNS('http://www.w3.org/1999/xlink', 'title', oldElem.attr('alt') || oldElem.attr('xlink:alt') || '');
					newElem.setAttributeNS('http://www.w3.org/1999/xlink', 'alt', oldElem.attr('title') || oldElem.attr('xlink:title') || '');
					break;
				default:
					break;
			}

			if(newParent)
				newParent.appendChild(newElem);
			else
				oldElem.replaceWith(newElem);

			//Recursively process nested children if they exist
			for(let htmlElem of supportedChildElements) {
				$(oldElem).children(htmlElem).each(function(i, elem) {
					fixSVGNameSpace(htmlElem, elem, newElem);
				});
			}
		}

		//Because the payload got processed as HTML, fix the namespacing and rendering issues to make it a proper SVG again
		jQuery(document).one(':passagerender', function (ev) {
			for(let htmlElem of supportedChildElements) {
				$(ev.content).find('svg ' + htmlElem).each(function(i, elem) {
					fixSVGNameSpace(htmlElem, elem);
				});
			}
		});

	//This macro works a little different because we can't rely on the normal wikify method to properly translate SVG elements. We need to manually edit the output variable.
	svgElem.appendTo(this.output);

	return '';
}

DefineMacroS("svg", processedSvg, null, false, true);

/*! <<numberpool>> macro set for SugarCube v2 */

function numberify(selector) {
	$(() => Links.generateLinkNumbers($(selector)))
	return "";
}
DefineMacroS("numberify", numberify);

// blink entire page to fix a bug in Chrome where animation on images doesn't start
window.fixStuckAnimations = function() {
	let scrollX = window.scrollX;
	let scrollY = window.scrollY;
	let imgs = $('#story').add($('#ui-bar'));
	imgs.toggleClass('hidden');
	window.setTimeout(() => {
		imgs.toggleClass('hidden');
		window.scroll(scrollX, scrollY);
	}, 5);
}

// attaches event listeners to combat images
window.initTouchToFixAnimations = function() {
	$(document).on('click', "#divsex img", fixStuckAnimations);
}

$(document).on(':passagedisplay', function (ev) {
	if (V.combat) {
		initTouchToFixAnimations();
	}
	function checkFadingSpans() {
		let spans = $(".fading");
	  if (spans.length > 0) {
		  let span = spans[Math.floor(Math.random()*spans.length)];
		setTimeout(()=>{
			$(span).removeClass("fading").addClass("faded");
		  checkFadingSpans();
		}, Math.random()*1000 + 500);
	  }
	}

	setTimeout(checkFadingSpans, 1000);
});

window.saveDataCompare = function(save1, save2){
	var result = {};
	var keys = Object.keys(save1)
	keys.forEach(key =>{
		let save1Json = JSON.stringify(save1[key])
		let save2Json = JSON.stringify(save2[key])
		if(save1Json !== save2Json){
			result[key] = [save1[key],save2[key]];
		}
	})
	return result;
}

/*For the optional numpad to the right of the screen*/
window.mobclick = function mobclick(index){
	$(Links.currentLinks[index-1]).click();
}
window.mobBtnHide = function mobBtnHide(){
	$('.mob-btn').hide()
	$('.mob-btn-h').show()
}
window.mobBtnShow = function mobBtnShow(){
	$('.mob-btn').show()
	$('.mob-btn-h').hide()
}

/**
 * This function takes a value, and weights it by exponential curve.
 * 
 * Value should be between 0.0 and 1.0 (use normalise to get a percentage of a max).
 *
 * An exponent of 1.0 returns 1 every time.
 *
 * Exponents between 1.0 and 2.0 return a curve favoring higher results (closer to 1)
 *
 * An exponent of 2.0 will return a flat line distribution, and is identical to random()
 *
 * Exponents greater than 2.0 return a curve favoring lower results (closer to 0), reaching to 0 at infinity.
 *
 * For example, see:
 * https://www.desmos.com/calculator/87hhrjfixi
 * 
 * @param {number} value Value to be weighted
 * @param {number} exp Exponent used to generate the curve
 * @returns {number} value weighted against exponential curve
 */
function expCurve(value, exp) {	return (value ** exp) / value; };
window.expCurve = expCurve;

/**
 * This function creates a random float 0.0-1.0, weighted by exponential curve.
 *
 * A value of 1.0 returns 1 every time.
 *
 * Values between 1.0 and 2.0 return a curve favoring higher results (closer to 1)
 *
 * A value of 2.0 will return a flat line distribution, and is identical to random()
 *
 * Values greater than 2.0 return a curve favoring lower results (closer to 0), reaching to 0 at infinity.
 *
 * For example, see:
 * https://www.desmos.com/calculator/87hhrjfixi
 * 
 * @param {number} exp Exponent used to generate the curve
 * @returns {number} random number weighted against exponential curve
 */
function randomExp(exp) { return expCurve(State.random(), exp); };
window.randomExp = randomExp;

/**
 * Normalises value to a decimal number 0.0-1.0, a percentage of the range specified in min and max.
 * @param {number} value The value to be normalised
 * @param {number} max - The highest value of the range
 * @param {number} min The lowest value of the range, default 0
 * @returns {number} Normalised value
 */
function normalise(value, max, min = 0) {
    const denominator = max - min;
    if (denominator === 0) {
        Errors.report('[normalise]: min and max params must be different.', { value, max, min });
        return 0;
    }
    if (denominator < 0) {
        Errors.report('[normalise]: max param must be greater than min param.', { value, max, min });
        return 0;
    }
    return Math.clamp( (value - min) / denominator, 0, 1);
}
window.normalise = normalise;

/**
* This macro sets $rng. If the variable $rngOverride is set, $rng will always be set to that.
* Set $rngOverride in the console for bugtesting purposes. Remember to unset it after testing is finished.
* With two arguments, it sets $rng to a random value between the first arg and the second arg. This can be used to guarantee $rng is set to a specific value.
* With one argument, it sets $rng to a random value between 1 and the arg.
* With no arguments, it sets $rng to a random value between 1 and 100.
*/
Macro.add('rng', {
	handler() {
		if (typeof V.rngOverride === "number" && V.debug === 1) {
			console.log(`rng override: ${V.rngOverride}`)
			V.rng = V.rngOverride;
		} else {
			let min = 1;
			let max = 100;

			if (this.args.length === 2) {
				[min, max] = this.args;
			} else if (this.args.length === 1) {
				max = this.args[0];
			}
			if (typeof min === "number" && typeof max === "number") {
				V.rng = random(min,max);
			} else {
				throw new Error(`invalid arguments: ${min} | ${max}`);
			}
		}
	}
});

/**
 * Returns the object, or a blank object if null. Replaces ?. operator.
 * @param {object} obj
 * @returns {object} - Either the passed arg or {}
 */
const nullable = (obj) => obj || {};
window.nullable = nullable;

/**
 * This inputs an icon img tag, using the given filename.
 * Files are all in img/misc/icon/
 * Example: <<icon "bed.png">>
 * <<icon "bed.png" "nowhitespace">> does not add a trailing whitespace for formatting.
 */
Macro.add("icon", {
	handler() {
		if (!V.images) return;
		const name = typeof(this.args[0]) === "string" ? this.args[0] : "error";
		const iconImg = document.createElement("img");
		iconImg.className = "icon";
		iconImg.src = "img/misc/icon/" + name;
		this.output.append(iconImg);
		//append a whitespace for compatibility with old icon behavior
		if (!this.args.includes("nowhitespace")) this.output.append(" ");
	}
});

window.pickRandom = function (list) {
	if (!list)
		return undefined;

	return list[Math.floor(Math.random() * list.length)];
}
