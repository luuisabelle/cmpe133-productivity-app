import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Stack, TextField, Paper, Dialog, DialogTitle, DialogContent, DialogContentText } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const SignIn = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([])
    const [username, setUsername] = useState('')
    const [pass, setPass] = useState('')
    const [dialog, setDialog] = useState(false)
    const { login } = useAuth()

      const handleLogin = async () => {
        const success = await login(username, pass)
        if (!success) {
          setDialog(true)
        }
      }

    return (
        <Box>
        <title>Sign In</title>
        <Dialog open={dialog}><DialogTitle>Notice</DialogTitle><DialogContent><DialogContentText>Credentials are invalid.</DialogContentText></DialogContent>
      <Button onClick={() => setDialog(false)}>
        Close
      </Button>
    </Dialog>
        <Paper align="center" sx={{display:"flex", flexDirection:"column", gap:2, padding:3}}>
        <Typography>Sign In</Typography>
                <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <TextField label="Password" type='password' value={pass} onChange={(e) => setPass(e.target.value)}/>
                <Link to="/signup">Don't have an account?</Link>
                <Button variant="contained" onClick={handleLogin}>Sign In</Button>
        </Paper>
        <Box
            sx={{
                width: 350,
                backgroundColor: '#111',
                color: 'white',
                borderRadius: 2,
                p: 4,
                textAlign: 'center',
            }}
        >
            <Typography variant="h5" gutterBottom>
                Sign in to Continue
            </Typography>

            <Stack spacing={2} mt={3}>
                <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<GoogleIcon />}
                    sx={{
                        color: 'white',
                        borderColor: 'white',
                        '&:hover': {
                            backgroundColor: '#222',
                            borderColor: '#ccc',
                        },
                    }}
                    onClick={() => {
                        console.log('Google Sign-In clicked');
                        navigate('/'); // redirect to homepage
                    }}
                >
                    Sign in with Google
                </Button>
            </Stack>
        </Box>
        </Box>
    );
};

export default SignIn;
