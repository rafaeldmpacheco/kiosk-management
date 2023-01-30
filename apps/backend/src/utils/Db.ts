import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export async function connectDatabase() {
  const DATABASE = 'mongodb://127.0.0.1:27017/kiosk';

  console.log(`Connecting: ${DATABASE}`);
  mongoose.set('strictQuery', true);
  mongoose.set('debug', false);

  await mongoose.connect(DATABASE);
}