"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedClient = exports.model = void 0;
const tslib_1 = require("tslib");
const tmi_js_1 = tslib_1.__importDefault(require("tmi.js"));
const glob_1 = tslib_1.__importDefault(require("glob"));
const util_1 = require("util");
const tf = tslib_1.__importStar(require("@tensorflow/tfjs"));
const toxicity = tslib_1.__importStar(require("@tensorflow-models/toxicity"));
const commandHandler_1 = require("../helper/commandHandler");
const toxicityHandler_1 = require("../helper/toxicityHandler");
// Tensorflow
const treshold = 0.9;
const labels = ['identity_attack', 'insult', 'threat'];
const globPromise = (0, util_1.promisify)(glob_1.default);
class ExtendedClient extends tmi_js_1.default.Client {
    app;
    constructor() {
        super({
            options: { debug: true, messagesLogLevel: "info" },
            connection: {
                reconnect: true,
                secure: true
            },
            identity: {
                username: `${process.env.TWITCH_USERNAME}`,
                password: `${process.env.TWITCH_OAUTH}`
            },
            channels: [`${process.env.TWITCH_CHANNEL}`]
        });
    }
    async start() {
        await this.initModel();
        await this.registerModules();
        await this.connect().catch(console.error);
    }
    async initModel() {
        tf.setBackend('cpu');
        exports.model = await toxicity.load(treshold, labels);
    }
    async importFile(filePath) {
        var _a;
        return (await (_a = filePath, Promise.resolve().then(() => tslib_1.__importStar(require(_a)))))?.default;
    }
    async registerModules() {
        // Chat
        this.addListener('message', toxicityHandler_1.handleToxicity);
        // Commands
        this.addListener('message', commandHandler_1.handleCommands);
    }
}
exports.ExtendedClient = ExtendedClient;
