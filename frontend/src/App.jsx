import { Box, createTheme, Paper, ThemeProvider } from "@mui/material";
import Scheduling from './pages/Scheduling';
import HomePage from './pages/HomePage';
import Notes from './pages/Notes';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import ToDo from "./pages/ToDo";
import { Helmet } from "react-helmet";
import { common } from "@mui/material/colors";
import Note from "./pages/Note";
import NoteTable from "./components/NoteTable";
import Timer from "./pages/Timer";
import Spotify from './pages/Spotify';
import SignIn from './pages/SignIn';
import Settings from './pages/Settings';
import SignUp from "./pages/SignUp";
import { useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Widgets from './pages/Widgets.jsx';
import React, { useState, useEffect } from 'react';


function App() {

  const { isAuthenticated } = useAuth();
  const { loading } = useAuth();

  const [isSavingTodo, setIsSavingTodo] = useState(false);
  const [isSavingSchedule, setIsSavingSchedule] = useState(false);
  const [isSavingNote, setIsSavingNote] = useState(false);

  const isSaving = isSavingTodo || isSavingSchedule || isSavingNote;

  const theme = createTheme({
    palette: {
      primary: {
        main: common.black,
      },
    }
  })

  const navigate = useNavigate();

  if (loading) {
    return null
  }

  return (
    <>
      <Grid container
        sx={{ minHeight: "100vh", flexGrow:1, width:"100%", padding:"20px" }} justifyContent="center" alignItems="center">
        <Grid item sx={{ width: "100%" }}> 
          <Navbar isSaving={isSaving} />
        </Grid>
        <Grid item container sx={{ minHeight: "100vh",padding: "20px", flexGrow:1}} justifyContent="center" alignItems="center">
        <Routes>
          <Route element={<ProtectedRoute/>}>
          <Route path="/scheduling" element={<Scheduling setIsSavingSchedule={setIsSavingSchedule} />} />
          <Route path="/notes" element={<Notes setIsSavingNote={setIsSavingNote} />}>
            <Route index element={<NoteTable setIsSavingNote={setIsSavingNote}/>} />
            <Route path=":noteId" element={<Note />}/>
          </Route>
          <Route path="/todo" element={<ToDo setIsSavingTodo={setIsSavingTodo} />}/>
          <Route path="/" element={<HomePage setIsSavingTodo={setIsSavingTodo} setIsSavingSchedule={setIsSavingSchedule} />} />
          <Route path="/timer" element={<Timer />} />
          <Route path="/spotify" element={<Spotify />} />
          <Route path="/settings" element={<Settings/>} />
          </Route>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/widgets" element={<Widgets setIsSavingTodo={setIsSavingTodo} />} />
        </Routes>
        </Grid>
        </Grid>
    </>
  )
}

export default App;
