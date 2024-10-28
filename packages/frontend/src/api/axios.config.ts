import axios from 'axios';

const api = axios.create({
 // baseURL: process.env.REACT_APP_API_URL, // Use the environment variable here
  baseURL: "http://localhost:3000"
});

export default api;
