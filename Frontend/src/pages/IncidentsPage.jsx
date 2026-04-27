import IncidentsFilters from '../components/Incidents/IncidentsFilters'
import IncidentsList from '../components/Incidents/IncidentsList'

const IncidentsView = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <IncidentsFilters />
      <IncidentsList />
    </div>
  )
}

export default IncidentsView
