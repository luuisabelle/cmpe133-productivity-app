import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import Avatar from '@mui/material/Avatar';
import SettingsIcon from '@mui/icons-material/Settings';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        variants: [
            {
                props: ({ open }) => open,
                style: {
                    transition: theme.transitions.create('margin', {
                        easing: theme.transitions.easing.easeOut,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                    marginLeft: 0,
                },
            },
        ],
    })
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
    backgroundColor: 'black',
    color: 'white',
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({ open }) => open,
            style: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: `${drawerWidth}px`,
                transition: theme.transitions.create(['margin', 'width'], {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    backgroundColor: 'gray',
    color: 'white',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const [showTimer, setShowTimer] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={[{ mr: 2 }, open && { display: 'none' }]}
                    >
                        <KeyboardDoubleArrowRightIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Productivity App
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CloudDoneIcon fontSize="small" sx={{ color: 'white' }} />
                        <Typography variant="body2" sx={{ color: 'white' }}>
                            Saved
                        </Typography>
                    </Box>
                </Toolbar>
            </AppBar>

            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        backgroundColor: '#1a1a1a',
                        color: 'white',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose} sx={{ color: 'white' }}>
                        {theme.direction === 'ltr' ? (
                            <KeyboardDoubleArrowLeftIcon />
                        ) : (
                            <KeyboardDoubleArrowRightIcon />
                        )}
                    </IconButton>
                </DrawerHeader>

                {/* Profile section */}
                <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Avatar
                        alt="Google User"
                        src="https://lh3.googleusercontent.com/a/your-google-photo-id"
                        sx={{ width: 56, height: 56, mx: 'auto', mb: 1 }}
                    />
                    <Typography variant="subtitle1" sx={{ color: 'white' }}>
                        Google User
                    </Typography>
                </Box>

                {/* Settings button */}
                <List sx={{ px: 1 }}>
                    <ListItemButton
                        onClick={() => navigate('/settings')}
                        sx={{
                            border: '1px solid white',
                            borderRadius: 1,
                            color: 'white',
                            '&:hover': {
                                backgroundColor: '#222',
                            },
                        }}
                    >
                        <ListItemIcon>
                            <SettingsIcon sx={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText primary="Settings" />
                    </ListItemButton>
                </List>

                <Divider sx={{ my: 2, borderColor: '#fff' }} />

                {/* Labels */}
                <FormGroup sx={{ pl: 2 }}>
                    <FormControlLabel
                        control={<Checkbox defaultChecked sx={{ color: 'white' }} />}
                        label="Label 1"
                        sx={{ color: 'white', }}
                    />
                    <FormControlLabel
                        control={<Checkbox defaultChecked sx={{ color: 'white' }} />}
                        label="Label 2"
                        sx={{ color: 'white' }}
                    />
                    <FormControlLabel
                        control={<Checkbox defaultChecked sx={{ color: 'white' }} />}
                        label="Label 3"
                        sx={{ color: 'white' }}
                    />
                </FormGroup>
            </Drawer>

            <Main open={open}></Main>
        </Box>
    );
}
