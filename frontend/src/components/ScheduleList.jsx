import React, { useEffect, useState } from 'react'
import { Box, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, IconButton, Typography, Accordion, AccordionDetails, AccordionSummary, Dialog, DialogTitle, Button, DialogContent, DialogContentText, TextField } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import dayjs from 'dayjs';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


const ScheduleList = ({schedules, fetchSchedules, setSchedules}) => {
const [editingId, setEditingId] = useState();
const [editedSchedules, setEditedSchedules] = useState();
const [eventOpen, setEventOpen] = useState(false)
const [clickedEvent, setClickedEvent] = useState(null)
const [editedStart, setEditedStart] = useState(dayjs())
const [editedEnd, setEditedEnd] = useState(dayjs())
const [editedTitle, setEditedTitle] = useState()

const translatedSchedules = schedules.map(event => ({
  id: event._id,
  title: event.title,
  start: event.start,
  end: event.end,
  extendedProps: {
    _id: event._id
  }
}))

const startEdit = (schedule) => {
  setEditingId(schedule._id)
  setEditedTitle(schedule.title)
  setEditedStart(dayjs(schedule.start))
  setEditedEnd(dayjs(schedule.end))
  setEventOpen(true)
}

const stopEdit = () => {
  setEditingId(null);
}

const deleteSchedule = async(id) => {
  handleEventClose()
  try {
    const updatedSchedules = schedules.filter(schedule => schedule._id !== id);
      setSchedules(updatedSchedules);
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

const updateSchedule = async() => {
  try {
    const updatedSchedule = {
      title: editedTitle,
      start: editedStart.toISOString(),
      end: editedEnd.toISOString()
    }
    const response = await fetch(`http://localhost:5000/api/schedules/${editingId}`, {
      method:"PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedSchedule),
    })
    if (!response.ok) {
      throw new Error('Failed to update schedule')
    }
    fetchSchedules();
    handleEventClose()
  }
  catch(error) {
    console.error('Failed to update schedule', error)
  }
}

const handleEventClick = (info) => {
  setClickedEvent(info.event)
  setEventOpen(true)
}

const handleEventClose = () => {
  setEventOpen(false)
  setClickedEvent(null)
  setEditingId(null)
}

  return (
    <Box>
      <FullCalendar
      plugins={[ dayGridPlugin, interactionPlugin ]}
      initialView="dayGridMonth"
      events={translatedSchedules}
      eventClick={handleEventClick}
    />
    <Dialog open={eventOpen} onClose={handleEventClose}>
      {editingId === clickedEvent?.extendedProps?._id ? (
        <Box display="flex">
        <TextField value={clickedEvent?.title} onChange={(e) => setEditedTitle(e.target.value)}></TextField>

        </Box>
      ) : (
        <Box display="flex">
        <DialogTitle>{clickedEvent?.title}</DialogTitle>
      <IconButton edge="end" onClick={() => startEdit({
        _id: clickedEvent.extendedProps._id,
        title: clickedEvent.title,
        start: clickedEvent.start,
        end: clickedEvent.end
      })}>
        <EditIcon />
      </IconButton>
      <IconButton edge="end" onClick={() => deleteSchedule(clickedEvent?.id)}>
        <DeleteIcon/>
      </IconButton>
      </Box>
      )}
      <DialogContent>
        {editingId === clickedEvent?.extendedProps?._id ? (
          <>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker label="Pick a Start Time" 
                  value={editedStart}
                  onChange={(newValue) => setEditedStart(newValue)}/> 
                  <p>to</p>
                  <TimePicker label="Pick an End Time" 
                  value={editedEnd}
                  onChange={(newValue) => setEditedEnd(newValue)}/> 
          </LocalizationProvider>
          </>
        ) : (
          <>
          <DialogContentText>Start: {dayjs(clickedEvent?.start).format('MMM D, YYYY h:mm A')}</DialogContentText>
          <DialogContentText>End: {dayjs(clickedEvent?.end).format('MMM D, YYYY h:mm A')}</DialogContentText>
          </>
        )}
      </DialogContent> 
      {editingId === clickedEvent?.extendedProps?._id ? (
        <Button onClick={updateSchedule}>Done</Button>
      ) : (
        <Button onClick={handleEventClose}>Close</Button>
      )}
      </Dialog>
      {/*<br></br>
      <Typography><b>Your Events</b></Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
              <TableCell width="5vw"></TableCell>
                <TableCell width="60vw"><b>Title</b></TableCell>
                <TableCell width="20vw"><b>Date</b></TableCell>
                <TableCell width="10vw"><b>Time</b></TableCell>
                <TableCell width ="5vw"></TableCell>
              </TableRow>
              </TableHead>
          <TableBody>
        {
            schedules.map((schedule) => (
              <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <>
                <TableCell>
                <IconButton edge="end">
                      <EditIcon />
                    </IconButton>
                    </TableCell>
              <TableCell component="th" scope="row">
                {schedule.title}
              </TableCell>
              <TableCell component="th" scope="row">
                {dayjs(schedule.start).format('MMM D, YYYY')}
              </TableCell>
              <TableCell component="th" scope="row">
                <Box display="flex">
                {`${dayjs(schedule.start).format('h:mm A')} to ${dayjs(schedule.end).format('h:mm A')}`}
                </Box>
              </TableCell>
              <TableCell>
              <IconButton edge="end" onClick={() => deleteSchedule(schedule._id)}>
              <DeleteIcon/>
              </IconButton>
              </TableCell>
              </>
              </TableRow>
            ))
        }
        </TableBody>
        </Table>
        </TableContainer>*/}
    </Box>
  )
}

export default ScheduleList