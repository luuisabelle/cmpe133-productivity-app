import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true
    }

}, {
    timestamps: true
})

const Note = mongoose.model('Note', notesSchema);

export default Note;