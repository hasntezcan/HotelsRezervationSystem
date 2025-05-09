// src/shared/Loading/Spinner.jsx
import React from 'react';
import { Spinner } from 'reactstrap';
import './spinner.css';


const LoadingSpinner = () => (
  <div className="loading-spinner">
    <div className="lds-ring">
      <div></div><div></div><div></div><div></div>
    </div>
  </div>
);
export default LoadingSpinner;
