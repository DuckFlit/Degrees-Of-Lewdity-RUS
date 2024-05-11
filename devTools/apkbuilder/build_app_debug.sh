#!/bin/sh

# set up the environment
ANDROID_HOME="$PWD/androidsdk/" \
ANDROID_SDK_ROOT="$ANDROID_HOME" \
ANDROID_PATH="$ANDROID_HOME/cmdline-tools/latest/bin" \
PATH="./androidsdk/cmdline-tools/latest/bin:$PATH" \
node scripts/build_app.js
