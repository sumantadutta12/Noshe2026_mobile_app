import api from '../api/axiosInstance';

export const adminLogin = async (
  username: string,
  password: string
) => {

  const response = await api.post(
    '/admin/login',
    {
      username,
      password
    }
  );

  return response.data;
};

export const getDashboardData = async (
  token: string
) => {

  const response = await api.get(
    '/admin/eventRecord',
    {
    headers: {
      authorization: token,
    }},
  );

  return response.data;
};

export const logout = async (
  uid: string,
) => {
  const response = await api.post(
    '/admin/logout',
    {
      uid
    }
  );

  return response.data;
};