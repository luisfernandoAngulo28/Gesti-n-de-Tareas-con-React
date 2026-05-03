import {
  Box, Card, CardContent, Chip, IconButton, Tooltip, Typography,
} from '@mui/material';
import {
  Delete as DeleteIcon, Edit as EditIcon,
  CheckCircle as CheckIcon, RadioButtonUnchecked as UncheckedIcon,
  TaskAlt as CompletedIcon, Schedule as PendingBadgeIcon,
} from '@mui/icons-material';
import type { Task } from '../../models/task.model';

interface Props {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onToggleStatus: (id: number, done: boolean) => void;
}

export const TaskItem = ({ task, onEdit, onDelete, onToggleStatus }: Props) => {
  const isCompleted = task.done;

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 2.5,
        borderLeft: '3px solid',
        borderColor: isCompleted ? 'success.main' : 'primary.main',
        transition: 'all 0.2s ease',
        '&:hover': {
          boxShadow: '0 6px 24px rgba(0,0,0,0.35)',
          transform: 'translateY(-1px)',
          borderColor: isCompleted ? 'success.light' : 'primary.light',
        },
      }}
    >
      <CardContent
        sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: '12px !important', px: 2 }}
      >
        {/* Toggle estado */}
        <Tooltip title={isCompleted ? 'Marcar como pendiente' : 'Marcar como finalizada'}>
          <IconButton
            onClick={() => onToggleStatus(task.id, task.done)}
            size="small"
            sx={{
              color: isCompleted ? 'success.main' : 'text.disabled',
              '&:hover': {
                color: isCompleted ? 'warning.main' : 'success.main',
                bgcolor: isCompleted ? 'rgba(100,116,139,0.1)' : 'rgba(16,185,129,0.1)',
              },
              transition: 'all 0.18s',
            }}
          >
            {isCompleted ? <CheckIcon /> : <UncheckedIcon />}
          </IconButton>
        </Tooltip>

        {/* Contenido */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              fontSize: '0.9rem',
              textDecoration: isCompleted ? 'line-through' : 'none',
              color: isCompleted ? 'text.secondary' : 'text.primary',
              wordBreak: 'break-word',
              transition: 'color 0.18s',
            }}
          >
            {task.name}
          </Typography>

          <Chip
            icon={
              isCompleted
                ? <CompletedIcon sx={{ fontSize: '13px !important' }} />
                : <PendingBadgeIcon sx={{ fontSize: '13px !important' }} />
            }
            label={isCompleted ? 'Finalizada' : 'Pendiente'}
            size="small"
            color={isCompleted ? 'success' : 'warning'}
            variant="outlined"
            sx={{ mt: 0.5, fontWeight: 600, fontSize: '0.68rem', height: 20 }}
          />
        </Box>

        {/* Acciones */}
        <Box sx={{ display: 'flex', gap: 0.3, flexShrink: 0 }}>
          <Tooltip title="Editar">
            <IconButton
              onClick={() => onEdit(task)}
              size="small"
              sx={{ color: 'primary.light', '&:hover': { bgcolor: 'rgba(37,99,235,0.1)' } }}
            >
              <EditIcon sx={{ fontSize: 17 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar">
            <IconButton
              onClick={() => onDelete(task.id)}
              size="small"
              sx={{ color: 'error.main', '&:hover': { bgcolor: 'rgba(239,68,68,0.1)' } }}
            >
              <DeleteIcon sx={{ fontSize: 17 }} />
            </IconButton>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
};
