import {
  Drawer, List, ListItem, ListItemButton,
  ListItemIcon, ListItemText, Toolbar, Box, Typography,
} from '@mui/material';
import { Checklist as ChecklistIcon } from '@mui/icons-material';
import type { MenuType } from './types';
import { useNavigate, useLocation } from 'react-router-dom';

interface Props { menuOptions: MenuType[] }

export const Menu = ({ menuOptions }: Props) => {
  const drawerWidth = 232;
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        zIndex: 1,
      }}
    >
      <Toolbar />

      <Box sx={{ px: 2, pt: 2.5, pb: 1 }}>
        <Typography
          variant="caption"
          sx={{
            color: 'text.disabled',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontSize: '0.62rem',
          }}
        >
          Menú principal
        </Typography>
      </Box>

      <List sx={{ px: 1.5, flex: 1 }}>
        {menuOptions.map((option) => {
          const isActive = location.pathname === option.path;
          return (
            <ListItem key={option.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => navigate(option.path)}
                selected={isActive}
                sx={{
                  borderRadius: 2,
                  py: 1.1,
                  position: 'relative',
                  // borde izquierdo activo
                  '&.Mui-selected::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0, top: '18%', height: '64%', width: 3,
                    borderRadius: '0 3px 3px 0',
                    background: 'linear-gradient(180deg, #2563EB, #06B6D4)',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 36,
                    color: isActive ? 'primary.light' : 'text.secondary',
                    transition: 'color 0.18s',
                  }}
                >
                  {option.icon}
                </ListItemIcon>
                <ListItemText
                  primary={option.text}
                  slotProps={{
                    primary: {
                      sx: {
                        fontSize: '0.875rem',
                        fontWeight: isActive ? 700 : 500,
                        color: isActive ? 'primary.light' : 'text.primary',
                        transition: 'color 0.18s',
                      },
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Footer del sidebar */}
      <Box
        sx={{
          mx: 1.5, mb: 3, p: 2, borderRadius: 2,
          background: 'rgba(37,99,235,0.08)',
          border: '1px solid rgba(37,99,235,0.18)',
          textAlign: 'center',
        }}
      >
        <ChecklistIcon sx={{ fontSize: 18, color: 'primary.light', mb: 0.4 }} />
        <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem', display: 'block' }}>
          TaskDone App<br />Diplomado React
        </Typography>
      </Box>
    </Drawer>
  );
};
