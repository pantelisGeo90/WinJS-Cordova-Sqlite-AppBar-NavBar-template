# winjs-cordova-sqlite-appbar-navbar-template

The WinJS Navigation Template sample app provides a template you can use to create cross-platform, multi-page apps using Visual Studio Tools for Apache Cordova in Visual Studio 2017. It implements nav-bar and app-bar and gives a nice native mobile-tablet-desktop application.

### Requirements
Visual Studio 2017 RTM with optional cross-platform components for HTML/JavaScript installed.


### Running The App
After you finish downloading and installing VS Tools for Apache Cordova (http://go.microsoft.com/fwlink/?LinkId=524433), open up the project in Visual Studio.

uses:
* WinJS navigation
* cordova-plugin-dialogs
* cordova-plugin-whitelist
* cordova-sqlite-storage
* bootstrap v3.37 (some of it)


Use the nav bar or the left to navigate to the main pages.
Use the app bar on top to add any additionali commands on the page you land

App bar lives on index.html but you could create individual AppBars on each page you like. I went with this approach in order to have always a title on top and be consistent. If additional commands need to be created then you do that from `js/Utils/helpers.js: setUpAppCommands(page)` which is called on `onNavigated`.

I've tested on Debug Win-86 Local Machine and on an android device (Debug).
