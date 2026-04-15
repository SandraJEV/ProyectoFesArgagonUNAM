export function cleanRequestData(data) {
  const cleaned = {};
  for (const key in data) {
    const value = data[key];
    if (value !== null && value !== undefined && value !== "") {
      cleaned[key] = value;
    }
  }
  return cleaned;
}
