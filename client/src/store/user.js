import { create } from "zustand";

const useUserStore = create((set) => ({
    user: null,
    loginUser: (user) => set(() => ({ user })),
}));

export default useUserStore;
