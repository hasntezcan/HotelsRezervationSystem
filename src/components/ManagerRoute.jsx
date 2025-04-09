// src/components/ManagerRoute.jsx
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import AccessDenied from './AccessDenied';

const ManagerRoute = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    // Giriş yapılmamışsa login sayfasına yönlendir
    return <Navigate to="/login" />;
  }

  if (user.role.toLowerCase() !== 'manager') {
    // Kullanıcı rolü manager değilse, erişime izin verme
    return <AccessDenied />;
  }

  // Kullanıcı manager ise protected route'u render et.
  return <Outlet />;
};

export default ManagerRoute;
