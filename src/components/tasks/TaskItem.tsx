import {
  Box,
  Card,
  CardContent,
  Chip,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  CheckCircle as CheckIcon,
  RadioButtonUnchecked as PendingIcon,
  TaskAlt as CompletedIcon,
  PendingActions as PendingBadgeIcon,
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
        borderRadius: 3,
        borderLeft: 4,
        borderColor: isCompleted ? 'success.main' : 'primary.main',
        opacity: isCompleted ? 0.88 : 1,
        transition: 'all 0.25s ease',
        '&:hover': {
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          py: '14px !important',
          px: 2,
        }}
      >
        {/* Toggle de estado */}
        <Tooltip title={isCompleted ? 'Marcar como pendiente' : 'Marcar como finalizada'}>
          <IconButton
            onClick={() => onToggleStatus(task.id, task.done)}
            size="small"
            sx={{
              color: isCompleted ? 'success.main' : 'text.secondary',
              '&:hover': {
                color: isCompleted ? 'warning.main' : 'success.main',
                bgcolor: isCompleted
                  ? 'rgba(245,158,11,0.08)'
                  : 'rgba(16,185,129,0.08)',
              },
              transition: 'color 0.2s, background 0.2s',
            }}
          >
            {isCompleted ? <CheckIcon /> : <PendingIcon />}
          </IconButton>
        </Tooltip>

        {/* Nombre */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              textDecoration: isCompleted ? 'line-through' : 'none',
              color: isCompleted ? 'text.secondary' : 'text.primary',
              wordBreak: 'break-word',
              transition: 'color 0.2s',
            }}
          >
            {task.name}
          </Typography>

          <Chip
            icon={
              isCompleted ? (
                <CompletedIcon sx={{ fontSize: '14px !important' }} />
              ) : (
                <PendingBadgeIcon sx={{ fontSize: '14px !important' }} />
              )
            }
            label={isCompleted ? 'Finalizada' : 'Pendiente'}
            size="small"
            color={isCompleted ? 'success' : 'warning'}
            variant="outlined"
            sx={{ mt: 0.6, fontWeight: 600, fontSize: '0.7rem', height: 22 }}
          />
        </Box>

        {/* Acciones */}
        <Box sx={{ display: 'flex', flexShrink: 0, gap: 0.5 }}>
          <Tooltip title="Editar tarea">
            <IconButton
              onClick={() => onEdit(task)}
              size="small"
              sx={{
                color: 'primary.light',
                '&:hover': { bgcolor: 'rgba(124,58,237,0.12)' },
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar tarea">
            <IconButton
              onClick={() => onDelete(task.id)}
              size="small"
              sx={{
                color: 'error.main',
                '&:hover': { bgcolor: 'rgba(239,68,68,0.1)' },
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
};
