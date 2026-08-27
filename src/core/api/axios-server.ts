import axios from 'axios';
import { CONFIG } from '@/core/config/constants';

export const serverApi = axios.create({
  baseURL: CONFIG.API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});