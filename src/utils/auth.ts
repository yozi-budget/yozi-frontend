// utils/auth.ts

import { jwtDecode } from 'jwt-decode';

export const decodeToken = (token: string) => {
  try {
    return jwtDecode<{ userId: number }>(token);
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};

