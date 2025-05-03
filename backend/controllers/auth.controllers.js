import mongoose, { SchemaTypes } from "mongoose";
import User from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleSignIn = async(req, res) => {
  try {
    const credential = req.headers.authorization.split(' ')[1];
    const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    const { email, name, sub: googleId } = payload;

    let user = await User.findOne({ 
        $or: [{ email }, { googleId }] 
    });

    if (user) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        return res.status(200).json({ 
            success: true, 
            token,
            user: { _id: user._id, username: user.username, email: user.email }
        });
    }

    const username = email.split('@')[0];
    user = new User({
        username,
        email,
        googleId,
        authMethod: 'google'
    });

    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    return res.status(200).json({ 
        success: true, 
        token,
        user: { _id: user._id, username: user.username, email: user.email },
        isNewUser: true
    });

} catch (error) {
    res.status(500).json({ success: false, message: "Google authentication failed" });
}
}

export const signup = async(req, res) => {
    const { username, password } = req.body;

  try {
    if (!username || !password) {
      res.status(400).json({ success: false, message: "Please enter all fields" });
    }
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }
    const hashedPass = await bcrypt.hash(password, 10)
    const newUser = new User({ username, password: hashedPass });

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);

    await newUser.save();
    return res.status(201).json({ success: true, token, user: {_id:newUser._id,username:newUser.username} });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const login = async(req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (!existingUser) {
          return res.status(401).json({ success: false, message: "Invalid credentials" });
      }
        const match = await bcrypt.compare(password, existingUser.password)
        if (!match) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }
        const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET);
        return res.status(200).json({ 
            success: true, 
            token,
            user: { _id: existingUser._id, username: existingUser.username } 
          });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const verifyToken = async (req, res) => {
  try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
          return res.status(401).json({ success: false, message: "No token provided" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      const user = await User.findById(decoded.userId)
      
      if (!user) {
          return res.status(401).json({ success: false, message: "User not found" });
      }

      return res.status(200).json({ 
          success: true, 
          user: { _id: user._id, username: user.username } 
      });
  } catch (error) {
      return res.status(401).json({ success: false, message: "Invalid token" });
  }
};