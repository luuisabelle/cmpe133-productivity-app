import express from "express";
import { createTodo, deleteTodo, getUserTodos, updateTodo } from "../controllers/todo.controllers.js";
import { get } from "mongoose";
import { authenticate } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", authenticate, getUserTodos);

router.post("/", authenticate, createTodo);

router.delete("/:id", deleteTodo);

router.put("/:id", updateTodo);

export default router;