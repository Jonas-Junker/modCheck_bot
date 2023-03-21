import dotenv from 'dotenv';
import {ExtendedClient} from "./classes/Client";
import {ExtendedDb} from "./classes/ExtendedDb";
import mongoose from "mongoose";
import {colours} from "./classes/colors";
import ExpressApp from "./classes/ExpressApp";


// ############# ENVIRONMENT #############
dotenv.config();

// ############# DATABASE #############
mongoose.set('bufferCommands', false);
mongoose.set('strictQuery', true);

const mongoString = process.env.DATABASE_URL as string;
const options = {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4,
    useNewUrlParser: true,
}
export const db = new ExtendedDb();

mongoose.connect(mongoString, options)
const connection = mongoose.connection;

connection.on('error', (error) => {
    console.error('Error connecting to MongoDB', error)
    console.log(colours.reset)
})

connection.on('connected', () => {
    console.log(colours.fg.green ,'Connected to MongoDB')
    console.log(colours.reset)
})


export const client = new ExtendedClient()
export const testServer = new ExpressApp({config: {}})




// ############# APP START #############

client.start().then(() => {
    client.joinChannels();
})






