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
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import BoltIcon from '@mui/icons-material/Bolt';
import { MenuItem, MenuList } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import Avatar from '@mui/material/Avatar';
import SettingsIcon from '@mui/icons-material/Settings';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    })
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    backgroundColor: 'black',
    color: 'white',
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    backgroundColor: 'gray',
    color: 'white',
    ...theme.mixins.toolbar,
    justifyContent: 'space-between',
}));

export default function PersistentDrawerLeft() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);

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
                        <MenuIcon />
                    </IconButton>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <BoltIcon sx={{ color: 'white', mr: 1 }} />

                        <Box>
                            <Typography
                                component="div"
                                fontFamily="serif"
                                fontWeight="600"
                                fontSize="25px"
                                variant="h6"
                                sx={{ color: 'white' }}
                            >
                                Rhythm
                            </Typography>
                            <Typography
                                component="div"
                                fontSize="13px"
                                fontStyle="italic"
                                sx={{ color: 'white', mt: -0.5 }}
                            >
                                Flow through your day with purpose.
                            </Typography>
                        </Box>
                    </Box>

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
                    <IconButton component={Link} to="/" sx={{ color: 'white', ml: 1 }}>
                        <HomeIcon />
                    </IconButton>
                    <IconButton onClick={handleDrawerClose} sx={{ color: 'white' }}>
                        {theme.direction === 'ltr' ? <KeyboardDoubleArrowLeftIcon /> : <KeyboardDoubleArrowRightIcon />}
                    </IconButton>
                </DrawerHeader>

                {/* Profile */}
                <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Avatar alt="Google User" sx={{ width: 56, height: 56, mx: 'auto', mb: 1 }} />
                    <Typography variant="subtitle1">Google User</Typography>

                    <List sx={{ mt: 2 }}>
                        <ListItemButton onClick={() => navigate('/settings')} sx={{ border: '1px solid white', borderRadius: 1 }}>
                            <ListItemIcon>
                                <SettingsIcon sx={{ color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText primary="Settings" />
                        </ListItemButton>
                    </List>
                </Box>

                {/* Linked Accounts */}
                <Box sx={{ px: 2 }}>
                    <Typography variant="subtitle2" sx={{ mt: 2, mb: 1, color: '#ccc' }}>Linked Accounts:</Typography>
                    <Typography
                        component="a"
                        href="https://notion.so"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ display: 'block', mb: 1, color: 'white', cursor: 'pointer' }}
                    >
                        Notion
                    </Typography>
                    <Typography
                        component="a"
                        href="https://drive.google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ display: 'block', mb: 1, color: 'white', cursor: 'pointer' }}
                    >
                        Google Drive
                    </Typography>
                </Box>

                <Divider sx={{ my: 2, borderColor: '#fff' }} />

                <MenuList>
                    <MenuItem component={Link} to="/notes">Notes</MenuItem>
                    <MenuItem component={Link} to="/scheduling">Scheduling</MenuItem>
                    <MenuItem component={Link} to="/todo">Task Management</MenuItem>
                </MenuList>
            </Drawer>

            <Main open={open} />
        </Box>
    );
}
