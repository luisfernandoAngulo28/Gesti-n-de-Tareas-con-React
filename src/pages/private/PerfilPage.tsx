import {
  Avatar, Box, Card, CardContent, Chip, Divider,
  Grid, LinearProgress, Paper, Typography,
} from '@mui/material';
import {
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  VerifiedUser as VerifiedIcon,
  CheckCircle as DoneIcon,
  Schedule as PendingIcon,
  FormatListBulleted as AllIcon,
  Security as SecurityIcon,
  Language as LanguageIcon,
  Devices as DevicesIcon,
} from '@mui/icons-material';
import { useAuth } from '../../hooks';
import { useTasks } from '../../hooks';

// ── Tarjeta de stat pequeña ──────────────────────────────────
const MiniStat = ({
  icon, label, value, color, bg,
}: {
  icon: React.ReactNode; label: string; value: string | number; color: string; bg: string;
}) => (
  <Paper
    elevation={0}
    sx={{
      p: 2.5, borderRadius: 2.5, height: '100%',
      background: bg,
      border: `1px solid ${color}22`,
      display: 'flex', alignItems: 'center', gap: 2,
      transition: 'transform 0.18s',
      '&:hover': { transform: 'translateY(-2px)' },
    }}
  >
    <Box
      sx={{
        width: 44, height: 44, borderRadius: 2,
        bgcolor: `${color}18`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color, flexShrink: 0,
      }}
    >
      {icon}
    </Box>
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 800, color, lineHeight: 1.1 }}>
        {value}
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
        {label}
      </Typography>
    </Box>
  </Paper>
);

// ── Fila de info ────────────────────────────────────────────
const InfoRow = ({
  icon, label, value, iconBg,
}: {
  icon: React.ReactNode; label: string; value: string; iconBg: string;
}) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1.5 }}>
    <Box
      sx={{
        width: 38, height: 38, borderRadius: 2,
        bgcolor: iconBg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      {icon}
    </Box>
    <Box sx={{ flex: 1 }}>
      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, display: 'block' }}>
        {label}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 500 }}>
        {value}
      </Typography>
    </Box>
  </Box>
);

