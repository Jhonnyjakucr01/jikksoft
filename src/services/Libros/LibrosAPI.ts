import { client } from "../client";


export const getListaLibros = async (
): Promise<any> => {
  const response = await client.get<{
    data: any[];
    status: string;
    total: number;
    per_page: number;
  }>(`libros`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  return {
    data: response.data.data,
    status: response.data.status,
    total: response.data.total,
    per_page: response.data.per_page,
  };
};