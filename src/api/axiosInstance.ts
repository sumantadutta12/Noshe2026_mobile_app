
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://noshe-event-backend2026-1.onrender.com/api/event',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;