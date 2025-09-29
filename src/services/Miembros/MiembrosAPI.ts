import { client } from "../client";

export const getListaMiembros = async (): Promise<any> => {
  const response = await client.get<{
    data: any[];
    status: string;
    total: number;
    per_page: number;
  }>("miembros", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  return {
    data: response.data.data,
    status: response.data.status,
    total: response.data.total,
    per_page: response.data.per_page,
  };
};

export const crearMiembro = async (payload: {
  nombre: string;
  correo: string;
 }): Promise<any> => {
  const response = await client.post("miembros", payload, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  return response.data;
};

export const buscarMiembro = async (id: number): Promise<any> => {
  const response = await client.get(`miembros/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  return response.data;
};

export const actualizarMiembro = async (
  id: number,
  payload: {
    nombre?: string;
    apellido?: string;
    email?: string;
    telefono?: string;
    estado?: string;
  }
): Promise<any> => {
  const response = await client.put(`miembros/${id}`, payload, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  return response.data;
};

export const eliminarMiembro = async (id: number): Promise<any> => {
  const response = await client.delete(`miembros/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  return response.data;
};
