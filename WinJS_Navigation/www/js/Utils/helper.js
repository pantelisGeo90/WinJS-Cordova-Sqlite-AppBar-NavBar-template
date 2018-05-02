var database = null;


/**
 * Initialize the DB
 */
function initDatabase() {
    database = window.sqlitePlugin.openDatabase({ name: 'sample.db', location: 'default' });

    database.transaction(function (transaction) {
        transaction.executeSql('CREATE TABLE SampleTable (name, score)');
    });
}

/**
 * Get the title depending on the location
 * @param {string} page The page we are currently on
 * @returns {string} The title
 */
function getPageTitle(page){
    switch (page) {
        case 'pages/home/home.html':
            return 'Main Menu';
        case 'pages/test/test.html':
            return 'Test DB';
        case 'pages/profile/profile.html':
            return 'Profile';
        case 'pages/log/log.html':
            return 'Log/History';
        case 'pages/page2/page2.html':
            return 'Page 2';
        case 'pages/login/login.html':
            return 'Login';
        default:
            return 'Title';
    }
}

/**
 * The navigation handler for 'navigated'
 * Check if current page belongs to the list of pages
 * that we do not allow 'back' functionality
 * @param {object} eventInfo The event
 */
function navigateHandler(eventInfo) {
    var args = WinJS.Navigation.state;

    const isHomePage = function (page) {
        return ['pages/home/home.html',
            'pages/test/test.html',
            'pages/profile/profile.html',
            'pages/log/log.html',
            'pages/login/login.html'].indexOf(page) > -1;
    };

    document.getElementById('pageTitle')
        .getElementsByTagName('h3')[0]
        .innerHTML = getPageTitle(eventInfo.detail.location);

    const backButton = document.querySelector('#pageTitle button');

    if (isHomePage(eventInfo.detail.location)) {
        WinJS.Navigation.history.forwardStack = [];
        WinJS.Navigation.history.backStack = [];
        if (backButton) backButton.classList.add('hidden');
    }
    else {
        if (backButton) backButton.classList.remove('hidden');
    }
    //else if (args && args.type === 'nav-command') {
    //    if (WinJS.Navigation.history.backStack.length > 0) {
    //        var firstHistoryPage = WinJS.Navigation.history.backStack[0]; //WinJS.Navigation.history.backStack.pop();
    //        WinJS.Navigation.history.backStack = [firstHistoryPage];
    //    }
    //}

    highlightNavButton(eventInfo.detail.location);
    setUpAppCommands(eventInfo.detail.location);
}

/**
 * Highlight the correct nav button
 * @param {any} page The page we are currently on
 */
function highlightNavButton(page) {
    const selectedNavCommands = document.querySelectorAll('.nav-selected');
    for (let i = 0; i < selectedNavCommands.length; i++) {
        selectedNavCommands[i].classList.remove('nav-selected');
    }

    if (page === 'pages/home/home.html'
        || page === 'pages/page2/page2.html') {
        document.getElementById('homeBtn').classList.add('nav-selected');
    }
    else if (page === 'pages/test/test.html') {
        document.getElementById('testBtn').classList.add('nav-selected');
    }
    else if (page === 'pages/profile/profile.html') {
        document.getElementById('profileBtn').classList.add('nav-selected');
    }
    else if (page === 'pages/log/log.html') {
        document.getElementById('logBtn').classList.add('nav-selected');
    }
}

/**
 * Set up the app commands depending on the page you are in
 * @param {string} page The page we are currently on
 */
function setUpAppCommands(page) {

    while (topAppBar.winControl.data.length > 1) {
        topAppBar.winControl.data.dataSource.list.pop();
    }
    console.log('removed commands');

    // Add according commands for each page.
    switch (page) {
        case 'pages/login/login.html':
            topAppBar.winControl.data.dataSource.list
                .push(createCommand({
                    id: 'cmdRegister',
                    label: 'Register',
                    icon: 'addfriend',
                    tooltip: 'Register',
                    section: 'primary',
                    type: 'button',
                    onClick: MainAppBar.outputCommand,
                }));
            topAppBar.winControl.data.dataSource.list
                .push(createCommand({
                    id: 'cmdHelp',
                    label: 'Help',
                    icon: 'help',
                    tooltip: 'Help',
                    section: 'primary',
                    type: 'button',
                    onClick: MainAppBar.outputCommand,
                }));
            topAppBar.winControl.data.dataSource.list
                .push(createCommand({
                    id: 'cmdHelp1',
                    label: 'Help 1',
                    icon: 'help',
                    tooltip: 'Help 1',
                    section: 'primary',
                    type: 'button',
                    onClick: MainAppBar.outputCommand,
                }));
            topAppBar.winControl.data.dataSource.list
                .push(createCommand({
                    id: 'cmdHelp2',
                    label: 'Help 2',
                    icon: 'help',
                    tooltip: 'Help 2',
                    section: 'primary',
                    type: 'button',
                    onClick: MainAppBar.outputCommand,
                }));
            topAppBar.winControl.data.dataSource.list
                .push(createCommand({
                    id: 'cmdHelp3',
                    label: 'Help 3',
                    icon: 'help',
                    tooltip: 'Help 3',
                    section: 'primary',
                    type: 'button',
                    onClick: MainAppBar.outputCommand,
                }));
            topAppBar.winControl.data.dataSource.list
                .push(createCommand({
                    id: 'cmdHelp4',
                    label: 'Help 4',
                    icon: 'help',
                    tooltip: 'Help 4',
                    section: 'primary',
                    type: 'button',
                    onClick: MainAppBar.outputCommand,
                }));
            break;
        default:
            return;
    }
}

/**
 * Create command based on the args you've passed through
 * @param {object} args The new button's arguments
 */
// @param {{id: string, label: string, icon: string, tooltip: string, section: string, type: string, onclick: funct }} args
function createCommand(args) {
    const btn = document.createElement("button");
    const command = new WinJS.UI.AppBarCommand(btn, {
        id: args.id,
        label: args.label,
        icon: args.icon,
        tooltip: args.tooltip,
        section: args.section,
        type: 'button',
        onclick: args.onClick,
    });
    return command;
}