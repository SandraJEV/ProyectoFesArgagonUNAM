import IncidentsFilters from './IncidentsFilters'
import IncidentsList from './IncidentsList'

const IncidentsView = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <IncidentsFilters />
      <IncidentsList />
    </div>
  )
}

export default IncidentsView
