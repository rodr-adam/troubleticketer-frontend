import React, { useState, useEffect } from 'react'
import './LandingPage.css'
import { Link } from 'react-router-dom'
import MainBanner from '../MainBanner/MainBanner'
import LandingImage from '../../../assets/images/landing-page.jpg'

const LandingPage = () => {

    const [landingIsLoaded, setLandingIsLoaded] = useState(false);


    useEffect(() => {
        setLandingIsLoaded(false);
        setTimeout(() => setLandingIsLoaded(true), 100);
    }, []);

  return (
    <div>
        <MainBanner/>
        <div className="landing-page-container">
            <div className={`landing-page-content ${landingIsLoaded ? 'fade-in-content': ''}`}>
                <div className="landing-page-title-container">
                    <p className='landing-page-title'>
                        Manage Repair Appointments and View Thousands of Trouble Tickets
                    </p>
                </div>
                <div className="landing-page-tagline-container">
                    <p className="landing-page-description">
                        Sign up to view and manage jobs and trouble tickets
                    </p>
                    <p className="landing-page-tagline">
                        <Link className='learn-more-link' to= '/about'>Learn More</Link>
                    </p>
                </div>
            </div>
            <div className="landing-page-image-container">
                <img src={ LandingImage } className='landing-page-image' alt="home" />
            </div>
        </div>
    </div>
  )
}

export default LandingPage
