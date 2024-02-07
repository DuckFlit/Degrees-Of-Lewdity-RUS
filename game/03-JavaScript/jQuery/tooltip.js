/* eslint-disable no-new */
// eslint-disable-next-line no-var
var tooltipRegistry = [];

$(document).on(":passageinit", () => {
	tooltipRegistry.forEach(function (tooltipElement) {
		$(tooltipElement).trigger("mouseleave.tooltip");
	});
	tooltipRegistry = [];
});

$(document).on(":passageend", () => {
	initializeTooltips();
});

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

			$.each(this.attributes, function() {
                if (this.name.startsWith("tooltip-") && defaultSettings.hasOwnProperty(this.name.substring(8))) {
                    const key = this.name.substring(8);
                    let value = this.value;
                    if (!isNaN(value)) {
                        value = parseFloat(value);
                    }
                    defaultSettings[key] = value;
                }
            });

			$(this).tooltip(defaultSettings);
		});
	});
}
window.initializeTooltips = initializeTooltips;

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

		clearTimeout($this.data("tooltip-timeout"));
		const timeout = setTimeout(() => {
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

	// Enable or Disable Tooltip
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
