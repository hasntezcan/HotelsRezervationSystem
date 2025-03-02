import React from 'react';
import { useLocation } from 'react-router-dom'; // Sayfanın URL’sini almak için
import Header from './../Header/Header';
import Routers from '../../router/Routers';
import Footer from './../Footer/Footer';

const Layout = () => {
   const location = useLocation(); // Mevcut URL’yi al
   const isAdminOrManagerPage = location.pathname.startsWith("/admin") || location.pathname.startsWith("/manager"); 
   // Admin veya Manager sayfasında mıyız?

   return (
      <>
         {!isAdminOrManagerPage && <Header />} {/* ✅ Admin ve Manager Sayfalarında Navbar Gözükmeyecek */}
         <Routers />
         {!isAdminOrManagerPage && <Footer />} {/* ✅ Admin ve Manager Sayfalarında Footer Gözükmeyecek */}
      </>
   );
};

export default Layout;
