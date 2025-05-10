// src/pages/profile/Profile.jsx

import React, { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import '../../styles/profile.css';
import {
  RiHomeLine,
  RiCalendarCheckLine,
  RiSettings3Line
} from 'react-icons/ri';
import { useTranslation } from 'react-i18next';

const Profile = () => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="profile-section">
      <Container>
        <Row>
          {/* Sidebar */}
          <Col lg="3" md="4">
            <div className="profile-sidebar">
              <h5 className="sidebar-title">{t("profile.dashboard_title")}</h5>
              <div className="sidebar-menu">
                <NavLink
                  end
                  to="/profile"
                  className={({ isActive }) => (isActive ? 'link-active' : '')}
                >
                  <RiHomeLine className="icon" /> {t("profile.overview")}
                </NavLink>

                <NavLink
                  to="bookings"
                  className={({ isActive }) => (isActive ? 'link-active' : '')}
                >
                  <RiCalendarCheckLine className="icon" /> {t("profile.bookings")}
                </NavLink>

                <NavLink
                  to="settings"
                  className={({ isActive }) => (isActive ? 'link-active' : '')}
                >
                  <RiSettings3Line className="icon" /> {t("profile.settings")}
                </NavLink>
              </div>
            </div>
          </Col>

          {/* Main Content */}
          <Col lg="9" md="8">
            <div className="profile-content">
              <Outlet />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Profile;
