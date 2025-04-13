import React, { useState } from 'react';
import {
    Box,
    Typography,
    Divider,
    FormControl,
    Select,
    MenuItem,
    Switch,
    FormControlLabel,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
} from '@mui/material';

import SettingsIcon from '@mui/icons-material/Settings';
import LanguageIcon from '@mui/icons-material/Language';

const Settings = () => {
    const [selectedSection, setSelectedSection] = useState('preferences');
    const [theme, setTheme] = useState('dark');
    const [language, setLanguage] = useState('en');
    const [autoTimezone, setAutoTimezone] = useState(true);

    const renderSection = () => {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                    width: '100%',
                }}
            >
                {selectedSection === 'preferences' && (
                    <>
                        <Typography variant="h6">Preferences</Typography>
                        <FormControl fullWidth>
                            <Typography variant="body2" sx={{ color: '#ccc', mb: 1 }}>
                                Appearance
                            </Typography>
                            <Select
                                value={theme}
                                onChange={(e) => setTheme(e.target.value)}
                                sx={{ backgroundColor: '#1a1a1a', color: 'white' }}
                            >
                                <MenuItem value="dark">Dark</MenuItem>
                                <MenuItem value="light">Light</MenuItem>
                            </Select>
                        </FormControl>
                    </>
                )}

                {selectedSection === 'language' && (
                    <>
                        <Typography variant="h6">Language & Time</Typography>
                        <FormControl fullWidth>
                            <Typography variant="body2" sx={{ color: '#ccc', mb: 1 }}>
                                Language
                            </Typography>
                            <Select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                sx={{ backgroundColor: '#1a1a1a', color: 'white' }}
                            >
                                <MenuItem value="en">English</MenuItem>
                                <MenuItem value="es">Spanish</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={autoTimezone}
                                    onChange={() => setAutoTimezone(!autoTimezone)}
                                />
                            }
                            label="Set timezone automatically"
                            sx={{ color: 'white' }}
                        />
                    </>
                )}
            </Box>
        );
    };

    return (
        <Box
            sx={{
                display: 'flex',
                height: '100%',
                minHeight: '80vh',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    display: 'flex',
                    width: '800px', // Total width (sidebar + content)
                    minHeight: '500px',
                    backgroundColor: '#111',
                    color: 'white',
                    borderRadius: 2,
                    overflow: 'hidden',
                }}
            >

                <Box
                    sx={{
                        width: 300,
                        backgroundColor: '#1a1a1a',
                        p: 2,
                        borderRight: '1px solid #333',
                    }}
                >
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Settings
                    </Typography>
                    <List component="nav">
                        <ListItemButton
                            selected={selectedSection === 'preferences'}
                            onClick={() => setSelectedSection('preferences')}
                        >
                            <ListItemIcon>
                                <SettingsIcon sx={{ color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText primary="Preferences" />
                        </ListItemButton>
                        <ListItemButton
                            selected={selectedSection === 'language'}
                            onClick={() => setSelectedSection('language')}
                        >
                            <ListItemIcon>
                                <LanguageIcon sx={{ color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText primary="Language & Time" />
                        </ListItemButton>
                    </List>
                </Box>

                <Box
                    sx={{
                        width: 500, // Fixed width
                        p: 4,
                        backgroundColor: '#111',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                    }}
                >
                    {renderSection()}
                </Box>
            </Paper>
        </Box>
    );
};

export default Settings;
