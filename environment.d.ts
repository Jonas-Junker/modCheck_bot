declare global {
    namespace NodeJS {
        interface ProcessEnv {
            // Discord
            DISCORD_BOT_TOKEN: string;
            DISCORD_GUILD_ID: string;

            // Twitch
            TWITCH_USERNAME: string;
            TWITCH_OAUTH: string;
            TWITCH_CHANNEL: string;
            // MongoDB
            MONGO_DATABASE_URL: string;
            // App
            PORT: number;
            ENVIRONMENT: 'dev' | 'prod' | 'debug';

        }
    }
}
