export function groupFieldsById(data) {
  const grouped = {}
  var esdebugg = false;
  esdebugg == true ? console.log('data  antes de procesar: ', data) : '' ;
  data.forEach(item => {
    const key = item.fieldId

    if (!grouped[key]) {
      let options = item.options

      // ✅ Si es campo select y las opciones están en JSON, conviértelo aquí
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
    grouped[key].validations.push({
      ruleType: item.ruleType,
      ruleValue: item.ruleValue,
      message: item.message
    })
  })

  return Object.values(grouped).sort((a, b) => a.orderNumber - b.orderNumber)
}
