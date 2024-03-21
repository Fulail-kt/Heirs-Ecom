import mongoose from "mongoose";

const Database = async () => {
    try {
      const connection = await mongoose.connect(process.env.MONGODB_URI);
      console.log(`Connected to MongoDB`);
      return connection;
    } catch (error) {
      console.error("Error connecting to MongoDB:", error.message);
      process.exit(1)
    }
  };
  
  export default Database;