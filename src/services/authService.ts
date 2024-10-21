/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '../config/api';
import { LoginCredentials, LoginResponse } from '../types/AuthTypes';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
      const response = await api.post('login', credentials);
      const { token, role_id } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role_id', role_id.toString());

      return response.data;
    } catch (error: any) {
      console.error("Erro ao fazer login:", error);
      throw new Error(error.response?.data?.message || 'Erro ao fazer login');
    }
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role_id');
  },  

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  getRoleId: () => {
    return parseInt(localStorage.getItem('role_id') || '0', 10);
  }

};
