import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './setupPdfWorker';
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContextProvider } from './context/AuthContext'
import 'remixicon/fonts/remixicon.css'
import 'leaflet/dist/leaflet.css';
import 'react-datepicker/dist/react-datepicker.css';

import './i18n';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContextProvider>
  </StrictMode>,
)
