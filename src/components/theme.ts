import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#FF9933' },
    secondary: { main: '#228B22' },
    error: { main: '#CC3333' },
    warning: { main: '#FFD700' }
  },
  typography: {
    fontFamily: 'Inter, system-ui, Arial, sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 }
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', borderRadius: 999 }
      }
    }
  }
});

export default theme;
