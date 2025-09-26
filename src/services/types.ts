export interface Book {
  id: number;
  titulo: string;
  autor: string;
  disponible: boolean;
}

export interface Member {
  id: number;
  nombre: string;
  email: string;
}

export interface Library {
  id: number;
  nombre: string;
  direccion: string;
}
