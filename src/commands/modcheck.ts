import {client} from "../app";

export const modcheck = (channel: string) => {
    client.say(channel, "modCheck")
}
