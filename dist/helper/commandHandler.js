"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCommands = void 0;
const modcheck_1 = require("../commands/modcheck");
const handleCommands = (channel, tags, message, self) => {
    if (self)
        return;
    const commandString = message.toLowerCase().split(' ');
    switch (commandString[0]) {
        case 'modcheck':
            (0, modcheck_1.modcheck)(channel);
            break;
        default:
            break;
    }
};
exports.handleCommands = handleCommands;
