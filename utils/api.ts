import { User } from '@common/auth-types';
import axios from 'axios';

type LoginResponse = {
  data: { user: User; token: string; isLoggedIn: boolean };
};

type LogoutResponse = {
  data: { isLoggedIn: false };
};

export function api() {
  return {
    fetch: async ({ path }: any) => axios.get(`/api${path}`),
    create: async ({ path, data }: any) => axios.post(`/api${path}`, data),
    update: async ({ path, data }: any) => axios.put(`/api${path}`, data),
    delete: async ({ path }: any) => axios.delete(`/api${path}`),
    login: async (data: {
      email: string;
      password: string;
    }): Promise<LoginResponse> => axios.post('/api/login', data),
    logout: async (): Promise<LogoutResponse> => axios.post('/api/logout'),
    verifyToken: async (data: { token: string }): Promise<LoginResponse> =>
      axios.post('/api/verify-token', data),
  };
}
