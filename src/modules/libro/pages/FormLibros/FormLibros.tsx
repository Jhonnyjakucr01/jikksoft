// src/components/FormLibros.tsx
import {
  Form,
  Input,
  Select,
  Button,
  Card,
  Row,
  Col,
  Image,
  Typography,
  notification,
} from "antd";
import { SaveOutlined, RollbackOutlined } from "@ant-design/icons";
import type { Libros } from "../../../../services/types";
import { crearLibro } from "../../../../services/Libros/LibrosAPI";
import { useState } from "react";

const { Title, Text } = Typography;
const { Option } = Select;

const estados = ["Disponible", "Prestado", "Reservado"];


export const FormLibros = () => {
  const [form] = Form.useForm<Libros>();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: Libros) => {
  try {
    setLoading(true);

    const res = await crearLibro({
      titulo: values.titulo,
      autor: values.autor,
      estado: values.estado,
    });

    notification.success({
      message: "Libro creado",
      description: `Libro "${res.data?.titulo ?? values.titulo}" creado correctamente.`,
    });

    form.resetFields();
  } catch (error: any) {
    console.error(error);
    notification.error({
      message: "Error al crear libro",
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
    <Card style={{ borderRadius: 12, boxShadow: "0 6px 18px rgba(0,0,0,0.06)" }}>
      <Title level={4} style={{ marginBottom: 8 }}>
        ✨ Crear nuevo libro
      </Title>
      <Text type="secondary">Rellena los campos para registrar un libro en el sistema.</Text>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ marginTop: 20 }}
        initialValues={{ estado: "Disponible" }}
      >
        <Row gutter={16}>
          <Col xs={24} md={14}>
            <Form.Item
              label="Título"
              name="titulo"
              rules={[
                { required: true, message: "El título es obligatorio" },
                { max: 120, message: "Máximo 120 caracteres" },
              ]}
            >
              <Input placeholder="Ej: Cien años de soledad" size="large" />
            </Form.Item>

            <Form.Item
              label="Autor"
              name="autor"
              rules={[
                { required: true, message: "El autor es obligatorio" },
                { max: 80, message: "Máximo 80 caracteres" },
              ]}
            >
              <Input placeholder="Ej: Gabriel García Márquez" size="large" />
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
                    loading={loading}
                    size="large"
                  >
                    Guardar libro
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

          <Col xs={24} md={10}>
            <Card
              bordered={false}
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                background: "#fafafa",
                borderRadius: 8,
              }}
            >
              <div style={{ textAlign: "center" }}>
                <Text type="secondary">Información rápida</Text>
                <Title level={5} style={{ marginTop: 8 }}>
                  Consejos para el registro
                </Title>
                <ul style={{ textAlign: "left", paddingLeft: 18 }}>
                  <li>Usa títulos descriptivos y no muy largos.</li>
                  <li>Incluye el autor completo.</li>
                  <li>Marca el estado correcto (Disponible / Prestado).</li>
                  <li>Agregar portada es opcional pero recomendable.</li>
                </ul>
                <div style={{ marginTop: 14 }}>
                  <Image
                    src="https://cdn-icons-png.flaticon.com/512/29/29302.png"
                    preview={false}
                    alt="libro ilustracion"
                    style={{ maxWidth: "100%", maxHeight: 160 }}
                  />
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default FormLibros;
