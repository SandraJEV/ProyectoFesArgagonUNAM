import api from "./api";

export const loginRequest = async (data) => {
  try {
    const response = await api.post("/User/login", data);

    return response.data;
  } catch (error) {
    console.error("Error en login:", error);

    const errorData = error.response?.data;

    return {
      resultCode: errorData?.resultCode || error.response?.status || 99,
      resultMessage:
        errorData?.resultMessage ||
        errorData?.message ||
        (typeof errorData === 'string' ? errorData : null) ||
        error.message ||
        "Credenciales incorrectas",
      data: null,
    };
  }
};
