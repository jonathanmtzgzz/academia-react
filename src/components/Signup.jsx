import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import {
  ArrowLeftOutlined,
  LockOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router";
import Title from "antd/es/typography/Title";
import { createUser } from "../config/authCall";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const navigate = useNavigate();

  const crearUsuario = async () => {
    if (password !== rePassword) {
      alert("Las contraseñas no coinciden, verifica");
      return;
    }
    try {
      await createUser(email, password, userName);
      message.success("¡Usuario registrado con éxito!");
      navigate("/homepage"); // Redirige a la página de Navbar después de crear el usuario
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <>
      <div style={{ textAlign: "left" }}>
        <Link to="/login">
          <Button type="default" style={{ textAlign: "left" }}>
            <ArrowLeftOutlined></ArrowLeftOutlined>
          </Button>
        </Link>
      </div>

      <Title>Registrate en Softasks</Title>

      <Form
        name="register"
        layout="vertical"
        style={{
          minWidth: 380,
          padding: "20px 30px",
          border: "1px solid #e6e6e6",
          borderRadius: 10,
          backgroundColor: "#f9f9f9",
        }}
      >
        <Form.Item
          name="name"
          label="Nombre"
          tooltip="¿Cómo quieres que te llamen?"
          rules={[
            {
              required: true,
              message: "Por favor, introduzca su nombre!",
              whitespace: true,
            },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "La entrada no es válida!",
            },
            {
              required: true,
              message: "Por favor, introduzca su correo electrónico!",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          name="password"
          label="Contraseña"
          rules={[
            {
              required: true,
              message: "Por favor, introduzca su contraseña!",
            },
            {
              min: 8,
              message: "La contraseña debe tener al menos 8 caracteres!",
            },
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          name="repassword"
          label="Confirmar constraseña"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Por favor, confirme su contraseña!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
          />
        </Form.Item>

        <Form.Item>
          <Button
            onClick={crearUsuario}
            type="primary"
            htmlType="submit"
            style={{ width: "100%", marginTop: "15px" }}
          >
            Registrar
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
