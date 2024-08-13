import axios from 'axios';

export const httpClient = axios.create({
  // baseURL: '/api' // -> DOCKER URL 
  baseURL: 'http://localhost:8000/api'
});
  