import React from 'react';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { useAuthStore } from '../../hooks';

export const Navbar = () => {
  const { startLogout, user } = useAuthStore();

  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
      <span className="navbar-brand">
        <LocalHospitalIcon />
      </span>
      <p>Diabetes App</p>
      <button type="button" className="btn btn-outline-danger" onClick={startLogout}>
        <i className="fas fa-sign-out-alt" />
        &nbsp;
        <span>Salir</span>
      </button>
    </div>
  );
};
