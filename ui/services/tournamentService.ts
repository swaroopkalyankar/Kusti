import BASE_URL from '@/src/config/api';
import axios from 'axios';

const API = `${BASE_URL}tournaments`;

export const getTournaments = async () => {
  const res = await axios.get(`${API}/`);
  return res.data;
};

export const createTournament = async (data: any) => {
  const res = await axios.post(`${API}/`, data);
  return res.data;
};

export const updateTournament = async (id: number, data: any) => {
  const res = await axios.put(`${API}/${id}`, data);
  return res.data;
};

export const deleteTournament = async (id: number) => {
  const res = await axios.delete(`${API}/${id}`);
  return res.data;
};

console.log("TOURNAMENT API:", API);