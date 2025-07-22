import { useEffect, useState } from 'react'
import { Input } from './input'
import { Label } from './label'
import { Select } from './Select'
import { Button } from './button'
import { FormMensajes } from './FormMensajes'
import api from '../../services/api'
import { groupFieldsById } from '../../utils/groupFormFields'
import { validateField } from '../../utils/formValidation'
import { getCleanFormData } from '../../utils/formHelpers'

function DynamicForm({ formId = 2, onSubmit }) {
  const [formFields, setFormFields] = useState([])        // Campos del formulario
  const [formData, setFormData] = useState({})            // Valores actuales del formulario
  const [errors, setErrors] = useState({})                // Errores por campo

  // Obtener y preparar los campos del formulario desde la API
  useEffect(() => {
    api.get(`/FormRender/${formId}`)
      .then(res => {
        const grouped = groupFieldsById(res.data)

        // Parsear las opciones de campos select si vienen como string
        grouped.forEach(field => {
          if (field.type === 'select' && typeof field.options === 'string') {
            try {
              const parsed = JSON.parse(field.options)

              // Normaliza cada opción solo con id y name
              field.options = parsed.map(opt => ({
                id: opt.Id ?? opt.id,
                name: opt.Name ?? opt.name
              }))
            } catch (err) {
              console.warn(`Error al parsear options para ${field.fieldName}:`, err)
              field.options = []
            }
          }

        })

        setFormFields(grouped)

        // Inicializar los valores del formulario
        const initialValues = {}
        grouped.forEach(f => {
          // Para selects, iniciar como null (sin opción seleccionada)
          initialValues[f.fieldName] = f.type === 'select' ? null : ''
        })
        setFormData(initialValues)
      })
      .catch(err => console.error('Error al cargar campos dinámicos', err))
  }, [formId])

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault()

    const newErrors = {}

    // Validar todos los campos
    formFields.forEach(field => {
      const value = formData[field.fieldName]
      const errs = validateField(value, field.validations, formData)
      if (errs.length) {
        newErrors[field.fieldName] = errs
      }
    })

    setErrors(newErrors)

    // Enviar si no hay errores
    if (Object.keys(newErrors).length === 0) {
      const finalData = getCleanFormData(formData)
      onSubmit?.(finalData)
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {formFields.map(field => (
        <div key={field.fieldId}>
          <Label htmlFor={field.fieldName}>{field.label}</Label>

          {field.type === 'select' ? (
            <Select
              options={field.options}
              selected={formData[field.fieldName]}
              onChange={(selectedOption) => {
                const updatedData = { ...formData, [field.fieldName]: selectedOption }
                setFormData(updatedData)

                const validation = validateField(selectedOption, field.validations, updatedData)
                setErrors({ ...errors, [field.fieldName]: validation })
              }}
            />
          ) : (
            <Input
              id={field.fieldName}
              name={field.fieldName}
              type={field.type}
              placeholder={field.placeholder}
              required={field.isRequired}
              value={formData[field.fieldName] || ''}
              onChange={(e) => {
                const value = e.target.value
                const updatedData = { ...formData, [field.fieldName]: value }
                setFormData(updatedData)

                const validation = validateField(value, field.validations, updatedData)
                setErrors({ ...errors, [field.fieldName]: validation })
              }}
            />
          )}

          <FormMensajes messages={errors[field.fieldName] || []} />
          {field.linkText && field.linkHref && (
            <div className="mt-1 text-sm">
              <a
                href={field.linkHref}
                target={field.linkTarget || '_self'}
                rel={field.linkTarget === '_blank' ? 'noopener noreferrer' : undefined}
                className="font-semibold text-gray-500 hover:text-gray-400"
              >
                {field.linkText}
              </a>
            </div>
          )}
        </div>
      ))}

      <div>
        <Button type="submit">Registrar</Button>
      </div>
    </form>
  )
}

export default DynamicForm
