import { useState, useEffect } from "react";

export function CheckBox({ id, name, checked = false, onChange, required = false, children }) {
  return (
    <label className="inline-flex items-center gap-2">
      <input
        id={id}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        required={required}
        className="checkbox border-azulBase bg-whiteBase checked:border-azulBase checked:bg-whiteBase checked:text-azulBase"
      />
      <span className="text-sm text-gray-700 ml-1">{children}</span>
    </label>
  )
}

export default CheckBox;

