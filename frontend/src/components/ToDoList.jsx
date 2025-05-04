import React, { useState, useEffect } from 'react'
import { Typography, TextField, Button, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, IconButton, AccordionDetails, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Checkbox from '@mui/material/Checkbox'

const ToDoList = ({ setIsSavingTodo = () => {} }) => {
const [todos, setTodos] = useState([])
const [title, setTitle] = useState('')
const [editedTitle, setEditedTitle] = useState('')
const [editedPriority, setEditedPriority] = useState('')
//const [todo, setTodo] = useState('')
const [editedTodos, setEditedTodos] = useState({title: '', priority: ''})
const [editedTodo, setEditedTodo] = useState({title: '', priority: ''})
const [editingId, setEditingId] = useState(null)
const [completed, setCompleted] = useState(false)
const [priority, setPriority] = useState('')
 //TODO: Replace with Google login email
const [userEmail] = "testuser@gmail.com";

const handleNew = async() => {
  setIsSavingTodo(true);
  const token = localStorage.getItem('token')
  try {
    const response = await fetch("http://localhost:5000/api/todos", {
      method:"POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        title: title,
        priority: priority
      }),
    })
    if (!response.ok) {
      throw new Error('Failed to save task')
    }
    setTitle('')
    setPriority('')
    fetchTodos();
    await new Promise(r => setTimeout(r, 300));
  }
  catch(error) {
    console.error('Failed to save task', error)
  } finally {
    setIsSavingTodo(false);
  }
}
  useEffect(() => {
    fetchTodos();
  }, [todos])

  const handleChange = async(id, value) => {
    setEditedTodos({...editedTodos, [id]: value});
  }

  const startEdit = (id, currentValue) => {
    setEditingId(id)
    setEditedTodo({id, title: currentValue.title, priority: currentValue.priority})
  }

  const stopEdit = () => {
    setEditingId(null);
  }
  
  const fetchTodos = async () => {
      try {
        const token = localStorage.getItem('token')
          const response = await fetch("http://localhost:5000/api/todos", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const data = await response.json();
          if (data.success) {
            setTodos(data.data)
          }
          else {
              console.error('Failed to get tasks')
          }
          
        }
        catch(error) {
          console.error('Failed to get tasks', error)
        }
  }

  const completeTodo = async (id, completed) => {
    setTodos(todos.map(todo => 
      todo._id === id ? { ...todo, completed: !completed } : todo
  ));
      try {
        const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
          method:"PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            completed: !completed
          }),
        })
        if (!response.ok) {
          throw new Error('Failed to update task')
        }
        fetchTodos();
      }
      catch(error) {
        console.error('Failed to update task', error)
      }
  }

  const deleteTodo = async(id) => {
    try {
      const updatedTodos = todos.filter(todo => todo._id !== id);
      setTodos(updatedTodos);
      const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method:"DELETE",
        headers: { "Content-Type": "application/json" },
      })
      if (!response.ok) {
        throw new Error('Failed to delete task')
      }
    }
    catch(error) {
      console.error('Failed to delete task', error)
    }
  }

  const updateTodo = async(id) => {
    stopEdit();
    try {
      const updatedTodos = todos.map(todo => 
        todo._id === id ? { ...todo, title: editedTitle, priority: editedPriority } : todo
      );
      setTodos(updatedTodos);
      setEditingId(null);

      const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method:"PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editedTitle,
          priority: editedPriority
        }),
      })
      if (!response.ok) {
        throw new Error('Failed to update task')
      }
    }
    catch(error) {
      console.error('Failed to update task', error)
    }
  }

  return (
    <Box 
  sx={{ 
    mt: 0, 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }}
>
    <Box display='flex' alignItems='center' justifyContent='center' sx={{margin:2, padding:2}}>
    <TextField label="Add a task" value={title} onChange={(e) => setTitle(e.target.value)} sx={{minWidth:'125px'}}/>
    <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>Priority</InputLabel>
        <Select
          label="Priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <MenuItem value='High'>High</MenuItem>
          <MenuItem value='Medium'>Medium</MenuItem>
          <MenuItem value='Low'>Low</MenuItem>
        </Select>
      </FormControl>
    <Button variant="contained" onClick={handleNew} sx={{margin:0, padding: '10px'}}>Add</Button>
    </Box>
    {priority ? (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell colSpan={5}>
        </TableCell>
        </TableRow>
              <TableRow>
                <TableCell></TableCell>
              <TableCell>Tasks</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              </TableRow>
              </TableHead>
          <TableBody>
        {
            todos.map((todo) => (
              //<div key={todo._id}>
              <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
            >
              <TableCell>
              <Checkbox checked={todo.completed} onClick={() => completeTodo(todo._id, todo.completed)}/>
              </TableCell>
              {/*<TableCell scope="row" sx={{textDecoration: todo.completed ? 'line-through':'none'}}>*/}
                {editingId === todo._id ? (
                  <>
                  <TableCell scope="row" sx={{textDecoration: todo.completed ? 'line-through':'none'}}>
                  <TextField value={editedTitle} onChange = {(e) => setEditedTitle(e.target.value)} placeholder="Edit your task" size="small" autofocus sx={{width:'100px'}}></TextField>
                  </TableCell>
                  <TableCell scope="row" sx={{textDecoration: todo.completed ? 'line-through':'none'}}>
                  <FormControl size='small' sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel>Priority</InputLabel>
                  <Select
                    label="Priority"
                    value={editedPriority}
                    onChange = {(e) => setEditedPriority(e.target.value)} 
                  >
                    <MenuItem value='High'>High</MenuItem>
                    <MenuItem value='Medium'>Medium</MenuItem>
                    <MenuItem value='Low'>Low</MenuItem>
                  </Select>
                </FormControl>
                  </TableCell>
                  </>
                ) : (
                  <>
                  <TableCell scope="row" sx={{textDecoration: todo.completed ? 'line-through':'none'}}>
                  {todo.title}
                  </TableCell>
                  <TableCell scope="row" sx={{textDecoration: todo.completed ? 'line-through':'none'}}>
                  {todo.priority}
                  </TableCell>
                  </>
                )}
              {/*</TableCell>*/}
              {editingId === todo._id ? (
                <>
                <TableCell align="right">
                  <IconButton onClick={() => updateTodo(todo._id)}>
                    <CheckIcon/>
                  </IconButton>
                  </TableCell>
                  <TableCell align="center"> 
                  <IconButton onClick={stopEdit}>
                    <CloseIcon/>
                  </IconButton>
                  </TableCell>
                </>
              ) : (
                <>
                <TableCell align="right">
                  <IconButton edge="end" onClick={() => startEdit(todo._id, todo)}>
                        <EditIcon />
                  </IconButton>
                  </TableCell >
                  <TableCell align="center">
                  <IconButton edge="end" aria-label="delete" onClick={() => deleteTodo(todo._id)}>
                        <DeleteIcon />
                  </IconButton>
                  </TableCell>
                </>
              )} 
              </TableRow>
              //</div>
            ))
        }
        </TableBody>
        </Table>
        </TableContainer>
    )
    :
    (<Typography >No tasks yet</Typography>)
  }
    </Box>
  )
}

export default ToDoList