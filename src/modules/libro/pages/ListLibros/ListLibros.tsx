import { Card, Input, Button, Row, Col, Typography, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getListaLibros } from "../../../../services/Libros/LibrosAPI";

const { Title } = Typography;

interface Libro {
  id: number;
  titulo: string;
  autor: string;
  estado: string;
}

export const ListLibros= () => {
  const [libros, setLibros] = useState<Libro[]>([]);
  const [filteredLibros, setFilteredLibros] = useState<Libro[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filtroTitulo, setFiltroTitulo] = useState<string>("");
  const [filtroAutor, setFiltroAutor] = useState<string>("");

  const navigate = useNavigate();

  const cargarLibros = async () => {
    try {
      setLoading(true);
      const res = await getListaLibros();
      setLibros(res.data);
      setFilteredLibros(res.data);
    } catch (error) {
      console.error("Error al cargar libros:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarLibros();
  }, []);

  useEffect(() => {
    let filtrados = libros;

    if (filtroTitulo) {
      filtrados = filtrados.filter((libro) =>
        libro.titulo.toLowerCase().includes(filtroTitulo.toLowerCase())
      );
    }

    if (filtroAutor) {
      filtrados = filtrados.filter((libro) =>
        libro.autor.toLowerCase().includes(filtroAutor.toLowerCase())
      );
    }

    setFilteredLibros(filtrados);
  }, [filtroTitulo, filtroAutor, libros]);

  return (
    <div style={{ padding: "20px" }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: "20px" }}>
        <Col>
          <Title level={2}>📚 Lista de Libros</Title>
        </Col>
        <Col>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate("/crear")}
          >
            Crear Libro
          </Button>
        </Col>
      </Row>

      {/* Filtros */}
      <Row gutter={16} style={{ marginBottom: "20px" }}>
        <Col xs={24} md={12}>
          <Input
            placeholder="Filtrar por título"
            value={filtroTitulo}
            onChange={(e) => setFiltroTitulo(e.target.value)}
          />
        </Col>
        <Col xs={24} md={12}>
          <Input
            placeholder="Filtrar por autor"
            value={filtroAutor}
            onChange={(e) => setFiltroAutor(e.target.value)}
          />
        </Col>
      </Row>

      {/* Listado */}
      {loading ? (
        <Spin size="large" />
      ) : (
        <Row gutter={[16, 16]}>
          {filteredLibros.map((libro) => (
            <Col xs={24} sm={12} md={8} lg={6} key={libro.id}>
              <Card
                title={libro.titulo}
                bordered
                style={{
                  borderRadius: "10px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              >
                <p><strong>Autor:</strong> {libro.autor}</p>
                <p><strong>Estado:</strong> {libro.estado}</p>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default ListLibros;
