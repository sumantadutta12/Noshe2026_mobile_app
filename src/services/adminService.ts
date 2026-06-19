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

export const getWaitingList = async (
  token: string
) => {

  const response = await api.get(
    '/admin/waitingMembers',
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

export const updateDelegateStatus = async (
  register_id: number,
  register_status: number,
  name:string,
  email:string,
  token:string
) => {
  const response = await api.post(
    '/admin/manageMember',
    {
      register_id,
      register_status,
      name,
      email
    },{
     headers: {
      authorization: token,
    }},
  );
  return response.data;
}

  export const sendEmail = async (
  register_id: number,
  register_status: number,
  name:string,
  email:string,
  token:string
) => {
   await api.post(
    '/admin/sendMail',
    {
      register_id,
      register_status,
      name,
      email
    },{
     headers: {
      authorization: token,
    }},
  );
};