import BASE_URL from '@/src/config/api';
import axios from 'axios';

const API = `${BASE_URL}players`;

// GET ALL
export const getPlayers = async () => {
  const res = await axios.get(`${API}/`);
  return res.data;
};

// CREATE
export const createPlayer = async (data: any) => {
  const res = await axios.post(`${API}/`, data);
  return res.data;
};

// UPDATE
export const updatePlayer = async (id: number, data: any) => {
  const res = await axios.put(`${API}/${id}`, data);
  return res.data;
};

// DELETE
export const deletePlayer = async (id: number) => {
  const response = await axios.delete(`${API}/${id}`);
  return response.data;
};