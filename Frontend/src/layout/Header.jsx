import React, { useState } from "react";
import logo from "../assets/images/UNAM-FES-Aragon.png";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-white py-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <img
            src={logo}
            alt="logo"
            className="h-14 w-auto"
          />
        </a>

        {/* Navegación centrada */}
        
        <nav className="hidden lg:flex space-x-3 list-none ">
          <ListItem NavLink="/">Inicio</ListItem>
          <ListItem NavLink="/incidencias">Incidencias</ListItem>
          <ListItem NavLink="/usuarios">Usuarios</ListItem>
          <ListItem NavLink="/salas">Salones</ListItem>
        </nav>

        <div className="dropdown dropdown-end">
    
            <span className="font-bold mr-2">Cristian |  Administrador</span>
 
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li>
              <a className="justify-between">
                Perfil
                <span className="badge">New</span>
              </a>
            </li>
            <li><a>Asignaciones</a></li>
            <li><a>Salir</a></li>
          </ul>
        </div>


        {/* Botón hamburguesa para móvil */}
        <div className="lg:hidden">
          <button
            onClick={() => setOpen(!open)}
            className="focus:outline-none"
          >
            {/* Icono hamburguesa */}
            <span className="block w-6 h-0.5 bg-black mb-1"></span>
            <span className="block w-6 h-0.5 bg-black mb-1"></span>
            <span className="block w-6 h-0.5 bg-black"></span>
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      {open && (
        <div className="lg:hidden px-6 pt-4 pb-6 space-y-2">
          <ListItem NavLink="/">Inicio</ListItem>
          <ListItem NavLink="/incidencias">Incidencias</ListItem>
          <ListItem NavLink="/usuarios">Usuarios</ListItem>
          <ListItem NavLink="/salas">Salas</ListItem>
          <a href="/login" className="block text-sm text-dark">Iniciar sesión</a>
          <a href="/registro" className="block text-sm text-azulBase">Registrarse</a>
        </div>
      )}
    </header>

  );
}

const ListItem = ({ children, NavLink }) => (
  <li>
    <a
      href={NavLink}
      className="flex py-2 text-base font-medium  hover:text-azulBase dark:text-white lg:ml-10 lg:inline-flex hover:underline"
    >
      {children}
    </a>
  </li>
);

export default Header;
