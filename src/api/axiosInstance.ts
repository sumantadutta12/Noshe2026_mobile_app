
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://innovision360.com/api/event',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;