import api, { getApiErrorMessage } from '../api/axiosInstance';

export const scanAttendee = async (uid: string) => {
  try {
    const response = await api.post('/attendance', {
      uid: uid
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
