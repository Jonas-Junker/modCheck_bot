import {client, model} from "../app";
import {ChatUserstate} from "tmi.js";

export const toxicityHandler = async (channel: any, tags: ChatUserstate, message: string, self: any) => {
    const predictions = await model.classify(message);
    console.info('toxic check')
    for (const element of predictions) {
        if(element.results[0].match){
            await client.say(channel, `Nicht so unfreundlich @${tags.username}`)
        }
    }
}
