import api from '../api/axiosInstance';

export const sendOtp = async (email: string) => {
  const response = await api.post(
    '/loginOtp',
    {
      email,
    }
  );

  return response.data;
};

export const verifyLogin = async (
  email: string,
  otp: string
) => {
  const response = await api.post(
    '/login',
    {
      email,
      otp,
    }
  );

  return response.data;
};

export const logoutUser = async (
  uid: string,
  token: string
) => {
  const response = await api.post(
    '/logout',
    {
      uid
    }
  );

  return response.data;
};