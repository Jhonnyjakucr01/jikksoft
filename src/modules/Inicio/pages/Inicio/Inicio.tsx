// src/components/Inicio.tsx
import React from "react";
import { Card, Button, Space, Typography } from "antd";
import { BookOutlined, TeamOutlined, HomeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

export const Inicio = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <Title level={2}>📚 Sistema de Gestión de Biblioteca</Title>
      <Space direction="vertical" size="large" style={{ width: "100%", maxWidth: "400px" }}>
        <Card>
          <Button
            type="primary"
            block
            icon={<BookOutlined />}
            onClick={() => navigate("/libros")}
          >
            Gestionar Libros
          </Button>
        </Card>
        <Card>
          <Button
            type="primary"
            block
            icon={<HomeOutlined />}
            onClick={() => navigate("/bibliotecas")}
          >
            Gestionar Bibliotecas
          </Button>
        </Card>
        <Card>
          <Button
            type="primary"
            block
            icon={<TeamOutlined />}
            onClick={() => navigate("/miembros")}
          >
            Gestionar Miembros
          </Button>
        </Card>
      </Space>
    </div>
  );
};

export default Inicio;
