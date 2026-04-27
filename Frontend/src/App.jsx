import './index.css';
import Login from "./features/auth/Login";
import UserForm from "./features/users/UserForm";
import RequestForm from './features/requests/RequestForm';
import { Header } from "./layout/Header"
import IncidentsPage from './pages/IncidentsPage'
import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from 'react'


function App() {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    // Escuchar cambios en localStorage (simulado con un intervalo)
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsAuth(!!token);
    };

    window.addEventListener("storage", checkAuth);
    
    // También verificar inmediatamente después de cualquier cambio en la ruta
    const interval = setInterval(checkAuth, 500);

    return () => {
      window.removeEventListener("storage", checkAuth);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className='min-h-screen items-center justify-center bg-background'>

      {isAuth && <Header />}
      <Routes>

        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* DASHBOARD */}
        <Route path="/dashboard" element={
          isAuth ? <IncidentsPage /> : <Navigate to="/login" />
        } />

        {/* INCIDENCIAS */}
        <Route path="/incidencias" element={
          isAuth ? <IncidentsPage /> : <Navigate to="/login" />
        } />

        {/* DEFAULT */}
        <Route path="*" element={<Navigate to={isAuth ? "/incidencias" : "/login"} />} />

      </Routes>
     

    </div>
  )
}

export default App
