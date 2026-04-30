import { useState, useEffect } from "react";
import api from "../../services/api";
import { IncidentsList } from "./IncidentsList";


export function IncidentsView() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const fetchIncidents = async () => {
    try {
      setIsLoading(true);
      setHasError(false);

      const res = await api.post("/GenericSP/execute", {
        procedureName: "SP_GeneralIncidents",
        parameters: { Option: 1 },
      });

      setResults(res.data);
    } catch (e) {
      console.error(e);
      setHasError(true);
      setResults({ data: [] });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  return (
    <div className="w-full max-w-[90rem] mx-auto my-8 bg-white rounded-xl shadow-lg px-6 py-10">
      <IncidentsList
        data={results}
        isLoading={isLoading}
        onReload={fetchIncidents}
      />
      {hasError && (
        <p className="text-red-500 text-sm mt-4">
          Ocurrió un error al cargar incidencias.
        </p>
      )}
    </div>
  );
}

export default IncidentsView;