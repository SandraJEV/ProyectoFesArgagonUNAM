
export function Badge({ color = 'gray', children }) {
  return (
    <span
      className={`inline-flex items-center rounded-md bg-${color}-100 px-2 py-1 text-xs font-medium text-${color}-800 ring-1 ring-inset ring-${color}-300`}
    >
      {children}
    </span>
  );
}

