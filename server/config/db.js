import mongoose from "mongoose";

export async function connectDB() {
  try {
    const dbConnection = await mongoose.connect(process.env.MONGO_URI);
    if(dbConnection){
      console.log("MongoDB Connected Successfully");
    } else {
      throw new Error("Failed to connect to db")
    }
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
}
