Config.history.controls = false;
Config.saves.slots = 9;
Config.history.maxStates = 1;

State.prng.init()

window.versionUpdateCheck = true;
window.onLoadUpdateCheck = false;

Save.onLoad.add(function(save) {
	window.onLoadUpdateCheck = true;
});

let isReloading = true;
let pageLoading = false;

Save.onLoad.add(function(save) {
	pageLoading = true
});


Save.onSave.add(function(save) {
	new Wikifier(null, '<<updateFeats>>');
	prepareSaveDetails();
});

/*LinkNumberify and images will enable or disable the feature completely*/
/*debug will enable or disable the feature only for new games*/
/*sneaky will enable the Sneaky notice banner on the opening screen and save display*/
window.StartConfig = {
	"debug": false,
	"enableImages": true,
	"enableLinkNumberify": true,
	"version": "0.3.11.4",
	"sneaky" : false,
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

// Runs before a passage load, returning a string redirects to the new passage name.
Config.navigation.override = function (dest) {
	const isLoading = pageLoading; // if page is freshly loading (after a refresh etc), we hold its value in a temporary variable

	if (isReloading) {
		/* This must have the highest precedence. */
		const lastVersion = DoLSave.Utils.parseVer(V.saveVersions.last());
		const currVersion = DoLSave.Utils.parseVer(StartConfig.version);
		if (lastVersion > currVersion) {
			isReloading = false;
			V.bypassHeader = true;
			return 'Downgrade Waiting Room';
		}
	}

	isReloading = false;
	pageLoading = false

	switch (dest) {
		case 'Downgrade Waiting Room':
			return V.passage;
		case 'Pharmacy Select Custom Lenses':
			return isLoading ? 'Pharmacy Ask Custom Lenses' : false;
		case 'Forest Shop Outfit':
		case 'Forest Shop Upper':
		case 'Forest Shop Lower':
		case 'Forest Shop Under Outfit':
		case 'Forest Shop Under Upper':
		case 'Forest Shop Under Lower':
		case 'Forest Shop Head':
		case 'Forest Shop Face':
		case 'Forest Shop Neck':
		case 'Forest Shop Legs':
		case 'Forest Shop Feet':
			return 'Forest Shop';

		case 'Over Outfit Shop':
		case 'Outfit Shop':
		case 'Top Shop':
		case 'Bottom Shop':
		case 'Under Outfit Shop':
		case 'Under Top Shop':
		case 'Under Bottom Shop':
		case 'Head Shop':
		case 'Face Shop':
		case 'Neck Shop':
		case 'Hands Shop':
		case 'Legs Shop':
		case 'Shoe Shop':
			return 'Clothing Shop';

		case 'Penis Inspection Flaunt Crossdress':
			return 'Penis Inspection Flaunt No Penis';

		case 'Pussy Inspection2':
			return 'Pussy Inspection 2';

		case 'Pussy Inspection Penis':
			return 'Pussy Inspection Flaunt No Pussy';

		case 'Forest Plant Sex No Tentacles':
			return 'Forest Plant Sex';

		case 'Forest Plant Sex No Tentacles Finish':
			return 'Forest Plant Sex Finish';

		case 'Forest Plant Passout No Tentacles':
			return 'Forest';

		case 'Moor Plant Sex No Tentacles':
			return 'Moor Plant Sex';

		case 'Moor Plant Sex No Tentacles Finish':
			return 'Moor Plant Sex Finish';

		case 'Underground Plant Molestation No Tentacles':
			return 'Underground Plant Molestation';

		case 'Underground Plant Molestation No Tentacles Finish':
			return 'Underground Plant Molestation Finish';

		case 'Evens Swimming Endure':
			return 'Events Swimming Swim Endure';

		case 'Domus House Work':
			return 'Domus Gutters Intro';

		case 'Trash Boys':
			return 'Trash Compare';

		case 'Trash Boys Spy':
			return 'Trash Compare Spy';

		case 'Trash Boys Greet':
			return 'Trash Compare Greet';

		case 'Trash Boys Refuse':
			return 'Trash Compare Refuse';

		case 'Trash Boys Compare':
			return 'Trash Compare Others';

		case 'Trash Boys Back Out':
			return 'Trash Compare Back Out';

		case 'Trash Boys Show':
			return 'Trash Compare Show';

		case 'Trash Boys Offer Secret':
			return 'Trash Compare Penis Secret';

		case 'Trash Boys Wrap It Up':
			return 'Trash Compare Wrap It Up';

		case 'Trash Boys Crossdressing Refuse':
			return 'Trash Compare Breast Refuse';

		case 'Trash Boys Crossdressing Show All':
			return 'Trash Compare Breast Show All';

		case 'Trash Boys Forced Strip':
			return 'Trash Compare Forced Strip';

		case 'Trash Boys Combat Win':
			return 'Trash Compare Combat Win';

		case 'Trash Boys Combat Loss':
			return 'Trash Compare Combat Loss';

		case 'Lake Underwater Tentacles Finish Figure':
			return 'Lake Underwater Tentacles Finish';

		case 'Sextoys Inventory Home':
		case 'Sextoys Inventory Brothel':
		case 'Sextoys Inventory Cottage':
		case 'Sextoys Inventory Cabin':
			return 'Sextoys Inventory';

		case 'Kylar Abduction Angry':
		case 'Kylar Abduction Apologise':
		case 'Kylar Abduction Silent':
		case 'Kylar Abduction Eden':
		case 'Kylar Abduction Robin':
		case 'Kylar Abduction Whitney':
		case 'Kylar Abduction Sydney':
		case 'Kylar Abduction Wolf':
		case 'Kylar Abduction Hawk':
			return 'Kylar Abduction Event Response';

		default:
			return false;
	}
}
