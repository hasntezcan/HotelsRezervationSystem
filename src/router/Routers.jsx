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
import ManagerAbout from '../pages/ManagerAbout';
import ManagerStaff from '../pages/ManagerStaff';
import ManagerDashboard from '../pages/ManagerDashboard';
import About from '../pages/About'
import Contact from '../pages/Contact'

const Routers = () => {
   return (
      <Routes>
         {/* Ana Sayfalar */}
         <Route path="/" element={<Home />} />
         <Route path="/home" element={<Home />} />
         <Route path="/about" element={<About />} />
         <Route path="/contact" element={<Contact />} />
         <Route path="/tours" element={<Tours />} />
         <Route path="/tours/:id" element={<TourDetails />} />
         <Route path="/login" element={<Login />} />
         <Route path="/register" element={<Register />} />
         <Route path="/thank-you" element={<ThankYou />} />
         <Route path="/tours/search" element={<SearchResultList />} />
         <Route path="/admin" element={<AdminDashboard />} />

         {/* Manager Sayfası (Nested Routes ile Sidebar her zaman kalacak) */}
         <Route path="/manager/*" element={<Manager />}>
            <Route index element={<ManagerDashboard />} /> {/* Varsayılan olarak Dashboard açılsın */}
            <Route path="about" element={<ManagerAbout />} />
            <Route path="staff" element={<ManagerStaff />} />
         </Route>
      </Routes>
   );
}

export default Routers;
