const log = (function () {
    "use strict";
    var log = {
        success: null,
        warning: null,
        error: null,
    };

    log.success = function (args) {
        console.log(args.message);
    }

    log.warning = function (args) {
        console.warn(args.message);

    }

    log.error = function (args) {
        console.error(args.message);

    }

    return log;
}());