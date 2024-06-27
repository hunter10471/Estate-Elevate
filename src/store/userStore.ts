import { User } from "@prisma/client";
import { create } from "zustand";

type StateType = {
	user: User | null;
	setUser: (userData: User) => void;
	clearUser: () => void;
};

const useUserStore = create<StateType>((set) => ({
	user: null,
	setUser: (userData) => set((state: StateType) => ({ user: userData })),
	clearUser: () => set((state: StateType) => ({ user: null })),
}));

export default useUserStore;
