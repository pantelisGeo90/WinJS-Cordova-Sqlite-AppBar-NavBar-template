const cDatabase = function () {
    const db;

    this.CreateTable = function (query) {
    };

    /** 
    *  tableName string
    *  columns list of objects
                [
                    {
                        name: 'column1',
                        type: 'int',
                        ..
                    },
                ]
    **/

    this.CreateTable = function (tableName, columns) {
    };

    /**
    *   Opens db, begins transaction and commits or rollbacks.
    *   Returns a promise.
    *   If succeeds it returns an object with the blank message, else the error message.
    */
    this.ExecuteSingle = function (query) {
        return ExecuteMany([query]);
    }

    /**
    *   Opens db, begins transaction and commits or rollbacks.
    *   Returns a promise.
    *   If succeeds it returns an object with the blank message, else the error message.
    */
    this.ExecuteMany = function (queries) {
        //return SQLite3JS.openAsync(dbPath)
        //    .then(function (db) {
        //        return db.runAsync('BEGIN TRANSACTION').then(function (e) {
        //            const dbPromises = [];
        //            for (var i = 0; i < queries.length; i++) {
        //                dbPromises.push(db.allAsync(queries[i]));
        //            }
        //            return WinJS.Promise.join(dbPromises).then(function () {
        //                return db.runAsync('COMMIT TRANSACTION').then(function () {
        //                    db.close();
        //                    return { message: "" };
        //                });
        //                debugger;
        //            }, function (err) {
        //                return db.runAsync('Rollback TRANSACTION').then(function () {
        //                    db.close();
        //                    return { message: err.name + ": " + err.message };
        //                });
        //                debugger;
        //            });
        //        });
        //    });
    }
};