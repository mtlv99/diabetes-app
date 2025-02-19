/* eslint-disable no-console */
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

export const fetchAllDiagnoses = async () => {
  try {
    const response = await diabetesApi.get('/diagnoses');
    return response.data;
  } catch (error) {
    console.error('Error fetching diagnoses:', error);
    throw error;
  }
};

// En el archivo de barril hay que agregar el "default as calendarApi"
// porque es una exportación por defecto.
export default diabetesApi;
