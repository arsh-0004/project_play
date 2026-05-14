import express from "express";
import { dbConnect } from "./config/db/db_con.js";
import authRouter from "./routes/auth.routes.js"
import cors from "cors";


const app = express()
app.use(express.json())

app.use(cors({
  origin: "http://localhost:3000"
}));

dbConnect()

app.use("/auth",authRouter)

app.listen(3600,()=>{
    console.log("Server is running on port 3600");
});
