import mongoose from "mongoose";
import {Twitch_User_Schema} from "./Twitch_User";

const Twitch_Mods_Schema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    mods: {
        type: Twitch_User_Schema,
        default: () => ({})
    }
});

export const ModsOnChannel = mongoose.model('Mods', Twitch_Mods_Schema, 'mods');
