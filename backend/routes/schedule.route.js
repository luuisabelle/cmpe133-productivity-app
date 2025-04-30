import express from "express";
import { createSchedule, deleteSchedule, updateSchedule, getAllSchedules } from "../controllers/schedule.controllers.js";
import { get } from "mongoose";

const router = express.Router();

router.get("/", getSchedulesByUser); 
router.get("/", getAllSchedules);

router.post("/", createSchedule);

router.delete("/:id", deleteSchedule);

router.put("/:id", updateSchedule);

export default router;