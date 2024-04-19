/* eslint-disable no-new */

/*
	The main purpose for this jQuery plugin was to enable tooltips for dynamically created elements, by using jQuery
	However, I also added a [tooltip] attribute to be used with an html element, which is more flexible than the old tooltip.

	Example usage: (jquery)
	jqueryElement.tooltip({
		message: "Here is a tooltip",
		delay: 200,
		position: "cursor",
	});

	Enable or disable it:
	jqueryElement.tooltip("enable");
	jqueryElement.tooltip("disable");

	Change message to an already existing tooltip:
	jqueryElement.tooltip({ message: "New message" });


	Example usage: (html)
	<div tooltip="Here is a tooltip" id="someid" class="someclass">
		Content here
	</div>

	Example usage (with added span for separate styles for the tooltip - and sugarcube variable)
	<div tooltip="Here is a tooltip:<span class='yellow'>Current pepper sprays: $spray</span>">
		Pepper sprays
	</div>

	Example usage (with customised settings):
	<div tooltip="Tooltip text" tooltip-title="Title" tooltip-position="bottom">
		Pepper sprays
	</div>


	---------------------------------------------------
	Styling: (tooltip.css)
	.tooltip-popup - The container for the tooltip
	.tooltip-header - An optional title property
	.tooltip-body - The tooltip text
	- Anchor styling can be changed with the property "anchorStyle" (anchor = the object to hover over to display the tooltip)

	Settings:
		title: A bigger title text - default null
		message: The actual tooltip content
		anchorStyle: Optional css class for the anchor
		position: Position of the tooltip. Options: cursor, top, bottom, left, right, bottomRight, bottomLeft, topRight, topLeft
		cursor: Cursor styling when hovering over the anchor
		delay: Optional delay - default 150ms)
		width: Optional width of the tooltip. If set to null, it will resize itself based on the content
		maxWidth: Optional max width of the tooltip. When it reaches this width, text will wrap to the next row
*/

const tooltipRegistry = [];

/* Clears tooltips on passage start - in case a tooltip is displayed during passage change */
$(document).on(":passageinit", () => {
	tooltipRegistry.forEach(function (tooltipElement) {
		$(tooltipElement).trigger("mouseleave.tooltip");
	});
	tooltipRegistry.splice(0, tooltipRegistry.length);
});

$(document).on(":passageend", () => {
	initializeTooltips();
});

/*
  This is basically a failsafe for the shop (and other places with <<replace>>)
  If a popup is displayed while a <<replace>> widget is called, we remove it here
*/
function initializeTooltips() {
	$(".tooltip-popup").remove();
	$(() => {
		$("[tooltip]").each(function () {
			const message = $("<div>");
			new Wikifier(message, $(this).attr("tooltip"));

			// Default attribute settings
			const defaultSettings = {
				title: "",
				message,
				anchorStyle: null,
				position: "cursor",
				cursor: "help",
				delay: 150,
				width: null,
				maxWidth: 450,
			};

			/*
			  Extracts the attributes that are prefixed with "tooltip", in order to customise the tooltips from html
			  Any of the above settings can be customised
			*/
			$.each(this.attributes, function () {
				if (!this.name.startsWith("tooltip-")) return;
				if (!Object.hasOwn(defaultSettings, this.name.substring(8))) return;

				const key = this.name.substring(8);
				if (isNaN(this.value)) return;
				defaultSettings[key] = parseFloat(this.value);
			});

			$(this).tooltip(defaultSettings);
		});
	});
}
window.initializeTooltips = initializeTooltips;

