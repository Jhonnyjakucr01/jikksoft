// src/components/ListMiembros.tsx
import { useEffect, useState } from "react";
import { Table, Button, Input, Select, Row, Col, Card, Typography } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import type { Miembros } from "../../../../services/types";
import { getListaMiembros } from "../../../../services/Miembros/MiembrosAPI";

const { Title } = Typography;
const { Option } = Select;

export const ListMiembros = () => {
  const navigate = useNavigate();
  const [miembros, setMiembros] = useState<Miembros[]>([]);
  const [loading, setLoading] = useState(false);

  // Filtros
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroCorreo, setFiltroCorreo] = useState("");
  const [filtroRol, setFiltroRol] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getListaMiembros();
        setMiembros(res.data ?? []);
      } catch (error) {
        console.error("Error cargando miembros:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filtrado en frontend
  const miembrosFiltrados = miembros.filter((m) => {
    return (
      m.nombre.toLowerCase().includes(filtroNombre.toLowerCase()) &&
      m.correo.toLowerCase().includes(filtroCorreo.toLowerCase()) 
    );
  });

  const columns = [
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Correo",
      dataIndex: "correo",
      key: "correo",
    },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
      render: (estado: string) => (
        <span style={{ color: estado === "Activo" ? "green" : "red" }}>
          {estado}
        </span>
      ),
    },
  ];

  return (
    <Card
      style={{
        margin: "24px",
        borderRadius: 12,
        boxShadow: "0 6px 28px rgba(0,0,0,0.08)",
      }}
    >
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Title level={3}>👥 Lista de miembros</Title>
        </Col>
        <Col>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={() => navigate("/miembros/crear")}
          >
            Crear miembro
          </Button>
        </Col>
      </Row>

      {/* Filtros */}
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} md={6}>
          <Input
            placeholder="Buscar por nombre"
            prefix={<SearchOutlined />}
            value={filtroNombre}
            onChange={(e) => setFiltroNombre(e.target.value)}
          />
        </Col>
        <Col xs={24} md={6}>
          <Input
            placeholder="Buscar por correo"
            prefix={<SearchOutlined />}
            value={filtroCorreo}
            onChange={(e) => setFiltroCorreo(e.target.value)}
          />
        </Col>
        <Col xs={24} md={6}>
          <Select
            placeholder="Filtrar por rol"
            allowClear
            style={{ width: "100%" }}
            value={filtroRol || undefined}
            onChange={(v) => setFiltroRol(v || "")}
          >
            <Option value="Estudiante">Estudiante</Option>
            <Option value="Profesor">Profesor</Option>
            <Option value="Administrador">Administrador</Option>
          </Select>
        </Col>
        <Col xs={24} md={6}>
          <Select
            placeholder="Filtrar por estado"
            allowClear
            style={{ width: "100%" }}
            value={filtroEstado || undefined}
            onChange={(v) => setFiltroEstado(v || "")}
          >
            <Option value="Activo">Activo</Option>
            <Option value="Inactivo">Inactivo</Option>
          </Select>
        </Col>
      </Row>

      {/* Tabla */}
      <Table
        rowKey="id"
        columns={columns}
        dataSource={miembrosFiltrados}
        loading={loading}
        pagination={{ pageSize: 8 }}
      />
    </Card>
  );
};

export default ListMiembros;
