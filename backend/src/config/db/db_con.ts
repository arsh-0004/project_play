import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const dbConnect = async () =>{
    await mongoose.connect(`${process.env.MONGO_DB_URL}`)
    
    
    .then(() => {
        console.log(`Database connected successfully `);
    })
    .catch((err) => {
        console.error("Database connection error:", err);
    });

}


