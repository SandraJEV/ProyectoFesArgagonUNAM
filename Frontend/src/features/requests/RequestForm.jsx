import { useEffect, useState } from 'react';
import DynamicForm from "../../components/ui/FormDinamico";
import api from '../../services/api';
import logo from "../../assets/images/UNAM-FES-Aragon.png";

function RequestForm() {
  return (
    
      <div className="w-full max-w-md mt-11  mx-auto bg-white rounded-xl shadow-lg px-8 py-10 min-h-[34rem] space-y-6">
        <h2 className="text-center text-2xl font-bold text-gray-900">
          Registrar Reporte
        </h2>

        {/* Formulario dinámico */}
        <DynamicForm
          formId={3}
          onSubmit={async (data) => {
            try {
              const response = await api.post('/User/create', data);
              console.log('Usuario registrado exitosamente:', response.data);
            } catch (error) {
              console.error('Error al registrar usuario:', error);
            }
          }}
        />

       
      </div>
    
  );
}

export default RequestForm;
