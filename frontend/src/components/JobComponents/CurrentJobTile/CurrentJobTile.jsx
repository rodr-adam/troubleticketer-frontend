import React from 'react'
import './CurrentJobTile.css'

const CurrentJobTile = ({job}) => {

    const handleTimeDisplay = (time) =>{
        const [hours, minutes] = time.split(':');
        const date = new Date();
        date.setHours(parseInt(hours));
        date.setMinutes(parseInt(minutes));

        return date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: 'true',
        });
    };

    
    if (!job) {
        return <div className='select-a-job-message'>Select A Job</div>;
    };

  return (
    <div>
        <div className='curr-job-container'>
            <div className="time-and-title">
            
                <div className="job-title-container">
                    <span className='job-title'>{job.title}</span>
                </div>
                <div className="current-job-time-container">
                    <span className='appt-time'>{handleTimeDisplay(job.appointment_time)}</span>
                </div>
            </div>
            
            <div className="job-address-container">
                <div className='job-address'>{job.address}</div>
            </div>
            <div className="job-description-container">
                <div className='job-description'>{job.description}</div>
            </div>
            <div className="job-details-container">
                <div className="contact-container">
                    <div className="customer-name">
                        {job.contact_name}
                    </div>
                    <div className="phone">
                        {job.contact_phone}
                    </div>
                </div>
            </div>
        </div>
        
    </div>
    )
}

export default CurrentJobTile
