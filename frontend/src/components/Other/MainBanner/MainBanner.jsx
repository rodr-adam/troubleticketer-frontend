import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './MainBanner.css'

const MainBanner = () => {
    
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('authToken')
        setIsAuthenticated(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
        window.location.href = '/';
    };

  return (
    <div className="banner-container">
        <Link className='home-page-link' to='/'>
        <div className="title-container">
            <div className="title">
                <span>TroubleTicketer</span>
            </div>
        </div>
        </Link>
        <ul className="sub-headers">
            <Link className='banner-link' to='/technician/jobs'>
            <li className='sub-header'>
                <span>My Jobs</span>
            </li>
            </Link>
            <Link className='banner-link' to='/search'>
            <li className='sub-header'>
                <span>Tickets</span>
            </li>
            </Link>
            <Link className='banner-link' to='/about'>
            <li className="sub-header">
                <span>About</span>
            </li>
            </Link>

            <li className="sub-header login-logout-switch">
                {isAuthenticated ? (
                    <Link className='banner-link' onClick={handleLogout}>Logout</Link>
                ) : (
                    <Link className='banner-link' to="/login">
                        Login
                    </Link>
                )}
            </li>
        </ul>
    </div>

  )
}

export default MainBanner
