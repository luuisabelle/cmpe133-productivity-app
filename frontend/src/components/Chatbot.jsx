import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Box, IconButton, TextField, Typography, Paper, Fade } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CloseIcon from '@mui/icons-material/Close';
import SmartToyIcon from '@mui/icons-material/SmartToy';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

const Chatbot = () => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'Hi, how may I help you?' }
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const fetchBotReply = async (userText) => {
        try {
            const res = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-3.5-turbo',
                    max_tokens: 150,
                    messages: [
                        { role: 'system', content: 'Answer briefly unless asked for detail.' },
                        { role: 'user', content: userText }
                    ],
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${apiKey}`,
                    },
                }
            );
            return res.data.choices[0].message.content.trim();
        } catch (err) {
            console.error('OpenAI API Error:', err.response?.data || err.message);
            return "Sorry, I couldn't get a response.";
        }
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        const question = input;
        setMessages((prev) => [...prev, { sender: 'user', text: question }]);
        setInput('');

        const botText = await fetchBotReply(question);
        setMessages((prev) => [...prev, { sender: 'bot', text: botText }]);
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <Box sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999 }}>
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
                            <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <SmartToyIcon fontSize="small" /> TaskBuddy AI
                            </Typography>
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
                                        wordBreak: 'break-word',
                                    }}
                                >
                                    {msg.text}
                                </Box>
                            ))}

                            <div ref={messagesEndRef} />
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
                                    sx: { backgroundColor: 'white', borderRadius: 1, pr: 1 },
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
