import express from "express";
import { createNote, deleteNote, updateNote } from "../controllers/note.controllers.js";

const router = express.Router();

router.post("/", createNote);

router.delete("/:id", deleteNote);

router.put("/:id", updateNote);

export default router;