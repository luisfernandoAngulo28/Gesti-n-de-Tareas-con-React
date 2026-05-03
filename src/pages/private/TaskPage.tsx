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
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useState } from 'react';
import { useTasks, useAlert } from '../../hooks';
import { TaskForm } from '../../components/tasks/TaskForm';
import { TaskItem } from '../../components/tasks/TaskItem';
import type { Task } from '../../models/task.model';

export const TaskPage = () => {
  const { tasks, loading, error, createTask, updateTask, toggleStatus, deleteTask } = useTasks();
  const { showAlert } = useAlert();

  // Estado del formulario (crear / editar)
  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Estado del diálogo de confirmación de borrado
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // Filtro de pestañas
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
      if (ok) showAlert('Tarea actualizada ✅', 'success');
      return ok;
    } else {
      const ok = await createTask({ name: data.name! });
      if (ok) showAlert('Tarea creada ✅', 'success');
      return ok;
    }
  };

  const handleConfirmDelete = async () => {
    if (deleteId === null) return;
    const ok = await deleteTask(deleteId);
    setDeleteId(null);
    if (ok) showAlert('Tarea eliminada 🗑️', 'info');
  };

  const handleToggle = async (id: number, done: boolean) => {
    const ok = await toggleStatus(id, done);
    if (ok) showAlert(done ? 'Marcada como pendiente' : 'Marcada como finalizada ✓', 'success');
  };

  // Filtrar según pestaña activa
  const filteredTasks = tasks.filter((t) => {
    if (tab === 'pending') return !t.done;
    if (tab === 'completed') return t.done;
    return true;
  });

  const pendingCount = tasks.filter((t) => !t.done).length;
  const completedCount = tasks.filter((t) => t.done).length;

  return (
    <Box>
      {/* Encabezado */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight={700} component="h1">
            📋 Mis Tareas
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {tasks.length} tarea{tasks.length !== 1 ? 's' : ''} · {pendingCount} pendiente
            {pendingCount !== 1 ? 's' : ''} · {completedCount} finalizada
            {completedCount !== 1 ? 's' : ''}
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenCreate}
          sx={{ borderRadius: 2, fontWeight: 600, px: 3 }}
        >
          Nueva Tarea
        </Button>
      </Box>

      {/* Error global */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Pestañas de filtro */}
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        sx={{ mb: 2 }}
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label={`Todas (${tasks.length})`} value="all" />
        <Tab label={`Pendientes (${pendingCount})`} value="pending" />
        <Tab label={`Finalizadas (${completedCount})`} value="completed" />
      </Tabs>

      <Divider sx={{ mb: 2 }} />

      {/* Lista de tareas */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress />
        </Box>
      ) : filteredTasks.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8, color: 'text.secondary' }}>
          <Typography variant="h1" sx={{ fontSize: 64, mb: 1 }}>
            🗂️
          </Typography>
          <Typography variant="h6">
            {tab === 'all'
              ? 'No hay tareas aún. ¡Crea la primera!'
              : tab === 'pending'
                ? 'No hay tareas pendientes 🎉'
                : 'No hay tareas finalizadas aún'}
          </Typography>
        </Box>
      ) : (
        <Stack spacing={1.5}>
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={handleOpenEdit}
              onDelete={(id) => setDeleteId(id)}
              onToggleStatus={handleToggle}
            />
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

      {/* Diálogo de confirmación de eliminación */}
      <Dialog open={deleteId !== null} onClose={() => setDeleteId(null)}>
        <DialogTitle fontWeight={700}>🗑️ Eliminar tarea</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas eliminar esta tarea? Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
          <Button onClick={() => setDeleteId(null)} color="inherit">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} variant="contained" color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};