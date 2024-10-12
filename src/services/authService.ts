/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '../config/api';
import { LoginCredentials, LoginResponse } from '../types/AuthTypes';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
      const response = await api.post('login', credentials);
      const token = response.data.token; // Certifique-se de que o token é retornado no login
      localStorage.setItem('token', token); // Armazena o token no localStorage
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao fazer login');
    }
  },
  
  logout: () => {
    localStorage.removeItem('token'); // Remove o token ao deslogar
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token'); // Retorna true se o token existir
  }
};
