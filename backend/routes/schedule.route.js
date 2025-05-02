import express from "express";
import { createSchedule, deleteSchedule, updateSchedule, getUserSchedules } from "../controllers/schedule.controllers.js";
import { get } from "mongoose";
import { authenticate } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", authenticate, getUserSchedules);

router.post("/", authenticate, createSchedule);

router.delete("/:id", deleteSchedule);

router.put("/:id", updateSchedule);

export default router;