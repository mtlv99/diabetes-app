import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../auth';
import { CalendarPage } from '../diabetes';
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
        <h3>Cargando...</h3>
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
              <Route path="/" element={<CalendarPage />} />
              <Route path="/*" element={<Navigate to="/" />} />
            </>
          )
      }
    </Routes>

  );
};
