import React, { useEffect, useState } from 'react'
import Calendar from '../components/Calendar'
import { Box } from '@mui/material'
import ScheduleList from '../components/ScheduleList'

const Scheduling = ({ setIsSavingSchedule }) => {
  const [schedules, setSchedules] = useState([]);

  const fetchSchedules = async () => {
    try {
      const token = localStorage.getItem('token')
        const response = await fetch("http://localhost:5000/api/schedules", {
          headers: {
            Authorization: `Bearer ${token}`
          }}
        );
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

useEffect(() => {
    fetchSchedules();
}, [])

  return (
    <>
    <title>Schedules</title>
    <Box>
    <Calendar onScheduleAdded={fetchSchedules} setIsSavingSchedule={setIsSavingSchedule}/>
    <br></br>
    <ScheduleList setSchedules={setSchedules} schedules={schedules} fetchSchedules={fetchSchedules}/>
    </Box>
    </>
  )
}

export default Scheduling