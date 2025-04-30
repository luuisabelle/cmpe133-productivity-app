import express from "express";
import { createTodo, getTodosByUser, deleteTodo, getAllTodos, updateTodo } from "../controllers/todo.controllers.js";
import { get } from "mongoose";

const router = express.Router();

router.get("/", getAllTodos);

router.get("/", getTodosByUser);

router.post("/", createTodo);

router.delete("/:id", deleteTodo);

router.put("/:id", updateTodo);

export default router;