import React from 'react';
import { Box, Button, Typography, Stack } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const navigate = useNavigate();

    return (
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
    );
};

export default SignIn;
