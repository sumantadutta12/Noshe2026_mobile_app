// services/registrationService.ts

import api from '../api/axiosInstance';

export interface RegistrationPayload {
  fullName: string;
  phone: string;
  email: string;
  organisation: string;
  designation: string;
  delegateType: string;
  city: string;
  dietary: string;
  message: string;
}

export const submitRegistration = async (
  payload: RegistrationPayload,
) => {
  const response = await api.post('/register', payload);

  return response.data;
};