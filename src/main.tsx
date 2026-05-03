import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { AppRouter } from './routes/AppRouter.tsx';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { AlertProvider } from './context/alert/Alert.provider.tsx';
import { AuthProvider } from './context/auth/Auth.provider.tsx';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#7c3aed',       // violeta vibrante
      light: '#a78bfa',
      dark: '#5b21b6',
    },
    secondary: {
      main: '#06b6d4',       // cyan
      light: '#67e8f9',
      dark: '#0e7490',
    },
    success: {
      main: '#10b981',
      light: '#6ee7b7',
    },
    warning: {
      main: '#f59e0b',
      light: '#fcd34d',
    },
    error: {
      main: '#ef4444',
    },
    background: {
      default: '#0f0f1a',
      paper: '#1a1a2e',
    },
    text: {
      primary: '#f1f5f9',
      secondary: '#94a3b8',
    },
    divider: 'rgba(255,255,255,0.08)',
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', Arial, sans-serif",
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    subtitle1: { fontWeight: 500 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 10,
        },
        contained: {
          background: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)',
          boxShadow: '0 4px 15px rgba(124, 58, 237, 0.4)',
          '&:hover': {
            background: 'linear-gradient(135deg, #6d28d9 0%, #4c1d95 100%)',
            boxShadow: '0 6px 20px rgba(124, 58, 237, 0.5)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #1e1e3a 0%, #16213e 100%)',
          border: '1px solid rgba(255,255,255,0.06)',
          backdropFilter: 'blur(10px)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          background: '#1a1a2e',
          border: '1px solid rgba(255,255,255,0.06)',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          background: '#1e1e3a',
          border: '1px solid rgba(124, 58, 237, 0.3)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            '& fieldset': {
              borderColor: 'rgba(255,255,255,0.1)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(124, 58, 237, 0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#7c3aed',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: 'linear-gradient(180deg, #12122a 0%, #0f0f1a 100%)',
          border: 'none',
          borderRight: '1px solid rgba(255,255,255,0.06)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(90deg, #0f0f1a 0%, #1a1a2e 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          boxShadow: '0 4px 30px rgba(0,0,0,0.4)',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
        },
      },
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <AlertProvider>
          <AppRouter />
          <App />
        </AlertProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
);
