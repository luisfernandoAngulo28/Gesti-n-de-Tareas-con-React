import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  LinearProgress,
  Stack,
  Tab,
  Tabs,
  Typography,
  Paper,
} from '@mui/material';
import {
  Add as AddIcon,
  CheckCircle as DoneIcon,
  HourglassEmpty as PendingIcon,
  FormatListBulleted as AllIcon,
  Delete as DeleteIcon,
  EmojiEvents as TrophyIcon,
  NoteAdd as NoteAddIcon,
  Celebration as CelebrationIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import { useTasks, useAlert } from '../../hooks';
import { TaskForm } from '../../components/tasks/TaskForm';
import { TaskItem } from '../../components/tasks/TaskItem';
import type { Task } from '../../models/task.model';

const StatCard = ({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}) => (
  <Paper
    elevation={0}
    sx={{
      flex: 1,
      p: 2,
      borderRadius: 3,
      background: `linear-gradient(135deg, ${color}18, ${color}08)`,
      border: `1px solid ${color}30`,
      display: 'flex',
      alignItems: 'center',
      gap: 1.5,
    }}
  >
    <Box
      sx={{
        width: 42,
        height: 42,
        borderRadius: 2,
        bgcolor: `${color}20`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: color,
        flexShrink: 0,
      }}
    >
      {icon}
    </Box>
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 700, color: color, lineHeight: 1 }}>
        {value}
      </Typography>
      <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
        {label}
      </Typography>
    </Box>
  </Paper>
);

