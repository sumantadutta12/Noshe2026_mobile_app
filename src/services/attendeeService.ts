import api from '../api/axiosInstance';

export const getAttendeeDashboard = async (uid:string,
  token:string
) => {
  const response = await api.post('/showQr',{
      uid,
    },{
    headers: {
      authorization: token,
    },
  });

  return response.data;
};