import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { User } from "../types/user.types";

interface AuthState {
  user: User | null;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,

      setUser: (user) => {
        console.log("setUser called with:", user);
        set({ user });
      },

      setToken: (token) => {
        console.log("setToken called with:", token);
        set({ token });
      },

      logout: () =>
        set({
          user: null,
          token: null,
        }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
