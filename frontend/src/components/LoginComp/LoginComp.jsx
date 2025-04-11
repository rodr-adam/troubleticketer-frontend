import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import './LoginComp.css'
import arrowLeftIcon from '../../assets/icons/arrow-left-circle-fill.png'
const LoginComp = () => {

  /* Javascript functions for login/register handling*/

  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  });

  const handleSwitch = () => {
    setIsRegister(!isRegister);
  }

  const handleChange = async(e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const url = isRegister
      ? 'http://localhost:8000/api/register/' 
      : 'http://localhost:8000/api/login/';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.status === 201 && isRegister) {
        alert("User registered successfully");
        setIsRegister(false);
        setFormData({
          first_name: '',
          last_name: '',
          email: '',
          password: ''
        });
      }
      else if (response.status === 200 && !isRegister){
        alert("Login successful");

        if(data.token){
          localStorage.setItem('authToken', data.token);
          localStorage.setItem('refreshToken', data.refresh_token);
          localStorage.setItem('user', JSON.stringify(data.user));
        }
        window.location.href = '/search';
      }

      else{
        alert(data.error);
      }
    } catch (error) {
        console.error("Error", error);
    }
  };
  

  return (
    <div>
      
      <div className="main-login-container">
        <div className="back-to-home-container">
          <Link className="back-to-home" to='/'>
            <img className='back-to-home-image' src = { arrowLeftIcon } alt='Back'/>
            <span className='back-to-home-text'>Back</span>
          </Link>
        </div>
        <div className='login-container'>

          <div className='inputs-login-container'>
            <h1 className='login-header'>{isRegister ? 'Register' : 'Login'}</h1>
            <form onSubmit={ handleSubmit }>
              <div className='user-inputs grid'>
                { isRegister && (
                    <>
  
                      <div className="field">
                        <input 
                          className='login-register-input'
                          type="text" 
                          name="first_name"
                          required placeholder='First Name'
                          value = {formData.first_name}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="field">
                        <input 
                          className='login-register-input'
                          type="text" 
                          name='last_name'
                          required placeholder='Last Name'
                          value = {formData.last_name}
                          onChange={handleChange}
                        />
                      </div>
                    </>
                )}
                <div className="field">
                  <input 
                    className='login-register-input'
                    type="email" 
                    name='email'
                    required placeholder='Email'
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="field">
                  <input 
                    className='login-register-input'
                    type="password" 
                    name='password'
                    required placeholder='Password'
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <button type='submit' className='submit-login'>{isRegister ? 'Register' : 'Login'}</button>
            </form>
          <div className='create-account-container'>
            {isRegister ? 'Already have an account?' : 'Need an account? Create one'} {' '}
            <span 
            onClick={handleSwitch}
              className='register-switch'>{isRegister ? 'Login' : 'here'}</span>
          </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default LoginComp
