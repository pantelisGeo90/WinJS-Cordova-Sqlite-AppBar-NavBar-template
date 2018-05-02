const tester = (function () {
    "use strict";

    var nextUser = 101;

    
    const tester = {
        nativeAlertTest: null,
        echoTest: null,
        selfTest: null,
        stringTest1: null,
        stringTest2: null,
        showCount: null,
        addRecord: null,
        deleteRecords: null,
    }

    tester.nativeAlertTest = function () {
        navigator.notification.alert('Native alert test message');
    }

    tester.echoTest = function () {
        window.sqlitePlugin.echoTest(function () {
            navigator.notification.alert('Echo test OK');
        }, function (error) {
            navigator.notification.alert('Echo test ERROR: ' + error.message);
        });
    }

    tester.selfTest = function () {
        window.sqlitePlugin.selfTest(function () {
            navigator.notification.alert('Self test OK');
        }, function (error) {
            navigator.notification.alert('Self test ERROR: ' + error.message);
        });
    }
    
    tester.stringTest1 = function () {
        database.transaction(function (transaction) {
            transaction.executeSql("SELECT upper('Test string') AS upperText", [], function (ignored, resultSet) {
                navigator.notification.alert('Got upperText result (ALL CAPS): ' + resultSet.rows.item(0).upperText);
            });
        }, function (error) {
            navigator.notification.alert('SELECT count error: ' + error.message);
        });
    }

    tester.stringTest2 = function () {
        database.transaction(function (transaction) {
            transaction.executeSql('SELECT upper(?) AS upperText', ['Test string'], function (ignored, resultSet) {
                navigator.notification.alert('Got upperText result (ALL CAPS): ' + resultSet.rows.item(0).upperText);
            });
        }, function (error) {
            navigator.notification.alert('SELECT count error: ' + error.message);
        });
    }

    tester.showCount = function () {
        database.transaction(function (transaction) {
            transaction.executeSql('SELECT count(*) AS recordCount FROM SampleTable', [], function (ignored, resultSet) {
                navigator.notification.alert('RECORD COUNT: ' + resultSet.rows.item(0).recordCount);
            });
        }, function (error) {
            navigator.notification.alert('SELECT count error: ' + error.message);
        });
    }

    tester.addRecord = function () {
        database.transaction(function (transaction) {
            transaction.executeSql('INSERT INTO SampleTable VALUES (?,?)', ['User ' + nextUser, nextUser]);
        }, function (error) {
            navigator.notification.alert('INSERT error: ' + error.message);
        }, function () {
            navigator.notification.alert('INSERT OK');
            ++nextUser;
        });
    }
    /*
    tester.addJSONRecordsAfterDelay = function () {
        function getJSONObjectArray() {
            var COUNT = 100;
            var myArray = [];

            for (var i = 0; i < COUNT; ++i) {
                myArray.push({ name: 'User ' + nextUser, score: nextUser });
                ++nextUser;
            }

            return myArray;
        }

        function getJSONAfterDelay() {
            var MY_DELAY = 150;

            var d = $.Deferred();

            setTimeout(function () {
                d.resolve(getJSONObjectArray());
            }, MY_DELAY);

            return $.when(d);
        }

        // NOTE: This is similar to the case when an application
        // fetches the data over AJAX to populate the database.
        // IMPORTANT: The application MUST get the data before
        // starting the transaction.
        getJSONAfterDelay().then(function (jsonObjectArray) {
            database.transaction(function (transaction) {
                $.each(jsonObjectArray, function (index, recordValue) {
                    transaction.executeSql('INSERT INTO SampleTable VALUES (?,?)',
                        [recordValue.name, recordValue.score]);
                });
            }, function (error) {
                navigator.notification.alert('ADD records after delay ERROR');
            }, function () {
                navigator.notification.alert('ADD 100 records after delay OK');
            });
        });
    }
    */
    tester.deleteRecords = function () {
        database.transaction(function (transaction) {
            transaction.executeSql('DELETE FROM SampleTable');
        }, function (error) {
            navigator.notification.alert('DELETE error: ' + error.message);
        }, function () {
            navigator.notification.alert('DELETE OK');
            ++nextUser;
        });
    }

    return tester;
})();



