import './App.css';

import About  from './components/Other/About/About';
import LoginComp from './components/LoginComp/LoginComp'
import MainPage from './components/MainPage/MainPage'


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JobsDashboard from './components/JobComponents/JobsDashboard/JobsDashboard';
import ProtectedRoute from './components/Other/ProtectedRoute';
import LandingPage from './components/Other/LandingPage/LandingPage';
import CurrentJobTile from './components/JobComponents/CurrentJobTile/CurrentJobTile';
import CreateJobPane from './components/JobComponents/JobsDashboard/CreateJobPane/CreateJobPane';


function App() {
  return (
      <Router>
        <Routes>
          <Route path='/' element= { <LandingPage/> } />
          <Route path="/about" element = { <About/> }/>
          <Route path="/login" element = { <LoginComp/> }/>
          
          <Route path='/search' element = { 
            <ProtectedRoute>
              <MainPage/> 
            </ProtectedRoute>
          }/>
         
          <Route path='/technician/jobs' element = { 
            <ProtectedRoute>
              <JobsDashboard/> 
            </ProtectedRoute>
          }/>
          
        </Routes>
      </Router>
  );
}

export default App;
