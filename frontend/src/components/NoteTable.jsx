import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const NoteTable = () => {
const [notes, setNotes] = useState([])
const [createNew, setCreateNew] = useState(false)
const [noteName, setNoteName] = useState('')
const [noteContent, setNoteContent] = useState('')
const [id, setId] = useState(null)

const handleNew = async() => {
    try {
      const response = await fetch("http://localhost:5000/api/notes", {
        method:"POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: noteName,
          content: ''
        }),
      })
      if (!response.ok) {
        throw new Error('Failed to save note')
      }
      setCreateNew(false)
      setNoteName('')
      fetchNotes();
    }
    catch(error) {
      console.error('Failed to save note', error)
    }
  }
  useEffect(() => {
      fetchNotes();
  }, [])

  const closeDialog = () => {
    setCreateNew(false)
    setNoteName('')
  }

  const deleteNote = async(id) => {
    try {
      const updatedTodos = notes.filter(note => note._id !== id);
      setNotes(updatedTodos);
      const response = await fetch(`http://localhost:5000/api/notes/${id}`, {
        method:"DELETE",
        headers: { "Content-Type": "application/json" },
      })
      if (!response.ok) {
        throw new Error('Failed to delete note')
      }
    }
    catch(error) {
      console.error('Failed to delete note', error)
    }
  }

  const fetchNotes = async () => {
    try {
        const response = await fetch("http://localhost:5000/api/notes");
        const data = await response.json();
        if (data.success) {
          setNotes(data.data)
        }
        else {
            console.error('Failed to get notes')
        }
        
      }
      catch(error) {
        console.error('Failed to get notes', error)
      }
}

  return (
    <>
    <Button onClick={() => setCreateNew(true)} variant="contained" sx={{margin:'0', padding:'10px'}}><AddIcon/>new</Button>
    <Dialog open={createNew} onClose={closeDialog}>
        <DialogTitle>New Note</DialogTitle>
        <DialogContent>
            <TextField value={noteName} onChange={(e) => setNoteName(e.target.value)}></TextField>
            <Button onClick={handleNew}>Save</Button>
            <Button onClick={closeDialog}>Close</Button>
        </DialogContent>
    </Dialog>
    <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
            <TableCell>
                <Typography>Notes</Typography>
            </TableCell>
            <TableCell/>
        </TableRow>
      </TableHead>
      <TableBody>
        {notes.map((note) => (
            <TableRow>
                <TableCell fullWidth component={Link} to={`/notes/${note._id}`} >{note.name}</TableCell>
                <TableCell align='right'><IconButton onClick={() => deleteNote(note._id)} sx={{padding:2}}><DeleteIcon/></IconButton></TableCell>
            </TableRow>
        ))}
      </TableBody>
      </Table>
      </TableContainer>
      </>
  )
}

export default NoteTable
