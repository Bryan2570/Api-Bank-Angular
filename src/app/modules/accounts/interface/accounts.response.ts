export interface Cuenta {
  idCuenta: number;
  numCuenta: string;
  tipoCuenta: string;
  saldoInicial: string;
  estado: boolean;
  idCliente: string;
}

export type AccountResponse = Cuenta[];