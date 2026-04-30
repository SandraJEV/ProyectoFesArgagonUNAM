import {
  PencilIcon,
  ChevronUpDownIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";


import { Avatar, IconButton, Typography } from "@material-tailwind/react";
import { useRef } from "react";
import { Button } from "./../ui/button";
import { Modal } from "./../ui/Modal";
import { Select } from "./../ui/Select";
import DynamicForm from "./../ui/FormDinamico";
import { useState, useEffect } from "react";
import { Badge } from "../ui/Badge";
import { badgeColorMap } from "../../config/badgeColors";
import AppToast from "../ui/toast";
import api from "./../../services/api";

const TABLE_HEAD = [
  { label: "Descripción", key: "Description" },
  { label: "Categoría", key: "Name" },
  { label: "Reportó", key: "Reporta" },
  { label: "Responsable", key: "Responsable" },
  { label: "Estado", key: "Estatus" },
  { label: "Fecha límite", key: "DeadlineDate" },
  { label: "", key: "" },
];
const TABLE_ROWS = [];

export function IncidentsList({ data = [], isLoading = false }) {
  const rows = data?.data ?? [];
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [assigned, setAssigned] = useState({});
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [userOptions, setUserOptions] = useState([]); // [{id, name}]
  const [usersError, setUsersError] = useState(null);

  console.log("data en list ", data);
  const [formData, setFormData] = useState({});
  const [toast, setToast] = useState(null);
  const formRef = useRef();

  // Cargar usuarios 1 sola vez
  useEffect(() => {
    let alive = true; // evita setState si el componente se desmonta
    setLoadingUsers(true);
    setUsersError(null);

    api
      .get("/User")
      .then((res) => {
        if (!alive) return;
        const items = Array.isArray(res.data)
          ? res.data
          : (res.data?.data ?? []);
      
        const mapped = items.map((u) => ({
          id: u.UserID ?? u.userID ?? u.id ?? u.Id,
          name: `${u.firstName} ${u.lastName}`,
        }));
        setUserOptions(mapped);
      })
      .catch((err) => setUsersError(err?.message || "Error al cargar usuarios"))
      .finally(() => alive && setLoadingUsers(false));

    return () => {
      alive = false;
    };
  }, []);

  const handleSort = (column) => {
    if (!column) return;
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (column) => {
    if (!column) return null;
    if (sortColumn !== column) return <ChevronUpDownIcon className="h-4 w-4" />;
    return sortDirection === "asc" ? (
      <ChevronUpIcon className="h-4 w-4" />
    ) : (
      <ChevronDownIcon className="h-4 w-4" />
    );
  };

  const sortedRows = [...rows].sort((a, b) => {
    const aVal = a[sortColumn];
    const bVal = b[sortColumn];

    if (aVal === undefined || bVal === undefined) return 0;

    if (typeof aVal === "string") {
      return sortDirection === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    return 0;
  });
  const saveIncident = async (data, closeModal) => {
    console.log("Guardando incidencia con datos:", data);
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const formatDate = (dateStr) => {
        if (!dateStr) return null;
        const [day, month, year] = dateStr.split("/");
        return `${year}-${month}-${day}`;
      };

      const response = await api.post("/GenericSP/execute", {
        procedureName: "SP_GeneralIncidents",
        parameters: {
          Option: 3,
          Title: data.Title,
          Description: data.Description,
          EquipmentTypeID: data.EquipmentTypeID,
          SalonID: data.SalonID,
          Deadline: formatDate(data.Deadline) || null,
          CreatedBy: user.userID,
        },
      });
      console.log("FORM DATA:", response);
      const result = response.data;

      if (result.resultCode === 0) {
        setToast({
          variant: "success",
          message: "Incidencia creada correctamente",
        });

        closeModal();
        // 🔥 aquí puedes recargar incidencias si quieres
      } else {
        setToast({
          variant: "error",
          message: result.resultMessage,
        });
      }
    } catch (error) {
      console.error(error);

      setToast({
        variant: "error",
        message: "Error al guardar la incidencia",
      });
    }
  };
  return (
    <div className="w-full bg-white px-4 md:px-8 py-6 overflow-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold mr-12"> Incidencias</h1>

        <Modal
          title="Nueva incidencia"
          button={(open) => <Button onClick={open}>Nueva incidencia</Button>}
          renderContent={({ closeModal }) => (
            <DynamicForm
              ref={formRef}
              formId={4}
              onChange={(data) => setFormData(data)} // 🔥 guardas datos
              onSubmit={async (data) => {
                await saveIncident(data, closeModal);
              }}
            />
          )}
          onConfirm={() => {
            // 🔥 DISPARA EL SUBMIT DEL FORM
            formRef.current?.requestSubmit();
          }}
        />
      </div>
      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-gray-600">Cargando incidencias...</span>
        </div>
      )}
      {!isLoading && sortedRows.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No se encontraron incidencias
        </div>
      )}
      {!isLoading && sortedRows.length > 0 && (
        <table className="w-full table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map(({ label, key }) => (
                <th
                  key={label}
                  className="border-b border-blue-gray-100 bg-gray-100 px-4 py-3 text-sm font-medium text-blue-gray-700 cursor-pointer select-none"
                  onClick={() => handleSort(key)}
                >
                  <div className="flex items-center gap-1">
                    {label}
                    {getSortIcon(key)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedRows.map((row, index) => (
              <tr
                key={row.IncidentID}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-4 py-3 text-sm">{row.Description}</td>
                <td className="px-4 py-3 text-sm">{row.AreaName}</td>
                <td className="px-4 py-3 text-sm">{row.CreatedByName}</td>

                <td className="px-4 py-3 text-sm">
                  {assigned[row.IncidentID] ? (
                    <Select
                      id={`assignee-${row.IncidentID}`}
                      options={[
                        { id: null, name: "Seleccionar" },
                        ...userOptions,
                      ]}
                      selected={assigned[row.IncidentID] ?? null}
                      onChange={(selectedOption) => {
                        setAssigned((prev) => ({
                          ...prev,
                          [row.IncidentID]: selectedOption,
                        }));
                      }}
                    />
                  ) : (
                    row.Responsable || "Sin asignar"
                  )}
                </td>
                <td className="px-4 py-3">
                  <Badge color={badgeColorMap[row.StatusColor] || "gray"}>
                    {row.StatusName}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-sm">
                  {row.Deadline || "Sin fecha"}
                </td>
                <td className="px-4 py-3">
                  <IconButton variant="text" size="sm">
                    <PencilIcon
                      className="h-4 w-4 text-blue-500"
                      onClick={() =>
                        setAssigned((prev) => ({
                          ...prev,
                          [row.IncidentID]: !prev[row.IncidentID],
                        }))
                      }
                    />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!isLoading && sortedRows.length > 0 && (
        <div className="flex items-center justify-between pt-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Página 1 de 1
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" size="sm">
              Anterior
            </Button>
            <Button variant="outlined" size="sm">
              Siguiente
            </Button>
          </div>
        </div>
      )}
      {toast && (
        <AppToast
          variant={toast.variant}
          message={toast.message}
          duration={5000}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default IncidentsList;
