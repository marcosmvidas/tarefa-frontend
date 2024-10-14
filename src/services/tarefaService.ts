/* eslint-disable @typescript-eslint/no-unused-vars */
import { api } from '../config/api';
import { TarefaTypes } from '../types/TarefaTypes';

export const TarefaService = {
  async getAllTarefas(
    showSnackBar: (message: string) => void,
  ): Promise<TarefaTypes[]> {
    try {
      const response = await api.get('tarefa');
      return response.data;
    } catch (error) {
      showSnackBar('Erro ao obter tarefas:');
      console.error(error); // Adicionando log do erro
      throw new Error('Erro ao obter tarefas');
    }
  },

  async createTarefa(
    tarefa: TarefaTypes,
    showSnackBar: (message: string) => void,
  ): Promise<TarefaTypes> {
    try {
      const response = await api.post('/tarefa', tarefa);
      return response.data;
    } catch (error) {
      showSnackBar('Erro ao criar tarefa');
      throw new Error('Erro ao criar tarefa');
    }
  },

  async updateTarefa(
    id: number,
    tarefa: TarefaTypes,
    showSnackBar: (message: string) => void,
  ): Promise<TarefaTypes> {
    try {
      const response = await api.put(`/tarefa/${id}`, tarefa);
      return response.data;
    } catch (error) {
      showSnackBar(`Erro ao atualizar tarefa com ID ${id}`);
      throw new Error(`Erro ao atualizar tarefa com ID ${id}`);
    }
  },

  async deleteTarefa(
    id: number,
    showSnackBar: (message: string) => void,
  ): Promise<void> {
    try {
      await api.delete(`/tarefa/${id}`);
    } catch (error) {
      showSnackBar(`Erro ao deletar tarefa com ID ${id}:`);
      throw new Error(`Erro ao deletar tarefa com ID ${id}`);
    }
  },
};
