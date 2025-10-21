import { connect, disconnect } from "mongoose";
import { config } from "dotenv";

config();

async function connectDB() {
  try {
    console.log("Opening connection");
    console.log(process.env.MONGO_URI + "/" + process.env.DB_NAME);
    const conn = await connect(
      process.env.MONGO_URI + "/" + process.env.DB_NAME
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    disconnect();
    console.error(err);
    process.exit(1);
  }
}

export default connectDB;
