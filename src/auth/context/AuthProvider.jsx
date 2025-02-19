import React, { useReducer } from 'react';
import { types } from '../types/types';
import { AuthContext } from './AuthContext';
import { authReducer } from './authReducer';

// const initialState = {
//   logged: false,
// };

// Para leer de localStorage antes de inicializar el state.
const init = () => {
  // Nota: NO hacer estos llamados dentro del reducer.
  // Provocaría que la función del reducer ya no sea pura!
  const user = JSON.parse(localStorage.getItem('user'));

  return {
    logged: !!user,
    user,
  };
};

/* eslint-disable react/jsx-no-constructed-context-values */
export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {}, init);

  // Recordar no exponer todo el dispatch para no dar tanto control a
  // otras partes de la aplicación. Hacerlo por medio de getters y setters.
  const login = (name = '') => {
    const user = { id: 'ABC', name };
    const action = { type: types.login, payload: user };

    // Se podria asignar el usuario en localStorage de multiples maneras, ya sea por un
    // useEffect o similares, pero en este caso dentro de la función de login está bien.
    localStorage.setItem('user', JSON.stringify(user));

    dispatch(action);
  };

  const logout = () => {
    localStorage.removeItem('user');

    const action = { type: types.logout };
    dispatch(action);
  };

  return (
    // Tener cuidado con el spreading de authState, ya que si hubiera alguna propiedad que se llame login,
    // sobreescribiría a la función.
    <AuthContext.Provider value={{
      ...authState,
      // Methods
      login,
      logout,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};
