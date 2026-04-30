import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import DynamicForm from "../../components/ui/FormDinamico";
import api from '../../services/api';
import logo from "../../assets/images/UNAM-FES-Aragon.png";

function UserForm() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 pb-10">
      <img
                src={logo}
                alt="Logo FES Aragón"
                className="absolute top-10 left-24 h-20 w-auto h-15"
              />
      <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg px-8 py-10 min-h-[34rem] space-y-6">
        <h2 className="text-center text-2xl font-bold text-gray-900">
          Registrar Usuario
        </h2>

        {/* Formulario dinámico */}
        <DynamicForm
          formId={1}
          onSubmit={async (data) => {
            try {
              const response = await api.post('/User/create', data);
              console.log('Usuario registrado exitosamente:', response.data);
              localStorage.setItem("token", response.data.token);
              navigate('/IncidentsView');
              
            } catch (error) {
              console.error('Error al registrar usuario:', error);
            }
          }}
        />

       
      </div>
    </div>
  );
}

export default UserForm;
