import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: false
    }

}, {
    timestamps: true
})

const Note = mongoose.model('Note', notesSchema);

export default Note;