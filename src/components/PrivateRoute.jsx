import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = () => {
  const { user } = useContext(AuthContext);
  
  // Eğer kullanıcı giriş yapmamışsa, login sayfasına yönlendir
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
