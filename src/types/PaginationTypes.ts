import { TarefaTypes } from "./TarefaTypes";

export interface PaginationType {
    currentPage: number;
    total: number;
    offset: number;
    limit: number;
    tarefas: TarefaTypes[];
  }
  