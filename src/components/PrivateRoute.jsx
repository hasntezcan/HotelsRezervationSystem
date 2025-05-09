// src/components/PrivateRoute.jsx
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ allowedRoles, denyRoles }) => {
  const { user } = useContext(AuthContext);

  // 1) If you passed in `denyRoles`, block those roles:
  if (denyRoles && user && denyRoles.includes(user.role)) {
    // send admin → /admin, manager → /manager
    const redirectTo = user.role === 'admin'
      ? '/admin'
      : user.role === 'manager'
      ? '/manager'
      : '/login';
    return <Navigate to={redirectTo} replace />;
  }

  // 2) Then, if you passed `allowedRoles`, enforce them:
  if (allowedRoles) {
    // not logged in → login
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    if (!allowedRoles.includes(user.role)) {
      const redirectTo = user.role === 'admin'
        ? '/admin'
        : user.role === 'manager'
        ? '/manager'
        : '/login';
      return <Navigate to={redirectTo} replace />;
    }
  }

  // otherwise OK
  return <Outlet />;
};

export default PrivateRoute;
