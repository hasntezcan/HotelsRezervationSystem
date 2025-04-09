import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ThankYou from '../pages/ThankYou';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import TourDetails from '../pages/TourDetails';
import Hotels from '../pages/Hotels'; 
import Manager from '../pages/Manager';
import ManagerHotels from '../pages/ManagerHotels';  
import ManagerReservations from '../pages/ManagerReservations';  
import ManagerProfile from '../pages/ManagerProfile';  
import Admin from '../pages/Admin';
import AdminContact from '../pages/AdminContact';
import AdminUser from '../pages/AdminUser.jsx';
import AdminDashboard from '../pages/AdminDashboard';
import About from '../pages/About';
import Contact from '../pages/Contact';
import SearchResults from "../pages/SearchResults";
import AdminProfile from '../pages/AdminProfile';
import Profile from '../pages/profile/Profile';
import ProfileBookings from '../pages/profile/ProfileBookings.jsx';
import ProfileSettings from '../pages/profile/ProfileSettings';
import Overview from '../pages/profile/Overview';
import AdminHotel from '../pages/AdminHotels.jsx';
import PaymentPage from '../pages/Booking/PaymentPage.jsx';
import PrivateRoute from '../components/PrivateRoute';

const Routers = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/hotels" element={<Hotels />} />
      <Route path="/hotels/:id" element={<TourDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/search-results" element={<SearchResults />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/profile" element={<Profile />}>
            <Route index element={<Overview />} />
            <Route path="bookings" element={<ProfileBookings />} />
            <Route path="settings" element={<ProfileSettings />} />
      </Route>
      
      {/* Protected Manager Routes */}
      <Route element={<PrivateRoute />}>
         <Route path="/manager" element={<Manager />} />
         <Route path="/manager/hotel" element={<ManagerHotels />} />
         <Route path="/manager/reservations" element={<ManagerReservations />} />
         <Route path="/manager/profile" element={<ManagerProfile />} />
      </Route>

      {/* Protected Admin Routes */}
      <Route element={<PrivateRoute />}>
         <Route path="/admin/*" element={<Admin />}>
            <Route index element={<AdminDashboard />} />
            <Route path="contactUs" element={<AdminContact />} />
            <Route path="user" element={<AdminUser />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="hotels" element={<AdminHotel />} />
         </Route>
      </Route>
    </Routes>
  );
};

export default Routers;
