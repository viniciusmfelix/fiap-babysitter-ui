export interface IExecucao {
  id?: number;
  dataExecucao?: Date;
  acao: {
    id: number;
    nome?: string;
    descricao?: string;
    ativo?: boolean;
  };
  data?: string;
  hora?: string;
}
