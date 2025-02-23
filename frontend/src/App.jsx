import { useState } from 'react'
import { Box } from "@mui/material";
import Scheduling from './pages/Scheduling';
import HomePage from './pages/HomePage';
import Notes from './pages/Notes';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  //const [count, setCount] = useState(0)

  return (
      <Routes>
        <Route path="/scheduling" element={<Scheduling/>}/>
        <Route path="/notes" element={<Notes/>}/>
        <Route path="/" element={<HomePage/>}/>
      </Routes>
  )
}

export default App;
