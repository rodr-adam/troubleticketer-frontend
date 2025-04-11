import React from 'react'
import { Link } from 'react-router-dom'
import './About.css'
import MainBanner from '../MainBanner/MainBanner'

const About = () => {
  
  return (
    <div>
      <MainBanner/>
      <div className="main-about-wrapper">
        <div className="main-about-container">
          <div className="link-container">
            <h1 className='about-title'>About TroubleTicketer</h1>
            <Link className='grafana-link' to='https://nam04.safelinks.protection.outlook.com/?url=https%3A%2F%2Fdashboard-test.enghouse.net%2F&data=05%7C02%7CAdamRodriguez4%40my.unt.edu%7C8a91e644de9f4b5c2ad808dd6719d6a6%7C70de199207c6480fa318a1afcba03983%7C0%7C0%7C638780082889914875%7CUnknown%7CTWFpbGZsb3d8eyJFbXB0eU1hcGkiOnRydWUsIlYiOiIwLjAuMDAwMCIsIlAiOiJXaW4zMiIsIkFOIjoiTWFpbCIsIldUIjoyfQ%3D%3D%7C0%7C%7C%7C&sdata=FgrPm9bg7OFy444vWb5srB4%2FuN%2F7RmuWeWCAb%2FoM4Eo%3D&reserved=0'>Grafana Dashboard Link</Link>
            <div className="paragraphs-container">
              <p className='about-paragraph'>
                <strong>About - </strong> 
                The TroubleTicketer interface allows technicians to retrieve 
                information on how prior technicians repaired a customer service 
                based on the initial trouble code. The technician, once logged into 
                the TroubleTicketer url, would enter a Trouble Code along with 
                an originating date.  Up to ten statements will be displayed with 
                information on what technicians had done to resolve customer issue.
              </p>

              <p className='about-paragraph'>
                <strong>Support - </strong>           
                Support for this software is currently done under the current 
                maintenance agreement that is in place.  Please contact your 
                immediate supervisor or customer support number.
              </p>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
