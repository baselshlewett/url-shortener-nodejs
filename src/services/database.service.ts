import mongoose from 'mongoose';
import dotenv from 'dotenv';

export async function connectToDatabase () {
    dotenv.config();
            
    await mongoose.connect(process.env.DB_CONN_STRING + process.env.DB_NAME);
}