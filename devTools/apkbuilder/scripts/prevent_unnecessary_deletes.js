/*
 * prevent cordova from deleting and copying over thousands of images on every build
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
