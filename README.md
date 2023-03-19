# 2206_Web-Sentry
Repository containing code for WebSentry, a custom plugin for Google Chrome.

## What is WebSentry?
This is a Chrome Extension that checks for the potential vulnerabilities of a website, determining outdated libraries, insecure headers and cookies.

## Features:
__Library Detection & Comparision__
* Integrated Library Detection using [Library Detector Chrome Extension](https://github.com/johnmichel/Library-Detector-for-Chrome)
* Fetching of latest library version via npm registry

__Web Header Checking__
* X-frame-Options
* Content-Security-Policy
* Referrer-Policy
* Permissions-Policy
* X-XSS-Protection
* X-Content-Type-Options
* Strict-Transport-Security
* Server Headers

__Cookies Detection__
* Checking of insecure cookies
* Checking of third party cookies

## Pre-requisites
Ensure the web browser [Google Chrome](https://www.google.com/chrome/) is available and updated.
Turn on developer mode to enable the upload and running of custom Chrome Extensions
* Open Chrome Menu on upper right corner of browser window
* Select More tools > Extensions
* Enable Developer mode (top right corner switch)

## Installation - Development version (How to run?)
* Download this project as a zip file and extract the folder 
* Navigate `chrome://extensions` on Google Chrome
* Click on "Load unpacked" on the left corner below the word Extensions after enabling Developer mode
* Select the directory (folder) where the extension files are stored (2206_Web-Sentry-main)
* Check extensions on the top right corner of the chrome browser, pin the extension WenSentry Chrome Plugin


## Authors
- [@xllRyan](https://github.com/xllRyan)
- [@2100723](https://github.com/2100723)
- [@TerraRyu](https://github.com/TerraRyu)
- [@Rxelxius](https://github.com/Rxelxius)

## Youtube Link
[https://www.youtube.com/watch?v=-RRY4KXx4KU]
