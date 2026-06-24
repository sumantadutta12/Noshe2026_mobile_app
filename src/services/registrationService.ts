// services/registrationService.ts

import api from '../api/axiosInstance';

export interface RegistrationPayload {
  participatingAs?: string;
  title?: string;
  firstName?: string;
  lastName?: string;
  group?: string;
  fullName?: string;
  email: string;
  mobile?: string;
  phone?: string;
  organization?: string;
  organisation?: string;
  designation?: string;
  delegateType?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  pinCode?: string;
  otp?: string;
  dietary?: string;
  message?: string;
}

export const submitRegistration = async (
  payload: RegistrationPayload,
) => {
  const response = await api.post('/register', payload);

  return response.data;
};
