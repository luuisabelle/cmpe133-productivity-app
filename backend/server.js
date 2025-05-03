import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from './config/db.js';
import noteRoutes from './routes/note.route.js';
import scheduleRoutes from './routes/schedule.route.js';
import todoRoutes from './routes/todo.route.js';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.routes.js'
import spotifyRoutes from './routes/spotify.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(cors());

app.use("/api/notes", noteRoutes);
app.use("/api/schedules", scheduleRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use(express.urlencoded({ extended: true }));


app.use("/api/spotify", spotifyRoutes);
app.get("/", (req, res) => {
    res.send("hi");
}) 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something broke!" });
});
app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT);
})
