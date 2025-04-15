import React from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import {Link} from 'react-router-dom';

const HomePage = () => {
  return (
    <>
    <title>Home</title>
    <Stack spacing={2} direction="row">
      <Button component={Link} to="/notes" variant="contained">Notes</Button>
      <Button component={Link} to="/scheduling" variant="contained">Scheduling</Button>
      <Button component={Link} to="/todo" variant="contained">To-Do List</Button>
    </Stack>
    </>
  )
}

export default HomePage