/* eslint-disable arrow-body-style, react/jsx-max-props-per-line, react/jsx-first-prop-new-line,
react/jsx-closing-bracket-location */
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { LoginPage } from '../auth';
import { DiabetesRoutes } from '../diabetes';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
  return (
    <Routes>

      {/* Rutas publicas */}
      <Route path="login" element={(
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      )} />

      {/* Rutas privadas */}
      <Route path="/*" element={(
        <PrivateRoute>
          <DiabetesRoutes />
        </PrivateRoute>
      )} />

    </Routes>
  );
};
