import tmi from "tmi.js";

export class ChatEvent<Key extends keyof tmi.Events> {
    constructor(public event: Key, public run: (...args: never) => any) {
    }
}
