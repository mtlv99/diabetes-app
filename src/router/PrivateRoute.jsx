import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../auth';

// Basicamente es solo un HOC que revisa si el AuthContext tiene un valor en true. Wow!
export const PrivateRoute = ({ children }) => {
  const { logged } = useContext(AuthContext);
  const { pathname, search } = useLocation();

  // Guarda la ultima ruta navegada por el usuario.
  // Se podria consider memorizar esto, pero de momento se deja así.
  const lastPath = pathname + search;
  localStorage.setItem('lastPath', lastPath);

  return (logged) ? children : <Navigate to="/login" />;
};
