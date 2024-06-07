@echo off
SET "PATH=%PATH%;%CD%\androidsdk\cmdline-tools\latest\bin;%CD%\androidsdk\gradle\bin"
SET "ANDROID_HOME=%CD%\androidsdk"
SET "ANDROID_SDK_PATH=%ANDROID_HOME%"

if NOT EXIST "%CD%\androidsdk\cmdline-tools\latest\bin\sdkmanager.bat" (
	echo cmdline-tools not found, follow the steps from README-windows.txt first!
	pause
	exit
)

REM install node dependencies
echo Installing node modules
call npm i --no-audit
REM disable cordova telemetry
call npx cordova telemetry off
REM install platform and plugins
call npx cordova prepare
REM install android build tools
echo Installing target android platform and build tools
echo You might need to accept the licenses
call sdkmanager "build-tools;32.0.0" "platforms;android-32"
echo All Done!
pause
