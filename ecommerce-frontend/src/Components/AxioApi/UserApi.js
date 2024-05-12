import { AxioInstanceApi } from "./AxioInstance";

export const register = async (userData) => {
  try {
    const response = await AxioInstanceApi.post('/register', userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const login = async (userData) => {
  try {
    const response = await AxioInstanceApi.post('/login', userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};