import mongoose from "mongoose";
import Note from "../models/note.model.js";

export const createNote = async (req, res) => {
    const note = req.body;
    const newNote = new Note(note);
    try {
        await newNote.save();
        res.status(201).json({ success: true, data: newNote});
    } catch (error) {
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
        await Note.findByIdAndDeleted(id);
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
        const newNote = await Note.findByIdAndUpdated(id, note, {new:true});
        res.status(200).json({ success: true, data: newNote});
    } catch(error) {
        res.status(500).json({ success: false, message: "Server Error"});
    }
};