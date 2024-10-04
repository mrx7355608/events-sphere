import { create } from "zustand";

const useUserStore = create((set) => ({
    user: null,
    loginUser: (user) => set(() => ({ user })),
    logoutUser: () => set(() => ({ user: null })),
}));

export default useUserStore;
