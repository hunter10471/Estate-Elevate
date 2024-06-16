import { create } from "zustand";

type StateType = {
	isMap: boolean;
	toggleMap: () => void;
	toggleGrid: () => void;
};

const useStore = create<StateType>((set) => ({
	isMap: true,
	toggleGrid: () => set((state: StateType) => ({ isMap: false })),
	toggleMap: () => set((state: StateType) => ({ isMap: true })),
}));

export default useStore;
