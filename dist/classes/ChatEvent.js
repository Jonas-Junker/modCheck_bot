"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatEvent = void 0;
class ChatEvent {
    event;
    run;
    constructor(event, run) {
        this.event = event;
        this.run = run;
    }
}
exports.ChatEvent = ChatEvent;
