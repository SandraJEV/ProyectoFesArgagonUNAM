export function groupFieldsById(data) {
  const grouped = {}

  data.forEach(item => {
    const key = item.fieldId

    if (!grouped[key]) {
      grouped[key] = {
        fieldId: item.fieldId,
        fieldName: item.fieldName,
        label: item.label,
        type: item.type,
        placeholder: item.placeholder,
        isRequired: item.isRequired,
        orderNumber: item.orderNumber,
        options: item.options,
        validations: [],
        linkText: item.linkText?.trim() || null,
        linkHref: item.linkHref?.trim() || null,
        linkTarget: item.linkTarget?.trim() || '_self',
      }
    }

    grouped[key].validations.push({
      ruleType: item.ruleType,
      ruleValue: item.ruleValue,
      message: item.message
    })
  })

  return Object.values(grouped).sort((a, b) => a.orderNumber - b.orderNumber)
}
