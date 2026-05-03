import {
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useActionState } from 'react';
import { schemaLogin, type LoginFormValues } from '../../models/login.model';
import type { ActionState } from '../../interfaces';
import { createInitialState, handleZodErros } from '../../helpers';
import { Link, useNavigate } from 'react-router-dom';
import { useAlert, useAuth, useAxios } from '../../hooks';
import { TaskAlt as TaskIcon, Lock as LockIcon } from '@mui/icons-material';

export type LoginActionState = ActionState<LoginFormValues>;
const initialState = createInitialState<LoginFormValues>();

export const LoginPage = () => {
  const { showAlert } = useAlert();
  const { login } = useAuth();
  const axios = useAxios();
  const navigate = useNavigate();

  const loginApi = async (
    _: LoginActionState | undefined,
    formData: FormData,
  ): Promise<LoginActionState | undefined> => {
    const rawData: LoginFormValues = {
      username: formData.get('username') as string,
      password: formData.get('password') as string,
    };
    try {
      schemaLogin.parse(rawData);
      const response = await axios.post('login', rawData);
      if (!response?.data?.token) throw new Error('Token no existe');
      login(response.data.token, { username: rawData.username });
      showAlert('¡Bienvenido! 👋', 'success');
      navigate('/tasks');
    } catch (error) {
      const err = handleZodErros<LoginFormValues>(error, rawData);
      showAlert(err.message, 'error');
      return err;
    }
  };

  const [state, submitAction, isPending] = useActionState(loginApi, initialState);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(ellipse at 20% 50%, rgba(124,58,237,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(6,182,212,0.1) 0%, transparent 60%), #0f0f1a',
        px: 2,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decoración de fondo */}
      <Box
        sx={{
          position: 'absolute',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)',
          top: -100,
          left: -100,
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)',
          bottom: -50,
          right: -50,
          pointerEvents: 'none',
        }}
      />

      <Paper
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 420,
          p: 4,
          borderRadius: 4,
          background: 'linear-gradient(135deg, #1e1e3a 0%, #16213e 100%)',
          border: '1px solid rgba(124,58,237,0.25)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(124,58,237,0.1)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Logo */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 2,
              boxShadow: '0 8px 25px rgba(124,58,237,0.4)',
            }}
          >
            <TaskIcon sx={{ color: 'white', fontSize: 32 }} />
          </Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              background: 'linear-gradient(90deg, #a78bfa, #67e8f9)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.3px',
            }}
          >
            TaskDone
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
            Inicia sesión para continuar
          </Typography>
        </Box>

        <Box component="form" action={submitAction}>
          <TextField
            label="Usuario"
            name="username"
            type="text"
            fullWidth
            margin="normal"
            required
            disabled={isPending}
            defaultValue={state?.formData?.username}
            error={!!state?.errors.username}
            helperText={state?.errors.username}
            slotProps={{
              input: {
                startAdornment: (
                  <Box sx={{ mr: 1, color: 'text.secondary', display: 'flex' }}>
                    <LockIcon sx={{ fontSize: 18 }} />
                  </Box>
                ),
              },
            }}
          />

          <TextField
            label="Contraseña"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            required
            disabled={isPending}
            defaultValue={state?.formData?.password}
            error={!!state?.errors.password}
            helperText={state?.errors.password}
          />

          <Button
            type="submit"
            disabled={isPending}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 1.5, height: 50, fontSize: '0.95rem' }}
            startIcon={isPending ? <CircularProgress size={18} color="inherit" /> : null}
          >
            {isPending ? 'Ingresando...' : 'Iniciar sesión'}
          </Button>

          <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary' }}>
            ¿No tienes cuenta?{' '}
            <Link
              to="/user"
              style={{
                color: '#a78bfa',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              Regístrate aquí
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};
