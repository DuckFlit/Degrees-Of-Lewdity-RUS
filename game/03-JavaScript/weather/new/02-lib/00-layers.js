/* eslint-disable no-undef */
/*
	this properties:
		- canvas

*/
// WeatherC.Canvas.addLayer({
// 	name: "fog",
// 	zIndex: 1,
// 	draw() {
// 		if (!Weather.fog && Weather.precipitation !== "snow" && !Time.isBloodMoon()) return;
// 	},
// });
// WeatherC.Canvas.addLayer("layerName", 5);
// WeatherC.Canvas.removeLayer("layerName");
// WeatherC.layers.get("layerName").addEffect("effectName");
// WeatherC.Canvas.addEffect("effectName", "layerName");
// WeatherC.Canvas.replaceEffect("effectName", "layerName");
// WeatherC.Canvas.removeEffects("layerName");

// WeatherC.Canvas.Effects.create({
// 	effect: "fog",
// 	zIndex: 1,
// 	draw() {
// 		if (!Weather.fog && Weather.precipitation !== "snow" && !Time.isBloodMoon()) return;
// 	},
//});

// Combat.UI.createElement({
// 	name: "combat_textOutput",
// 	callOnInit: "update",
// 	render() {
// 		this.element.attr("id", "combat-output-text");
// 	},
// 	events: {
// 		update() {
// 			this.element.empty();
// 			this.element.append(Combat.UI.getOutput());
// 		},
// 		endTurn() {
// 			Combat.UI.resetOutput();
// 		},
// 	},
// });

// /* eslint-disable no-undef */
// Combat.UI = (() => {
// 	const elements = [];
// 	const eventRegistry = [];
// 	let outputArr = [];

// 	/**
// 	 * Used to create and register a new UI element
// 	 *
// 	 * @param {object} config
// 	 * @param {string} config.name Unique name for the custom element.
// 	 * @param {Function} config.render Function to render the content of the element.
// 	 * @param {object} config.events optional - Object defining event handlers for the element.
// 	 * @param {Array} config.tags optional - Tags to categorize the element, only use if it requires a payload
// 	 * @param {boolean} config.hidePayload optional - Flag to specify if the payload should be hidden.
// 	 * @param {boolean|string} config.callOnInit optional - Flag or event name to trigger immediately upon initialization.
// 	 */
// 	const createElement = config => {
// 		if (!Combat.Debugger.validateUIElement(config)) return;

// 		Macro.add(config.name, {
// 			tags: config.tags,
// 			handler() {
// 				const element = $("<div>");
// 				const parsedArgs = this.args[0] || {};

// 				let context = {
// 					self: config,
// 					...parsedArgs,
// 					element,
// 				};

// 				// Call the render function from the config
// 				// Transfer "this" from the render function to the update event, if it is returned
// 				context = config.render.call(context) || context;

// 				element.data("context", context); // Store the context for later

// 				if (this.payload && !config.hidePayload) {
// 					this.payload.forEach(item => {
// 						const childElement = $("<div>");
// 						childElement.html(Wikifier.wikifyEval(item.contents));
// 						element.append(childElement);
// 					});
// 				}

// 				// Append this main container to the SugarCube output
// 				$(this.output).append(element);

// 				// Attach events
// 				if (config.events) {
// 					for (const eventName in config.events) {
// 						element.on(eventName, function () {
// 							const context = $(this).data("context");
// 							config.events[eventName].call(context);
// 						});

// 						// Add this element and event to the registry
// 						eventRegistry.push({
// 							elementName: config.name,
// 							eventName,
// 							element,
// 						});
// 					}
// 				}

// 				// Call update immediately upon initialization if specified
// 				if (config.callOnInit) {
// 					const eventNameToTrigger = typeof config.callOnInit === "string" ? config.callOnInit : "update";
// 					element.trigger(eventNameToTrigger);
// 				}
// 			},
// 		});
// 		elements.push(config.name);
// 	};

// 	return {
// 		elements,
// 		outputArr,
// 		eventRegistry,
// 		observers,
// 		resetObservers,
// 		newLine,
// 		createElement,
// 		addOutput,
// 		getOutput,
// 		resetOutput,
// 		triggerEvents,
// 	};
// })();
