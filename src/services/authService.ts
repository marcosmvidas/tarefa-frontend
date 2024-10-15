/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '../config/api';
import { LoginCredentials, LoginResponse } from '../types/AuthTypes';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
      const response = await api.post('login', credentials);
      const token = response.data.token;
      const roleId = response.data.user.role_id; // Obtenha o role_id do usuário

      // Armazena o token e o role_id no localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role_id', roleId.toString());

      return response.data; // Retorna a resposta completa
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao fazer login');
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role_id'); // Remove o role_id ao fazer logout
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  getRoleId: () => {
    return parseInt(localStorage.getItem('role_id') || '0', 10); // Retorna o role_id como número
  }
};
