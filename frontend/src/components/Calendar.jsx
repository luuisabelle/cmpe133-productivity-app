import React from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Button, Box, Typography } from '@mui/material'
import { DateCalendar  } from '@mui/x-date-pickers/DateCalendar';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useState } from 'react'
import dayjs from 'dayjs';
import { TextField } from '@mui/material';


const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs())
  const [time, setTime] = useState(dayjs())
  const [title, setTitle] = useState("")

  const handleAccept = async() => {
    try {
      const response = await fetch("http://localhost:5000/api/schedules", {
        method:"POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title,
          date: selectedDate.toISOString().split('T')[0],
          time: time.toISOString().split('T')[1]
        }),
      })
      if (!response.ok) {
        throw new Error('Failed to save schedule')
      }
      
    }
    catch(error) {
      console.error('Failed to save schedule', error)
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
      <Typography><b>Schedule an Event!</b></Typography>
      <TextField label="Schedule Name"
      value={title}
      onChange={(e) => setTitle(e.target.value)}/>
      <DateCalendar
        value={selectedDate}
        onChange={(newValue) => { setSelectedDate(newValue); } }
        />
        <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'}}>
        <TimePicker label="Pick a Time" 
        value={time}
        onChange={(newValue) => setTime(newValue)}/> 
        <Button variant="contained" onClick={handleAccept}>Select</Button>
        </Box>
      </Box>
    </LocalizationProvider>
  )
}

export default Calendar