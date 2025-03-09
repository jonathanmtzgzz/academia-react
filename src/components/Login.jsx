import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { signinUser } from "../config/authCall";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import Title from "antd/es/typography/Title";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

export default function Login({ mail }) {
  const { user } = useAuth();
  const [userName, setUserName] = useState(mail);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/homepage");
  }, [user, navigate]);

  const login = () => {
    signinUser(userName, password);
  };

  return (
    <>
      <Title>Acceder a Softasks</Title>
      <Form
        name="basic"
        layout="vertical"
        style={{
          minWidth: 380,
          padding: "40px 30px",
          border: "1px solid #e6e6e6",
          borderRadius: 10,
          backgroundColor: "#f9f9f9",
        }}
      >
        <Form.Item
          label="Correo"
          name="username"
          rules={[
            {
              required: true,
              message: "Por favor ingresa tu correo!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Correo del usuario"
            value={userName}
            onChange={(e) => setUserName(e.target.value)} // Aquí se integra directamente
          />
        </Form.Item>
        <Form.Item
          label="Contraseña"
          name="password"
          rules={[
            {
              required: true,
              message: "Por favor ingresa tu contraseña!",
            },
          ]}
          style={{ marginBottom: "50px" }}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Aquí se integra directamente
          />
        </Form.Item>

        <Form.Item>
          <Button
            block
            onClick={login}
            type="primary"
            htmlType="submit"
            style={{ marginBottom: "10px" }}
          >
            Iniciar sesión
          </Button>
          ¿Eres nuevo en Softasks? <Link to={"/signup"}>¡Regístrate!</Link>
        </Form.Item>
      </Form>
    </>
  );
}
