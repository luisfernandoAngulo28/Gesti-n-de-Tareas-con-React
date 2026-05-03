import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  Typography,
} from '@mui/material';
import type { MenuType } from './types';
import { useNavigate, useLocation } from 'react-router-dom';

interface Props {
  menuOptions: MenuType[];
}

export const Menu = ({ menuOptions }: Props) => {
  const drawerWidth = 240;
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
        zIndex: 1,
      }}
    >
      <Toolbar />

      <Box sx={{ px: 2, pt: 2, pb: 1 }}>
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontSize: '0.65rem',
          }}
        >
          Navegación
        </Typography>
      </Box>

      <List sx={{ px: 1.5 }}>
        {menuOptions.map((option) => {
          const isActive = location.pathname === option.path;
          return (
            <ListItem key={option.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => navigate(option.path)}
                selected={isActive}
                sx={{
                  borderRadius: 2.5,
                  py: 1.2,
                  position: 'relative',
                  overflow: 'hidden',
                  '&.Mui-selected': {
                    background: 'linear-gradient(135deg, rgba(124,58,237,0.25), rgba(6,182,212,0.1))',
                    border: '1px solid rgba(124,58,237,0.3)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, rgba(124,58,237,0.35), rgba(6,182,212,0.15))',
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: '20%',
                      height: '60%',
                      width: 3,
                      borderRadius: '0 3px 3px 0',
                      background: 'linear-gradient(180deg, #7c3aed, #06b6d4)',
                    },
                  },
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.04)',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive ? 'primary.light' : 'text.secondary',
                    minWidth: 38,
                    transition: 'color 0.2s',
                  }}
                >
                  {option.icon}
                </ListItemIcon>
                <ListItemText
                  primary={option.text}
                  slotProps={{
                    primary: {
                      sx: {
                        fontWeight: isActive ? 700 : 500,
                        fontSize: '0.88rem',
                        color: isActive ? 'primary.light' : 'text.primary',
                        transition: 'color 0.2s',
                      },
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Fondo decorativo */}
      <Box
        sx={{
          mt: 'auto',
          mx: 2,
          mb: 3,
          p: 2,
          borderRadius: 3,
          background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(6,182,212,0.08))',
          border: '1px solid rgba(124,58,237,0.2)',
          textAlign: 'center',
        }}
      >
        <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.72rem' }}>
          📋 TaskDone App
          <br />
          Diplomado React
        </Typography>
      </Box>
    </Drawer>
  );
};
