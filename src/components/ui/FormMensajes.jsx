export function FormMensajes({ messages = [] }) {
  if (!messages.length) return null;

  return (
    <div className="mt-1 text-sm text-red-600 space-y-1">
      {messages.map((msg, i) => (
        <div key={i}>• {msg}</div>
      ))}
    </div>
  );
}

export default FormMensajes;
