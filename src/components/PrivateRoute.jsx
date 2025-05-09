import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ allowedRoles }) => {
  const { user } = useContext(AuthContext);

  // Henüz login olunmamışsa login sayfasına
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Rol, allowedRoles içinde değilse
  if (!allowedRoles.includes(user.role)) {
    // Admin kendi sayfasına, manager kendi sayfasına, diğerleri login'e yönlensin
    const redirectTo =
      user.role === 'admin'
        ? '/admin'
        : user.role === 'manager'
        ? '/manager'
        : '/login';
    return <Navigate to={redirectTo} replace />;
  }

  // Yetkilendirme tamam, alt routeları (Outlet) render et
  return <Outlet />;
};

export default PrivateRoute;
