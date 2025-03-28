// src/pages/profile/Profile.jsx

import React, {useEffect} from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'
import '../../styles/profile.css'
import {
  RiHomeLine,
  RiCalendarCheckLine,
  RiSettings3Line
} from 'react-icons/ri' // Örnek: react-icons

const Profile = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className="profile-section">
      <Container>
        <Row>
          <Col lg="3" md="4">
            <div className="profile-sidebar">
              <h5 className="sidebar-title">My Dashboard</h5>
              <div className="sidebar-menu">
                <NavLink 
                  end 
                  to="/profile" 
                  className={(navData) => navData.isActive ? 'link-active' : ''}
                >
                  <RiHomeLine className="icon" /> Overview
                </NavLink>
                <NavLink 
                  to="bookings" 
                  className={(navData) => navData.isActive ? 'link-active' : ''}
                >
                  <RiCalendarCheckLine className="icon" /> Bookings
                </NavLink>
                <NavLink 
                  to="settings" 
                  className={(navData) => navData.isActive ? 'link-active' : ''}
                >
                  <RiSettings3Line className="icon" /> Settings
                </NavLink>
              </div>
            </div>
          </Col>

          <Col lg="9" md="8">
            <div className="profile-content">
              <Outlet />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Profile
