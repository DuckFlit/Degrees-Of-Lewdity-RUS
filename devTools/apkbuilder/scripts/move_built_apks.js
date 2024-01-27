/*
 * move built apks to an easier to access dist/ folder
 */
const fs = require("fs-extra");
const path = require("path");
const xml = require("cordova-common").xmlHelpers;

const gameRoot = path.resolve("../..");
const src = path.resolve("platforms/android/app/build/outputs/apk");
const dest = path.resolve(gameRoot, "dist");

// extract app name from config.xml
// const appName = fs.readFileSync("config.xml").toString().match(/(?<=>).*?(?=<\/name>)/)[0].replace(/ /g,"-");
const configData = xml.parseElementtreeSync("config.xml");
const appName = configData.getroot().getchildren().find(c => c.tag === "name").text.replace(/ /g, "-");
// check apk build dirs and move built apks to the dist dir for easier access
if (fs.existsSync(src)) fs.readdirSync(src).forEach(dir => {
	const targetDir = path.resolve(src, dir);
	if (!fs.statSync(targetDir).isDirectory()) return; // in case of some hidden system files
	const metadata = fs.readJSONSync(path.resolve(targetDir, "output-metadata.json"));
	const srcFile = metadata.elements[0].outputFile;
	const version = metadata.elements[0].versionName;
	const variant = metadata.variantName;
	const destFile = appName + "-" + version + "-" + variant + ".apk";
	const srcPath = path.resolve(targetDir, srcFile);
	const destPath = path.resolve(dest, destFile);
	if (fs.existsSync(srcPath)) {
		fs.moveSync(srcPath, destPath, {overwrite: true});
		console.log("moved " + srcFile + " to " + destPath);
	}
})

