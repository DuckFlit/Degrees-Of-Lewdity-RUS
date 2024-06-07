#!/bin/sh

# uncomment this flag to skip asking for password if the correct one is already stored in build.json
#export SKIP_PASSWORD=true

ANDROID_HOME="$PWD/androidsdk/" \
ANDROID_SDK_ROOT="$ANDROID_HOME" \
ANDROID_PATH="$ANDROID_HOME/cmdline-tools/latest/bin" \
PATH="./androidsdk/cmdline-tools/latest/bin:$PATH" \
BUILD_RELEASE=true \
node scripts/build_app.js
