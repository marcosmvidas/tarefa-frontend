export interface TarefaTypes {
    id?: number;
    tarefa: string;
    descricao: string;
    responsavel: string;
    tipo_desenvolvimento: string;
    nivel_dificuldade: string;
    status: string;
    conclusao_em?: string;
    concluida: boolean;
  }
  