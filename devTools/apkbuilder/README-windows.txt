cordova apk builder for primarily DOL

# Installing dependencies
## nodejs latest
- download from https://nodejs.org/, ~25.4mb
- doesn't matter if it's LTS or latest
- options "npm package manager" and "Add to PATH" must be selected
- "Automatically install the necessary tools" is optional

## openjdk / temurin 17
- download the latest version of .msi installer for windows from https://adoptium.net/temurin/releases/?version=17&package=jdk&arch=x64, ~171mb
- when installing, choose to install "Set JAVA_HOME variable" option

## android commandline-tools latest
- download from https://developer.android.com/studio#cmdline-tools, links for tools-only are at the bottom of the page, ~146mb
- in the folder with this README, open androidsdk\cmdline-tools\latest, and extract "bin", "lib", and "source.properties" from the downloaded archive from the previous step into it. there should be no other sub-folders

## gradle 7.4.2
- download from https://gradle.org/next-steps/?version=7.4.2&format=bin, ~110mb
- extract the archive into `androidsdk/gradle`

## the rest
- once everything above is done, run `setup_deps.bat`

# Building the apk
## debug build
debug builds require no additional steps and can be installed in parallel with official app.
just run `build_app_debug.bat` batch file. compiled apk will appear in the dist folder.

## release build
if you have the official dol.keystore, run `build_app_debug.bat` batch file.
if you don't have one, stick to debug builds, they're not any less good.
