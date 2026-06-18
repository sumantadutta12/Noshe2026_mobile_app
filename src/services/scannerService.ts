import api, { getApiErrorMessage } from '../api/axiosInstance';

export const scanAttendee = async (qrCode: string) => {
  try {
    const response = await api.post('/attendance', {
      qr_code: qrCode
    });

    return response.data;
  } catch (error) {
    console.log('Scan API Error:', error);
    return {
      success: false,
      message: getApiErrorMessage(error)
    };
  }
};
