namespace WebAPI.DTOs
{
    /// <summary>
    /// Clase genérica para encapsular los resultados de procedimientos almacenados (Stored Procedures).
    /// Puede utilizarse con cualquier tipo de dato.
    /// </summary>
    /// <typeparam name="T">Tipo de datos devueltos (ej. List<Usuario>, Usuario, etc.)</typeparam>
    public class SPResult<T>
    {
        /// <summary>
        /// Código de resultado devuelto por el procedimiento almacenado.
        /// Ejemplos comunes: 0 = éxito, 1 = error funcional, 99 = error técnico.
        /// </summary>
        public int ResultCode { get; set; }

        /// <summary>
        /// Mensaje descriptivo del resultado, útil para mostrar en el frontend o para logs.
        /// </summary>
        public string? ResultMessage { get; set; }

        /// <summary>
        /// Datos devueltos por el SP, si es que aplica. Puede ser una lista, un objeto o null.
        /// </summary>
        public T? Data { get; set; }
    }
}
