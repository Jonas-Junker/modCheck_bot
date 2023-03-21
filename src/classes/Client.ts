import tmi from "tmi.js";
import glob from 'glob';
import {promisify} from 'util';
import * as tf from '@tensorflow/tfjs';
import * as toxicity from '@tensorflow-models/toxicity';
import {handleCommands} from "../helper/commandHandler";
import {handleToxicity} from "../helper/toxicityHandler";
import {TwitchUser} from "../Schema/Twitch_User";
import {Logger} from "../helper/Logger";

// Tensorflow
const treshold = 0.9;
const labels = ['identity_attack', 'insult', 'threat'];
export let model: any;

const globPromise = promisify(glob);

export class ExtendedClient extends tmi.Client {
    private app: any;

    constructor() {
        super({
            options: {debug: true, messagesLogLevel: "info"},
            connection: {
                reconnect: true,
                secure: true
            },
            identity: {
                username: `${process.env.TWITCH_USERNAME}`,
                password: `${process.env.TWITCH_OAUTH}`
            },

        });
    }

    async start() {
        // await this.initModel();
        Logger.info('Starting Client');
        await this.registerModules();
        await this.connect().catch(console.error)

    }

    private async initModel() {
        tf.setBackend('cpu');
        model = await toxicity.load(treshold, labels);
    }

    private async importFile(filePath: string) {
        return (await import(filePath))?.default;
    }

    private async registerModules() {
        // Chat
        this.addListener('message', handleToxicity);
        // Commands
        this.addListener('message', handleCommands);
    }

    public async joinChannels() {
        const User = TwitchUser;
        const filter = {};
        const all = User.find().cursor();

        await all.eachAsync(async (doc: any) => {
            await this.join(doc.display_name).catch(console.error);
        })
    }
}
