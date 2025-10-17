export interface Movement {
  idCuenta: number;
  numCuenta: string;
  tipoCuenta: string;
  saldoInicial: string;
  estado: boolean;
  idCliente: string;
}

export type MovementResponse = Movement[];