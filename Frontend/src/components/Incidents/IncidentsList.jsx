import {
    PencilIcon,
    ChevronUpDownIcon,
    ChevronUpIcon,
    ChevronDownIcon,
} from "@heroicons/react/24/outline";

import {
    Avatar,
    IconButton,
    Typography,
    Button,
} from "@material-tailwind/react";

import { Select } from './../ui/Select'
import { useState, useEffect } from "react";
import { Badge } from '../ui/Badge'
import { badgeColorMap } from '../../config/badgeColors'
import api from './../../services/api'

const TABLE_HEAD = [
    { label: "Descripción", key: "Description" },
    { label: "Categoría", key: "Name" },
    { label: "Reportó", key: "Reporta" },
    { label: "Responsable", key: "Responsable" },
    { label: "Estado", key: "Estatus" },
    { label: "Fecha límite", key: "DeadlineDate" },
    { label: "", key: "" }
];
const TABLE_ROWS = [

];

export function IncidentsList({ data = [] }) {
    const rows = data?.data ?? [];
    const [sortColumn, setSortColumn] = useState("");
    const [sortDirection, setSortDirection] = useState("asc");
    const [assigned, setAssigned] = useState({});
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [userOptions, setUserOptions] = useState([]); // [{id, name}]
    const [usersError, setUsersError] = useState(null);


    // Cargar usuarios 1 sola vez
    useEffect(() => {
        let alive = true;                // evita setState si el componente se desmonta
        setLoadingUsers(true);
        setUsersError(null);

        api.get("/User")
            .then((res) => {
                if (!alive) return;
                const items = Array.isArray(res.data) ? res.data : res.data?.data ?? [];
                console.log(items);
                
                const mapped = items.map((u) => ({
                    id: u.UserID ?? u.userID ?? u.id ?? u.Id,
                    name:    `${u.firstName} ${u.lastName}`
                }));
                setUserOptions(mapped);
                console.log('map ',mapped);
                      
            })
            .catch((err) => setUsersError(err?.message || "Error al cargar usuarios"))
            .finally(() => alive && setLoadingUsers(false));

        return () => { alive = false; };
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
        return sortDirection === "asc"
            ? <ChevronUpIcon className="h-4 w-4" />
            : <ChevronDownIcon className="h-4 w-4" />;
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


    return (
        <div className="w-full bg-white px-4 md:px-8 py-6 overflow-auto">
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
                        <tr key={row.IncidentID} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                            <td className="px-4 py-3 text-sm">{row.Description}</td>
                            <td className="px-4 py-3 text-sm">{row.Name}</td>
                            <td className="px-4 py-3 text-sm">{row.Reporta}</td>

                            <td className="px-4 py-3 text-sm">
                                {assigned ? (
                                    <Select
                                        id={`assignee-${row.IncidentID}`}
                                        options={[{ id: null, name: 'Seleccionar' }, ...userOptions]}
                                        selected={assigned[row.IncidentID] ?? null}
                                        onChange={(selectedOption) => {
                                            setAssignments(prev => ({ ...prev, [row.IncidentID]: setUserOptions }));
                                        }}
                                    />
                                ) : (
                                    row.Responsable || 'Sin asignar'
                                )}
                            </td>
                            <td className="px-4 py-3">
                                <Badge color={badgeColorMap[row.Color] || "gray"}>
                                    {row.Estatus}
                                </Badge>
                            </td>
                            <td className="px-4 py-3 text-sm">{row.DeadlineDate}</td>
                            <td className="px-4 py-3">
                                <IconButton variant="text" size="sm" >
                                    <PencilIcon className="h-4 w-4 text-blue-500" onClick={() => setAssigned(true)} />
                                </IconButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex items-center justify-between pt-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    Página 1 de 5
                </Typography>
                <div className="flex gap-2">
                    <Button variant="outlined" size="sm">Anterior</Button>
                    <Button variant="outlined" size="sm">Siguiente</Button>
                </div>
            </div>
        </div>
    );
}

export default IncidentsList;
