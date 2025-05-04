import React, { useState } from 'react'
import { Button, Box, Typography, IconButton, CircularProgress } from '@mui/material'
import { useAuth } from '../contexts/AuthContext'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'

const Spotify = () => {
    const {
        currentUser,
        spotifyConnected,
        setSpotifyConnected,
        token
    } = useAuth()

    const [isPlaying, setIsPlaying] = useState(false)
    const [loading, setLoading] = useState(false)

    const connectSpotify = async () => {
        setLoading(true)
        try {
            const response = await fetch('http://localhost:5000/api/spotify/auth', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const { url } = await response.json()
            window.location.href = url
        } catch (error) {
            console.error("Connection failed:", error)
            setLoading(false)
        }
    }

    const disconnectSpotify = async () => {
        try {
            await fetch('http://localhost:5000/api/spotify/disconnect', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setSpotifyConnected(false)
        } catch (error) {
            console.error("Disconnect failed:", error)
        }
    }

    const handlePlayPause = async () => {
        try {
            await fetch('http://localhost:5000/api/spotify/play', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    action: isPlaying ? 'pause' : 'play'
                })
            })
            setIsPlaying(!isPlaying)
        } catch (error) {
            console.error("Playback error:", error)
        }
    }

    return (
        <Box sx={{
            color: 'white',
            backgroundColor: '#111',
            borderRadius: 2,
            p: 3,
            textAlign: 'center',
        }}>
            <Typography variant="h4" gutterBottom>
                🎵 Spotify Player
            </Typography>

            {spotifyConnected ? (
                <>
                    <IconButton
                        onClick={handlePlayPause}
                        sx={{ color: 'white', fontSize: '3rem' }}
                    >
                        {isPlaying ? <PauseIcon fontSize="inherit"/> : <PlayArrowIcon fontSize="inherit"/>}
                    </IconButton>
                    <Button
                        variant="outlined"
                        onClick={disconnectSpotify}
                        sx={{ mt: 2, color: 'white', borderColor: 'white' }}
                    >
                        Disconnect Spotify
                    </Button>
                </>
            ) : (
                <Button
                    variant="contained"
                    onClick={connectSpotify}
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} color="inherit"/> : null}
                    sx={{ mt: 2 }}
                >
                    {loading ? 'Connecting...' : 'Connect Spotify'}
                </Button>
            )}
        </Box>
    )
}

export default Spotify