import mongoose from "mongoose";

const mongourl = process.env.MONGODB_URI;

if(!mongourl) {
  throw new Error("MONGODB_URI is not defined in .env file");
}

async function connectToDatabase() {
    if(mongoose.connection.readyState === 1) {
        return mongoose;
    }

    const opts = {
        bufferCommands: false,
    }
    await mongoose.connect(mongourl, opts).catch((err) => {
        console.log(err);
    }); 
    return mongoose;
}

export default connectToDatabase;   
