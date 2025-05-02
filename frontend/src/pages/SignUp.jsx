import { Box, Button, Dialog, DialogContent, DialogContentText, DialogTitle, Paper, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import GoogleIcon from '@mui/icons-material/Google';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { GoogleLogin } from '@react-oauth/google';

const SignUp = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('')
  const [pass, setPass] = useState('')
  const [dialog, setDialog] = useState(false)
  const [users, setUsers] = useState([])
  const { signup, googleSignIn } = useAuth()

  const handleSignup = async () => {
   const success = await signup(username, pass)
   if (!success) {
        setDialog(true)
        setUsername('')
        setPass('')
   }
  }
  
  return (
    <Box>
    <title>Sign Up</title>
    <Dialog open={dialog}><DialogTitle>Notice</DialogTitle><DialogContent><DialogContentText> Username is already taken, please try again.</DialogContentText></DialogContent>
      <Button onClick={() => setDialog(false)}>
        Close
      </Button>
    </Dialog>
    <Paper align="center" sx={{display:"flex", flexDirection:"column", gap:2, padding:3}}>
    <Typography>Sign Up</Typography>
    <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
    <TextField label="Password" type="password" value={pass} onChange={(e) => setPass(e.target.value)}/>
      <Link to ="/signin">Already have an account?</Link>
    <Button variant="contained" onClick={handleSignup}>Register</Button>
    <GoogleLogin onSuccess={googleSignIn}/>
    {/*<Stack spacing={2} mt={3}>
                <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<GoogleIcon />}
                    onClick={() => {
                        console.log('Google Sign-In clicked');
                        navigate('/'); // redirect to homepage
                    }}
                >
                    Sign in with Google
                </Button>
            </Stack>*/}
    </Paper>
    </Box>
  )
}

export default SignUp