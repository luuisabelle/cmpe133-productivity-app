import React from 'react'
import Calendar from '../components/Calendar'
import { Box } from '@mui/material'
import ScheduleList from '../components/ScheduleList'

const Scheduling = () => {
  return (
    <Box>
    <Calendar/>
    <br></br>
    <ScheduleList/>
    </Box>
  )
}

export default Scheduling