import express from "express";
import "dotenv/config";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";


const app  = express();

app.use(cors({origin:"http://localhost:5173"}));

app.get("/api/test",(req,res)=>{
    res.send("hello");
})

app.use(express.json());
app.use("/api/auth", authRoutes)

const PORT = process.env.PORT 

app.listen(PORT, () =>{
    console.log(`listening on : http://127.0.0.1:${PORT}`);
});