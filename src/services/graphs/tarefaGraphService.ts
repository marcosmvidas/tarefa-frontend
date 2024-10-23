import { api } from './../../config/api';

export const TarefaGraficoService = {
  async getTarefasPorStatus(showSnackBar: (message: string) => void) {
    try {
      const response = await api.get('/tarefa_grafico/tarefasPorStatus');
      return response;
    } catch (error) {
      const errorMessage = (error as { message?: string }).message || 'Erro desconhecido';
      showSnackBar('Erro ao obter tarefas por status');
      throw new Error(`Erro ao obter tarefas por status: ${errorMessage || error}`);
    }
  },
  
  async getTarefasPorTipo(showSnackBar: (message: string) => void) {
    try {
      const response = await api.get('/tarefa_grafico/tarefasPorTipo');
      return response;
    } catch (error) {
      const errorMessage = (error as { message?: string }).message || 'Erro desconhecido';
      showSnackBar('Erro ao obter tarefas por status');
      throw new Error(`Erro ao obter tarefas por status: ${errorMessage || error}`);
    }
  },

  async getTarefasPorResponsavel(showSnackBar: (message: string) => void) {
    try {
      const response = await api.get('/tarefa_grafico/tarefasPorResponsavel');
      return response;
    } catch (error) {
      const errorMessage = (error as { message?: string }).message || 'Erro desconhecido';
      showSnackBar('Erro ao obter tarefas por status');
      throw new Error(`Erro ao obter tarefas por status: ${errorMessage || error}`);
    }
  },  
};


