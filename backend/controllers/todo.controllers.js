import mongoose, { SchemaTypes } from "mongoose";
import Todo from "../models/todo.model.js";

export const getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find({});
        res.status(201).json({ success: true, data: todos});
    } catch (error) {
        console.error("Cannot get todos.", error.message);
        res.status(500).json({ success: false, message: "Server Error"})
    }
};

export const getTodosByUser = async (req, res) => {
    try {
      const email = req.query.email;
      const todos = await Todo.find({ userEmail: email });
      res.status(200).json({ success: true, data: todos });
    } catch (error) {
      console.error("Cannot get todos by user:", error.message);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  };
  
  

export const createTodo = async (req, res) => {
    const todo = req.body;
    const newTodo = new Todo(todo);
    try {
        await newTodo.save();
        res.status(201).json({ success: true, data: newTodo});
    } catch (error) {
        console.error("Cannot create new todo.", error.message);
        res.status(500).json({ success: false, message: "Server Error"})
    }
};

export const deleteTodo = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "To-Do not found"})
    }

    try {
        await Todo.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "To-Do deleted"});
    } catch(error) {
        res.status(500).json({ success: false, message: "Server Error"});
    }
};

export const updateTodo = async (req, res) => {
    const { id } = req.params;
    const todo = req.body;
    
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "To-Do not found"})
    }

    try {
        const newTodo = await Todo.findByIdAndUpdate(id, todo, {new:true});
        res.status(200).json({ success: true, data: newTodo});
    } catch(error) {
        res.status(500).json({ success: false, message: "Server Error"});
    }
};