import React, { createContext, useContext, useState, useCallback } from 'react';
import './toast.css';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div className={`custom-toast ${toast.type}`}>
          <i className={`ri-error-warning-line toast-icon ${toast.type}`}></i>
          <span>{toast.message}</span>
        </div>
      )}
    </ToastContext.Provider>
  );
};