// ── PerfilPage ───────────────────────────────────────────────
export const PerfilPage = () => {
  const { user }   = useAuth();
  const { tasks }  = useTasks();

  const totalTasks     = tasks.length;
  const completedTasks = tasks.filter((t) => t.done).length;
  const pendingTasks   = tasks.filter((t) => !t.done).length;
  const progressPct    = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const today = new Date().toLocaleDateString('es-PE', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <Box>
      {/* ── Título ── */}
      <Typography
        variant="h4" component="h1"
        sx={{
          mb: 3, fontWeight: 800,
          background: 'linear-gradient(90deg, #3B82F6, #22D3EE)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Mi Perfil
      </Typography>

      {/* ── Fila de stats ── */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <MiniStat icon={<AllIcon />}     label="Tareas totales"  value={totalTasks}     color="#3B82F6" bg="rgba(37,99,235,0.07)" />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <MiniStat icon={<PendingIcon />} label="Pendientes"      value={pendingTasks}   color="#64748B" bg="rgba(100,116,139,0.07)" />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <MiniStat icon={<DoneIcon />}    label="Finalizadas"     value={completedTasks} color="#10B981" bg="rgba(16,185,129,0.07)" />
        </Grid>
      </Grid>

      {/* ── Contenido principal: 2 columnas ── */}
      <Grid container spacing={3}>

        {/* ── Columna izquierda: tarjeta de perfil ── */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card elevation={0} sx={{ borderRadius: 3, overflow: 'visible', border: '1px solid rgba(37,99,235,0.2)', height: '100%' }}>

            {/* Banner */}
            <Box
              sx={{
                height: 100,
                background: 'linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)',
                borderRadius: '12px 12px 0 0',
              }}
            />

            <CardContent sx={{ pt: 0, pb: 3, px: 3 }}>
              {/* Avatar + badge */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mt: -5.5, mb: 2 }}>
                <Avatar
                  sx={{
                    width: 82, height: 82,
                    bgcolor: '#0F172A',
                    border: '4px solid #1E293B',
                    fontSize: 32, fontWeight: 800,
                    color: 'primary.light',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
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
                    fontWeight: 700, fontSize: '0.7rem',
                  }}
                />
              </Box>

              <Typography variant="h5" sx={{ fontWeight: 700 }}>{user?.username}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Usuario registrado
              </Typography>

              <Divider sx={{ mb: 2 }} />

              {/* Info rows */}
              <InfoRow
                icon={<PersonIcon sx={{ fontSize: 17, color: 'primary.light' }} />}
                label="Nombre de usuario"
                value={user?.username || '—'}
                iconBg="rgba(37,99,235,0.1)"
              />
              <Divider sx={{ opacity: 0.4 }} />
              <InfoRow
                icon={<CalendarIcon sx={{ fontSize: 17, color: 'secondary.light' }} />}
                label="Sesión activa"
                value={today}
                iconBg="rgba(6,182,212,0.1)"
              />
            </CardContent>
          </Card>
        </Grid>

        {/* ── Columna derecha ── */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: '100%' }}>

            {/* Progreso de tareas */}
            <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid rgba(37,99,235,0.15)' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.4 }}>
                  Progreso de tareas
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
                  Resumen de tu actividad actual
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {completedTasks} de {totalTasks} completadas
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 700, color: progressPct === 100 ? 'success.main' : 'primary.light' }}
                  >
                    {progressPct}%
                  </Typography>
                </Box>

                <LinearProgress
                  variant="determinate"
                  value={progressPct}
                  sx={{ height: 10, borderRadius: 5, mb: 2 }}
                />

                {/* Mini barra por estado */}
                <Grid container spacing={1.5}>
                  {[
                    { label: 'Completadas', count: completedTasks, color: '#10B981', pct: totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0 },
                    { label: 'Pendientes',  count: pendingTasks,   color: '#64748B', pct: totalTasks > 0 ? (pendingTasks  / totalTasks) * 100 : 0 },
                  ].map((item) => (
                    <Grid size={{ xs: 12, sm: 6 }} key={item.label}>
                      <Box
                        sx={{
                          p: 1.5, borderRadius: 2,
                          bgcolor: `${item.color}10`,
                          border: `1px solid ${item.color}25`,
                        }}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.8 }}>
                          <Typography variant="caption" sx={{ fontWeight: 600, color: item.color }}>
                            {item.label}
                          </Typography>
                          <Typography variant="caption" sx={{ fontWeight: 700, color: item.color }}>
                            {item.count}
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={item.pct}
                          sx={{
                            height: 5, borderRadius: 3,
                            bgcolor: 'rgba(255,255,255,0.06)',
                            '& .MuiLinearProgress-bar': { bgcolor: item.color },
                          }}
                        />
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>

            {/* Info de cuenta */}
            <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid rgba(37,99,235,0.15)', flex: 1 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.4 }}>
                  Información de cuenta
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
                  Detalles de tu cuenta y configuración
                </Typography>

                <Grid container spacing={2}>
                  {[
                    {
                      icon: <SecurityIcon sx={{ fontSize: 18, color: '#3B82F6' }} />,
                      label: 'Tipo de cuenta',
                      value: 'Estándar',
                      bg: 'rgba(37,99,235,0.08)',
                    },
                    {
                      icon: <LanguageIcon sx={{ fontSize: 18, color: '#06B6D4' }} />,
                      label: 'Backend',
                      value: 'taskdone-node',
                      bg: 'rgba(6,182,212,0.08)',
                    },
                    {
                      icon: <DevicesIcon sx={{ fontSize: 18, color: '#10B981' }} />,
                      label: 'Plataforma',
                      value: 'Web App',
                      bg: 'rgba(16,185,129,0.08)',
                    },
                    {
                      icon: <CalendarIcon sx={{ fontSize: 18, color: '#64748B' }} />,
                      label: 'Fecha de hoy',
                      value: new Date().toLocaleDateString('es-PE'),
                      bg: 'rgba(100,116,139,0.08)',
                    },
                  ].map((item) => (
                    <Grid size={{ xs: 12, sm: 6 }} key={item.label}>
                      <Box
                        sx={{
                          display: 'flex', alignItems: 'center', gap: 1.5,
                          p: 1.5, borderRadius: 2, bgcolor: item.bg,
                          border: '1px solid rgba(255,255,255,0.04)',
                        }}
                      >
                        <Box
                          sx={{
                            width: 34, height: 34, borderRadius: 1.5,
                            bgcolor: 'rgba(255,255,255,0.05)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}
                        >
                          {item.icon}
                        </Box>
                        <Box>
                          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, display: 'block' }}>
                            {item.label}
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {item.value}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>

          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
