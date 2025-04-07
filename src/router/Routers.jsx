import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ThankYou from '../pages/ThankYou';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import TourDetails from '../pages/TourDetails';
import Hotels from '../pages/Hotels'; 
import Manager from '../pages/Manager';
import ManagerHotels from '../pages/ManagerHotels';  // Otel Sayfası
import ManagerReservations from '../pages/ManagerReservations';  // Yeni sayfa eklendi
import ManagerProfile from '../pages/ManagerProfile';  // Yeni sayfa eklendi
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
      <Route path="/profile" element={<Profile />}>
            <Route index element={<Overview />} />
            <Route path="bookings" element={<ProfileBookings />} />
            <Route path="settings" element={<ProfileSettings />} />
      </Route>
      <Route path="/register" element={<Register />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/search-results" element={<SearchResults />} />
      <Route path="/payment" element={<PaymentPage />} /> {/* Ödeme Sayfası */}

         {/* ✅ Manager Sayfaları */}
         <Route path="/manager" element={<Manager />} /> {/* Dashboard */}
         <Route path="/manager/hotel" element={<ManagerHotels />} /> {/* Oteller Sayfası */}
         <Route path="/manager/reservations" element={<ManagerReservations />} /> {/* Rezervasyonlar Sayfası */}
         <Route path="/manager/profile" element={<ManagerProfile />} /> {/* Yöneticinin Profili */}

         {/* Admin Sayfası (Nested Routes ile Sidebar her zaman kalacak) */}
         <Route path="/admin/*" element={<Admin />}>
            <Route index element={<AdminDashboard />} /> {/* Varsayılan olarak Dashboard açılsın */}
            <Route path="contactUs" element={<AdminContact />} />
            <Route path="user" element={<AdminUser />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="hotels" element={<AdminHotel />} />

         </Route>
      </Routes>
   );
};

export default Routers;