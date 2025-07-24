import logo from "../assets/images/UNAM-FES-Aragon.png";
import React, { useState } from "react";

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
    <nav className="hidden lg:flex space-x-8">
      <ListItem NavLink="/">Inicio</ListItem>
      <ListItem NavLink="/incidencias">Incidencias</ListItem>
      <ListItem NavLink="/usuarios">Usuarios</ListItem>
      <ListItem NavLink="/salas">Salas</ListItem>
    </nav>

    {/* Botones */}
    <div className="hidden lg:flex space-x-4">
      <a
        href="/login"
        className="px-5 py-2 text-base font-medium text-dark hover:text-primary"
      >
        Iniciar sesión
      </a>
      <a
        href="/registro"
        className="rounded-lg bg-primary px-5 py-2 text-base font-medium text-white hover:bg-opacity-90"
      >
        Registrarse
      </a>
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
      <a href="/registro" className="block text-sm text-primary">Registrarse</a>
    </div>
  )}
</header>

  );
}

const ListItem = ({ children, NavLink }) => (
  <li>
    <a
      href={NavLink}
      className="flex py-2 text-base font-medium text-dark hover:text-primary dark:text-white lg:ml-10 lg:inline-flex"
    >
      {children}
    </a>
  </li>
);

export default Header;