/*
  Extends jQuery to allow custom tooltips for any jQuery objects
*/
$.fn.tooltip = function (options = {}) {
	const initializeSettings = () => {
		const existingSettings = this.data("tooltip-settings");
		if (existingSettings) {
			$.extend(existingSettings, options);
			return existingSettings;
		}

		const defaults = {
			title: "",
			message: "",
			delay: 150,
			position: "cursor",
			cursor: "help",
			anchorStyle: null,
			width: null,
			maxWidth: null,
		};
		return $.extend({}, defaults, options);
	};

	const show = function () {
		const settings = initializeSettings.call(this);
		this.data("tooltip-settings", settings);
		const $this = $(this);
		const disabled = $this.data("tooltip-disabled");
		if (disabled) return;

		let tooltip = $this.data("tooltip-instance");

		if (settings.position.toLowerCase() === "cursor") {
			$this.on("mousemove.tooltip", function (event) {
				$this.data("cursorPosition", { x: event.pageX, y: event.pageY });
				updatePosition.call($this, tooltip);
			});
		}

		// Optionally delay the tooltip, if a delay is set
		clearTimeout($this.data("tooltip-timeout"));
		const timeout = setTimeout(() => {
			if (!$.contains(document, $this[0])) return;
			tooltip = $("<div>").addClass("tooltip-popup");
			const header = $("<div>").addClass("tooltip-header").html(settings.title);
			const body = $("<div>").addClass("tooltip-body").html(settings.message);
			tooltip.append(header, body);
			if (settings.width) tooltip.css("width", settings.width);
			if (settings.maxWidth) tooltip.css("maxWidth", settings.maxWidth);
			$("body").append(tooltip);
			$this.data("tooltip-instance", tooltip);
			updatePosition.call($this, tooltip);
		}, settings.delay);
		$this.data("tooltip-timeout", timeout);

		// Handler to update the tooltip position
		const resizeHandler = () => {
			if (settings.position.toLowerCase() !== "cursor") {
				updatePosition.call($(this), tooltip);
			}
		};
		$(this).data("resizeHandler", resizeHandler);
		$(window).on("resize", resizeHandler);
		tooltipRegistry.push(this);
	};

	const hide = function () {
		const settings = this.data("tooltip-settings");
		const $this = $(this);
		const tooltip = $this.data("tooltip-instance");
		clearTimeout($this.data("tooltip-timeout"));
		if (tooltip) {
			tooltip.remove();
			$this.removeData("tooltip-instance");
			const index = tooltipRegistry.indexOf(this);
			if (index > -1) {
				tooltipRegistry.splice(index, 1);
			}
		}
		if (settings.position.toLowerCase() === "cursor") {
			$this.off("mousemove.tooltip");
		}

		const resizeHandler = $(this).data("resizeHandler");
		if (resizeHandler) {
			$(window).off("resize", resizeHandler);
		}
	};

	const updateTooltip = function () {
		const $this = $(this);
		const settings = $this.data("tooltip-settings");
		const tooltip = $this.data("tooltip-instance");
		if (settings && tooltip) {
			tooltip.find(".tooltip-header").html(settings.title);
			tooltip.find(".tooltip-body").html(settings.message);
			updatePosition.call($this, tooltip);
		}
	};

	const updatePosition = function (tooltipInstance) {
		if (!tooltipInstance) return;

		const distance = 3;
		const offset = this.offset();
		const { width, height } = this.get(0).getBoundingClientRect();
		const cursorPosition = this.data("cursorPosition") || {};
		const offsetX = 15;
		const offsetY = 15;
		const settings = $(this).data("tooltip-settings");

		const setPosition = (left, top) => {
			tooltipInstance.css("transform", `translate(${left}px, ${top}px)`);
		};

		switch (settings.position.toLowerCase()) {
			case "cursor":
				setPosition(cursorPosition.x + offsetX, cursorPosition.y + offsetY);
				break;
			case "top":
				setPosition(offset.left + width / 2 - tooltipInstance.outerWidth() / 2, offset.top - tooltipInstance.outerHeight() - distance);
				break;
			case "bottom":
				setPosition(offset.left + width / 2 - tooltipInstance.outerWidth() / 2, offset.top + height + distance);
				break;
			case "left":
				setPosition(offset.left - tooltipInstance.outerWidth() - distance, offset.top + height / 2 - tooltipInstance.outerHeight() / 2);
				break;
			case "right":
				setPosition(offset.left + width + distance, offset.top + height / 2 - tooltipInstance.outerHeight() / 2);
				break;
			case "bottomRight":
				setPosition(offset.left + width + distance, offset.top + height + distance);
				break;
			case "bottomLeft":
				setPosition(offset.left - tooltipInstance.outerWidth() - distance, offset.top + height + distance);
				break;
			case "topRight":
				setPosition(offset.left + width + distance, offset.top - tooltipInstance.outerHeight() - distance);
				break;
			case "topLeft":
				setPosition(offset.left - tooltipInstance.outerWidth() - distance, offset.top - tooltipInstance.outerHeight() - distance);
				break;
		}
	};

	// Enable or Disable tooltip
	if (options === "disable" || options === "enable") {
		this.each(function () {
			const $this = $(this);
			$this.data("tooltip-disabled", options === "disable");

			if (options === "disable") {
				$this.trigger("mouseleave.tooltip");
			} else if ($this.is(":hover")) {
				$this.trigger("mouseenter.tooltip");
				updateTooltip.call($this);
			}
		});
		return this;
	}

	// Event Handlers
	this.on("mouseenter.tooltip", function () {
		show.call($(this));
	}).on("mouseleave.tooltip", function () {
		hide.call($(this));
	});

	// Main logic
	this.each(function () {
		const $this = $(this);
		const settings = initializeSettings.call($this);
		$this.data("tooltip-settings", settings);

		if (settings.cursor) $this.css("cursor", settings.cursor);
		if (settings.anchorStyle) $this.addClass(settings.anchorStyle);
	});

	return this;
};
