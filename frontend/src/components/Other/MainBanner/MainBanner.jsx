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
        <div className="title-container">
            <div className="title">
                <Link className='home-page-link' to='/'><span>TroubleTicketer</span></Link>
            </div>
        </div>
        <ul className="sub-headers">
            <li className='sub-header'>
                <span><Link className='banner-link' to='/technician/jobs'>My Jobs</Link></span>
            </li>
            <li className='sub-header'>
                <Link className='banner-link' to='/search'>Tickets</Link>
            </li>
            <li className="sub-header">
                <Link className='banner-link' to='/about'>About</Link>
            </li>
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
