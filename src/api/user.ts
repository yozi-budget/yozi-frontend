// api/user.ts
import axios from '@/api/axios';

export const getNickname = async (): Promise<string> => {
  const response = await axios.get<{ nickname: string }>('/users/nickname');
  return response.data.nickname;
};
