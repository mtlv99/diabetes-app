import axios from 'axios';
import { getEnvVariables } from '../helpers';

const { VITE_API_URL } = getEnvVariables();

export const diabetesApi = axios.create({
  baseURL: VITE_API_URL,
});

diabetesApi.interceptors.request.use((config) => {
  // eslint-disable-next-line no-param-reassign
  config.headers = {
    ...config.headers,
    'x-token': localStorage.getItem('token') || '',
  };

  return config;
});

export default diabetesApi;
