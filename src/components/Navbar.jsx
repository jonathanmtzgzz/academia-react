import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { LogoutOutlined } from "@ant-design/icons";
import { readDataFirestore } from "../config/firestoreCalls";
import Title from "antd/es/typography/Title";
import { Button } from "antd";

export default function Navbar() {
  const { logout, user } = useAuth();
  const [localUser, setLocalUser] = useState(null);

  useEffect(() => {
    readUser();
  }, [user]);

  const readUser = async () => {
    const luser = await readDataFirestore("users", "email", user.email);
    if (!luser.empty) {
      setLocalUser(luser.docs[0].data());
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center", // Cambié "baseline" por "center" para una mejor alineación
        maxWidth: "1200px", // Ancho máximo fijo
        width: "100%", // Se ajusta al contenedor principal
        margin: "0 auto", // Centrado en pantalla
        padding: "20px 10px", // Espaciado interno
      }}
    >
      <div style={{ textAlign: "left" }}>
        {localUser && (
          <Title level={3}>Bienvenido a Softasks, {localUser.name}</Title>
        )}
      </div>
      <div style={{ textAlign: "right" }}>
        <Button
          type="default"
          icon={<LogoutOutlined />}
          onClick={logout}
          style={{ color: "red" }}
          danger
        >
          Cerrar Sesión
        </Button>
      </div>
    </div>
  );
}
