// src/components/FormMiembros.tsx
import {
  Form,
  Input,
  Select,
  Button,
  Card,
  Row,
  Col,
  Typography,
  notification,
  Spin,
  Layout,
} from "antd";
import { SaveOutlined, RollbackOutlined, UserAddOutlined } from "@ant-design/icons";
import { useState } from "react";
import type { Miembros } from "../../../../services/types";
import { crearMiembro } from "../../../../services/Miembros/MiembrosAPI";

const { Title, Text } = Typography;
const { Option } = Select;
const { Content } = Layout;

const roles = ["Estudiante", "Profesor", "Administrador"];
const estados = ["Activo", "Inactivo"];

export const FormMiembros = () => {
  const [form] = Form.useForm<Miembros>();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: Miembros) => {
    try {
      setLoading(true);

      const res = await crearMiembro({
        nombre: values.nombre,
        correo: values.correo,
      });

      notification.success({
        message: "✅ Miembro registrado",
        description: `El miembro "${res.data?.nombre ?? values.nombre}" se registró correctamente.`,
      });

      form.resetFields();
    } catch (error: any) {
      console.error(error);
      notification.error({
        message: "Error al registrar miembro",
        description:
          error?.response?.data?.message ??
          error.message ??
          "Ocurrió un error inesperado",
      });
    } finally {
      setLoading(false);
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "24px", background: "#f5f5f5" }}>
        <Spin spinning={loading} size="large" tip="Registrando miembro...">
          <Card
            style={{
              borderRadius: 12,
              boxShadow: "0 6px 28px rgba(0,0,0,0.08)",
              width: "100%",
            }}
          >
            <Title level={3} style={{ marginBottom: 8 }}>
              <UserAddOutlined style={{ marginRight: 8 }} />
              Registrar nuevo miembro
            </Title>
            <Text type="secondary">
              Completa los campos para agregar un nuevo miembro al sistema.
            </Text>

            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              style={{ marginTop: 20 }}
              initialValues={{ estado: "Activo" }}
            >
              <Row gutter={24}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Nombre completo"
                    name="nombre"
                    rules={[
                      { required: true, message: "El nombre es obligatorio" },
                      { max: 120, message: "Máximo 120 caracteres" },
                    ]}
                  >
                    <Input placeholder="Ej: Juan Pérez" size="large" />
                  </Form.Item>

                  <Form.Item
                    label="Correo electrónico"
                    name="correo"
                    rules={[
                      { required: true, message: "El correo es obligatorio" },
                      { type: "email", message: "Formato de correo no válido" },
                    ]}
                  >
                    <Input placeholder="Ej: juan.perez@email.com" size="large" />
                  </Form.Item>

                  <Form.Item
                    label="Teléfono"
                    name="telefono"
                    rules={[
                      { required: true, message: "El teléfono es obligatorio" },
                      { pattern: /^[0-9]+$/, message: "Solo números permitidos" },
                    ]}
                  >
                    <Input placeholder="Ej: 3001234567" size="large" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    label="Rol"
                    name="rol"
                    rules={[{ required: true, message: "Selecciona un rol" }]}
                  >
                    <Select size="large" placeholder="Selecciona un rol">
                      {roles.map((r) => (
                        <Option key={r} value={r}>
                          {r}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label="Estado"
                    name="estado"
                    rules={[{ required: true, message: "Selecciona un estado" }]}
                  >
                    <Select size="large">
                      {estados.map((e) => (
                        <Option key={e} value={e}>
                          {e}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item>
                    <Row gutter={8}>
                      <Col>
                        <Button
                          type="primary"
                          htmlType="submit"
                          icon={<SaveOutlined />}
                          size="large"
                        >
                          Guardar miembro
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          htmlType="button"
                          onClick={onReset}
                          icon={<RollbackOutlined />}
                          size="large"
                        >
                          Limpiar
                        </Button>
                      </Col>
                    </Row>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        </Spin>
      </Content>
    </Layout>
  );
};

export default FormMiembros;
