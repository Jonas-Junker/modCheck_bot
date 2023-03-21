"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modcheck = void 0;
const app_1 = require("../app");
const modcheck = (channel) => {
    app_1.client.say(channel, "modCheck");
};
exports.modcheck = modcheck;
