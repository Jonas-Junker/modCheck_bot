import mongoose from "mongoose";

export class ExtendedDb {

    private mongoString = process.env.MONGO_DATABASE_URL as string;
    private options = {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        family: 4,
        useNewUrlParser: true,
    }

    constructor() {
        mongoose.set('bufferCommands', false);
        mongoose.set('strictQuery', true);
    }

    async init() {
        await this.initMongo().then(() => {
            return mongoose.connection
        })
    }

    private async initMongo() {
        return mongoose.connect(this.mongoString, this.options)
            .catch((err) => {
                console.log(err)
            })
    }


}
