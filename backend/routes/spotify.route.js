import express from "express";
import { authenticate, refreshSpotifyToken } from "../middlewares/auth.js";
import { getAuthURL, callback, playTrack } from "../controllers/spotify.controllers.js";



const router = express.Router();

router.get("/auth", authenticate, getAuthURL);
router.get("/callback", callback);
router.post("/play", authenticate, playTrack);
router.post("/play", authenticate, refreshSpotifyToken, playTrack);
export default router;