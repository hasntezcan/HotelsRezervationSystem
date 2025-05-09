import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';

import Login from '../pages/Login';
import Register from '../pages/Register';
import ResetPassword from '../pages/ResetPassword';
import NewPassword from '../pages/NewPassword';  // ← Yeni satır
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Hotels from '../pages/Hotels';
import TourDetails from '../pages/TourDetails';
import SearchResults from '../pages/SearchResults';
import PaymentPage from '../pages/Booking/PaymentPage';
import ThankYou from '../pages/ThankYou';
import Profile from '../pages/profile/Profile';
import Overview from '../pages/profile/Overview';
import ProfileBookings from '../pages/profile/ProfileBookings';
import ProfileSettings from '../pages/profile/ProfileSettings';

import Manager from '../pages/Manager';
import ManagerHotels from '../pages/ManagerHotels';
import ManagerReservations from '../pages/ManagerReservations';
import ManagerProfile from '../pages/ManagerProfile';

import Admin from '../pages/Admin';
import AdminDashboard from '../pages/AdminDashboard';
import AdminContact from '../pages/AdminContact';
import AdminUser from '../pages/AdminUser';
import AdminProfile from '../pages/AdminProfile';
import AdminHotels from '../pages/AdminHotels';

const Routers = () => (
  <Routes>
    {/* Auth Routes */}
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/reset-password" element={<ResetPassword />} />
    <Route path="/new-password" element={<NewPassword />} />  {/* ← Yeni rota */}

    {/* User-only */}
    <Route element={<PrivateRoute denyRoles={['admin','manager']} />}>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/hotels" element={<Hotels />} />
      <Route path="/hotels/:id" element={<TourDetails />} />
      <Route path="/search-results" element={<SearchResults />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/profile" element={<Profile />}>
        <Route index element={<Overview />} />
        <Route path="bookings" element={<ProfileBookings />} />
        <Route path="settings" element={<ProfileSettings />} />
      </Route>
    </Route>

    {/* Manager-only */}
    <Route element={<PrivateRoute allowedRoles={['manager']} />}>
      <Route path="/manager" element={<Manager />} />
      <Route path="/manager/hotel" element={<ManagerHotels />} />
      <Route path="/manager/reservations" element={<ManagerReservations />} />
      <Route path="/manager/profile" element={<ManagerProfile />} />
    </Route>

    {/* Admin-only */}
    <Route element={<PrivateRoute allowedRoles={['admin']} />}>
      <Route path="/admin/*" element={<Admin />}>
        <Route index element={<AdminDashboard />} />
        <Route path="contactUs" element={<AdminContact />} />
        <Route path="user" element={<AdminUser />} />
        <Route path="profile" element={<AdminProfile />} />
        <Route path="hotels" element={<AdminHotels />} />
      </Route>
    </Route>

    {/* Hiçbir rota eşleşmezse home */}
    <Route path="*" element={<Navigate to="/home" replace />} />
  </Routes>
);

export default Routers;
