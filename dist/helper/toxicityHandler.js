"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleToxicity = void 0;
const app_1 = require("../app");
const Client_1 = require("../classes/Client");
const handleToxicity = async (channel, tags, message, self) => {
    if (self)
        return;
    const predictions = await Client_1.model.classify(message);
    for (const element of predictions) {
        if (element.results[0].match) {
            await app_1.client.say(channel, `Nicht so unfreundlich @${tags.username}`);
        }
    }
};
exports.handleToxicity = handleToxicity;
