import { client } from "../client";

export const getListaLibros = async (): Promise<any> => {
  const response = await client.get<{
    data: any[];
    status: string;
    total: number;
    per_page: number;
  }>("libros", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  return {
    data: response.data.data,
    status: response.data.status,
    total: response.data.total,
    per_page: response.data.per_page,
  };
};

export const crearLibro = async (payload: {
  titulo: string;
  autor: string;
  estado: string;
}): Promise<any> => {
  const response = await client.post("libros", payload, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  return response.data;
};

export const buscarLibro = async (id: number): Promise<any> => {
  const response = await client.get(`libros/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  return response.data;
};

export const actualizarLibro = async (
  id: number,
  payload: {
    titulo?: string;
    autor?: string;
    estado?: string;
  }
): Promise<any> => {
  const response = await client.put(`libros/${id}`, payload, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  return response.data;
};
