import express from "express";
import { createNote, getNotesByUser, deleteNote, updateNote, getAllNotes, getNote } from "../controllers/note.controllers.js";

const router = express.Router();

router.get("/", getAllNotes);

router.get("/", getNotesByUser);

router.get("/:id", getNote);

router.post("/", createNote);

router.delete("/:id", deleteNote);

router.put("/:id", updateNote);

export default router;