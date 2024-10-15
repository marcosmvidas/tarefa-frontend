/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '../config/api';
import { LoginCredentials, LoginResponse } from '../types/AuthTypes';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
      const response = await api.post('login', credentials);
      const token = response.data.token;
      const roleId = response.data.user.role_id; // Obtenha o role_id do usuário
      localStorage.setItem('token', token);
      localStorage.setItem('role_id', roleId.toString()); // Armazene o role_id no localStorage
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao fazer login');
    }
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role_id'); // Remova o role_id ao fazer logout
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  getRoleId: () => {
    return parseInt(localStorage.getItem('role_id') || '0', 10); // Retorna o role_id como número
  }
};
