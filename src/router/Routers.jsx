import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ThankYou from '../pages/ThankYou';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import SearchResultList from '../pages/SearchResultList';
import TourDetails from '../pages/TourDetails';
import Hotels from '../pages/Hotels'; 
import ManagerUser from '../pages/ManagerUser';
import Manager from '../pages/Manager';
import ManagerStatus from '../pages/ManagerStatus';
import Admin from '../pages/Admin';
import AdminContact from '../pages/AdminContact';
import AdminStaff from '../pages/AdminStaff';
import AdminDashboard from '../pages/AdminDashboard';
import About from '../pages/About';
import Contact from '../pages/Contact';
import SearchResults from "../pages/SearchResults";
import AdminProfile from '../pages/AdminProfile';

const Routers = () => {
  return (
    <Routes>
      {/* Main Pages */}
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/hotels" element={<Hotels />} /> {/* Updated from /tours to /hotels */}
      <Route path="/hotels/:id" element={<TourDetails />} /> {/* Updated from /tours/:id to /hotels/:id */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/hotels/search" element={<SearchResultList />} /> {/* Updated from /tours/search to /hotels/search */}
      <Route path="/search-results" element={<SearchResults />} />

      {/* Admin Pages */}
      <Route path="/manager" element={<Manager />} />
      <Route path="/manager/status" element={<ManagerStatus />} />
      <Route path="/manager/users" element={<ManagerUser />} />

      {/* Manager Page */}
      <Route path="/admin/*" element={<Admin />}>
        <Route index element={<AdminDashboard />} />
        <Route path="contactUs" element={<AdminContact />} />
        <Route path="staff" element={<AdminStaff />} />
        <Route path="profile" element={<AdminProfile />} />
      </Route>
    </Routes>
  );
};

export default Routers;