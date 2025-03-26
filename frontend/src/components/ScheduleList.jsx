import React, { useEffect, useState } from 'react'
import { Box, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, IconButton, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const ScheduleList = () => {
const [schedules, setSchedules] = useState([]);
useEffect(() => {
    fetchSchedules();
})

const fetchSchedules = async () => {
    try {
        const response = await fetch("http://localhost:5000/api/schedules");
        const data = await response.json();
        if (data.success) {
          setSchedules(data.data)
        }
        else {
            console.error('Failed to get schedules')
        }
        
      }
      catch(error) {
        console.error('Failed to get schedules', error)
      }
}
const deleteSchedule = async(id) => {
  try {
    const response = await fetch(`http://localhost:5000/api/schedules/${id}`, {
      method:"DELETE",
      headers: { "Content-Type": "application/json" },
    })
    if (!response.ok) {
      throw new Error('Failed to delete schedule')
    }
    
  }
  catch(error) {
    console.error('Failed to delete schedule', error)
  }
}

/*const updateSchedule = async(id, title) => {
  try {
    const response = await fetch(`http://localhost:5000/api/schedules/${id}`, {
      method:"PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title
      }),
    })
    if (!response.ok) {
      throw new Error('Failed to update schedule')
    }
    
  }
  catch(error) {
    console.error('Failed to update schedule', error)
  }
}*/

  return (
    <Box>
      <Typography><b>Your Events</b></Typography>
        <TableContainer>
          <Table>
            <TableHead>
              
              <TableRow>
              <TableCell></TableCell>
                <TableCell><b>Title</b></TableCell>
                <TableCell><b>Date</b></TableCell>
                <TableCell><b>Time</b></TableCell>
                <TableCell></TableCell>
              </TableRow>
              </TableHead>
          <TableBody>
        {
            schedules.map((schedule) => (
              <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <IconButton edge="end" >
                      <EditIcon />
                    </IconButton>
              <TableCell component="th" scope="row">
                {schedule.title}
              </TableCell>
              <TableCell component="th" scope="row">
                {schedule.date}
              </TableCell>
              <TableCell component="th" scope="row">
                {schedule.time}
              </TableCell>
              <IconButton edge="end" onClick={() => deleteSchedule(schedule._id)}>
              <DeleteIcon/>
              </IconButton>
              </TableRow>
            ))
        }
        </TableBody>
        </Table>
        </TableContainer>
    </Box>
  )
}

export default ScheduleList