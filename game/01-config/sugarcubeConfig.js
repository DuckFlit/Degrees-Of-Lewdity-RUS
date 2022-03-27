Config.history.controls = false;
Config.saves.slots = 9;
Config.history.maxStates = 1;

State.prng.init()

window.versionUpdateCheck = true;
window.onLoadUpdateCheck = false;

Save.onLoad.add(function(save) {
	window.onLoadUpdateCheck = true;
});

Save.onSave.add(function(save) {
	new Wikifier(null, '<<updateFeats>>');
	prepareSaveDetails();
});

/*LinkNumberify and images will enable or disable the feature completely*/
/*debug will enable or disable the feature only for new games*/
window.StartConfig = {
	"debug": false,
	"enableImages": true,
	"enableLinkNumberify": true,
	"version": "0.3.8.6",
}

/* convert version string to numeric value */
let tmpver = StartConfig.version.replace(/[^0-9.]+/g, "").split(".");
window.StartConfig.version_numeric = tmpver[0]*1000000 + tmpver[1]*10000 + tmpver[2]*100 + tmpver[3]*1;

config.saves.autosave = "autosave";

Config.saves.isAllowed = function () {
	if (tags().includes("nosave")) {
		return false;
	}
	return true;
};

$(document).on(':passagestart', function(ev) {
	if (ev.passage.title === 'Start2') {
		jQuery.event.trigger({
			type    : ':start2',
			content : ev.content,
			passage : ev.passage
		});
	}
});

importStyles("style.css")
	.then(function () {
		console.log("External Style Sheet Active")
	})
	.catch(function (err) {
		console.log("External Style Sheet Missing");
	});

console.log("Game Version:", StartConfig.version);

l10nStrings.errorTitle = StartConfig.version + " Error";

// delete parser that adds unneeded line breaks -ng
Wikifier.Parser.delete("lineBreak");

/* ToDo: implement the dolls system, uncomment during and when its setup
importScripts([
	"img/dolls/NameValueMaps.js",
	"img/dolls/dollUpdater.js",
	"img/dolls/dollLoader.js",
	"img/dolls/DollHouse.js",
	"img/dolls/FDoll.js",
]).then(function () {
	console.log("Dolls scripts running");
})
.catch(function (err) {
	console.log(err);
});*/