export const TaskPage = () => {
  const { tasks, loading, error, createTask, updateTask, toggleStatus, deleteTask } = useTasks();
  const { showAlert } = useAlert();

  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [tab, setTab] = useState<'all' | 'pending' | 'completed'>('all');

  const handleOpenCreate = () => {
    setEditingTask(null);
    setFormOpen(true);
  };

  const handleOpenEdit = (task: Task) => {
    setEditingTask(task);
    setFormOpen(true);
  };

  const handleFormSubmit = async (data: { name?: string }) => {
    if (editingTask) {
      const ok = await updateTask(editingTask.id, { name: data.name });
      if (ok) showAlert('Tarea actualizada correctamente', 'success');
      return ok;
    } else {
      const ok = await createTask({ name: data.name! });
      if (ok) showAlert('Tarea creada correctamente', 'success');
      return ok;
    }
  };

  const handleConfirmDelete = async () => {
    if (deleteId === null) return;
    const ok = await deleteTask(deleteId);
    setDeleteId(null);
    if (ok) showAlert('Tarea eliminada', 'info');
  };

  const handleToggle = async (id: number, done: boolean) => {
    const ok = await toggleStatus(id, done);
    if (ok)
      showAlert(done ? 'Marcada como pendiente' : 'Tarea completada', 'success');
  };

  const filteredTasks = tasks.filter((t) => {
    if (tab === 'pending') return !t.done;
    if (tab === 'completed') return t.done;
    return true;
  });

  const pendingCount = tasks.filter((t) => !t.done).length;
  const completedCount = tasks.filter((t) => t.done).length;
  const progressPercent =
    tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <Box>
      {/* Encabezado */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          mb: 3,
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 800,
              background: 'linear-gradient(90deg, #a78bfa, #67e8f9)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.5px',
            }}
          >
            Mis Tareas
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.3 }}>
            Gestiona tus tareas de forma eficiente
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenCreate}
          sx={{ px: 3, py: 1.2, fontSize: '0.9rem' }}
        >
          Nueva Tarea
        </Button>
      </Box>

      {/* Tarjetas de estadísticas */}
      {tasks.length > 0 && (
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          <StatCard label="Total" value={tasks.length} icon={<AllIcon />} color="#7c3aed" />
          <StatCard label="Pendientes" value={pendingCount} icon={<PendingIcon />} color="#f59e0b" />
          <StatCard label="Finalizadas" value={completedCount} icon={<DoneIcon />} color="#10b981" />
        </Box>
      )}

      {/* Barra de progreso */}
      {tasks.length > 0 && (
        <Paper
          elevation={0}
          sx={{
            p: 2.5,
            mb: 3,
            borderRadius: 3,
            background: 'linear-gradient(135deg, #1e1e3a, #16213e)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
              Progreso general
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 700,
                color: progressPercent === 100 ? 'success.main' : 'primary.light',
              }}
            >
              {progressPercent}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={progressPercent}
            sx={{
              height: 8,
              borderRadius: 4,
              bgcolor: 'rgba(255,255,255,0.06)',
              '& .MuiLinearProgress-bar': {
                borderRadius: 4,
                background:
                  progressPercent === 100
                    ? 'linear-gradient(90deg, #10b981, #6ee7b7)'
                    : 'linear-gradient(90deg, #7c3aed, #06b6d4)',
              },
            }}
          />
          {progressPercent === 100 && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mt: 0.8 }}>
              <CelebrationIcon sx={{ fontSize: 16, color: 'success.main' }} />
              <Typography
                variant="caption"
                sx={{ color: 'success.main', fontWeight: 600 }}
              >
                ¡Todas las tareas completadas!
              </Typography>
            </Box>
          )}
        </Paper>
      )}

      {/* Error global */}
      {error && (
        <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      {/* Pestañas */}
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        sx={{
          mb: 2,
          '& .MuiTabs-indicator': {
            background: 'linear-gradient(90deg, #7c3aed, #06b6d4)',
            height: 3,
            borderRadius: 2,
          },
        }}
      >
        <Tab label={`Todas (${tasks.length})`} value="all" />
        <Tab label={`Pendientes (${pendingCount})`} value="pending" />
        <Tab label={`Finalizadas (${completedCount})`} value="completed" />
      </Tabs>

      <Divider sx={{ mb: 2.5, borderColor: 'rgba(255,255,255,0.06)' }} />

      {/* Lista */}
      {loading ? (
        <Box
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8, gap: 2 }}
        >
          <CircularProgress sx={{ color: 'primary.light' }} />
          <Typography variant="body2" color="text.secondary">
            Cargando tareas...
          </Typography>
        </Box>
      ) : filteredTasks.length === 0 ? (
        <Box
          sx={{
            textAlign: 'center',
            py: 10,
            px: 3,
            borderRadius: 4,
            background: 'linear-gradient(135deg, rgba(124,58,237,0.05), rgba(6,182,212,0.03))',
            border: '1px dashed rgba(124,58,237,0.2)',
          }}
        >
          <Box
            sx={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              bgcolor: 'rgba(124,58,237,0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 2,
            }}
          >
            {tab === 'completed' ? (
              <TrophyIcon sx={{ fontSize: 36, color: '#f59e0b' }} />
            ) : (
              <NoteAddIcon sx={{ fontSize: 36, color: '#7c3aed' }} />
            )}
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
            {tab === 'all'
              ? 'Sin tareas todavía'
              : tab === 'pending'
                ? 'Sin tareas pendientes'
                : 'Sin tareas finalizadas'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {tab === 'all' && 'Crea tu primera tarea con el botón "Nueva Tarea"'}
            {tab === 'pending' && '¡Todo al día! No tienes tareas pendientes.'}
            {tab === 'completed' && 'Completa algunas tareas para verlas aquí.'}
          </Typography>
          {tab === 'all' && (
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={handleOpenCreate}
              sx={{
                mt: 3,
                borderColor: 'rgba(124,58,237,0.4)',
                color: 'primary.light',
                '&:hover': {
                  borderColor: 'primary.main',
                  bgcolor: 'rgba(124,58,237,0.08)',
                },
              }}
            >
              Crear primera tarea
            </Button>
          )}
        </Box>
      ) : (
        <Stack spacing={1.5}>
          {filteredTasks.map((task, index) => (
            <Box
              key={task.id}
              className="task-card-enter"
              sx={{ animationDelay: `${index * 0.05}s` }}
            >
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

      {/* Diálogo Crear / Editar */}
      <TaskForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
        task={editingTask}
      />

      {/* Diálogo de eliminación */}
      <Dialog open={deleteId !== null} onClose={() => setDeleteId(null)}>
        <DialogTitle sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
          <DeleteIcon sx={{ color: 'error.main' }} />
          Eliminar tarea
        </DialogTitle>
        <DialogContent>
          <Typography color="text.secondary">
            ¿Estás seguro de que deseas eliminar esta tarea? Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
          <Button onClick={() => setDeleteId(null)} color="inherit">
            Cancelar
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            sx={{
              background: 'linear-gradient(135deg, #ef4444, #b91c1c) !important',
              boxShadow: '0 4px 12px rgba(239,68,68,0.3) !important',
            }}
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};