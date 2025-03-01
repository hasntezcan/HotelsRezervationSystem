/*// src/theme.js
import { createTheme } from '@mui/material/styles';

// İstediğiniz renk kodlarını, font ayarlarını, vb. burada tanımlayın
const theme = createTheme({
  palette: {
    primary: {
      main: '#1a73e8', // Mavi ton
    },
    secondary: {
      main: '#fbbc05', // Sarı ton
    },
    background: {
      default: '#fafafa', // Sayfa arka planı
      paper: '#ffffff',   // Kartlar vb. beyaz arka plan
    },
    text: {
      primary: '#333',
      secondary: '#555',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2.125rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.4rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
    },
  },
  shape: {
    borderRadius: 8, // Globalde tüm kart, buton vb. köşeleri yuvarlama
  },
  components: {
    // Örnek: Material UI bileşenlerini override etme
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Büyük harf yerine normal yazı
          borderRadius: 6,
        },
      },
    },
  },
});

export default theme;
*/