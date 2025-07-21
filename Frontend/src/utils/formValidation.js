export function validateField(value, rules, formData = {}) {
  const errors = [];

  for (const rule of rules) {
    const val = rule.ruleValue;

    switch (rule.ruleType) {
      case "required":
        if (
          value === null ||                                  // null o sin seleccionar
          value === undefined ||
          (typeof value === "string" && value.trim() === "") || // cadena vacía
          (typeof value === "object" && !value.id)               // objeto sin id (select)
        ) {
          errors.push(rule.message)
        }
        break;

      case "minLength":
        if (value.length < parseInt(val)) errors.push(rule.message);
        break;
      case "maxLength":
        if (value.length > parseInt(val)) errors.push(rule.message);
        break;
      case "email":
        if (!/^\S+@\S+\.\S+$/.test(value)) errors.push(rule.message);
        break;
      case "match":
        if (formData[val] !== value) errors.push(rule.message);
        break;
      default:
        break;
    }
  }

  return errors;
}
