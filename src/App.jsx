/*
import './App.css'
import Layout from './components/Layout/Layout'

function App() {
  return <Layout />;
}

export default App
*/

import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import Home from './pages/Home';

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* Material UI varsayılan reset/stil ayarları */}
      <CssBaseline />
      <Home />
    </ThemeProvider>
  );
}

export default App;
