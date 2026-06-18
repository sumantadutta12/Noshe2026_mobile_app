
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosHeaders } from 'axios';

export const API_BASE_URL = 'https://noshe-event-backend2026-1.onrender.com/api/event';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const headers = AxiosHeaders.from(config.headers);
  const hasAuthorization =
    Boolean(headers.get('authorization')) || Boolean(headers.get('Authorization'));

  if (!hasAuthorization) {
    const authEntries = await AsyncStorage.multiGet(['adminToken', 'token']);
    const adminToken = authEntries.find(([key]) => key === 'adminToken')?.[1];
    const attendeeToken = authEntries.find(([key]) => key === 'token')?.[1];
    const token = adminToken || attendeeToken;

    if (token) {
      headers.set('authorization', token);
    }
  }

  config.headers = headers;
  return config;
});

export const getApiErrorMessage = (
  error: unknown,
  fallback = 'Something went wrong'
) => {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message;

    if (typeof message === 'string' && message.trim()) {
      return message;
    }

    if (error.code === 'ECONNABORTED') {
      return `API timeout. Could not reach ${API_BASE_URL}`;
    }

    if (error.message === 'Network Error') {
      return `Network Error. Check whether this phone can access ${API_BASE_URL}`;
    }

    return error.message || fallback;
  }

  if (error instanceof Error) {
    return error.message || fallback;
  }

  return fallback;
};

export default api;
