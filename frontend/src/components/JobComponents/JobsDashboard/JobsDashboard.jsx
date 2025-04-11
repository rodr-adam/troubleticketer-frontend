import React, { useState, useEffect } from 'react'
import './JobsDashboard.css'

import JobTodayTile from './JobTodayTile/JobTodayTile'
import MainBanner from '../../Other/MainBanner/MainBanner';
import CreateJobPane from './CreateJobPane/CreateJobPane';
import CurrentJobTile from '../CurrentJobTile/CurrentJobTile';

const JobsDashboard = () => {

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isTechLoaded, setIsTechLoaded] = useState(false);
  const [showCreatePane, setShowCreatePane] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    setIsTechLoaded(false);
    setTimeout(() => setIsTechLoaded(true), 100);
  }, []);

  useEffect(() => {
    const fetchJobs = async() => {
      try {
        const response = await fetch('http://localhost:8000/api/jobs/');
        if (!response.ok) {
          throw new Error('Error fetching data');
        }
        const data = await response.json();
        setJobs(data);
      } catch(err) {
          setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();

  }, []);

  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user?.is_superuser;

  if (loading) {
    return (
      <div className="job-dashboard-wrapper">
        <MainBanner />
        <div className="loading-message">Loading jobs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="job-dashboard-wrapper">
        <MainBanner />
        <div className="error-message">Error: {error}</div>
      </div>
    );
  }


  return (
    <div className='job-dashboard-wrapper'>
      <MainBanner/>
      <div className={`date-and-job-container ${isTechLoaded ? 'slide-date-and-job' : ''}`}>
        <div className="job-dashboard-title-container">
          <h3>Today's Jobs</h3>
        </div>
        {isAdmin && (
          <div className="create-job-button-container">
            <button className="job-pane-switch" onClick={() => setShowCreatePane(!showCreatePane)}>
              {showCreatePane ? 'Close' : 'New Job'}
            </button>
          </div>
        )}
        <div className='todays-date-container'>
          <h3>{formattedDate}</h3>
        </div>
      </div>
      <div className='job-dashboard-container'>
        
        <div className={`todays-job-container ${isTechLoaded ? 'slide-job-list' : '' }`}>
          
          <div className="job-list-container">
            <ul className="jobs-list">
              {jobs.length === 0 ? (
                <li className="no-jobs-message">No jobs found.</li>
              ) : (
                jobs.map((job) => (
                  <JobTodayTile 
                  className='job-tile' 
                  key={job.id} 
                  job={job}
                  onClick={() => setSelectedJob(job)} />
                ))
              )}
            </ul>
          </div>
        </div>
        <div className={`job-tool-container ${isTechLoaded ? 'slide-create-form': ''}`}>
          {isAdmin && showCreatePane && <CreateJobPane />}
          {!showCreatePane && <CurrentJobTile job={selectedJob}/>}
        </div>
      </div>
      
    </div>
  )
}

export default JobsDashboard
