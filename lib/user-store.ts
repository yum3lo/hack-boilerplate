import { create } from "zustand";
import { persist } from "zustand/middleware";

import { BaseUser, User } from "@/types/user";

interface UserStore {
  user: User | BaseUser | null;
  isLoggedIn: boolean;
  setUser: (userData: User | BaseUser) => void;
  clearUser: () => void;
}

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      setUser: (userData) => set({ user: userData, isLoggedIn: true }),
      clearUser: () => set({ user: null, isLoggedIn: false })
    }),
    {
      name: "user-storage",
      partialize: (state) => ({ user: state.user, isLoggedIn: state.isLoggedIn })
    }
  )
);

export default useUserStore;