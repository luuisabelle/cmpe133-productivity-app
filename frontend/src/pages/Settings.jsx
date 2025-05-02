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
import SecurityIcon from '@mui/icons-material/Security';

const Settings = () => {
    const [selectedSection, setSelectedSection] = useState('preferences');
    const [theme, setTheme] = useState('minimalistic');
    const [language, setLanguage] = useState('en');
    const [autoTimezone, setAutoTimezone] = useState(true);
    const [privacyConsent, setPrivacyConsent] = useState(true);

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
                <title>Settings</title>
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
                                <MenuItem value="minimalistic">Minimalistic</MenuItem>
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

                {selectedSection === 'privacy' && (
                    <>
                        <Typography variant="h6">Privacy</Typography>
                        <Typography variant="body2" sx={{ color: '#ccc' }}>
                            Manage your data preferences below.
                        </Typography>

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={privacyConsent}
                                    onChange={() => setPrivacyConsent(!privacyConsent)}
                                />
                            }
                            label="Do not sell my data"
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
                    width: '800px',
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

                        <ListItemButton
                            selected={selectedSection === 'privacy'}
                            onClick={() => setSelectedSection('privacy')}
                        >
                            <ListItemIcon>
                                <SecurityIcon sx={{ color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText primary="Privacy" />
                        </ListItemButton>
                    </List>
                </Box>

                <Box
                    sx={{
                        width: 500,
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
