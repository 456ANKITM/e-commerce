import mongoose from "mongoose";

async function connectDB(){
    try{
      const connection = await mongoose.connect(process.env.MONGODB_URI);
      console.log("connected to DB")
    }catch(err){
      console.log("Error Connecting to DB: ", err.message);
      process.exit(1);
    }
}

export default connectDB;
