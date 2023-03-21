import mongoose from "mongoose";

const Twitch_User_Schema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    login: {
        type: String,
        required: true,
    },
    display_name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: false,
    },
    broadcaster_type: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    profile_image_url: {
        type: String,
        required: false,
    },
    offline_image_url: {
        type: String,
        required: false,
    },
    view_count: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: false,
    },
    created_at: {
        type: String,
        required: true,
    }
});

export const TwitchUser =  mongoose.model('User', Twitch_User_Schema, 'user');
