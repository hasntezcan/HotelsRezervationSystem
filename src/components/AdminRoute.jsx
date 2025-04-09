// src/components/AdminRoute.jsx
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import AccessDenied from './AccessDenied';

const AdminRoute = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    // Giriş yapılmamışsa login sayfasına yönlendir
    return <Navigate to="/login" />;
  }

  if (user.role.toLowerCase() !== 'admin') {
    // Kullanıcı rolü admin değilse, erişime izin verme
    return <AccessDenied />;
  }

  // Kullanıcı admin ise protected route'u render et.
  return <Outlet />;
};

export default AdminRoute;
