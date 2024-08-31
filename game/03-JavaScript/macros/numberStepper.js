/* Arguments
 *
 * 0: title (string) - The title to be displayed in the titlebox
 * 1: initialValue (number) - The initial value to display when the stepper is rendered. It will be clamped
 *                            between minValue and maxValue.
 * 2: setter (string | function) - Determines how the current value should be set:
 *    - If a string is provided (e.g., "purity"), it is treated as a reference to the state variable ($purity).
 *    - If a callback is provided (e.g., (value) => { V.variable = value }), this callback will be called
 *      whenever the value changes, with the new value passed as an argument.
 * 		Useful if we want to do additional logic, or set a variable which isn't state or temp.
 * 3: options (object, optional) - An object containing additional optional settings:
 *    - max (number, optional): The max allowed value. Defaults to 100.
 *    - min (number, optional): The min allowed value. Defaults to 0.
 *    - step (number, optional): Defaults to 1% of the range. The amount by which the value increases or decreases with the single arrow buttons.
 * 			The double arrow buttons increase or decrease the value by x10.
 *    - percentage (boolean, optional): Defaults to true. If false, the number will not be converted to a percentage.
 *    - colorArr (Array, optional): Defaults to null. Optional array of custom colours instead of the default range.
 *    - reverse (boolean, optional): Defaults to false. If true, reverses the colour range.
 *    - valueFormat (function, optional): Defaults to null. Override callback for formatting the displayed value.
 *		(e.g., (value, percentage) => { return "$" + value }).
 *	  - tooltip (object, optional) => Defaults to null. Must be a tooltip object.
 *		Example: tooltip: { message: () => V.physique, delay: 200 }
 *	  - values (Array, optional): An array of any values that can be used in the above functions.
 *    - reverseButtons (boolean, optional): Defaults to false. If true, reverses the function of the buttons.
 *	  - activeButtons (Array, optional): Defaults to ["single", "double", "minMax"]. Specify which buttons should be active.
 */
