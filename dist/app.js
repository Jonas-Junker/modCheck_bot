"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const tslib_1 = require("tslib");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const Client_1 = require("./classes/Client");
const bodyParser = tslib_1.__importStar(require("body-parser"));
const express_1 = tslib_1.__importDefault(require("express"));
const morgan_1 = tslib_1.__importDefault(require("morgan"));
const twitch_router_1 = require("./routes/twitch_router");
const http = tslib_1.__importStar(require("http"));
// ############# ENVIRONMENT #############
dotenv_1.default.config();
// ############# APP #############
exports.client = new Client_1.ExtendedClient();
const app = (0, express_1.default)();
app.use(bodyParser.json());
app.use(logErrors);
/** Logging */
app.use((0, morgan_1.default)('dev'));
/** Parse the request */
app.use(express_1.default.urlencoded({ extended: false }));
/** Takes care of JSON data */
app.use(express_1.default.json());
/** Routes */
app.use('/twitch', twitch_router_1.twitch_router);
/** Error handling */
app.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});
function logErrors(err, req, res, next) {
    console.error(err.stack);
    next(err);
}
;
function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        res.status(500).send({ error: 'Something failed!' });
    }
    else {
        next(err);
    }
}
function errorHandler(err, req, res, next) {
    res.status(500);
    res.render('error', { error: err });
}
;
const httpServer = http.createServer(app);
const PORT = process.env.PORT ?? 6060;
httpServer.listen(PORT, () => {
    if (process.env.ENVIRONMENT !== 'prod') {
        require('longjohn');
        console.log('longjohn is enabled');
    }
    exports.client.start();
    console.log(`Server is running on port ${PORT}`);
});
