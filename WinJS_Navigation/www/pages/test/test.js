// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("pages/test/test.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.

            document.addEventListener("backbutton", this.onBackKeyDown, false);
            
            document.getElementById('native-alert-test').addEventListener('click', tester.nativeAlertTest, false);
            document.getElementById('echo-test').addEventListener('click', tester.echoTest, false);
            document.getElementById('self-test').addEventListener('click', tester.selfTest, false);
            document.getElementById('string-test-1').addEventListener('click', tester.stringTest1, false);
            document.getElementById('string-test-2').addEventListener('click', tester.stringTest2, false);
            document.getElementById('show-count').addEventListener('click', tester.showCount, false);
            document.getElementById('add-record').addEventListener('click', tester.addRecord, false);
            document.getElementById('delete-records').addEventListener('click', tester.deleteRecords, false);
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in viewState.
        },

        // Handle the back button
        onBackKeyDown: function (args) {

            if (WinJS.Navigation.canGoBack == true) {
                WinJS.Navigation.back(1).done( /* Your success and error handlers */);

            }
        }
    });
})();
