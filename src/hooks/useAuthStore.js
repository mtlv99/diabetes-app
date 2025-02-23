import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { calendarApi } from '../api';
import {
  clearErrorMessage, onChecking, onLogin, onLogout, onLogoutDiagnoses,
} from '../store';

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await calendarApi.post('/login/', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('refresh-token', data.refresh);

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

  const startRegister = async ({
    firstName, lastName, email, password, termsAccepted,
  }) => {
    dispatch(onChecking());
    try {
      const { data: registerData } = await calendarApi.post('/register/', {
        firstName, lastName, email, password, termsAccepted,
      });

      if (!registerData.success) {
        Swal.alert('Error en el registro', registerData.msg, 'error');
        return false;
      }

      // Hace un login automatico despues de registrarse.
      const { data } = await calendarApi.post('/login/', {
        email, password,
      });

      localStorage.setItem('token', data.token);
      localStorage.setItem('refresh-token', data.refresh);

      // Util para realizar calculos con respecto a la hora de expiracion del token.
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(onLogin({ name: data.name, uid: data.uid }));
      return true;
    } catch (error) {
      console.log('error', error);
      dispatch(onLogout(error.data || 'Error interno.'));
      // Con timeout pequeño para triggerear una ejecucion del useEffect en el LoginPage.jsx
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
      return false;
    }
  };

  const checkAuthToken = async () => {
    // Si el token no existe, se hace logout.
    const refresh = localStorage.getItem('refresh-token');
    if (!refresh) return dispatch(onLogout());

    try {
      // Si el token obtenido de localStorage sigue siendo valido,
      // se regenera otro y se guarda immediatamente.
      const { data } = await calendarApi.post('/token/refresh/', { refresh });

      localStorage.setItem('token', data.access);
      localStorage.setItem('token-init-date', new Date().getTime());
      return dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      // Si ya no es valido, se limpia del storage y se hace un
      // logout para obligar al usuario a autenticarse de nuevo.
      localStorage.clear();
      return dispatch(onLogout());
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogoutDiagnoses());
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
