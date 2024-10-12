/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '../config/api';
import { LoginCredentials, LoginResponse } from '../types/AuthTypes';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
      const response = await api.post('login', credentials);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao fazer login');
    }
  },
};
