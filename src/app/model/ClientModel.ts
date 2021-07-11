import { PagamentoStatus } from "./PagamentoStatus";

export class ClientModel {
  id!: number;
  nome!: string;
  pagamentoStatus!: PagamentoStatus;
  horarioRetirada!: string;
}
