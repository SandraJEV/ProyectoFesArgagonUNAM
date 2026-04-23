export function groupFieldsById(data) {
  const grouped = {}
  var esdebugg = false;
  esdebugg == true ? console.log('data  antes de procesar: ', data) : '' ;
  data.forEach(item => {
    const key = item.fieldId

    if (!grouped[key]) {
      let options = item.options

      // Si es campo select y las opciones están en JSON, conviértelo aquí
      if (item.type === 'select' && typeof options === 'string') {
        try {
          const parsed = JSON.parse(options)
          options = parsed.map(opt => ({
            id: opt.ID ?? opt.Id ?? opt.id,
            name: opt.Name ?? opt.name
          }))
        } catch (e) {
          console.warn(`No se pudo parsear options en ${item.fieldName}`, e)
          options = []
        }
      }

      grouped[key] = {
        fieldId: item.fieldId,
        fieldName: item.fieldName,
        label: item.label,
        type: item.type,
        placeholder: item.placeholder,
        isRequired: item.isRequired,
        orderNumber: item.orderNumber,
        options,
        validations: [],
        linkText: item.linkText?.trim() || null,
        linkHref: item.linkHref?.trim() || null,
        linkTarget: item.linkTarget?.trim() || '_self',
        rows: item.rows
      }
    }

    
    esdebugg == true ? console.log('Procesando ',item.fieldId) : '' ;
    esdebugg == true ? console.log('Procesando options',item.options) : '' ;

    if (Array.isArray(item.validations) && item.validations.length > 0) {
      item.validations.forEach(rule => {
        grouped[key].validations.push({
          ruleType: rule.ruleType,
          ruleValue: rule.ruleValue,
          message: rule.message
        })
      })
    } else if (item.ruleType) {
      grouped[key].validations.push({
        ruleType: item.ruleType,
        ruleValue: item.ruleValue,
        message: item.message
      })
    }
  })

  const groupedFields = Object.values(grouped).map(field => {
    const uniqueValidations = []
    const seenKeys = new Set()

    field.validations.forEach(rule => {
      const dedupeKey = `${rule.ruleType ?? ''}|${String(rule.ruleValue ?? '')}|${rule.message ?? ''}`
      if (!seenKeys.has(dedupeKey)) {
        seenKeys.add(dedupeKey)
        uniqueValidations.push(rule)
      }
    })

    return {
      ...field,
      validations: uniqueValidations
    }
  })

  return groupedFields.sort((a, b) => a.orderNumber - b.orderNumber)
}
