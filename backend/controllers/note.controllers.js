import mongoose from "mongoose";
import Note from "../models/note.model.js";

export const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find({});
        res.status(200).json({ success: true, data: notes});
    } catch (error) {
        console.error("Cannot get notes.", error.message);
        res.status(500).json({ success: false, message: "Server Error"})
    }
};

export const getUserNotes = async (req, res) => {
    try {
        const userId = req.userId;
        const notes = await Note.find({userId});
        res.status(200).json({ success: true, data: notes});
    } catch (error) {
        console.error("Cannot get notes.", error.message);
        res.status(500).json({ success: false, message: "Server Error"})
    }
};

export const getNote = async (req, res) => {
    try {
        const {id} = req.params;
        const note = await Note.findById(id);
        res.status(200).json({ success: true, data: note});
    } catch (error) {
        console.error("Cannot get note.", error.message);
        res.status(500).json({ success: false, message: "Server Error"})
    }
};


export const createNote = async (req, res) => {
    try{
    const { name, content } = req.body;
    const newNote = await Note.create({name, content, userId: req.userId});
        res.status(201).json({ success: true, data: newNote});
    }
    catch (error) {
        console.error("Cannot create new note.", error.message);
        res.status(500).json({ success: false, message: "Server Error"})
    }
};

export const deleteNote = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Note not found"})
    }

    try {
        await Note.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Note deleted"});
    } catch(error) {
        res.status(500).json({ success: false, message: "Server Error"});
    }
};

export const updateNote = async (req, res) => {
    const { id } = req.params;
    const note = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Note not found"})
    }

    try {
        const newNote = await Note.findByIdAndUpdate(id, note, {new:true});
        res.status(201).json({ success: true, data: newNote});
    } catch(error) {
        res.status(500).json({ success: false, message: "Server Error"});
    }
};