import React, { useState } from 'react';
import { Box, IconButton, TextField, Typography, Paper, Fade } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CloseIcon from '@mui/icons-material/Close';

const Chatbot = () => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([{ sender: 'bot', text: 'Hi, how may I help you?' }]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages([...messages, { sender: 'user', text: input }]);
        setInput('');

        // Fake bot reply
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                { sender: 'bot', text: 'I’m here to help with anything you need!' }
            ]);
        }, 600);
    };

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 24,
                right: 24,
                zIndex: 9999,
            }}
        >
            {!open ? (
                <IconButton
                    onClick={() => setOpen(true)}
                    sx={{ backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: '#333' } }}
                >
                    <ChatBubbleOutlineIcon />
                </IconButton>
            ) : (
                <Fade in={open}>
                    <Paper
                        elevation={4}
                        sx={{
                            width: 300,
                            height: 400,
                            display: 'flex',
                            flexDirection: 'column',
                            p: 1,
                            backgroundColor: '#1e1e1e',
                            color: 'white',
                            borderRadius: 2,
                        }}
                    >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 1 }}>
                            <Typography variant="subtitle1">AI Bot</Typography>
                            <IconButton size="small" onClick={() => setOpen(false)} sx={{ color: 'white' }}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Box>
                        <Box
                            sx={{
                                flex: 1,
                                overflowY: 'auto',
                                px: 1,
                                py: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1,
                            }}
                        >
                            {messages.map((msg, i) => (
                                <Box
                                    key={i}
                                    sx={{
                                        alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                        backgroundColor: msg.sender === 'user' ? '#1976d2' : '#333',
                                        borderRadius: 2,
                                        px: 1.5,
                                        py: 1,
                                        maxWidth: '80%',
                                        fontSize: 14,
                                    }}
                                >
                                    {msg.text}
                                </Box>
                            ))}
                        </Box>
                        <Box sx={{ display: 'flex', p: 1 }}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                placeholder="Type..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                InputProps={{
                                    sx: {
                                        backgroundColor: 'white',
                                        borderRadius: 1,
                                        pr: 1,
                                    },
                                }}
                            />
                            <IconButton onClick={handleSend} sx={{ color: 'white', ml: 1 }}>
                                <SendIcon />
                            </IconButton>
                        </Box>
                    </Paper>
                </Fade>
            )}
        </Box>
    );
};

export default Chatbot;
