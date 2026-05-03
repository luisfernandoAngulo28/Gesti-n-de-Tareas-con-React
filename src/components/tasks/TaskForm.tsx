import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { Edit as EditIcon, Add as AddIcon } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import type { Task, CreateTaskDto, UpdateTaskDto } from '../../models/task.model';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateTaskDto | UpdateTaskDto) => Promise<boolean>;
  task?: Task | null;
}

export const TaskForm = ({ open, onClose, onSubmit, task }: Props) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      setName(task?.name ?? '');
      setError('');
    }
  }, [open, task]);

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError('El nombre de la tarea es obligatorio');
      return;
    }
    setLoading(true);
    const ok = await onSubmit({ name: name.trim() });
    setLoading(false);
    if (ok) onClose();
  };

  const isEdit = !!task;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          pb: 1,
        }}
      >
        {isEdit ? (
          <EditIcon sx={{ color: 'primary.light', fontSize: 22 }} />
        ) : (
          <AddIcon sx={{ color: 'primary.light', fontSize: 22 }} />
        )}
        {isEdit ? 'Editar Tarea' : 'Nueva Tarea'}
      </DialogTitle>

      <DialogContent>
        <Box sx={{ mt: 1 }}>
          <TextField
            label="Nombre de la tarea *"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError('');
            }}
            error={!!error}
            helperText={error}
            fullWidth
            autoFocus
            disabled={loading}
            placeholder="Ej: Estudiar React, Hacer tarea..."
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
        <Button onClick={onClose} disabled={loading} color="inherit">
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
          startIcon={
            loading ? (
              <CircularProgress size={18} color="inherit" />
            ) : isEdit ? (
              <EditIcon />
            ) : (
              <AddIcon />
            )
          }
        >
          {loading ? 'Guardando...' : isEdit ? 'Guardar cambios' : 'Crear tarea'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
