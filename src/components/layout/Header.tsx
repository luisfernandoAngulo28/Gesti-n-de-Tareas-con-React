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
    const currentOption = menuOptions.find((o) => o.path === location.pathname);
    return currentOption?.text || 'TaskDone';
  };

  return (
    <AppBar position="fixed" elevation={0}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: { xs: 2, md: 3 } }}>

        {/* Logo + título */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 34,
              height: 34,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #2563EB, #06B6D4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(37,99,235,0.45)',
              flexShrink: 0,
            }}
          >
            <TaskIcon sx={{ color: 'white', fontSize: 18 }} />
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: '1rem',
              background: 'linear-gradient(90deg, #3B82F6, #22D3EE)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.2px',
            }}
          >
            {getPageTitle()}
          </Typography>
        </Box>

        {/* Usuario + salir */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip
            avatar={
              <Avatar
                sx={{
                  background: 'linear-gradient(135deg, #2563EB, #06B6D4)',
                  width: 24,
                  height: 24,
                  fontSize: 11,
                  fontWeight: 700,
                }}
              >
                {username?.charAt(0).toUpperCase() || 'U'}
              </Avatar>
            }
            label={username || 'Usuario'}
            variant="outlined"
            sx={{
              borderColor: 'rgba(37,99,235,0.3)',
              color: 'text.primary',
              fontWeight: 500,
              fontSize: '0.82rem',
              height: 32,
            }}
          />
          <Button
            onClick={logout}
            startIcon={<LogoutIcon sx={{ fontSize: '16px !important' }} />}
            size="small"
            sx={{
              color: 'text.secondary',
              fontWeight: 500,
              fontSize: '0.82rem',
              '&:hover': { color: 'error.main', bgcolor: 'rgba(239,68,68,0.08)' },
            }}
          >
            Salir
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
