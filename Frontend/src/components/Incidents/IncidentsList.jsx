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

import { useState } from "react";

const TABLE_HEAD = [
    { label: "Nombre", key: "name" },
    { label: "Rol", key: "job" },
    { label: "Estado", key: "online" },
    { label: "Fecha", key: "date" },
    { label: "", key: "" },
];

const TABLE_ROWS = [
    {
        name: "John Michael",
        email: "john@creative-tim.com",
        job: "Manager",
        org: "Soporte",
        online: true,
        date: "23/04/18",
    },
    {
        name: "Alexa Liras",
        email: "alexa@creative-tim.com",
        job: "Developer",
        org: "Soporte",
        online: false,
        date: "01/02/20",
    },
    {
        name: "Laurent Perrier",
        email: "laurent@creative-tim.com",
        job: "Support",
        org: "Tickets",
        online: true,
        date: "15/06/23",
    },
];

export function IncidentsList() {
    const [sortColumn, setSortColumn] = useState("");
    const [sortDirection, setSortDirection] = useState("asc");

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

    const sortedRows = [...TABLE_ROWS].sort((a, b) => {
        const aVal = a[sortColumn];
        const bVal = b[sortColumn];

        if (aVal === undefined || bVal === undefined) return 0;

        if (typeof aVal === "string") {
            return sortDirection === "asc"
                ? aVal.localeCompare(bVal)
                : bVal.localeCompare(aVal);
        }

        if (typeof aVal === "boolean") {
            return sortDirection === "asc"
                ? Number(aVal) - Number(bVal)
                : Number(bVal) - Number(aVal);
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
                        <tr key={row.name} className={index % 2 === 0 ? "bg-white" : "bg-blue-gray-50/50"}>
                            <td className="px-4 py-3">
                                <div className="flex items-center gap-3">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-gray-800">{row.name}</span>
                                        <span className="text-xs text-gray-500">{row.email}</span>
                                    </div>
                                </div>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700">{row.job}</td>
                            <td className="px-4 py-3">
                                <span
                                    className={`inline-block text-xs px-2 py-1 rounded-full font-medium ${row.online
                                        ? "bg-green-100 text-green-800"
                                        : "bg-gray-200 text-gray-600"
                                        }`}
                                >
                                    {row.online ? "Activo" : "Inactivo"}
                                </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">{row.date}</td>
                            <td className="px-4 py-3">
                                <IconButton variant="text" size="sm">
                                    <PencilIcon className="h-4 w-4 text-blue-500" />
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
