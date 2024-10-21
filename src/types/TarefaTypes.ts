export interface ResponsavelType {
  id: number;
  name: string;
}

export interface TarefaTypes {
  id?: number;
  tarefa: string;
  descricao: string;
  responsavel: number;
  tipo_desenvolvimento: string;
  nivel_dificuldade: string;
  status: string;
  conclusao_em?: string;
  concluida: boolean;
  nome_responsavel?: string | ResponsavelType | null;
}
