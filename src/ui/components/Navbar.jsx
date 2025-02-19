import { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth';

export const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  // Antes, en versiones anteriores de React y React Router DOM, la info venia por
  // props en un objeto.
  // La forma nueva de acceder al objeto de navigation es por medio de este nuevo custom hook:
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    // También tiene unos atributos adicionales llamados state y replace, que se verán a fondo
    // más adelante.
    // El replace sirve para reemplazar la ultima ruta en el stack de navegación, util para NO
    // permitir devolverse al historial de navegacion anterior, utilizando los botones de navegacion
    // del browser.
    navigate('/login', { replace: true });
  };

  return (

    <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-2">

      <Link
        className="navbar-brand"
        to="/"
      >
        Diabetes App
      </Link>

      <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
        <ul className="navbar-nav ml-auto">

          <span className="nav-item nav-link text-white">
            {user?.name}
          </span>

          <button type="button" className="nav-item nav-link btn" onClick={onLogout}>
            Logout
          </button>

        </ul>
      </div>
    </nav>
  );
};
