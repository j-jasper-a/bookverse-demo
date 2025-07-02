import { create } from "zustand";

type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
};

type UserState = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserState>((set) => {
  const mockUser: User = {
    id: "1",
    name: "John Doe",
    email: "",
    avatarUrl: "/assets/demo/user-avatar.webp",
  };

  return {
    user: mockUser,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
  };
});
