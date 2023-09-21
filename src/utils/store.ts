import { User } from "@/types/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Store = {
  user: User | null;
  token: string | null;

  setUser: (user: User | null | undefined) => void;
  setToken: (token: string | null | undefined) => void;
};

const useStore = create<Store>()(
  persist(
    (set) => ({
      user: null,
      token: null,

      setUser: (user) => set((state) => ({ ...state, user })),
      setToken: (token) => set((state) => ({ ...state, token })),
    }),
    { name: "imdb-sample-storage" }
  )
);

export default useStore;
