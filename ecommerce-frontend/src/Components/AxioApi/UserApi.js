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

export const GetAllUsers = async () => {
  try {
      const response = await AxioInstanceApi.get('/users');
      return response.data;
  } catch (error) {
      throw error.response.data;
  }
};


export const GetLoggedInUserDetails = async () => {
  try {
      const response = await AxioInstanceApi.get('/user');
      return response.data;
  } catch (error) {
      throw error;
  }

}

export const GetUserDetails = async (user_id) => {
  try {
      const response = await AxioInstanceApi.get(`/user/${user_id}`);
      return response.data;
  } catch (error) {
      throw error;
  }

}