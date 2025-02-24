import axios from 'axios';
import { getEnvVariables } from '../helpers';

const { VITE_API_URL } = getEnvVariables();

export const diabetesApi = axios.create({
  baseURL: VITE_API_URL,
});

// Los interceptores de request pasan antes de enviar la request.
// también existen los de response, que pasan después de recibir un response.
diabetesApi.interceptors.request.use((config) => {
  // eslint-disable-next-line no-param-reassign
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${localStorage.getItem('token')}` || '',
  };

  return config;
});

// En el archivo de barril hay que agregar el "default as diabetesApi"
// porque es una exportación por defecto.
export default diabetesApi;