Macro.add("numberStepper", {
	handler() {
		DOL.Perflog.logWidgetStart("numberStepper");
		const [title, initialValue, setter, options] = this.args;

		if (typeof title !== "string" || !title.trim()) {
			$(this.output).append($("<div>", { class: "red", text: "Error: Title is missing or invalid." }));
			return;
		}
		if (isNaN(initialValue)) {
			$(this.output).append($("<div>", { class: "red", text: "Error: Initial value is not a valid number." }));
			return;
		}
		if (typeof setter !== "string" && typeof setter !== "function") {
			$(this.output).append($("<div>", { class: "red", text: "Error: Setter must be a valid string or function." }));
			return;
		}

		// Default values for options
		const {
			min = 0,
			max = 100,
			step = (max - min) / 100,
			percentage = true,
			reverse = false,
			colorArr = null,
			valueFormat = null,
			tooltip = null,
			values = null,
			reverseButtons = false,
			activeButtons = ["single", "double", "minMax"],
		} = options || {};

		// Validations
		if (isNaN(min) || isNaN(max)) {
			$(this.output).append($("<div>", { class: "red", text: "Error: Min or Max value is not a valid number." }));
			return;
		}
		if (min >= max) {
			$(this.output).append($("<div>", { class: "red", text: "Error: Min value must be less than max value." }));
			return;
		}
		if (isNaN(step) || step <= 0) {
			$(this.output).append($("<div>", { class: "red", text: "Error: Step must be a positive number." }));
			return;
		}
		if (typeof reverse !== "boolean") {
			$(this.output).append($("<div>", { class: "red", text: "Error: reverse must be a boolean." }));
			return;
		}
		if (colorArr !== null && (!Array.isArray(colorArr) || !colorArr.every(color => typeof color === "string"))) {
			$(this.output).append($("<div>", { class: "red", text: "Error: colorArr must be an array of strings." }));
			return;
		}
		if (valueFormat !== null && typeof valueFormat !== "function") {
			$(this.output).append($("<div>", { class: "red", text: "Error: valueFormat must be a function." }));
			return;
		}
		if (tooltip !== null && typeof tooltip !== "object") {
			$(this.output).append($("<div>", { class: "red", text: "Error: tooltip must be an object." }));
			return;
		}

		let currentValue = Math.min(Math.max(initialValue, min), max);

		const convertToPercentage = value => ((value - min) / (max - min)) * 100;

		// Actual color hex is cached to prevent multiple calls per passage
		const getColor = factor => {
			let colors;
			if (colorArr) {
				colors = colorArr;
			} else {
				if (!T.stepperColorArray) {
					const colorVars = ["--red", "--pink", "--purple", "--blue", "--blue-secondary", "--teal", "--green"];
					T.stepperColorArray = colorVars;
				}
				colors = T.stepperColorArray;
			}

			if (reverse) {
				colors = [...colors].reverse();
			}

			return ColourUtils.interpolateMultiple(colors, factor);
		};

		// Update the displayed value with percentage if enabled
		const updateDisplay = () => {
			let displayValue;
			if (valueFormat) {
				displayValue = valueFormat(currentValue, convertToPercentage(currentValue), values);
			} else if (percentage) {
				displayValue = `<b>${Math.round(convertToPercentage(currentValue))}%</b>`;
			} else {
				displayValue = `<b>${Math.round(currentValue)}</b>`;
			}

			const color = getColor(convertToPercentage(currentValue) / 100);
			numberText.html(displayValue);
			numberText.css("color", color);
		};

		// Handles setting the variable to the value after a button click
		const setValue = value => {
			currentValue = Math.min(Math.max(value, min), max);
			updateDisplay();
			if (typeof setter === "string") {
				V[setter] = currentValue;
			} else if (typeof setter === "function") {
				setter(currentValue, values);
			}
			updateButtonStates();
		};

		// Disabling / enabling of buttons
		const updateButtonStates = () => {
			let disableLeft, disableRight;

			if (percentage) {
				const percentageValue = Math.round(convertToPercentage(currentValue));
				disableLeft = percentageValue <= Math.round(convertToPercentage(min));
				disableRight = percentageValue >= Math.round(convertToPercentage(max));
			} else {
				disableLeft = currentValue <= min;
				disableRight = currentValue >= max;
			}

			if (reverseButtons) {
				[disableLeft, disableRight] = [disableRight, disableLeft];
			}

			const conditions = [
				{
					buttons: [singleLeft, doubleLeft, extremeLeft],
					disabled: disableLeft,
				},
				{
					buttons: [singleRight, doubleRight, extremeRight],
					disabled: disableRight,
				},
			];

			conditions.forEach(({ buttons, disabled }) => {
				buttons.forEach(button => {
					button.prop("disabled", disabled);
				});
			});
			titleText.fontResizer({ margin: 28 });
		};

		const createButton = (classes, iconClasses, clickHandler) => {
			const button = $("<button>", { class: classes });
			iconClasses.forEach(iconClass => button.append($("<span>", { class: iconClass })));
			if (clickHandler) {
				button.on("click", clickHandler);
			}
			return button;
		};

		// Cache static elements (buttons, etc.) if not cached already
		if (!T.stepperStaticElements) {
			T.stepperStaticElements = {};

			// Left buttons
			T.stepperStaticElements.goToMin = createButton("numberStepper doubleIcon", ["fa-icon fa-bar", "fa-icon fa-left"]);
			T.stepperStaticElements.tripleLeft = createButton("numberStepper doubleIcon", ["fa-icon fa-left", "fa-icon fa-left", "fa-icon fa-left"]);
			T.stepperStaticElements.doubleLeft = createButton("numberStepper doubleIcon hideable", ["fa-icon fa-left", "fa-icon fa-left"]);
			T.stepperStaticElements.singleLeft = createButton("numberStepper", ["fa-icon fa-left"]);

			// Right buttons
			T.stepperStaticElements.singleRight = createButton("numberStepper", ["fa-icon fa-right"]);
			T.stepperStaticElements.doubleRight = createButton("numberStepper doubleIcon hideable", ["fa-icon fa-right", "fa-icon fa-right"]);
			T.stepperStaticElements.tripleRight = createButton("numberStepper doubleIcon", ["fa-icon fa-right", "fa-icon fa-right", "fa-icon fa-right"]);
			T.stepperStaticElements.goToMax = createButton("numberStepper doubleIcon", ["fa-icon fa-right", "fa-icon fa-bar"]);
		}

		// Clone static elements
		const extremeLeft = activeButtons.includes("triple") ? T.stepperStaticElements.tripleLeft.clone() : T.stepperStaticElements.goToMin.clone();
		const doubleLeft = T.stepperStaticElements.doubleLeft.clone();
		const singleLeft = T.stepperStaticElements.singleLeft.clone();
		const singleRight = T.stepperStaticElements.singleRight.clone();
		const doubleRight = T.stepperStaticElements.doubleRight.clone();
		const extremeRight = activeButtons.includes("triple") ? T.stepperStaticElements.tripleRight.clone() : T.stepperStaticElements.goToMax.clone();

		// Draw the elements
		const container = $("<div>", { class: "numberStepperContainer" }).appendTo(this.output);

		// Correctly append the title
		const titleContainer = $("<div>", { class: "titleRow" }).appendTo(container);
		$(Wikifier.wikifyEval(title)).appendTo(titleContainer);

		// Steps are separated in case buttons are reversed
		const increment = reverseButtons ? step : -step;
		const increment10 = reverseButtons ? step * 10 : -step * 10;
		const increment100 = reverseButtons ? step * 100 : -step * 100;

		const activeCount = activeButtons.length;
		const groupClass = activeCount === 3 ? "three-buttons" : activeCount === 2 ? "two-buttons" : "one-button";
		const group = $("<div>", { class: `numberStepperGroup ${groupClass}` }).appendTo(container);

		// Left buttons
		if (activeButtons.includes("extreme") || activeButtons.includes("minMax") || activeButtons.includes("triple")) {
			extremeLeft.on("click", () => setValue(currentValue + increment100)).appendTo(group);
		}
		if (activeButtons.includes("double")) {
			doubleLeft.on("click", () => setValue(currentValue + increment10)).appendTo(group);
		}
		if (activeButtons.includes("single")) {
			singleLeft.on("click", () => setValue(currentValue + increment)).appendTo(group);
		}

		// Title
		const numberText = $("<span>", { class: "red" });
		const titleInline = $("<span>", { class: "titleInline" }).append(Wikifier.wikifyEval(title));
		const titleText = $("<div>", { class: "titlePercentage" }).append(titleInline).append(":").append(numberText).appendTo(group);

		// Tooltip
		if (tooltip) {
			titleText.tooltip(tooltip);
		}

		// Right buttons
		if (activeButtons.includes("single")) {
			singleRight.on("click", () => setValue(currentValue - increment)).appendTo(group);
		}
		if (activeButtons.includes("double")) {
			doubleRight.on("click", () => setValue(currentValue - increment10)).appendTo(group);
		}
		if (activeButtons.includes("extreme") || activeButtons.includes("minMax") || activeButtons.includes("triple")) {
			extremeRight.on("click", () => setValue(currentValue - increment100)).appendTo(group);
		}

		updateDisplay();
		updateButtonStates();
		DOL.Perflog.logWidgetEnd("numberStepper");
	},
});
