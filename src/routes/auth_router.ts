import express, {Request, Response} from "express";
import {TwitchUser} from "../models/TwitchUser";
import {client} from "../app";
import {TwitchAccount} from "../interfaces/twitch-account";

const auth_router = express.Router();
const Model = require('../Schema/Twitch_User');

auth_router.post('/user', async (req: Request, res: Response) => {
    const data = req.body as TwitchUser;
    const options = {upsert: true, new: true, setDefaultsOnInsert: true};

    Model.findOneAndUpdate({}, data, options)
        .then((dataToSave: TwitchAccount) => {
            client.connect().then(() => {
                client.say(dataToSave.display_name, `Hello ${dataToSave.display_name}!`)
            })
            res.status(200).json(dataToSave)
        }).catch((e: any) => {
        res.status(500).json({message: e.message})
    });
});

auth_router.get('/users', async (req: Request, res: Response) => {
    try {
        const data = await Model.find();
        res.status(200).json(data);
    } catch (e: any) {
        res.status(500).json({message: e.message})
    }
});

export default auth_router;
