import "./App.css";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import { AuthProvider } from "./hooks/useAuth";
import { ProtectedRoute } from "./Components/ProtectedRoute";
import HomePage from "./components/HomePage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route
              path="/login"
              element={
                <Login
                  mail={"usuario-leer-borrar-escribir@softtek.com"}
                ></Login>
              }
            />
            <Route path="/signup" element={<Signup></Signup>} />
            {/* <Route path="/homepage" element={<HomePage></HomePage>} /> */}
            <Route
              path="/homepage"
              element={
                <ProtectedRoute>
                  <HomePage></HomePage>
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
