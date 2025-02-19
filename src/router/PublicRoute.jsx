import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../auth';

// Basicamente es solo un HOC que revisa si el AuthContext tiene cierto valor.
export const PublicRoute = ({ children }) => {
  const { logged } = useContext(AuthContext);
  // Si ya está autenticado, entonces se envia al root. De lo contrario, mostrar los children.
  // (Lo opuesto al PrivateRoute.jsx)
  return (logged) ? <Navigate to="/" /> : children;
};
