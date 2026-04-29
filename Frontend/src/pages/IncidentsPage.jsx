import { useState } from 'react';
import IncidentsFilters from '../components/Incidents/IncidentsFilters'
import IncidentsList from '../components/Incidents/IncidentsList'

const IncidentsView = () => {
  const [results, setResults] = useState({ data: [] });
  const [isLoading, setIsLoading] = useState(false);
  
  console.log('estoy en lalistadeincidencias?');
  
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <IncidentsFilters onResults={setResults} setIsLoading={setIsLoading} />
      <IncidentsList data={results} isLoading={isLoading} />
    </div>
  )
}

export default IncidentsView
