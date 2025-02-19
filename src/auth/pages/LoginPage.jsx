import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const LoginPage = () => {
  const { login } = useContext(AuthContext);

  // Ver comentario del Navbar.jsx
  const navigate = useNavigate();

  const onLogin = () => {
    // Obtiene la ultima ruta donde estuvo el usuario.
    const lastPath = localStorage.getItem('lastPath') || '/';

    login('Marco Leon');

    // Ver comentario del Navbar.jsx
    // Acá se usa `/` para ir al root del app (o el last path).
    // Con replace para que el usuario no pueda volver al login.
    navigate(lastPath, { replace: true });
  };

  return (
    <div className="container mt-5">

      <h1>Login</h1>
      <hr />

      <button type="button" onClick={onLogin} className="btn btn-primary">Login</button>

    </div>
  );
};
