// utils/formHelpers.js

/**
 * Limpia los datos del formulario antes de enviarlos.
 * Si un campo es un objeto con una propiedad 'id', se toma solo ese id como valor.
 * Esto es útil, por ejemplo, para selects que guardan objetos completos como opción seleccionada.
 *
 * @param {Object} formData - Los datos completos del formulario
 * @returns {Object} cleaned - Datos listos para enviar al backend
 */
export function getCleanFormData(formData) {
  const cleaned = {}

  Object.entries(formData).forEach(([key, value]) => {
    cleaned[key] = (value && typeof value === 'object' && value.id !== undefined)
      ? value.id
      : value
  })

  return cleaned
}
