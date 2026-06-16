
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://innovision360.com:3001/api/event',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;