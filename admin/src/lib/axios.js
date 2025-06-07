// src/lib/axios.js
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:5000/api/admin',
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken')
  // console.log('token', token)
  // If token exists, set it in the Authorization header
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
