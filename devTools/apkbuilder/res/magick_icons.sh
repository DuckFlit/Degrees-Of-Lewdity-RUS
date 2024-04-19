#!/bin/sh
# convert source icon to appropriate sizes
if magick -version; then continue; else echo "this script requires image magick installed and in PATH"; fi;

magick icon.png -resize 192x192 icon-xxxhdpi.png
magick icon.png -resize 144x144 icon-xxhdpi.png
magick icon.png -resize 96x96 icon-xhdpi.png
magick icon.png -resize 72x72 icon-hdpi.png
magick icon.png -resize 48x48 icon-mdpi.png
magick icon.png -resize 36x36 icon-ldpi.png
