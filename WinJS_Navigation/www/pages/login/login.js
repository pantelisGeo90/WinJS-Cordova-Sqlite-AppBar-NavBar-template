﻿// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    'use strict';

    WinJS.UI.Pages.define('pages/login/login.html', {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.

            document.addEventListener('backbutton', this.onBackKeyDown, false);
            document.getElementById('formLogin').addEventListener('submit', handleSubmitLoginForm, false);

            const appBar = document.getElementById('topAppBar').winControl;
            console.log(appBar)
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


    function handleSubmitLoginForm(eventInfo) {
        eventInfo.preventDefault();
        const target = eventInfo.currentTarget;
        log.success({ message: eventInfo });
        // encode password
        // check user on DB
    }

    
})();