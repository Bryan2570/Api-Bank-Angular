export interface Persona {
  idPersona: number;
  nombre: string;
  genero: string;
  edad: number;
  identificacion: string;
  direccion: string;
  telefono: string;
}

export interface Client {
  idCliente: number;
  contrasena?: string;
  estado: boolean;
  idPersona: number;
  idPersonaNavigation: Persona;
}

export type ClientResponse = Client[];
