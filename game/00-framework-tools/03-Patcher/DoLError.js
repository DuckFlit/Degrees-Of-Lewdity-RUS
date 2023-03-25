function getDebuggingInfo() {
	const response = {
		passage: V.passage,
		index: V.index,
		rng: V.rng,
		danger: V.danger,
		phase: V.phase,
		npcCount: EventSystem.count(),
		player: {
			penis: V.player.penis,
			vagina: V.player.vagina,
			leftarm: V.leftarm,
			rightarm: V.rightarm,
			feetuse: V.feetuse,
			mouthuse: V.mouthuse,
			penisuse: V.penisuse,
			penisstate: V.penisstate,
			vaginause: V.vaginause,
			vaginastate: V.vaginastate,
			anususe: V.anususe,
			anusstate: V.anusstate,
			bottomuse: V.bottomuse,
			chestuse: V.chestuse,
			thighuse: V.thighuse,
			mouthstate: V.mouthstate,
			cheststate: V.cheststate,
			head: V.head,
			front: V.front,
			back: V.back,
			chest: V.chest,
		},
		anustarget: V.anustarget,
		chesttarget: V.chesttarget,
		feettarget: V.feettarget,
		handtarget: V.handtarget,
		lefttarget: V.lefttarget,
		mouthtarget: V.mouthtarget,
		penistarget: V.penistarget,
		righttarget: V.righttarget,
		stealtarget: V.stealtarget,
		thightarget: V.thightarget,
		tooltarget: V.tooltarget,
		vaginatarget: V.vaginatarget,
	};
	for (let i = 0; i < EventSystem.count(); i++) {
		const npc = V.NPCList[i];
		response["npc" + i] = {
			active: npc.active,
			index: npc.index,
			lefthand: npc.lefthand,
			mouth: npc.mouth,
			penis: npc.penis,
			righthand: npc.righthand,
			vagina: npc.vagina,
		};
	}
	return response;
}

throwError = function (place, message, source, isExportable = true) {
	if (typeof message === "string") message = message.replace(/Export$/, "");

	const $wrapper = jQuery(document.createElement("div"));
	const $toggle = jQuery(document.createElement("button"));
	const $source = jQuery(document.createElement("pre"));
	const $title = jQuery(document.createElement("span"));
	const $code = jQuery(document.createElement("code"));
	const $exportBtn = jQuery(document.createElement("button"));
	const mesg = `${L10n.get("errorTitle")}: ${message || "unknown error"}`;

	$toggle
		.addClass("error-toggle")
		.ariaClick(
			{
				label: L10n.get("errorToggle"),
			},
			() => {
				if ($toggle.hasClass("enabled")) {
					$toggle.removeClass("enabled");
					$source.attr({
						"aria-hidden": true,
						hidden: "hidden",
					});
				} else {
					$toggle.addClass("enabled");
					$source.removeAttr("aria-hidden hidden");
				}
			}
		)
		.appendTo($wrapper);

	$title.addClass("error").text(mesg).appendTo($wrapper);
	$code.text(source).appendTo($source);

	if (isExportable && !Browser.isMobile.any()) {
		$toggle.addClass("exportable");
		$exportBtn
			.addClass("error-export macro-button")
			.text("Export")
			.ariaClick(
				{
					label: "Export",
				},
				() => {
					updateExportDay();
					Save.export("degrees-of-lewdity");
				}
			)
			.appendTo($title);
	}

	$source
		.addClass("error-source")
		.attr({
			"aria-hidden": true,
			hidden: "hidden",
		})
		.appendTo($wrapper);
	$wrapper.addClass("error-view").appendTo(place);

	const formattedSource = source.replace(/\n/g, "\n\t");
	console.warn(`${mesg}\n\t${formattedSource}`);

	Errors.report(mesg, JSON.stringify(getDebuggingInfo()));

	return false;
};
