export interface ClientRequest {
  estado: string;
  contrasena?: string;
  idPersonaNavigation: PersonaRequest;
}

export interface PersonaRequest {
  nombre: string;
  genero: string;
  edad: number;
  identificacion: string;
  direccion: string;
  telefono: string;
}
