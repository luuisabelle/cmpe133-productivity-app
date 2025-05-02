import mongoose, { SchemaTypes } from "mongoose";
import User from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(201).json({ success: true, data: users});
    } catch (error) {
        console.error("Cannot get users.", error.message);
        res.status(500).json({ success: false, message: "Server Error"})
    }
};

export const createUser = async (req, res) => {
    const user = req.body;
    const newUser = new User(user);
    try {
        await newUser.save();
        res.status(201).json({ success: true, data: newUser});
    } catch (error) {
        console.error("Cannot create new user.", error.message);
        res.status(500).json({ success: false, message: "Server Error"})
    }
};

export const getUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        res.status(201).json({ success: true, data: user});
    } catch (error) {
        console.error("Cannot get user.", error.message);
        res.status(500).json({ success: false, message: "Server Error"})
    }
};