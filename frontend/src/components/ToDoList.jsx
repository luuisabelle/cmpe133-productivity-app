import React, { useState, useEffect } from 'react'
import { Typography, TextField, Button, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, IconButton, AccordionDetails } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import Accordion from '@mui/material/Accordion';
import Checkbox from '@mui/material/Checkbox'

const ToDoList = () => {
const [todos, setTodos] = useState([])
const [todo, setTodo] = useState('')
const [edit, setEdit] = useState(false);
const [editedTodo, setEditedTodo] = useState('')
const [editField, setEditField] = useState('')
const [editingId, setEditingId] = useState(null)

const handleNew = async() => {
    try {
      const response = await fetch("http://localhost:5000/api/todos", {
        method:"POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          todo: todo
        }),
      })
      if (!response.ok) {
        throw new Error('Failed to save task')
      }
      
    }
    catch(error) {
      console.error('Failed to save task', error)
    }
  }
  useEffect(() => {
      fetchTodos();
  }, [])
  
  const fetchTodos = async () => {
      try {
          const response = await fetch("http://localhost:5000/api/todos");
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

  const deleteTodo = async(id) => {
    try {
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

  const updateTodo = async(id, todo) => {
    try {
      const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method:"PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          todo: todo
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
    <div>
        <Typography>To-Do List</Typography>
        <TextField value={todo} onChange={(e) => setTodo(e.target.value)}>Add a task</TextField>
        <Button variant="contained" onClick={handleNew}>Add</Button>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Schedules</b></TableCell>
              </TableRow>
              </TableHead>
          <TableBody>
        {
            todos.map((todo) => (
              <div key={todo._id}>
              <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <Checkbox></Checkbox>
              <TableCell  component="th" scope="row">
                {todo.todo}
              </TableCell>
                <IconButton edge="end" onClick={() => setEdit(!edit)}>
                      <EditIcon />
                    </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => deleteTodo(todo._id)}>
                      <DeleteIcon />
                    </IconButton>
              {edit &&
                <Accordion>
                  <AccordionDetails>
                  <TextField value = {(e) => setEditedTodo(e.target.value)} placeholder="Edit your task"></TextField>
                  <IconButton edge="end" aria-label="edit" onClick={() => updateTodo(todo._id, value)}>
                      <CheckIcon />
                    </IconButton>
                    </AccordionDetails>
                </Accordion>
              }
              </TableRow>
              </div>
            ))
        }
        </TableBody>
        </Table>
        </TableContainer>
    </div>
  )
}

export default ToDoList