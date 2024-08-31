import { connect, connection, set } from "mongoose";

const connectToDB = async () => {
  set("strictQuery", true);
  // set('debug', true);
  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI environment variable is not defined.");
    process.exit(1);
  }

  if (connection.readyState === 1) {
    console.log("Already connected to MongoDB!");
    return;
  }

  try {
    const options = {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    await connect(process.env.MONGODB_URI, options);
    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectToDB;
