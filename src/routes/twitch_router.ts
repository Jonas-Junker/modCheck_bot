import express, {Request, Response} from "express";
import {client} from "../app";
import {TwitchUser} from "../models/TwitchUser";

const twitch_router = express.Router();

// Get all mods of a channel
twitch_router.get('/mods/:channel', async (req: Request, res: Response) => {
    try {
        const channel = req.params.channel;
        client.mods(channel).then(mods => {
            res.status(200)
                .json({
                    "data": {
                        "mods": mods,
                        "channel": channel,
                        "count": mods.length
                    }
                })
        }).catch(e => {
            res.status(500)
                .json({"error": e})
        })
    } catch (e) {
        console.error(e);
        res.status(500);
        res.end("Internal Server Error");
    }
});

export default twitch_router;
