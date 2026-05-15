import BASE_URL from '@/src/config/api';
import axios from 'axios';

const API = `${BASE_URL}matches`;

export const getMatches = async () => {
  const res = await axios.get(`${API}/`);
  return res.data;
};

export const createMatch = async (data: any) => {
  const res = await axios.post(`${API}/`, data);
  return res.data;
};

export const updateMatch = async (id: number, data: any) => {
  const res = await axios.put(`${API}/${id}`, data);
  return res.data;
};

export const deleteMatch = async (id: number) => {
  const res = await axios.delete(`${API}/${id}`);
  return res.data;
};