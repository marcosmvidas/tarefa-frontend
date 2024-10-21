import { api } from '../config/api';
import { TarefaTypes } from '../types/TarefaTypes';
import { PaginationType } from '../types/PaginationTypes';

export const TarefaService = {
  async getAllTarefas(
    page: number,
    value: number,
    showSnackBar: (message: string) => void,
  ): Promise<{
    data: TarefaTypes[];
    paginacao: PaginationType;
  }> {
    try {
      const response = await api.get(`/tarefa?page=${page}&per_page=${value}`);
      return {
        data: response.data.data,
        paginacao: {
          currentPage: response.data.current_page,
          total: response.data.last_page,
          limit: response.data.total,
          offset: 0,
          tarefas: [],
        },
      };
    } catch (error) {
      const errorMessage = (error as { message?: string }).message || 'Erro desconhecido';
      showSnackBar('Erro ao obter tarefas');
      throw new Error(`Erro ao obter tarefas: ${errorMessage || error}`);
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
      const errorMessage = (error as { message?: string }).message || 'Erro desconhecido';
      showSnackBar(`Erro ao atualizar tarefa com ID ${id}`);
      throw new Error(`Erro ao atualizar tarefa com ID ${id}: ${errorMessage || error}`);
    }
  },

  async deleteTarefa(
    id: number,
    showSnackBar: (message: string) => void,
  ): Promise<void> {
    try {
      await api.delete(`/tarefa/${id}`);
    } catch (error) {
      const errorMessage = (error as { message?: string }).message || 'Erro desconhecido';
      showSnackBar(`Erro ao deletar tarefa com ID ${id}`);
      throw new Error(`Erro ao deletar tarefa com ID ${id}: ${errorMessage || error}`);
    }
  },

  async fetchFormStructure(showSnackBar: (message: string) => void) {
    try {
      const response = await api.get('/tarefas/form-structure');
      return response.data;
    } catch (error) {
      const errorMessage = (error as { message?: string }).message || 'Erro desconhecido';
      showSnackBar('Erro ao obter a estrutura do formulário');
      throw new Error(`Erro ao obter a estrutura do formulário: ${errorMessage || error}`);
    }
  }
};
