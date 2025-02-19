import React from 'react';
import { AuthProvider } from './auth';
import { AppRouter } from './router/AppRouter';

// eslint-disable-next-line arrow-body-style
export const DiabetesApp = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
};
