import { useEffect, useState } from 'react'
import { Input } from './input'
import { Label } from './label'
import { Select } from './Select'
import { Button } from './button'
import { FormMensajes } from './FormMensajes'
import api from '../../services/api'
import { groupFieldsById } from '../../utils/groupFormFields'
import { validateField } from '../../utils/formValidation'

function DynamicForm({ formId = 2, onSubmit }) {
  // Estado para los campos agrupados y ordenados
  const [formFields, setFormFields] = useState([])

  // Estado para valores del formulario
  const [formData, setFormData] = useState({})

  // Estado para mensajes de error por campo
  const [errors, setErrors] = useState({})

  useEffect(() => {
    api.get(`/FormRender/${formId}`)
      .then(res => {
        const grouped = groupFieldsById(res.data)
        setFormFields(grouped)

        // Inicializar los valores del formulario en blanco
        const initialValues = {}
        grouped.forEach(f => {
          initialValues[f.fieldName] = ''
        })
        setFormData(initialValues)
      })
      .catch(err => console.error('Error al cargar campos dinámicos', err))
  }, [formId])

  // Manejador del submit del formulario
  const handleSubmit = (e) => {
    e.preventDefault()

    const newErrors = {}
    formFields.forEach(field => {
      const value = formData[field.fieldName]
      const errs = validateField(value, field.validations, formData)
      if (errs.length) {
        newErrors[field.fieldName] = errs
      }
    })

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      onSubmit?.(formData) // Ejecutar función padre si no hay errores
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {formFields.map(field => (
        <div key={field.fieldId}>
          <Label htmlFor={field.fieldName}>{field.label}</Label>

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

          <FormMensajes messages={errors[field.fieldName] || []} />
        </div>
      ))}

      <div>
        <Button
          type="submit"
        >
          Registrar
        </Button>
      </div>
    </form>
  )
}

export default DynamicForm
