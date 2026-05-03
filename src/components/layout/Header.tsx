import { AppBar, Toolbar, Typography, Box, Avatar, Button, Chip } from '@mui/material';
import type { MenuType } from './types';
import { Logout as LogoutIcon, TaskAlt as TaskIcon } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';

interface Props {
  username?: string;
  menuOptions: MenuType[];
  logout: () => void;
}

export const Header = ({ username, menuOptions, logout }: Props) => {
  const location = useLocation();

  const getPageTitle = () => {
    const currentOption = menuOptions.find((option) => option.path === location.pathname);
    return currentOption?.text || 'TaskDone';
  };

  return (
    <AppBar position="fixed" elevation={0}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: { xs: 2, md: 3 } }}>
        {/* Logo + título */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(124,58,237,0.4)',
            }}
          >
            <TaskIcon sx={{ color: 'white', fontSize: 20 }} />
          </Box>
          <Typography
            variant="h6"
            sx={{
              background: 'linear-gradient(90deg, #a78bfa, #67e8f9)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 700,
              letterSpacing: '-0.3px',
            }}
          >
            {getPageTitle()}
          </Typography>
        </Box>

        {/* Usuario + salir */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Chip
            avatar={
              <Avatar sx={{ bgcolor: 'primary.main', width: 26, height: 26, fontSize: 12 }}>
                {username?.charAt(0).toUpperCase() || 'U'}
              </Avatar>
            }
            label={username || 'Usuario'}
            variant="outlined"
            sx={{
              borderColor: 'rgba(167,139,250,0.3)',
              color: 'text.primary',
              fontWeight: 500,
              fontSize: '0.82rem',
            }}
          />
          <Button
            color="inherit"
            onClick={logout}
            startIcon={<LogoutIcon sx={{ fontSize: 16 }} />}
            size="small"
            sx={{
              color: 'text.secondary',
              '&:hover': { color: 'error.main', bgcolor: 'rgba(239,68,68,0.08)' },
              borderRadius: 2,
              fontSize: '0.8rem',
            }}
          >
            Salir
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
