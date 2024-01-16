/*
 * prevent cordova from deleting and copying over hundreds of images on every build
 */
const fs = require('fs-extra');
const path = require('path');

const tmpDir = path.resolve('tmp');
const www = path.resolve('platforms/android/app/src/main/assets/www');
const backupDirs = ['img'];

/*
 * problem: cordova cleans the www dir and copies app files into it anew on every build
 * this unnecessarily slows down compiling process on hdds and kills write cycles on ssds
 * solution: move backupDirs to a safe haven before they get deleted (and move them back later in another script when they're needed)
 */
if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);
backupDirs.forEach(dir => {
	const srcDir = path.resolve(www, dir);
	if (fs.existsSync(srcDir)) fs.moveSync(srcDir, path.resolve(tmpDir, dir), { overwrite: true });
});

// adjust android manifest because cordova has panicks when manifest app name doesn't match config.xml
const manifestFile = path.resolve('platforms/android/app/src/main/AndroidManifest.xml');
if (fs.existsSync(manifestFile)) {
	const xml = require('cordova-common').xmlHelpers;
	const configData = xml.parseElementtreeSync('config.xml');
	const manifestData = xml.parseElementtreeSync(manifestFile);
	if (manifestData.getroot().attrib.package !== configData.getroot().attrib['android-packageName']) {
		manifestData.getroot().attrib.package = configData.getroot().attrib['android-packageName'];
		fs.writeFileSync(manifestFile, manifestData.write({ indent: 4 }), 'utf-8');
	}
}
