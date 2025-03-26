import mongoose, { SchemaTypes } from "mongoose";
import Schedule from "../models/schedule.model.js";

export const getAllSchedules = async (req, res) => {
    try {
        const schedules = await Schedule.find({});
        res.status(201).json({ success: true, data: schedules});
    } catch (error) {
        console.error("Cannot get schedules.", error.message);
        res.status(500).json({ success: false, message: "Server Error"})
    }
};

export const createSchedule = async (req, res) => {
    const schedule = req.body;
    const newSchedule = new Schedule(schedule);
    try {
        await newSchedule.save();
        res.status(201).json({ success: true, data: newSchedule});
    } catch (error) {
        console.error("Cannot create new schedule.", error.message);
        res.status(500).json({ success: false, message: "Server Error"})
    }
};

export const deleteSchedule = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Schedule not found"})
    }

    try {
        await Schedule.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Schedule deleted"});
    } catch(error) {
        res.status(500).json({ success: false, message: "Server Error"});
    }
};

export const updateSchedule = async (req, res) => {
    const { id } = req.params;
    const schedule = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Schedule not found"})
    }

    try {
        const newSchedule = await Schedule.findByIdAndUpdate(id, schedule, {new:true});
        res.status(200).json({ success: true, data: newSchedule});
    } catch(error) {
        res.status(500).json({ success: false, message: "Server Error"});
    }
};