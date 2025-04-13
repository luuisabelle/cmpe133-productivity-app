import React from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import {Link} from 'react-router-dom';
import Calendar from '../components/Calendar';

const HomePage = () => {
  return (
    <Stack spacing={2} direction="row">
      <Button component={Link} to="/notes" variant="contained" sx={{ backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: '#222' } }}>Notes</Button>
      <Button component={Link} to="/scheduling" variant="contained" sx={{ backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: '#222' } }}>Scheduling</Button>
      <Button component={Link} to="/todo" variant="contained" sx={{ backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: '#222' } }}>To-Do List</Button>
      <Button component={Link} to="/timer" variant="contained" sx={{ backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: '#222' } }}>Timer</Button>
      <Button component={Link} to="/spotify" variant="contained" sx={{ backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: '#222' } }}>Spotify</Button>
    </Stack>
  )
}

export default HomePage