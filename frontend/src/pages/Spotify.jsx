// src/pages/Spotify.jsx
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Spotify = () => {
    return (
        <Box
            sx={{
                color: 'white',
                backgroundColor: '#111',
                borderRadius: 2,
                p: 3,
                textAlign: 'center',
                mt: 4,
                mb:4
            }}
        >
            <title>Spotify</title>
            <Typography variant="h4" gutterBottom>
                🎵 Spotify Player
            </Typography>
            <Typography variant="body1">
                Spotify integration coming soon...
            </Typography>
        </Box>
    );
};

export default Spotify;
