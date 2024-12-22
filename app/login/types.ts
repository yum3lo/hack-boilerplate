import type { User } from '@/types/user';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  error: number;
  erorrMessage: string;
  data: User;
}