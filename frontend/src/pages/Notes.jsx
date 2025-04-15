import React from 'react'
import { Button, Grid2, IconButton, Paper, Table } from '@mui/material'
import NoteTable from '../components/NoteTable';
import Note from './Note';
import { Outlet } from 'react-router-dom';

const Notes = () => {
  return (
    <>
    <title>Notes</title>
    <Outlet/>
    </>
  )
}

export default Notes