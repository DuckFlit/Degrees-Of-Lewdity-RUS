#!/bin/sh

# make sure sdkmanager is installed first
if [ ! -e androidsdk/cmdline-tools/latest/bin/sdkmanager ]; then echo "cmdline tools not found, follow the steps from README first!"; fi

# install cordova
npm i
npx cordova telemetry off
npx cordova prepare

# set up sdk variables
ANDROID_HOME="$PWD/androidsdk/"
ANDROID_SDK_ROOT="$ANDROID_HOME"
ANDROID_PATH="$ANDROID_HOME/cmdline-tools/latest/bin"
PATH="./androidsdk/cmdline-tools/latest/bin:/usr/bin"

# install sdk tools
yes|sdkmanager --licenses
sdkmanager "build-tools;32.0.0"
sdkmanager "platforms;android-32"
