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
import { useEffect, useState } from "react";
import { useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  const { isAuthenticated } = useAuth();
  const { loading } = useAuth();

  useEffect(() => {
    console.log(isAuthenticated)
  })

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
    <Grid container
    sx={{ minHeight: "100vh", flexGrow:1, width:"100%", padding:"20px" }} justifyContent="center" alignItems="center">
      <Grid item sx={{ width: "100%" }}> 
        <Navbar/>
      </Grid>
      <Grid item container sx={{ minHeight: "100vh",padding: "20px", flexGrow:1}} justifyContent="center" alignItems="center">
    {/*<Paper elevation={3} sx={{ padding: "20px", textAlign: "center", width:"90vw", height:"90vh", overflow:"auto"}} justifyContent="center" alignItems="center">*/}
    
      <Routes>
        <Route element={<ProtectedRoute/>}>
        <Route path="/scheduling" element={<Scheduling />}/>
        <Route path="/notes" element={<Notes />}>
          <Route index element={<NoteTable/>} />
          <Route path=":noteId" element={<Note />}/>
        </Route>
        <Route path="/todo" element={<ToDo />}/>
        <Route path="/" element={<HomePage />}/>
        <Route path="/timer" element={<Timer />} />
        <Route path="/spotify" element={<Spotify />} />
        <Route path="/settings" element={<Settings/>} />
        </Route>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      {/*</Paper>*/}
      </Grid>
      </Grid>
  )
}

export default App;
