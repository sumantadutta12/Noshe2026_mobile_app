import api from '../api/axiosInstance';

export const getAgendaData = async (
  filters: any
) => {
  const response = await api.post(
    '/agenda',
    filters,
    
  );

  return response.data;
};

export const getFilterData = async (
  search: string
) => {
  const response = await api.get(
    `/agendaFilters?search=${encodeURIComponent(search)}`
  );

  return response.data;
};

export const toggleFavorite = async (
  session_id: number,
  favorite: number
) => {
  const response = await api.post(
    '/favorite',
    {
      session_id,
      favorite
    }
  );

  return response.data;
};


export const getFavoriteData = async (
) => {
  const response = await api.get(
    `/favoriteDetail`
  );

  return response.data;
};