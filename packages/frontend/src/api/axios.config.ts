import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Use the environment variable here
});

export default api;
