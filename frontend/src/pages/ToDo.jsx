import React from 'react'
import ToDoList from '../components/ToDoList'

const ToDo = ({ setIsSavingTodo }) => {
  return (
    <>
    <title>Tasks</title>
    <ToDoList setIsSavingTodo={setIsSavingTodo}></ToDoList>
    </>
  )
}

export default ToDo