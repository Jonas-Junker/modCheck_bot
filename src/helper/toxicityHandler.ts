import {client} from "../app";
import {model} from "../classes/Client";

export const handleToxicity = async (channel: any, tags: any, message: string, self: any) => {
    if (self) return;

    const predictions = await model.classify(message);
    for (const element of predictions) {
        if (element.results[0].match) {
            await client.say(channel, `Nicht so unfreundlich @${tags.username}`)
        }
    }
}
