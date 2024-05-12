import axios from 'axios';

const BASE_URL = 'http://localhost:5000'; // Update with your backend server URL

export const AxioInstanceApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${localStorage.getItem('token')}`
  },
});