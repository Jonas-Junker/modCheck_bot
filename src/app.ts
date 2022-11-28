import dotenv from 'dotenv';
import tmi, {ChatUserstate} from "tmi.js";
import * as tf from '@tensorflow/tfjs';
import * as toxicity from '@tensorflow-models/toxicity';
import "./events/toxicity";
import {modcheck} from "./commands/modcheck";
import {commandHandler} from "./helper/commandHandler";
import {toxicityHandler} from "./helper/toxicityHandler";


dotenv.config();

export const client = new tmi.Client({
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

// Tensorflow
const treshold = 0.9;
const labels = ['identity_attack', 'insult', 'threat'];

export let model: any = async () => {
    await tf.setBackend('gpu');
    return await toxicity.load(treshold, labels);
}

client.connect().catch(console.error);

client.on('message', async (channel, tags: ChatUserstate, message, self) => {
    if (self) return;

    if (message.startsWith('!'))
        commandHandler(channel, tags, message, self);

    toxicityHandler(channel, tags, message, self);

});


