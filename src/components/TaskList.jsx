import React, { useState, useEffect } from "react";
import { Button, Input, Card, Row, Col } from "antd";
import {
  getFirestore,
  collection,
  query,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import TaskInput from "./TaskInput";
import firebaseAcademia from "../config/firebaseconfig";

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedDescription, setEditedDescription] = useState("");
  const [permissions, setPermissions] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const auth = getAuth();
    const firestore = getFirestore(firebaseAcademia);

    // Escuchar cambios en el estado del usuario autenticado
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Si el usuario está autenticado, obtén sus permisos y nombre
        try {
          const userDoc = await getDoc(doc(firestore, "users", user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            const userPermissions = userData.permissions;
            setPermissions(userPermissions);
            setUserName(userData.name);

            console.log("Permisos:", userPermissions);
            console.log("Nombre:", userData.name);
          } else {
            console.error("No se encontraron datos para el usuario.");
          }
        } catch (error) {
          console.error("Error obteniendo los datos del usuario:", error);
        }
      } else {
        // Si no hay usuario autenticado, reinicia el estado
        setPermissions(null);
        setUserName("");
      }
    });

    // Escuchar las tareas en Firestore
    const q = query(collection(firestore, "tasks"));
    const unsubscribeTasks = onSnapshot(q, (querySnapshot) => {
      const tasksArray = [];
      querySnapshot.forEach((doc) => {
        tasksArray.push({ id: doc.id, ...doc.data() });
      });
      setTasks(tasksArray.reverse());
    });

    // Limpiar las suscripciones cuando el componente se desmonte
    return () => {
      unsubscribeAuth();
      unsubscribeTasks();
    };
  }, []);

  const handleDelete = async (taskId) => {
    const firestore = getFirestore();
    try {
      await deleteDoc(doc(firestore, "tasks", taskId));
    } catch (error) {
      console.error("Error eliminando la tarea:", error);
    }
  };

  const handleEdit = (task) => {
    setEditingTaskId(task.id);
    setEditedDescription(task.description);
  };

  const handleSave = async (taskId) => {
    const firestore = getFirestore();
    try {
      await updateDoc(doc(firestore, "tasks", taskId), {
        description: editedDescription,
      });
      setEditingTaskId(null);
    } catch (error) {
      console.error("Error actualizando la tarea:", error);
    }
  };

  return (
    <>
      {permissions?.write && <TaskInput />}
      <Row
        gutter={[16, 16]} // Espaciado entre filas y columnas
        justify="center"
        style={{ marginTop: "20px", minWidth: 385 }}
      >
        {tasks.map((task) => (
          <Col
            key={task.id}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Card
              style={{
                width: "100%",
                maxWidth: "300px",
                minWidth: "300px",
                overflowWrap: "break-word",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              }}
            >
              <div style={{ flex: 1 }}>
                <strong>{userName}</strong>
                <br />
                <span style={{ color: "red" }}>
                  {new Date(task.datetime).toLocaleString()}
                </span>
                <br />
                {editingTaskId === task.id ? (
                  <Input
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    placeholder="Editar descripción"
                  />
                ) : (
                  <p style={{ wordWrap: "break-word", margin: 0 }}>
                    {task.description}
                  </p>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: "10px",
                  marginTop: "10px",
                }}
              >
                {editingTaskId === task.id ? (
                  <Button
                    type="default"
                    size="small"
                    onClick={() => handleSave(task.id)}
                  >
                    Guardar
                  </Button>
                ) : (
                  permissions?.write && (
                    <Button
                      type="default"
                      size="small"
                      onClick={() => handleEdit(task)}
                    >
                      Editar
                    </Button>
                  )
                )}
                {permissions?.delete && (
                  <Button
                    type="default"
                    size="small"
                    danger
                    onClick={() => handleDelete(task.id)}
                  >
                    Eliminar
                  </Button>
                )}
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomePage;
