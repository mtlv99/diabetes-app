import { useDispatch, useSelector } from 'react-redux';
import { diabetesApi } from '../api';
import {
  clearErrorMessage, onChecking, onLogin, onLogout, onLogoutCalendar,
} from '../store';

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await diabetesApi.post('/auth', { email, password });
      localStorage.setItem('token', data.token);

      // Util para realizar calculos con respecto a la hora de expiracion del token.
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      dispatch(onLogout('Credenciales incorrectas'));
      // Con timeout pequeño para triggerear una ejecucion del useEffect en el LoginPage.jsx
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const startRegister = async ({ name, email, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await diabetesApi.post('/auth/new', { name, email, password });
      localStorage.setItem('token', data.token);

      // Util para realizar calculos con respecto a la hora de expiracion del token.
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      dispatch(onLogout(error.response.data?.msg || 'Error interno.'));
      // Con timeout pequeño para triggerear una ejecucion del useEffect en el LoginPage.jsx
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const checkAuthToken = async () => {
    // Si el token no existe, se hace logout.
    const token = localStorage.getItem('token');
    if (!token) return dispatch(onLogout());

    try {
      // Si el token obtenido de localStorage sigue siendo valido, se regenera otro y se guarda immediatamente.
      const { data } = await diabetesApi.get('auth/renew');
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      return dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      // Si ya no es valido, se limpia del storage y se hace un logout para obligar al usuario a autenticarse de nuevo.
      localStorage.clear();
      return dispatch(onLogout());
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogoutCalendar());
    dispatch(onLogout());
  };


  return {
    // Propiedades
    errorMessage,
    status,
    user,
    // Metodos
    startLogin,
    startRegister,
    startLogout,
    checkAuthToken,
  };
};
