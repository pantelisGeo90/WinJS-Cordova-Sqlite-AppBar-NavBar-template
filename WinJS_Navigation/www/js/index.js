// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    var app = WinJS.Application;
    var nav = WinJS.Navigation;
    var sched = WinJS.Utilities.Scheduler;
    var ui = WinJS.UI;

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);



        // Optimize the load of the application and while the splash screen is shown, execute high priority scheduled work. 
        ui.disableAnimations();
        var p = ui.processAll().then(function () {

            var splitView = document.querySelector('.splitView');
            MainMenuBar.splitView = splitView.winControl;
            MainMenuBar.host = document.getElementById('mainMenuBar');
            MainMenuBar.updateSplitView('large');

            // Temporary workaround: Draw keyboard focus visuals on NavBarCommands
            new WinJS.UI._WinKeyboard(MainMenuBar.splitView.paneElement);

            window.addEventListener('resize', onResize.bind(this), false);
            onResize();
            WinJS.Navigation.addEventListener('navigated', navigateHandler, false);
            //WinJS.Navigation.addEventListener('navigated', navigateHandler, false);
            initDatabase();

            return nav.navigate(nav.location || Application.navigator.home, nav.state);
        }).then(function () {
            return sched.requestDrain(sched.Priority.aboveNormal + 1);
        }).then(function () {
            ui.enableAnimations();
        });
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };

    function onResize() {
        if (window.innerWidth < 698 && MainMenuBar.selectedMode !== 'small') {
            MainMenuBar.updateSplitView('small');
        }
        else if (window.innerWidth >= 698 && MainMenuBar.selectedMode !== 'large') {
            MainMenuBar.updateSplitView('large');
        }
    }


    WinJS.Namespace.define("MainAppBar", {
        outputCommand: WinJS.UI.eventHandler(function (ev) {
            var status = document.querySelector(".status");
            var command = ev.currentTarget;
            if (command.winControl) {
                switch (command.winControl.id) {
                    case 'cmdMenu':
                        console.log('cmdMenu');
                        break;
                    default:
                        console.log('nothing');
                }
            }
        })
    });

    WinJS.Namespace.define("MainMenuBar", {
        mode: {
            small: {
                name: 'small',
                openedDisplayMode: WinJS.UI.SplitView.OpenedDisplayMode.overlay,
                closedDisplayMode: WinJS.UI.SplitView.ClosedDisplayMode.none,
            },
            medium: {
                name: 'medium',
                openedDisplayMode: WinJS.UI.SplitView.OpenedDisplayMode.overlay,
                closedDisplayMode: WinJS.UI.SplitView.ClosedDisplayMode.inline,
            },
            large: {
                name: 'large',
                openedDisplayMode: WinJS.UI.SplitView.OpenedDisplayMode.overlay,
                closedDisplayMode: WinJS.UI.SplitView.ClosedDisplayMode.inline,
            }
        },
        splitView: null,
        selectedMode: '',
        updateSplitView: function (size) {
            // Remove all the size classes
            Object.keys(MainMenuBar.mode).forEach(function (key) {
                WinJS.Utilities.removeClass(MainMenuBar.host, MainMenuBar.mode[key].name);
            });

            // Update the SplitView based on the size
            MainMenuBar.splitView.openedDisplayMode = MainMenuBar.mode[size].openedDisplayMode;
            MainMenuBar.splitView.closedDisplayMode = MainMenuBar.mode[size].closedDisplayMode;

            // Add the size class
            WinJS.Utilities.addClass(MainMenuBar.host, size);
            MainMenuBar.selectedMode = size;
        },
        onClickAction: WinJS.UI.eventHandler(function (ev) {
            var command = ev.currentTarget;
            if (command.winControl) {
                const selectedNavCommands = MainMenuBar.host.querySelectorAll('.nav-selected');
                for (let i = 0; i < selectedNavCommands.length; i++) {
                    selectedNavCommands[i].classList.remove('nav-selected');
                }


                mainMenuBar.winControl.closePane();
                switch (command.winControl.id) {
                    case 'homeBtn':
                        WinJS.Navigation.navigate('pages/home/home.html');
                        break;
                    case 'logBtn':
                        WinJS.Navigation.navigate('pages/log/log.html');
                        break;
                    case 'profileBtn':
                        WinJS.Navigation.navigate('pages/profile/profile.html');
                        break;
                    case 'testBtn':
                        WinJS.Navigation.navigate('pages/test/test.html');
                        break;
                    case 'logOutBtn':
                        console.log('log out');
                        break;
                    default: {
                        console.log('could not recognise command');
                    }
                }
            }
            else {
                console.log('could not recognise command');
            }
        }),
    });
})();