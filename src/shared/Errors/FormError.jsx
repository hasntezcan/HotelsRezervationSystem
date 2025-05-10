import React from 'react';
import './FormError.css';

const FormError = ({ message }) => {
  if (!message) return null;
  return (
    <div className="form-error">
      <i className="ri-error-warning-line form-error-icon" />
      <span>{message}</span>
    </div>
  );
};
export default FormError;