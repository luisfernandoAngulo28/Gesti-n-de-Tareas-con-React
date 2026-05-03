import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Typography,
} from '@mui/material';
import {
  Person as PersonIcon,
  VerifiedUser as VerifiedIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';
import { useAuth } from '../../hooks';

export const PerfilPage = () => {
  const { user } = useAuth();

  return (
    <Box>
      {/* Título de sección */}
      <Typography
        variant="h4"
        component="h1"
        sx={{
          fontWeight: 800,
          background: 'linear-gradient(90deg, #a78bfa, #67e8f9)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.5px',
          mb: 3,
        }}
      >
        Mi Perfil
      </Typography>

      <Box sx={{ maxWidth: 480 }}>
        <Card
          elevation={0}
          sx={{
            borderRadius: 4,
            overflow: 'visible',
            position: 'relative',
            border: '1px solid rgba(124,58,237,0.2)',
          }}
        >
          {/* Banner superior */}
          <Box
            sx={{
              height: 90,
              background: 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)',
              borderRadius: '16px 16px 0 0',
            }}
          />

          <CardContent sx={{ pt: 0, pb: 3, px: 3 }}>
            {/* Avatar flotante sobre el banner */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mt: -5, mb: 2 }}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: '#0f0f1a',
                  border: '3px solid #1e1e3a',
                  fontSize: 32,
                  fontWeight: 700,
                  color: 'primary.light',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                }}
              >
                {user?.username?.charAt(0).toUpperCase()}
              </Avatar>

              <Chip
                icon={<VerifiedIcon sx={{ fontSize: '14px !important', color: '#10b981 !important' }} />}
                label="Activo"
                size="small"
                sx={{
                  bgcolor: 'rgba(16,185,129,0.12)',
                  color: 'success.main',
                  border: '1px solid rgba(16,185,129,0.25)',
                  fontWeight: 600,
                  fontSize: '0.72rem',
                }}
              />
            </Box>

            {/* Nombre */}
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.3 }}>
              {user?.username}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Usuario registrado
            </Typography>

            <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', mb: 2 }} />

            {/* Info */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: 2,
                    bgcolor: 'rgba(124,58,237,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <PersonIcon sx={{ fontSize: 18, color: 'primary.light' }} />
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, display: 'block' }}>
                    Nombre de usuario
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {user?.username}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: 2,
                    bgcolor: 'rgba(6,182,212,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CalendarIcon sx={{ fontSize: 18, color: 'secondary.light' }} />
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, display: 'block' }}>
                    Sesión activa
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {new Date().toLocaleDateString('es-PE', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
