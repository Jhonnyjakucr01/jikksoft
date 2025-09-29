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

export const ListLibros = () => {
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
    <div
      style={{
        padding: "20px",
        width: "100%",
        maxWidth: "1400px", 
        margin: "0 auto",
        minHeight:"100vh",

      }}
    >
      <Row justify="space-between" align="middle" style={{ marginBottom: "20px" }}>
        <Col>
          <Title level={2} style={{ color: "#5D4037" }}>
            📚 Lista de Libros
          </Title>
        </Col>
        <Col>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            style={{ backgroundColor: "#8D6E63", borderColor: "#6D4C41" }}
            onClick={() => navigate("crear")}
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
        <Row gutter={[24, 24]} justify="start">
  {filteredLibros.map((libro) => (
    <Col xs={24} sm={20} md={10} lg={8} xl={8} key={libro.id}>
      <Card
        title={<span style={{ color: "#3E2723" }}>{libro.titulo}</span>}
        bordered
        style={{
          borderRadius: "8px",
          width: "100%",
          backgroundColor: "#D7CCC8", // café claro
          border: "2px solid #6D4C41", // borde marrón oscuro
          boxShadow: "4px 4px 12px rgba(0,0,0,0.3)",
          minHeight: "220px",
        }}
        headStyle={{
          backgroundColor: "#8D6E63", // tapa del libro
          color: "#fff",
          fontWeight: "bold",
          textAlign: "center",
          borderRadius: "6px 6px 0 0",
        }}
      >
        <p>
          <strong>Autor:</strong> {libro.autor}
        </p>
        <p>
          <strong>Estado:</strong> {libro.estado}
        </p>
      </Card>
    </Col>
  ))}
</Row>

      )}
    </div>
  );
};

export default ListLibros;
