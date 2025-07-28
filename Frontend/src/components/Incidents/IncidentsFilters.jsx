import { useEffect, useState } from 'react';
import DynamicForm from "../../components/ui/FormDinamico";
import api from '../../services/api';



export function IncidentsFilters() {
    return (
    <DynamicForm
          formId={4}
          onSubmit={async (data) => {
            try {
              const response = await api.post('/User/create', data);
              console.log('Usuario registrado exitosamente:', response.data);
            } catch (error) {
              console.error('Error al registrar usuario:', error);
            }
          }}
        />


    )
}

export default IncidentsFilters