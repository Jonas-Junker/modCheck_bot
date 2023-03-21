"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.twitch_router = void 0;
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const app_1 = require("../app");
exports.twitch_router = express_1.default.Router();
exports.twitch_router.get('/mods/:channel', async (req, res) => {
    try {
        const channel = req.params.channel;
        app_1.client.mods(channel).then(mods => {
            res.status(200)
                .json({ "data": {
                    "mods": mods,
                    "channel": channel,
                    "count": mods.length
                } });
        });
    }
    catch (e) {
        console.error(e);
        res.status(500);
        res.end("Internal Server Error");
    }
});
