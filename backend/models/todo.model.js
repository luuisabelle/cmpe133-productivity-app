import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: false
    },
    userId: {
            type: mongoose.Schema.Types.ObjectId, 
            required: true
        },
        priority: {
            type: String
        }

}, {
    timestamps: true
})

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;