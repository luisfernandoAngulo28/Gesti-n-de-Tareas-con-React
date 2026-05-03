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
      elevation={2}
      sx={{
        borderRadius: 3,
        borderLeft: 5,
        borderColor: isCompleted ? 'success.main' : 'primary.main',
        opacity: isCompleted ? 0.85 : 1,
        transition: 'all 0.25s ease',
        '&:hover': {
          boxShadow: 6,
          transform: 'translateY(-2px)',
        },
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          py: '12px !important',
        }}
      >
        {/* Botón de estado */}
        <Tooltip title={isCompleted ? 'Marcar como pendiente' : 'Marcar como finalizada'}>
          <IconButton
            onClick={() => onToggleStatus(task.id, task.done)}
            color={isCompleted ? 'success' : 'default'}
            size="small"
          >
            {isCompleted ? <CheckIcon /> : <PendingIcon />}
          </IconButton>
        </Tooltip>

        {/* Nombre de la tarea */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              textDecoration: isCompleted ? 'line-through' : 'none',
              color: isCompleted ? 'text.secondary' : 'text.primary',
              wordBreak: 'break-word',
            }}
          >
            {task.name}
          </Typography>

          <Chip
            label={isCompleted ? 'Finalizada ✓' : 'Pendiente'}
            size="small"
            color={isCompleted ? 'success' : 'warning'}
            variant="outlined"
            sx={{ mt: 0.5, fontWeight: 600, fontSize: '0.7rem' }}
          />
        </Box>

        {/* Acciones */}
        <Box sx={{ display: 'flex', flexShrink: 0 }}>
          <Tooltip title="Editar">
            <IconButton onClick={() => onEdit(task)} size="small" color="primary">
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar">
            <IconButton onClick={() => onDelete(task.id)} size="small" color="error">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
};
