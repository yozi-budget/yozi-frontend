// store/userStore.ts

import { create } from 'zustand';
import { getNickname } from '@/api/user';

interface UserStore {
  nickname: string;
  fetchNickname: () => Promise<void>;
  setNickname: (nickname: string) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  nickname: '',
  fetchNickname: async () => {
    try {
      console.log('fetchNickname 호출됨');
      const nickname = await getNickname();
      console.log('API에서 받은 닉네임:', nickname);
      set({ nickname });
    } catch (error) {
      console.error('닉네임 불러오기 실패:', error);
    }
  },
  setNickname: (nickname: string) => set({ nickname }),
}));


