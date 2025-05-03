import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    googleId: {
        type: String,
        unique: true
    },
    authMethod: { 
        type: String, 
        enum: ['local', 'google'], 
        default: 'local' 
    },
    picture: {
        type: String
    },
    spotifyAccessToken: String,
    spotifyRefreshToken: String,

}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema);

export default User;