import { Box, Button, CircularProgress, Paper, TextField, Typography } from '@mui/material';
import { useActionState } from 'react';
import { schemaLogin, type LoginFormValues } from '../../models/login.model';
import type { ActionState } from '../../interfaces';
import { createInitialState, handleZodErros } from '../../helpers';
import { Link, useNavigate } from 'react-router-dom';
import { useAlert, useAuth, useAxios } from '../../hooks';
import { TaskAlt as TaskIcon, Person as PersonIcon, Lock as LockIcon } from '@mui/icons-material';

export type LoginActionState = ActionState<LoginFormValues>;
const initialState = createInitialState<LoginFormValues>();

export const LoginPage = () => {
  const { showAlert } = useAlert();
  const { login }     = useAuth();
  const axios         = useAxios();
  const navigate      = useNavigate();

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
      showAlert('Bienvenido', 'success');
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
        background:
          'radial-gradient(ellipse at 25% 40%, rgba(37,99,235,0.18) 0%, transparent 55%),' +
          'radial-gradient(ellipse at 75% 70%, rgba(6,182,212,0.12) 0%, transparent 55%),' +
          '#0F172A',
        px: 2,
      }}
    >
      {/* Card central */}
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 400,
          p: 4,
          borderRadius: 3,
          border: '1px solid rgba(37,99,235,0.22)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.55), 0 0 40px rgba(37,99,235,0.08)',
        }}
      >
        {/* Logo */}
        <Box sx={{ textAlign: 'center', mb: 3.5 }}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: 2.5,
              background: 'linear-gradient(135deg, #2563EB, #06B6D4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 1.5,
              boxShadow: '0 8px 24px rgba(37,99,235,0.45)',
            }}
          >
            <TaskIcon sx={{ color: 'white', fontSize: 28 }} />
          </Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              background: 'linear-gradient(90deg, #3B82F6, #22D3EE)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.3px',
            }}
          >
            TaskDone
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.4 }}>
            Inicia sesión para continuar
          </Typography>
        </Box>

        {/* Formulario */}
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
                  <Box sx={{ mr: 1, color: 'text.disabled', display: 'flex' }}>
                    <PersonIcon sx={{ fontSize: 18 }} />
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
            slotProps={{
              input: {
                startAdornment: (
                  <Box sx={{ mr: 1, color: 'text.disabled', display: 'flex' }}>
                    <LockIcon sx={{ fontSize: 18 }} />
                  </Box>
                ),
              },
            }}
          />

          <Button
            type="submit"
            disabled={isPending}
            fullWidth
            variant="contained"
            sx={{ mt: 2.5, mb: 1.5, height: 46, fontSize: '0.95rem' }}
            startIcon={isPending ? <CircularProgress size={17} color="inherit" /> : null}
          >
            {isPending ? 'Ingresando...' : 'Iniciar sesión'}
          </Button>

          <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary' }}>
            ¿No tienes cuenta?{' '}
            <Link to="/user" style={{ color: '#3B82F6', textDecoration: 'none', fontWeight: 600 }}>
              Regístrate aquí
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};
