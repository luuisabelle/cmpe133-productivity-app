import axios from 'axios'
import User from '../models/user.model.js'

export const getAuthURL = (req, res) => {
    const scopes = 'user-read-playback-state user-modify-playback-state'
    const url = `https://accounts.spotify.com/authorize?${new URLSearchParams({
        response_type: 'code',
        client_id: process.env.SPOTIFY_CLIENT_ID,
        scope: scopes,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
        state: req.userId
    })}`
    res.json({ url })
}

export const callback = async (req, res) => {
    try {
        const { code, state: userId } = req.query

        const { data } = await axios.post('https://accounts.spotify.com/api/token', new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            redirect_uri: process.env.SPOTIFY_REDIRECT_URI
        }), {
            headers: {
                'Authorization': `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })

        await User.findByIdAndUpdate(userId, {
            spotifyAccessToken: data.access_token,
            spotifyRefreshToken: data.refresh_token
        })

        res.redirect('http://localhost:5000/spotify-success')
    } catch (error) {
        console.error("Spotify callback error:", error.response?.data || error.message)
        res.status(500).json({ error: "Authentication failed" })
    }
}

export const playTrack = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        if (!user?.spotifyAccessToken) {
            return res.status(401).json({ error: "Spotify not connected" })
        }

        const { action, trackUri } = req.body
        const endpoint = `https://api.spotify.com/v1/me/player/${action === 'pause' ? 'pause' : 'play'}`

        await axios({
            method: action === 'pause' ? 'PUT' : 'PUT',
            url: endpoint,
            headers: {
                'Authorization': `Bearer ${user.spotifyAccessToken}`,
                'Content-Type': 'application/json'
            },
            data: trackUri ? { uris: [trackUri] } : {}
        })

        res.json({ success: true })
    } catch (error) {
        console.error("Playback error:", error.response?.data || error.message)
        res.status(500).json({ error: "Playback failed" })
    }
}

export const disconnect = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.userId, {
            $unset: {
                spotifyAccessToken: "",
                spotifyRefreshToken: ""
            }
        })
        res.json({ success: true })
    } catch (error) {
        console.error("Disconnect error:", error)
        res.status(500).json({ error: "Disconnect failed" })
    }
}