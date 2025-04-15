import { Box, createTheme, Paper, ThemeProvider } from "@mui/material";
import Scheduling from './pages/Scheduling';
import HomePage from './pages/HomePage';
import Notes from './pages/Notes';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import ToDo from "./pages/ToDo";
import { lightBlue } from "@mui/material/colors";
import { Helmet } from "react-helmet";
import Note from "./pages/Note";
import NoteTable from "./components/NoteTable";

const theme = createTheme({
  palette: {
    primary: {
      main: lightBlue[200],
    },
  },
})

function App() {

  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <link rel="icon" type="image/png" href="/hachiware.png"/>
      </Helmet>
    <Grid container
    sx={{ minHeight: "100vh", flexGrow:1, width:"100%", padding:"20px" }} justifyContent="center" alignItems="center">
      <Grid item sx={{ width: "100%" }}>
      <Navbar ></Navbar>
      </Grid>
      <Grid item container sx={{ minHeight: "100vh",padding: "20px", flexGrow:1}} justifyContent="center" alignItems="center">
    {/*<Paper elevation={3} sx={{ padding: "20px", textAlign: "center", width:"90vw", height:"90vh", overflow:"auto"}} justifyContent="center" alignItems="center">*/}
      <Routes>
        <Route path="/scheduling" element={<Scheduling/>}/>
        <Route path="/notes" element={<Notes/>}>
        <Route index element={<NoteTable/>} />
        <Route path=":noteId" element={<Note/>}/>
        </Route>
        <Route path="/todo" element={<ToDo/>}/>
        <Route path="/" element={<HomePage/>}/>
      </Routes>
      {/*</Paper>*/}
      </Grid>
      </Grid>
      </ThemeProvider>
  )
}

export default App;
