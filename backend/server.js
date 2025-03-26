import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from './config/db.js';
import noteRoutes from './routes/note.route.js';
import scheduleRoutes from './routes/schedule.route.js';
import todoRoutes from './routes/todo.route.js';
 
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(cors());

app.use("/api/notes", noteRoutes);
app.use("/api/schedules", scheduleRoutes);
app.use("/api/todos", todoRoutes);

app.get("/", (req, res) => {
    res.send("hi");
}) 

app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT);
})
