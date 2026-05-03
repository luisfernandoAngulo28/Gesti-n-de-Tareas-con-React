import {
  Alert, Box, Button, CircularProgress, Dialog, DialogActions,
  DialogContent, DialogTitle, Divider, LinearProgress,
  Stack, Tab, Tabs, Typography, Paper,
} from '@mui/material';
import {
  Add as AddIcon, CheckCircle as DoneIcon,
  Schedule as PendingIcon, FormatListBulleted as AllIcon,
  Delete as DeleteIcon, EmojiEvents as TrophyIcon,
  NoteAdd as NoteAddIcon, Celebration as CelebrationIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import { useTasks, useAlert } from '../../hooks';
import { TaskForm } from '../../components/tasks/TaskForm';
import { TaskItem } from '../../components/tasks/TaskItem';
import type { Task } from '../../models/task.model';

// ── Tarjeta de estadística ──────────────────────────────────
const StatCard = ({
  label, value, icon, color, bgColor,
}: {
  label: string; value: number; icon: React.ReactNode; color: string; bgColor: string;
}) => (
  <Paper
    elevation={0}
    sx={{
      flex: 1, p: 2, borderRadius: 2.5,
      background: bgColor,
      border: `1px solid ${color}28`,
      display: 'flex', alignItems: 'center', gap: 1.5,
      transition: 'transform 0.18s, box-shadow 0.18s',
      '&:hover': { transform: 'translateY(-2px)', boxShadow: `0 8px 24px ${color}20` },
    }}
  >
    <Box
      sx={{
        width: 40, height: 40, borderRadius: 2,
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
      <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
        {label}
      </Typography>
    </Box>
  </Paper>
);

// ── TaskPage ────────────────────────────────────────────────
export const TaskPage = () => {
  const { tasks, loading, error, createTask, updateTask, toggleStatus, deleteTask } = useTasks();
  const { showAlert } = useAlert();

  const [formOpen, setFormOpen]     = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deleteId, setDeleteId]     = useState<number | null>(null);
  const [tab, setTab]               = useState<'all' | 'pending' | 'completed'>('all');

  const handleOpenCreate = () => { setEditingTask(null); setFormOpen(true); };
  const handleOpenEdit   = (t: Task) => { setEditingTask(t); setFormOpen(true); };

  const handleFormSubmit = async (data: { name?: string }) => {
    if (editingTask) {
      const ok = await updateTask(editingTask.id, { name: data.name });
      if (ok) showAlert('Tarea actualizada', 'success');
      return ok;
    }
    const ok = await createTask({ name: data.name! });
    if (ok) showAlert('Tarea creada', 'success');
    return ok;
  };

  const handleConfirmDelete = async () => {
    if (deleteId === null) return;
    const ok = await deleteTask(deleteId);
    setDeleteId(null);
    if (ok) showAlert('Tarea eliminada', 'info');
  };

  const handleToggle = async (id: number, done: boolean) => {
    const ok = await toggleStatus(id, done);
    if (ok) showAlert(done ? 'Marcada como pendiente' : 'Tarea completada', 'success');
  };

  const pendingCount   = tasks.filter((t) => !t.done).length;
  const completedCount = tasks.filter((t) => t.done).length;
  const progressPct    = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  const filteredTasks = tasks.filter((t) => {
    if (tab === 'pending')   return !t.done;
    if (tab === 'completed') return  t.done;
    return true;
  });

  return (
    <Box>
      {/* ── Encabezado ── */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography
            variant="h4" component="h1"
            sx={{
              background: 'linear-gradient(90deg, #3B82F6, #22D3EE)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Mis Tareas
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.3 }}>
            Gestiona tus tareas de forma eficiente
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenCreate} sx={{ px: 3, py: 1.1 }}>
          Nueva Tarea
        </Button>
      </Box>

      {/* ── Stat cards ── */}
      {tasks.length > 0 && (
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          <StatCard label="Total"      value={tasks.length}  icon={<AllIcon />}     color="#3B82F6" bgColor="rgba(37,99,235,0.08)" />
          <StatCard label="Pendientes" value={pendingCount}  icon={<PendingIcon />} color="#64748B" bgColor="rgba(100,116,139,0.08)" />
          <StatCard label="Finalizadas" value={completedCount} icon={<DoneIcon />}  color="#10B981" bgColor="rgba(16,185,129,0.08)" />
        </Box>
      )}

      {/* ── Barra de progreso ── */}
      {tasks.length > 0 && (
        <Paper elevation={0} sx={{ p: 2.5, mb: 3, borderRadius: 2.5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.2 }}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>Progreso general</Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, color: progressPct === 100 ? 'success.main' : 'primary.light' }}>
              {progressPct}%
            </Typography>
          </Box>
          <LinearProgress variant="determinate" value={progressPct} />
          {progressPct === 100 && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mt: 1 }}>
              <CelebrationIcon sx={{ fontSize: 15, color: 'success.main' }} />
              <Typography variant="caption" sx={{ color: 'success.main', fontWeight: 600 }}>
                ¡Todas las tareas completadas!
              </Typography>
            </Box>
          )}
        </Paper>
      )}

      {/* ── Error ── */}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {/* ── Tabs ── */}
      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
        <Tab label={`Todas (${tasks.length})`}       value="all" />
        <Tab label={`Pendientes (${pendingCount})`}  value="pending" />
        <Tab label={`Finalizadas (${completedCount})`} value="completed" />
      </Tabs>

      <Divider sx={{ mb: 2.5 }} />

      {/* ── Lista ── */}
      {loading ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8, gap: 2 }}>
          <CircularProgress />
          <Typography variant="body2" color="text.secondary">Cargando tareas...</Typography>
        </Box>
      ) : filteredTasks.length === 0 ? (
        <Box
          sx={{
            textAlign: 'center', py: 9, px: 3, borderRadius: 3,
            background: 'rgba(37,99,235,0.04)',
            border: '1px dashed rgba(37,99,235,0.2)',
          }}
        >
          <Box
            sx={{
              width: 68, height: 68, borderRadius: '50%',
              bgcolor: 'rgba(37,99,235,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              mx: 'auto', mb: 2,
            }}
          >
            {tab === 'completed'
              ? <TrophyIcon sx={{ fontSize: 32, color: '#10B981' }} />
              : <NoteAddIcon sx={{ fontSize: 32, color: 'primary.light' }} />}
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
            {tab === 'all' ? 'Sin tareas todavía'
              : tab === 'pending' ? 'Sin tareas pendientes'
              : 'Sin tareas finalizadas'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {tab === 'all'       && 'Crea tu primera tarea con el botón "Nueva Tarea"'}
            {tab === 'pending'   && 'No tienes tareas pendientes. ¡Al día!'}
            {tab === 'completed' && 'Completa algunas tareas para verlas aquí.'}
          </Typography>
          {tab === 'all' && (
            <Button variant="outlined" startIcon={<AddIcon />} onClick={handleOpenCreate} sx={{ mt: 3 }}>
              Crear primera tarea
            </Button>
          )}
        </Box>
      ) : (
        <Stack spacing={1.5}>
          {filteredTasks.map((task, i) => (
            <Box key={task.id} className="task-card-enter" sx={{ animationDelay: `${i * 0.04}s` }}>
              <TaskItem
                task={task}
                onEdit={handleOpenEdit}
                onDelete={(id) => setDeleteId(id)}
                onToggleStatus={handleToggle}
              />
            </Box>
          ))}
        </Stack>
      )}

      {/* ── Formulario crear/editar ── */}
      <TaskForm open={formOpen} onClose={() => setFormOpen(false)} onSubmit={handleFormSubmit} task={editingTask} />

      {/* ── Confirmación eliminar ── */}
      <Dialog open={deleteId !== null} onClose={() => setDeleteId(null)}>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <DeleteIcon sx={{ color: 'error.main', fontSize: 20 }} />
          Eliminar tarea
        </DialogTitle>
        <DialogContent>
          <Typography color="text.secondary">
            ¿Estás seguro de que deseas eliminar esta tarea? Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
          <Button onClick={() => setDeleteId(null)} color="inherit">Cancelar</Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            startIcon={<DeleteIcon />}
            sx={{
              background: 'linear-gradient(135deg,#EF4444,#B91C1C) !important',
              boxShadow: '0 4px 14px rgba(239,68,68,0.35) !important',
            }}
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};