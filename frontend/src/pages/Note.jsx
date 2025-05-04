import { Box, Button, IconButton, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';

const Note = () => {
  const {noteId:id} = useParams()
  const [note, setNote] = useState({ name: '', content: '' })
  const [name, setName] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    fetchNote();
  }, [id])

  const fetchNote = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/notes/${id}`);
      const data = await response.json();
      if (data.success) {
        setNote(data.data)
        setContent(data.data.content)
      }
      else {
          console.error('Failed to get note')
      }
      
    }
    catch(error) {
      console.error('Failed to get note', error)
    }
  }

  const saveNote = async () => {
    console.log('Saving note...');
    try {
      const updatedNote = { ...note, content };
      const response = await fetch(`http://localhost:5000/api/notes/${id}`, {
        method:"PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedNote),
      })
      if (!response.ok) {
        throw new Error('Failed to update note')
      }
      fetchNote()
    }
    catch(error) {
      console.error('Failed to update note', error)
    }
  }

  return (
    <>
    <title>{note.name}</title>
    <Box sx={{ width: '100%', textAlign: 'center', margin: 1}}>
    <Button component={Link} to="/notes" sx={{margin:1}}><ArrowBackIcon/>Back</Button>
    <Box justifyContent='center' display='flex'>
    <Typography variant="h5" sx={{fontWeight:'bold', margin: 1, textAlign:'center'}}>
      {note.name}
    </Typography>
    <IconButton>
      <EditIcon/>
    </IconButton>
    </Box>
    </Box>
    <Paper sx={{width:'800px', height:'1200px', display:"flex", flexDirection:"column"}}>
      <TextField fullWidth multiline value={content} onBlur={saveNote} variant="standard" InputProps={{
    disableUnderline: true,
    sx: { 
      fontSize: '1.1rem',
      p: 1,
      '&:hover': { background: 'transparent' }
    }
  }} onChange={(e) => setContent(e.target.value)} sx={{height:"100%", flexGrow:1}}></TextField>
    </Paper>
    </>
  )
}

export default Note