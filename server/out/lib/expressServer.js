"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var errors_1 = require("../middleware/errors");
// #region constants
var port = process.env.PORT || 8082;
var host = process.env.SERVER_HOST || 'localhost';
// #endregion
var expressServer = function (app, isDev) {
    if (isDev === void 0) { isDev = false; }
    if (!app) {
        console.log('Server application instance is undefined');
        throw new Error('Server application instance is undefined');
    }
    app.set('port', port);
    app.set('ipAdress', host);
    app.use(errors_1.error404);
    app.use(errors_1.error500);
    /* eslint-disable no-console */
    // @ts-ignore
    app.listen(port, host, function () {
        return console.log("\n        =====================================================\n        -> Server (".concat(chalk_1.default.bgBlue('SPA'), ") \uD83C\uDFC3 (running) on ").concat(chalk_1.default.green(host), ":").concat(chalk_1.default.green("".concat(port)), "\n        =====================================================\n      "));
    });
    /* eslint-enable no-console */
    return app;
};
exports.default = expressServer;
