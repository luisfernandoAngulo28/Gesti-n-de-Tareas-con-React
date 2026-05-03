import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { AppRouter } from './routes/AppRouter.tsx';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { AlertProvider } from './context/alert/Alert.provider.tsx';
import { AuthProvider } from './context/auth/Auth.provider.tsx';

/* ============================================
   TEMA MUI — SISTEMA AZUL SaaS
   Todo se centraliza aquí: colores, tipografía,
   bordes y overrides de componentes.
   ============================================ */
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main:  '#2563EB',
      light: '#3B82F6',
      dark:  '#1D4ED8',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main:  '#06B6D4',
      light: '#22D3EE',
      dark:  '#0891B2',
    },
    success: {
      main:  '#10B981',
      light: '#34D399',
    },
    warning: {
      main:  '#64748B',   // pendiente → gris-azulado neutro
      light: '#94A3B8',
    },
    error: {
      main:  '#EF4444',
      light: '#FCA5A5',
    },
    background: {
      default: '#0F172A',
      paper:   '#1E293B',
    },
    text: {
      primary:   '#E2E8F0',
      secondary: '#94A3B8',
      disabled:  '#64748B',
    },
    divider: 'rgba(51, 65, 85, 0.8)',
  },

  typography: {
    fontFamily: "'Inter', 'Roboto', Arial, sans-serif",
    h4: { fontWeight: 800, letterSpacing: '-0.5px' },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 600 },
    subtitle1: { fontWeight: 500 },
    button:    { textTransform: 'none', fontWeight: 600 },
    caption:   { fontWeight: 500 },
  },

  shape: { borderRadius: 10 },

  // ---- Component overrides ----
  components: {

    // BOTONES
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
          textTransform: 'none',
          transition: 'all 0.2s ease',
        },
        contained: {
          background: 'linear-gradient(135deg, #2563EB, #1D4ED8)',
          boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)',
          '&:hover': {
            background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
            boxShadow: '0 6px 20px rgba(37, 99, 235, 0.55)',
            transform: 'translateY(-1px)',
          },
          '&:active': { transform: 'translateY(0)' },
        },
        outlined: {
          borderColor: 'rgba(37,99,235,0.4)',
          color: '#3B82F6',
          '&:hover': {
            borderColor: '#2563EB',
            bgcolor: 'rgba(37,99,235,0.08)',
          },
        },
      },
    },

    // CARDS
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #1E293B 0%, #162032 100%)',
          border: '1px solid rgba(51,65,85,0.8)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.35)',
          backdropFilter: 'blur(8px)',
        },
      },
    },

    // PAPER (modales, paneles)
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          background: '#1E293B',
          border: '1px solid rgba(51,65,85,0.8)',
        },
      },
    },

    // DIALOGS
    MuiDialog: {
      styleOverrides: {
        paper: {
          background: '#1E293B',
          border: '1px solid rgba(37,99,235,0.25)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: { fontWeight: 700, borderBottom: '1px solid rgba(51,65,85,0.6)', paddingBottom: 12 },
      },
    },

    // TEXT FIELDS
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            transition: 'box-shadow 0.2s',
            '& fieldset': { borderColor: 'rgba(51,65,85,0.8)' },
            '&:hover fieldset': { borderColor: 'rgba(37,99,235,0.5)' },
            '&.Mui-focused fieldset': { borderColor: '#2563EB', borderWidth: 2 },
            '&.Mui-focused': { boxShadow: '0 0 0 3px rgba(37,99,235,0.15)' },
          },
        },
      },
    },

    // CHIPS / BADGES
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 6, fontWeight: 600 },
      },
    },

    // DRAWER / SIDEBAR
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: 'linear-gradient(180deg, #0F172A 0%, #0D1829 100%)',
          border: 'none',
          borderRight: '1px solid rgba(51,65,85,0.6)',
        },
      },
    },

    // APPBAR / HEADER
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(15,23,42,0.92)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(51,65,85,0.6)',
          boxShadow: '0 2px 20px rgba(0,0,0,0.4)',
        },
      },
    },

    // TABS
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '0.875rem',
          color: '#94A3B8',
          '&.Mui-selected': { color: '#3B82F6' },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          background: 'linear-gradient(90deg, #2563EB, #06B6D4)',
          height: 3,
          borderRadius: '3px 3px 0 0',
        },
      },
    },

    // LINEAR PROGRESS
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          backgroundColor: 'rgba(51,65,85,0.5)',
        },
        bar: {
          borderRadius: 4,
          background: 'linear-gradient(90deg, #2563EB, #06B6D4)',
        },
      },
    },

    // LIST ITEM BUTTON (sidebar)
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          transition: 'all 0.18s ease',
          '&:hover': { background: 'rgba(37,99,235,0.08)' },
          '&.Mui-selected': {
            background: 'rgba(37,99,235,0.15)',
            '&:hover': { background: 'rgba(37,99,235,0.22)' },
          },
        },
      },
    },

    // ALERT
    MuiAlert: {
      styleOverrides: {
        root: { borderRadius: 8 },
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
