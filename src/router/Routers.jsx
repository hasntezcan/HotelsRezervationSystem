import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ThankYou from '../pages/ThankYou';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import SearchResultList from '../pages/SearchResultList';
import TourDetails from '../pages/TourDetails';
import Tours from '../pages/Tours';
import ManagerUser from '../pages/ManagerUser';
import Manager from '../pages/Manager';
import ManagerStatus from '../pages/ManagerStatus'; // ✅ Eklendi
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
         <Route path="/manager" element={<Manager />} /> {/* Dashboard */}
         <Route path="/manager/status" element={<ManagerStatus />} /> {/* Status (Yeni eklendi) */}
         <Route path="/manager/users" element={<ManagerUser />} /> {/* User List */}

         {/* Manager Sayfası (Nested Routes ile Sidebar her zaman kalacak) */}
         <Route path="/admin/*" element={<Admin />}>
            <Route index element={<AdminDashboard />} /> {/* Varsayılan olarak Dashboard açılsın */}
            <Route path="contactUs" element={<AdminContact />} />
            <Route path="staff" element={<AdminStaff />} />
            <Route path="profile" element={<AdminProfile />} />
         </Route>
      </Routes>
   );
};

export default Routers;
