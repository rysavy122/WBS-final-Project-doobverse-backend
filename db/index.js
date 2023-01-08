import * as dotenv from 'dotenv'
import mongoose from 'mongoose';

dotenv.config()

const db = process.env.MONGO_URI;

try{
    const client = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to MongoDB @ ${client.connection.host}`);
} catch (error) {
    console.log(error);
    process.exit();
}
