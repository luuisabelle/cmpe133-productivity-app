import express from "express";
import { createNote, deleteNote, updateNote, getAllNotes, getNote, getUserNotes } from "../controllers/note.controllers.js";
import { authenticate } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", authenticate, getUserNotes);

router.get("/:id", getNote);

router.post("/", authenticate, createNote);

router.delete("/:id", deleteNote);

router.put("/:id", updateNote);

export default router;