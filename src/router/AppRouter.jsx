import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { CircularProgress, Typography } from '@mui/material';
import { LoginPage } from '../auth';
import { DiabetesPage } from '../diabetes';
import { useAuthStore } from '../hooks';

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();

  // verifica la validez del token
  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === 'checking') {
    return (
      <div style={{
        height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center',
      }}
      >
        <CircularProgress />
      </div>
    );
  }

  // Router basado en el status de la autenticacion.
  return (
    <Routes>
      {
        (status === 'not-authenticated')
          ? (
            <>
              <Route path="/auth/*" element={<LoginPage />} />
              <Route path="/*" element={<Navigate to="/auth/login" />} />
            </>
          )
          : (
            <>
              <Route path="/" element={<DiabetesPage />} />
              <Route path="/*" element={<Navigate to="/" />} />
            </>
          )
      }
    </Routes>

  );
};
