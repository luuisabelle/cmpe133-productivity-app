import React, { useEffect } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Button, Box, Typography } from '@mui/material'
import { DateCalendar  } from '@mui/x-date-pickers/DateCalendar';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useState } from 'react'
import dayjs from 'dayjs';
import { TextField } from '@mui/material';


const Calendar = ({onScheduleAdded}) => {
  const [selectedDate, setSelectedDate] = useState(dayjs())
  const [startTime, setStartTime] = useState(dayjs())
  const [endTime, setEndTime] = useState(startTime)
  const [startDateAndTime, setStartDateAndTime] = useState(new Date())
  const [endDateAndTime, setEndDateAndTime] = useState(new Date())
  const [title, setTitle] = useState("")
  const [userEmail] = testuser@gmail.com // TODO: Replace with Google login email


  const handleAccept = async() => {
    try {
      const combinedStartDateTime = selectedDate
  .hour(startTime.hour())
  .minute(startTime.minute())
  setStartDateAndTime(combinedStartDateTime)
  const combinedEndDateTime = selectedDate
  .hour(endTime.hour())
  .minute(endTime.minute())
  setEndDateAndTime(combinedEndDateTime)
  if (!title) {
    alert("Name of schedule is required!")
  }
      const response = await fetch("http://localhost:5000/api/schedules", {
        method:"POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title,
          start: combinedStartDateTime,
          end: combinedEndDateTime,
          userEmail: currentUser.email
        }),        
      })

      if (onScheduleAdded) {
        onScheduleAdded();
      }


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
      <Box align='center'>
      <Typography><b>Schedule an Event!</b></Typography>
      <br></br>
      <TextField label="Schedule Name"
      value={title}
      onChange={(e) => setTitle(e.target.value)}/>
      <br></br>
      <DateCalendar
        value={selectedDate}
        onChange={(newValue) => setSelectedDate(newValue)}
        />
        <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'}}>
        <Box display="flex" gap={2}>
        <TimePicker label="Pick a Start Time" 
        value={startTime}
        onChange={(newValue) => setStartTime(newValue)}/> 
        <p>to</p>
        <TimePicker label="Pick an End Time" 
        value={endTime}
        onChange={(newValue) => setEndTime(newValue)}/> 
        </Box>
        <Button variant="contained" onClick={handleAccept} sx={{margin: '10px', padding: '10px'}}>Select</Button>
        </Box>
      </Box>
    </LocalizationProvider>
  )
}

export default Calendar