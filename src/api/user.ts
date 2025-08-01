// api/user.ts
import axios from '@/api/axios';

export const getNickname = async (): Promise<string> => {
  const response = await axios.get<string>('api/user/nickname');
  return response.data;  // 바로 문자열 반환
};
