import React from 'react'
import './JobTodayTile.css'

const JobTodayTile = ({job, onClick}) => {

  return (
      <li className="today-job-container" onClick={onClick}>
        <div className="today-job-title-container">
          <p className='job-tile-title'>{job.title}</p>
        </div>
        <div className="job-time-container">
          <p className="appt-time-basic">Appointment Time:</p>
          <span className='job-tile-time'>{job.appointment_time}</span>
        </div>
      </li>
  )
}

export default JobTodayTile
