import React, { useState } from 'react'
import './CreateJobPane.css'
import DateSelector from '../../../Other/UIComponents/DateSelector/DateSelector';

const CreateJobPane = ({ onJobCreated }) => {
    const [jobData, setJobData] = useState({
        title: '',
        description: '',
        appointment_date: '',
        appointment_time: '',
        contact_name: '',
        contact_phone: '',
        address: '',
    });

    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) =>  {
        setJobData({...jobData, [e.target.name]: e.target.value});
    };

    const handleDateChange = (formattedDate) =>{
      
      setJobData({...jobData, appointment_date: formattedDate});
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        setError(null);
        setSuccessMessage('');
        
        console.log("Submitting job data:", jobData);

        try{
            const response = await fetch('http://localhost:8000/api/jobs/create/', {
                method: 'POST',
                headers:{ 'Content-Type': "application/json",
                },
                body: JSON.stringify(jobData),
            });

            if(!response.ok){
                throw new Error("Error");
            }

            const newJob = await response.json();
            setSuccessMessage('Job Created Successfully');

            // reset the job form
            setJobData({
              'title': '', 
              'description': '',
              'address': '', 
              'contact_name': '',
              'contact_phone':'',
              'appointment_date':'',
              'appointment_time': ''})

            if(onJobCreated){
                onJobCreated(newJob);
            }
        } catch (err){
            setError(err.message);
        }
    };
  return (
    <div className='create-pane-container'>
      <div className="create-form-title-container">
        <h2>Create New Job</h2>
      </div>
      <div className="create-form-container">
        <form onSubmit={ handleSubmit }>
            <input 
              type="text" 
              name='title'
              value={jobData.title}
              onChange={handleChange}
              className="create-input" 
              required placeholder='Job Title'/>
            <textarea 
              className="create-input create-description" 
              name='description'
              onChange={handleChange}
              value={jobData.description}
              required placeholder='Description'/>
            <input 
              type="text" 
              name='address'
              value={jobData.address}
              onChange={handleChange}
              className='create-input' 
              required placeholder='Address'/>
            <input 
              type="text" 
              name='contact_name'
              className="create-input" 
              value={jobData.contact_name}
              onChange={handleChange}
              required placeholder='Contact Name'/>
            <input 
              type="text" 
              name='contact_phone'
              className="create-input" 
              value={jobData.contact_phone}
              onChange={handleChange}
              required placeholder='Contact Phone'/>
            <DateSelector onDateChange={handleDateChange}/>
            <input 
              type="text" 
              name='appointment_time'
              className="create-input" 
              value={jobData.appointment_time}
              onChange={handleChange}
              required placeholder='Appointment Time'/>
            <button className='create-job-button' type='submit'>Create Job</button>
        </form>
      </div>
    </div>
  );
};

export default CreateJobPane
