import { useUserStore } from "@/stores/useUserStore";

export function useUser() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);

  return {
    user,
    setUser,
    clearUser,
  };
}
