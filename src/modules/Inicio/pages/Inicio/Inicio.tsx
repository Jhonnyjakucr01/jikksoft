// src/components/Inicio.tsx
import React from "react";
import { Layout, Menu, Typography, Row, Col, Statistic, Card } from "antd";
import { BookOutlined, TeamOutlined, HomeOutlined, AppstoreOutlined, } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;
const { Title, Paragraph } = Typography;

export const Inicio: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ background: "#001529", padding: "0 20px" }}>
        <Title level={1} style={{ color: "#fff", margin: 0, textAlign: "center" }}>
          📚 Sistema de Gestión de Biblioteca 📚
        </Title>
      </Header>

      <Layout>
        <Sider
          width={220}          
          breakpoint="lg"
          collapsedWidth="0"
          style={{ background: "#001529" }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            style={{ height: "100%", borderRight: 0, background:"#49759eff" }}
            onClick={({ key }) => {
              if (key === "1") navigate("/inicio");
              if (key === "2") navigate("/libros");
              if (key === "3") navigate("/bibliotecas");
              if (key === "4") navigate("/miembros");
            }}
            items={[
              { key: "1", icon: <HomeOutlined/>, label: "Inicio" },
              { key: "2", icon: <BookOutlined />, label: "Libros" },
              { key: "3", icon: <AppstoreOutlined />, label: "Bibliotecas" },
              { key: "4", icon: <TeamOutlined />, label: "Miembros" },
            ]}
          />
        </Sider>

        {/* Contenido principal */}
        <Layout style={{ padding: "10px", minHeight:"100vh", width: "100%",   
 }}>
<Content
  style={{
    background: "#fff",
    padding: "40px",
    borderRadius: "8px",
    width: "100%",   
    minHeight: "calc(100vh - 64px)", 
  }}
>
            <Row gutter={[24, 24]} align="middle">
              <Col xs={24} md={12}>
                <Title level={2}>Bienvenido</Title>
                <Paragraph>
                  Este es un sistema para la gestión de bibliotecas.  
                  Aquí podrás administrar tus libros, miembros y bibliotecas de manera eficiente.
                  <br />
                  <b>Desarrollado por:</b> [Jhonny Cataño Rodriguez]
                  <br />
                                    Desarrollador Full Stack 
                  <br />
                  Repositorio GitHub: 

                </Paragraph>
              </Col>
              <Col xs={24} md={12}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/29/29302.png"
                  alt="Biblioteca"
                  style={{ maxWidth: "100%", borderRadius: "10px" }}
                />
              </Col>
            </Row>

            <Row gutter={16}>
  <Col span={6}>
    <Card>
      <Statistic title="Libros Registrados" value={1200} prefix={<BookOutlined />} />
    </Card>
  </Col>
  <Col span={6}>
    <Card>
      <Statistic title="Miembros Activos" value={350} prefix={<TeamOutlined />} />
    </Card>
  </Col>
</Row>


          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Inicio;
