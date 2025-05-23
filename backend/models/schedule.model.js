import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    
    start: {
        type: Date,
        required: true
    },

    end: {
        type: Date,
        required: false
    },
    userId: {
            type: mongoose.Schema.Types.ObjectId, 
            required: true
        }

}, {
    timestamps: true
})

const Schedule = mongoose.model('Schedule', scheduleSchema);

export default Schedule;