export function validateField(value, rules = [], formData = {}) {
  const errors = []

  for (const rule of rules) {
    const val = rule.ruleValue

    switch (rule.ruleType) {

      case "required":
        if (
          value === null ||
          value === undefined ||
          (typeof value === "string" && value.trim() === "") ||
          (typeof value === "object" && value !== null && !value.id)
        ) {
          errors.push(rule.message)
        }
        break

      case "minLength":
        if (typeof value === "string" && value.length < parseInt(val)) {
          errors.push(rule.message)
        }
        break

      case "maxLength":
        if (typeof value === "string" && value.length > parseInt(val)) {
          errors.push(rule.message)
        }
        break

      case "email":
        if (
          typeof value === "string" &&
          value.trim() !== "" &&
          !/^\S+@\S+\.\S+$/.test(value)
        ) {
          errors.push(rule.message)
        }
        break

      case "match":
        if (value !== formData[val]) {
          errors.push(rule.message)
        }
        break

      default:
        break
    }
  }

  return errors
}