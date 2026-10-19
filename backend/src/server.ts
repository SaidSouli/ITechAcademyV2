import express from "express";
import "dotenv/config";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import courseRoutes from "./routes/course.routes.js";


const app  = express();

app.use(cors({origin:"http://localhost:5173",
    credentials:true
}));


app.use(express.json());
app.use("/api/auth", authRoutes);

app.use("/api/courses",courseRoutes);


const PORT = process.env.PORT; 

app.listen(PORT, () =>{
    console.log(`listening on : http://127.0.0.1:${PORT}`);
});