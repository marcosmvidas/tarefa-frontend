import { api } from '../config/api';
import { UserTypes } from './../types/UserTypes'; // Certifique-se de que esse tipo existe e está corretamente definido

export const UserService = {
  async getAllUsers(
    showSnackBar: (message: string) => void,
  ): Promise<UserTypes[]> {
    try {
      const response = await api.get('/user');
      return response.data;
    } catch (error) {
      showSnackBar('Erro ao obter usuários:');
      throw new Error('Erro ao obter usuários');
    }
  },

  async createUser(
    user: UserTypes,
    showSnackBar: (message: string) => void,
  ): Promise<UserTypes> {
    try {
      const response = await api.post('/user', user);
      return response.data;
    } catch (error) {
      showSnackBar('Erro ao criar usuário');
      throw new Error('Erro ao criar usuário');
    }
  },

  async updateUser(
    id: number,
    user: UserTypes,
    showSnackBar: (message: string) => void,
  ): Promise<UserTypes> {
    try {
      const response = await api.put(`/user/${id}`, user);
      return response.data;
    } catch (error) {
      showSnackBar(`Erro ao atualizar usuário com ID ${id}`);
      throw new Error(`Erro ao atualizar usuário com ID ${id}`);
    }
  },

  async deleteUser(
    id: number,
    showSnackBar: (message: string) => void,
  ): Promise<void> {
    try {
      await api.delete(`/user/${id}`);
    } catch (error) {
      showSnackBar(`Erro ao deletar usuário com ID ${id}:`);
      throw new Error(`Erro ao deletar usuário com ID ${id}`);
    }
  },

  async fetchUserFormStructure(showSnackBar: (message: string) => void) {
    try {
      const response = await api.get('/user/form-structure');
      return response.data;
    } catch (error) {
      showSnackBar('Erro ao obter a estrutura do formulário de usuário');
      throw new Error('Erro ao obter a estrutura do formulário de usuário');
    }
  }
};
