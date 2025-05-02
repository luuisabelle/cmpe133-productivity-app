import express from "express";
import { get } from "mongoose";
import { googleSignIn, login, signup, verifyToken } from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.get("/verify", verifyToken);

router.post("/google", googleSignIn)

export default router;