import { useEffect, useState } from 'react';
import DynamicForm from "../../components/ui/FormDinamico";
import api from '../../services/api';
import { cleanRequestData } from '../../utils/cleanRequestData'




export function IncidentsFilters({ onResults, setIsLoading }) {
  const [hasError, setHasError] = useState(false);


  return (
    <DynamicForm
      formId={4}
      onSubmit={async (data) => {
        setHasError(false);
        try {
          setIsLoading(true);
          setHasError(false);
          const cleanedData = cleanRequestData(data);
          const response = await api.post('/GenericSP/execute', {
            procedureName: "SP_GeneralIncidents",
            parameters: {
              Option: 1,
              ...cleanedData
            }
          });

          const result = response?.data;
          if (result?.data) {
            onResults(result);
          } else {
            onResults({ data: [] }); // estructura segura
          }

        } catch (error) {
          console.error('Error al buscar:', error);
          setHasError(true);
          onResults({ data: [] }); // limpiar la tabla para que no se quede lo anterior
        } finally {
          setIsLoading(false);
        }

      }}
    />


  )
}

export default IncidentsFilters