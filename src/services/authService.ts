/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '../config/api';
import { LoginCredentials, LoginResponse } from '../types/AuthTypes';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
      const response = await api.post('login', credentials);
      const token = response.data.token;
      localStorage.setItem('token', token);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao fazer login');
    }
  },
  
  logout: () => {
    localStorage.removeItem('token');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};
