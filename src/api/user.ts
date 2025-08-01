// api/user.ts
import axios from '@/api/axios';

export const getNickname = async (): Promise<string> => {
  const response = await axios.get<{ nickname: string }>('/user/nickname');
  return response.data.nickname;
};
