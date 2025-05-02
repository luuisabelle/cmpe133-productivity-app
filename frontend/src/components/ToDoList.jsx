import React, { useState, useEffect } from 'react'
import { Typography, TextField, Button, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, IconButton, AccordionDetails, Box } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Checkbox from '@mui/material/Checkbox'

const ToDoList = () => {
const [todos, setTodos] = useState([])
const [todo, setTodo] = useState('')
const [editedTodos, setEditedTodos] = useState({})
const [editingId, setEditingId] = useState(null)
const [completed, setCompleted] = useState(false)

const handleNew = async() => {
  const token = localStorage.getItem('token')
    try {
      const response = await fetch("http://localhost:5000/api/todos", {
        method:"POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          todo: todo
        }),
      })
      if (!response.ok) {
        throw new Error('Failed to save task')
      }
      setTodo('')
      fetchTodos();
    }
    catch(error) {
      console.error('Failed to save task', error)
    }
  }
  useEffect(() => {
      fetchTodos();
  }, [])

  const handleChange = async(id, value) => {
    setEditedTodos({...editedTodos, [id]: value});
  }

  const startEdit = (id, currentValue) => {
    setEditingId(id);
    setEditedTodos({...editedTodos, [id]: currentValue})
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

  const updateTodo = async(id, text) => {
    stopEdit();
    try {
      const updatedTodos = todos.map(todo => 
        todo._id === id ? { ...todo, todo: text } : todo
      );
      setTodos(updatedTodos);
      setEditingId(null);

      const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method:"PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          todo: text
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
    <Box display='flex' alignItems='center' justifyContent='center' sx={{margin:'0', padding:'0'}}>
    <TextField label="Add a task" value={todo} onChange={(e) => setTodo(e.target.value)}/>
    <Button variant="contained" onClick={handleNew} sx={{margin:0, padding: '10px'}}>Add</Button>
    </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell colSpan={4}>
        </TableCell>
        </TableRow>
              <TableRow>
                <TableCell></TableCell>
              <TableCell>Tasks</TableCell>
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
              <TableCell scope="row" sx={{textDecoration: todo.completed ? 'line-through':'none'}}>
                {editingId === todo._id ? (
                  <TextField value={editedTodos[todo._id]} onChange = {(e) => handleChange(todo._id, e.target.value)} placeholder="Edit your task" size="small" autofocus sx={{width:'100px'}}></TextField>
                ) : (
                  todo.todo
                )}
              </TableCell>
              {editingId === todo._id ? (
                <>
                <TableCell align="right">
                  <IconButton onClick={() => updateTodo(todo._id, editedTodos[todo._id])}>
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
                  <IconButton edge="end" onClick={() => startEdit(todo._id, todo.todo)}>
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
    </Box>
  )
}

export default ToDoList