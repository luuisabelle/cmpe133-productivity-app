import jwt from 'jsonwebtoken';
import axios from "axios";
import User from "../models/user.model.js";

export const refreshSpotifyToken = async (req, res, next) => {
  const user = await User.findById(req.userId);
  if (!user?.spotifyRefreshToken) return next();

  try {
    const { data } = await axios.post(
      "https://accounts.spotify.com/api/token",
      querystring.stringify({
        grant_type: "refresh_token",
        refresh_token: user.spotifyRefreshToken,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(
            `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
          ).toString("base64")}`,
        },
      }
    );

    user.spotifyAccessToken = data.access_token;
    await user.save();
    next();
  } catch (error) {
    console.error("Token refresh failed:", error);
    next(); //Continue, even if  the refresh fails
  }
};
export const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; 
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};