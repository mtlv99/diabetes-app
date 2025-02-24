/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import {
  Box, Tabs, Tab, TextField, Button, Checkbox, FormControlLabel, Typography,
} from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { useAuthStore } from '../../hooks';

export const LoginPage = () => {
  const { startLogin, startRegister, errorMessage } = useAuthStore();
  const [tabValue, setTabValue] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm({
    defaultValues: {
      loginEmail: '',
      loginPassword: '',
    },
  });

  const onLoginSubmit = (data) => {
    startLogin({ email: data.loginEmail, password: data.loginPassword });
  };

  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    watch,
    formState: { errors: registerErrors },
  } = useForm({
    defaultValues: {
      registerFirstName: '',
      registerLastName: '',
      registerEmail: '',
      registerPassword: '',
      registerPassword2: '',
      acceptTerms: false,
    },
  });

  const watchPassword = watch('registerPassword', '');

  const onRegisterSubmit = (data) => {
    startRegister({
      firstName: data.registerFirstName,
      lastName: data.registerLastName,
      email: data.registerEmail,
      password: data.registerPassword,
      termsAccepted: data.acceptTerms,
    });
  };

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire('Error en la autenticación', errorMessage, 'error');
    }
  }, [errorMessage]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#E3F2FD',
      }}
    >
      <Box
        sx={{
          width: { xs: '90%', sm: 400 },
          p: 3,
          backgroundColor: '#fff',
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Box sx={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2,
        }}
        >
          <LocalHospitalIcon sx={{ mr: 1 }} />
          <Typography variant="h5">Diabetes App</Typography>
        </Box>

        <Tabs value={tabValue} onChange={handleChangeTab} variant="fullWidth">
          <Tab label="Ingreso" />
          <Tab label="Registro" />
        </Tabs>

        {tabValue === 0 && (
          <Box
            component="form"
            noValidate
            onSubmit={handleLoginSubmit(onLoginSubmit)}
            sx={{ mt: 2 }}
          >
            <TextField
              label="Correo"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!loginErrors.loginEmail}
              helperText={loginErrors.loginEmail?.message}
              {...loginRegister('loginEmail', {
                required: 'El correo es requerido',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Formato de correo inválido',
                },
              })}
            />
            <TextField
              label="Contraseña"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
              error={!!loginErrors.loginPassword}
              helperText={loginErrors.loginPassword?.message}
              {...loginRegister('loginPassword', {
                required: 'La contraseña es requerida',
                minLength: {
                  value: 4,
                  message: 'Mínimo 4 caracteres',
                },
              })}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Iniciar Sesión
            </Button>
          </Box>
        )}

        {tabValue === 1 && (
          <Box
            component="form"
            noValidate
            onSubmit={handleRegisterSubmit(onRegisterSubmit)}
            sx={{ mt: 2 }}
          >
            <TextField
              label="Primer nombre"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!registerErrors.registerFirstName}
              helperText={registerErrors.registerFirstName?.message}
              {...registerRegister('registerFirstName', {
                required: 'El primer nombre es requerido',
              })}
            />
            <TextField
              label="Segundo nombre"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!registerErrors.registerLastName}
              helperText={registerErrors.registerLastName?.message}
              {...registerRegister('registerLastName', {
                required: 'El segundo nombre es requerido',
              })}
            />
            <TextField
              label="Correo"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!registerErrors.registerEmail}
              helperText={registerErrors.registerEmail?.message}
              {...registerRegister('registerEmail', {
                required: 'El correo es requerido',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Formato de correo inválido',
                },
              })}
            />
            <TextField
              label="Contraseña"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
              error={!!registerErrors.registerPassword}
              helperText={registerErrors.registerPassword?.message}
              {...registerRegister('registerPassword', {
                required: 'La contraseña es requerida',
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/,
                  message: 'La contraseña debe tener al menos 6 caracteres, una minúscula, una mayúscula y un carácter especial',
                },
              })}
            />
            <TextField
              label="Repita la contraseña"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
              error={!!registerErrors.registerPassword2}
              helperText={registerErrors.registerPassword2?.message}
              {...registerRegister('registerPassword2', {
                required: 'Por favor repita la contraseña',
                validate: (value) => value === watchPassword || 'Las contraseñas no coinciden',
              })}
            />
            <FormControlLabel
              control={(
                <Checkbox
                  {...registerRegister('acceptTerms', {
                    required: 'Debe aceptar los términos y condiciones',
                  })}
                />
              )}
              label="Acepto los términos y condiciones"
            />
            {registerErrors.acceptTerms && (
              <Box sx={{ color: 'error.main', fontSize: 14 }}>
                {registerErrors.acceptTerms.message}
              </Box>
            )}
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Crear cuenta
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};
