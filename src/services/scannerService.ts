import api from '../api/axiosInstance';

export const scanAttendee = async (uid: unknown) => {
  try {
    const response = await api.post('/attendance', {
      uid: uid
    });

    return response.data;
  } catch (error) {
    console.log('Scan API Error:', error);
    return {
      success: false,
      message: 'Something went wrong'
    };
  }
};
