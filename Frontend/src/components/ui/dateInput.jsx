import { useEffect, useRef, useState } from "react";

export function DateInput({ value = '', onChange }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(value);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const daysContainerRef = useRef(null);

  useEffect(() => {
    if (value) {
      setSelectedDate(value);
    }
  }, [value]);

  useEffect(() => {
    if (daysContainerRef.current) {
      renderCalendar();
    }
  }, [currentDate, isCalendarOpen]);

  const handleDateSelect = (dateString) => {
    setSelectedDate(dateString);
    onChange?.(dateString); // ← Notifica al padre
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const daysContainer = daysContainerRef.current;
    if (!daysContainer) return;
    daysContainer.innerHTML = "";

    for (let i = 0; i < firstDayOfMonth; i++) {
      daysContainer.appendChild(document.createElement("div"));
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const dayDiv = document.createElement("div");
      dayDiv.className =
        "w-10 h-10 flex items-center justify-center cursor-pointer rounded-full text-gray-700 hover:bg-azulBase hover:text-white transition";
      dayDiv.textContent = i.toString();

      dayDiv.addEventListener("click", () => {
        const selectedDateValue = `${i.toString().padStart(2, '0')}/${(month + 1).toString().padStart(2, '0')}/${year}`;
        handleDateSelect(selectedDateValue);
        if (daysContainer) {
          daysContainer.querySelectorAll("div").forEach((d) =>
            d.classList.remove("bg-azulBase", "text-white")
          );
          dayDiv.classList.add("bg-azulBase", "text-white");
        }
      });

      daysContainer.appendChild(dayDiv);
    }
  };

  return (
    <div className="relative w-full max-w-sm">
      <div className="relative">
        <input
          type="text"
          value={value || ""}
          onClick={() => setIsCalendarOpen(!isCalendarOpen)}
          readOnly
          placeholder="Selecciona una fecha"
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-10 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-azulBase"
        />

        <svg
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 7V3m8 4V3m-9 8h10m-9 4h6m-7 4h8M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>

      {isCalendarOpen && (
        <div className="absolute z-10 mt-2 w-full rounded-lg border border-gray-300 bg-white shadow-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <button
              onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
              className="text-sm text-gray-500 hover:text-azulBase"
            >
              &#8592; Anterior
            </button>
            <span className="text-sm font-semibold text-gray-700">
              {currentDate.toLocaleDateString("es-MX", {
                month: "long",
                year: "numeric",
              })}
            </span>
            <button
              onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
              className="text-sm text-gray-500 hover:text-azulBase"
            >
              Siguiente &#8594;
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-xs text-center text-gray-400 mb-2">
            {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          <div
            ref={daysContainerRef}
            className="grid grid-cols-7 gap-1"
          ></div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              onClick={() => {
                handleDateSelect(null);
                setIsCalendarOpen(false);
              }}
              className="text-sm px-4 py-1.5 rounded border border-azulBase text-azulBase hover:bg-azulBase hover:text-white transition"
            >
              Cancelar
            </button>
            <button
              onClick={() => setIsCalendarOpen(false)}
              className="text-sm px-4 py-1.5 rounded bg-azulBase text-white hover:bg-blue-800 transition"
            >
              Aplicar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DateInput;
