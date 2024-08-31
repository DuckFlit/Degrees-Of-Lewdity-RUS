/* eslint-disable no-sequences */
/* eslint-disable no-void */
/* eslint-disable no-var */
/* eslint-disable no-undef */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-expressions */
Macro.add("numberslider", {
	handler() {
		function stepValidate(value) {
			if (fracDigits > 0) {
				const ma = Number(minValue + "e" + fracDigits);
				const sa = Number(stepValue + "e" + fracDigits);
				const _va = Number(value + "e" + fracDigits) - ma;
				return Number(_va - (_va % sa) + ma + "e-" + fracDigits);
			}
			const va = value - minValue;
			return va - (va % stepValue) + minValue;
		}

		function validateAndApply(el) {
			const curValue = Wikifier.getValue(varName);
			let newValue = Number(el.value);
			let newPoolValue = null;
			if (Number.isNaN(newValue) || !Number.isFinite(newValue)) return (el.value = curValue), !1;
			if (((newValue = stepValidate(newValue)), newValue < minValue ? (newValue = minValue) : newValue > maxValue && (newValue = maxValue)))
				if (fracDigits > 0) {
					const pa = Number(pool.get() + "e" + fracDigits);
					const ca = Number(curValue + "e" + fracDigits);
					let na = Number(newValue + "e" + fracDigits);
					let delta = na - ca;
					pa < delta && ((na -= delta - pa), (delta = na - ca), (newValue = Number(na + "e-" + fracDigits))),
						(newPoolValue = Number(pa - delta + "e-" + fracDigits));
				} else {
					const poolValue = pool.get();
					let _delta = newValue - curValue;
					poolValue < _delta && ((newValue -= _delta - poolValue), (_delta = newValue - curValue)), (newPoolValue = poolValue - _delta);
				}
			return Wikifier.setValue(varName, newValue), (el.value = newValue), newPoolValue !== null && pool.set(newPoolValue), !0;
		}
		var _this2 = this;
		if (this.args.length < 5) {
			const errors = [];
			return (
				this.args.length < 1 && errors.push("variable name"),
				this.args.length < 2 && errors.push("default value"),
				this.args.length < 3 && errors.push("min value"),
				this.args.length < 4 && errors.push("max value"),
				this.args.length < 5 && errors.push("step value"),
				this.error("no " + errors.join(" or ") + " specified")
			);
		}
		if (typeof this.args[0] != "string") return this.error("variable name argument is not a string");
		var varName = this.args[0].trim();
		if (varName[0] !== "$" && varName[0] !== "_") return this.error('variable name "' + this.args[0] + '" is missing its sigil ($ or _)');
		var varId = Util.slugify(varName);
		var defValue = Number(this.args[1]);
		var minValue = Number(this.args[2]);
		var maxValue = Number(this.args[3]);
		var stepValue = Number(this.args[4]);
		var callbacks = this.args.length > 5 && typeof this.args[5] === "object" ? this.args[5] : {};
		var autofocus = this.args.length > 6 && this.args[6] === "autofocus";

		if (Number.isNaN(defValue) || !Number.isFinite(defValue)) return this.error("default value (" + this.args[1] + ") is not a number");
		if (Number.isNaN(minValue) || !Number.isFinite(minValue)) return this.error("min value (" + this.args[2] + ") is not a number");
		if (Number.isNaN(maxValue) || !Number.isFinite(maxValue)) return this.error("max value (" + this.args[3] + ") is not a number");
		if (Number.isNaN(stepValue) || !Number.isFinite(stepValue) || stepValue <= 0)
			return this.error("step value (" + this.args[4] + ") is not a number greater than zero");
		if (defValue < minValue) return this.error("default value (" + this.args[1] + ") is less than min value (" + this.args[2] + ")");
		if (defValue > maxValue) return this.error("default value (" + this.args[1] + ") is greater than max value (" + this.args[3] + ")");
		var fracDigits = (function () {
			const str = String(stepValue);
			const pos = str.lastIndexOf(".");
			return pos === -1 ? 0 : str.length - pos - 1;
		})();
		if (stepValidate(maxValue) !== maxValue)
			return this.error(
				"max value (" + this.args[3] + ") is not a multiple of the step value (" + this.args[4] + ") plus the min value (" + this.args[2] + ")"
			);
		var pool = (function () {
			var parent = _this2.contextSelect(function (ctx) {
				return ctx.name === "numberpool";
			});
			return parent !== null && Object.hasOwn(parent, "pool") ? parent.pool : null;
		})();
		Config.debug && this.debugView.modes({ block: !0 });
		const $elControl = jQuery(document.createElement("div"));
		const $elInput = jQuery(document.createElement("input"));
		let $elValue = void 0;
		let showValue = void 0;
		$elControl
			.attr("id", this.name + "-body-" + varId)
			.addClass("macro-" + this.name)
			.appendTo(this.output),
			$elInput
				.attr({
					id: this.name + "-input-" + varId,
					name: this.name + "-input-" + varId,
					type: "range",
					min: minValue,
					max: maxValue,
					step: stepValue,
					tabindex: 0,
					disabled: typeof this.args[6] != "undefined" ? this.args[6] : false,
				})
				.on("change input." + Util.slugify(this.name), function () {
					validateAndApply(this);
					typeof showValue == "function" && showValue();
					if (callbacks.onInputChange) {
						callbacks.onInputChange(Number($elInput.val()));
					}
				})
				.on("mouseup touchend keyup", function () {
					if (callbacks.onMouseUp) {
						callbacks.onMouseUp(Number($elInput.val()));
					}
				})
				.on("keypress", function (ev) {
					ev.which === 13 && (ev.preventDefault(), $elInput.trigger("change"));
				})
				.appendTo($elControl),
			!Browser.isIE || Browser.ieVersion > 9
				? (($elValue = jQuery(document.createElement("span"))
						.attr("id", this.name + "-value-" + varId)
						.appendTo($elControl)),
				  (showValue = function () {
						$elValue.text(Number($elInput.val()).toFixed(fracDigits));
				  }))
				: $elInput.off("input." + Util.slugify(this.name)),
			$elInput.val(defValue),
			validateAndApply($elInput[0]),
			typeof showValue == "function" && showValue(),
			autofocus &&
				($elInput.attr("autofocus", "autofocus"),
				(postdisplay["#autofocus:" + $elInput.attr("id")] = function (task) {
					delete postdisplay[task],
						setTimeout(function () {
							return $elInput.focus();
						}, Engine.minDomActionDelay);
				}));
	},
});
