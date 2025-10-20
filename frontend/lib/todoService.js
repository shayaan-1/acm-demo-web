'use client';

import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export async function fetchTodos() {
  const res = await axios.get(`${API_URL}/todos`);
  return res.data;
}

export async function createTodo(title) {
  const res = await axios.post(`${API_URL}/todos`, { title });
  return res.data;
}
