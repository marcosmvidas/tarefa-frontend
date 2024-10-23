/* eslint-disable quotes */
import axios from 'axios';

export const URL_API = process.env.VUE_APP_BACKEND_URL;

export const api = axios.create({
  baseURL: URL_API,
  headers: { 'Content-type': 'application/json' },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response && error.response.status === 500) {
    // window.location.href = '/error';
  }
  return Promise.reject(error);
});
