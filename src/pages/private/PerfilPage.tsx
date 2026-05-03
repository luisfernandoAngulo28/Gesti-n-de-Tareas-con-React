import {
  Avatar, Box, Card, CardContent, Chip, Divider, Typography,
} from '@mui/material';
import {
  Person as PersonIcon, VerifiedUser as VerifiedIcon, CalendarToday as CalendarIcon,
} from '@mui/icons-material';
import { useAuth } from '../../hooks';

export const PerfilPage = () => {
  const { user } = useAuth();

  return (
    <Box>
      <Typography
        variant="h4" component="h1"
        sx={{
          mb: 3,
          background: 'linear-gradient(90deg, #3B82F6, #22D3EE)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Mi Perfil
      </Typography>

      <Box sx={{ maxWidth: 460 }}>
        <Card elevation={0} sx={{ borderRadius: 3, overflow: 'visible', border: '1px solid rgba(37,99,235,0.2)' }}>

          {/* Banner azul */}
          <Box
            sx={{
              height: 88,
              background: 'linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)',
              borderRadius: '12px 12px 0 0',
            }}
          />

          <CardContent sx={{ pt: 0, pb: 3, px: 3 }}>
            {/* Avatar + badge */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mt: -5, mb: 2 }}>
              <Avatar
                sx={{
                  width: 76, height: 76,
                  bgcolor: '#0F172A',
                  border: '3px solid #1E293B',
                  fontSize: 30, fontWeight: 800,
                  color: 'primary.light',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.45)',
                }}
              >
                {user?.username?.charAt(0).toUpperCase()}
              </Avatar>
              <Chip
                icon={<VerifiedIcon sx={{ fontSize: '13px !important', color: '#10B981 !important' }} />}
                label="Activo"
                size="small"
                sx={{
                  bgcolor: 'rgba(16,185,129,0.1)',
                  color: 'success.main',
                  border: '1px solid rgba(16,185,129,0.25)',
                  fontWeight: 700,
                  fontSize: '0.7rem',
                }}
              />
            </Box>

            <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.2 }}>{user?.username}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Usuario registrado</Typography>

            <Divider sx={{ mb: 2 }} />

            {/* Info rows */}
            {[
              {
                icon: <PersonIcon sx={{ fontSize: 17, color: 'primary.light' }} />,
                label: 'Nombre de usuario',
                value: user?.username,
                bg: 'rgba(37,99,235,0.1)',
              },
              {
                icon: <CalendarIcon sx={{ fontSize: 17, color: 'secondary.light' }} />,
                label: 'Sesión activa',
                value: new Date().toLocaleDateString('es-PE', {
                  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                }),
                bg: 'rgba(6,182,212,0.08)',
              },
            ].map((row) => (
              <Box key={row.label} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                <Box
                  sx={{
                    width: 34, height: 34, borderRadius: 2,
                    bgcolor: row.bg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {row.icon}
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, display: 'block' }}>
                    {row.label}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>{row.value}</Typography>
                </Box>
              </Box>
            ))}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
