import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ThankYou from '../pages/ThankYou';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import SearchResultList from '../pages/SearchResultList';
import TourDetails from '../pages/TourDetails';
import Tours from '../pages/Tours';
import AdminDashboard from '../pages/AdminDashboard';
import Manager from '../pages/Manager';

const Routers = () => {
   return (
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/home" element={<Home />} />
         <Route path="/tours" element={<Tours />} />
         <Route path="/tours/:id" element={<TourDetails />} />
         <Route path="/login" element={<Login />} />
         <Route path="/register" element={<Register />} />
         <Route path="/thank-you" element={<ThankYou />} />
         <Route path="/tours/search" element={<SearchResultList />} />
         <Route path="/admin" element={<AdminDashboard />} />
         <Route path="/manager" element={<Manager />} />
      </Routes>
   );
}

export default Routers;
