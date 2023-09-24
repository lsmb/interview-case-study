import mongoose from "mongoose";
import 'dotenv/config'
import { app } from "./app";

mongoose.set("strictQuery", false);

const mongoDB = process.env.MONGODB_URL || "mongodb://127.0.0.1/case_study";

// Wait for database connection. Log error if fails.
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(mongoDB);
  app
}

