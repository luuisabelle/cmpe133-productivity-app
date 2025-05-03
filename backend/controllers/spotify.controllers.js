import axios from "axios";
import querystring from "querystring";
import User from "../models/user.model.js";

const SPOTIFY_API = "https://api.spotify.com/v1";

// Helper(Exchange authorizarion code for tokens)
const getSpotifyTokens = async (code) => {
  const { data } = await axios.post(
    "https://accounts.spotify.com/api/token",
    querystring.stringify({
      grant_type: "authorization_code",
      code,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
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
  return data;
};

export const getAuthURL = (req, res) => {
  const scopes = "user-read-playback-state user-modify-playback-state";
  const url = `https://accounts.spotify.com/authorize?${querystring.stringify({
    response_type: "code",
    client_id: process.env.SPOTIFY_CLIENT_ID,
    scope: scopes,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
    state: req.userId, // From JWT middleware
  })}`;
  res.json({ url });
};

export const callback = async (req, res) => {
  try {
    const { code, state: userId } = req.query;
    const tokens = await getSpotifyTokens(code);

    //saving the tokens to the user document
    await User.findByIdAndUpdate(userId, {
      spotifyAccessToken: tokens.access_token,
      spotifyRefreshToken: tokens.refresh_token,
    });

    res.redirect(`${process.env.FRONTEND_URL}/spotify-success`); //    Redirect to frontend
  } catch (error) {
    console.error("Spotify callback error:", error);
    res.status(500).json({ error: "Spotify authentication failed" });
  }
};

export const playTrack = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user?.spotifyAccessToken) {
      return res.status(401).json({ error: "Spotify not connected" });
    }

    const { data } = await axios.put(
      `${SPOTIFY_API}/me/player/play`,
      { uris: [req.body.trackUri] },
      {
        headers: {
          Authorization: `Bearer ${user.spotifyAccessToken}`,
        },
      }
    );

    res.json(data);
  } catch (error) {
    console.error("Play track error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to play track" });
  }
};