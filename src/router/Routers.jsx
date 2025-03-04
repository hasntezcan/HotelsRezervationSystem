import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ThankYou from '../pages/ThankYou';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import SearchResultList from '../pages/SearchResultList';
import TourDetails from '../pages/TourDetails';
import Tours from '../pages/Tours';
import AdminUser from '../pages/AdminUser';
import Admin from '../pages/Admin';
import AdminStatus from '../pages/AdminStatus'; // ✅ Eklendi
import Manager from '../pages/Manager';
import ManagerContact from '../pages/ManagerContact';
import ManagerStaff from '../pages/ManagerStaff';
import ManagerDashboard from '../pages/ManagerDashboard';
import About from '../pages/About';
import Contact from '../pages/Contact';
import SearchResults from "../pages/SearchResults";
import ManagerProfile from '../pages/ManagerProfile';

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
         <Route path="/search-results" element={<SearchResults />} />

         {/* ✅ Admin Sayfaları */}
         <Route path="/admin" element={<Admin />} /> {/* Dashboard */}
         <Route path="/admin/status" element={<AdminStatus />} /> {/* Status (Yeni eklendi) */}
         <Route path="/admin/users" element={<AdminUser />} /> {/* User List */}

         {/* Manager Sayfası (Nested Routes ile Sidebar her zaman kalacak) */}
         <Route path="/manager/*" element={<Manager />}>
            <Route index element={<ManagerDashboard />} /> {/* Varsayılan olarak Dashboard açılsın */}
            <Route path="contactUs" element={<ManagerContact />} />
            <Route path="staff" element={<ManagerStaff />} />
            <Route path="profile" element={<ManagerProfile />} />
         </Route>
      </Routes>
   );
};

export default Routers;
