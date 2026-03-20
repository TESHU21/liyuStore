import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`Successfully connected to mongoDB 👍`);
    console.log(`MongoDB Host: ${conn.connection.host}`);
  } catch (error) {
    console.error(`ERROR: ${error.message}`);

    // Retry connection after 5 seconds
    setTimeout(() => {
      console.log("Retrying MongoDB connection...");
      connectDB();
    }, 5000);
  }
};

export default connectDB;
