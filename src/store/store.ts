import { create } from "zustand";

type StateType = {
	isMap: boolean;
	loading: boolean;
	sidebarTab: "editProfile" | "editPassword";
	numberOfResults: number;
	toggleMap: () => void;
	toggleGrid: () => void;
	toggleEditProfile: () => void;
	toggleEditPassword: () => void;
	toggleLoadingTrue: () => void;
	toggleLoadingFalse: () => void;
	setNumberOfResults: (results: number) => void;
};

const useStore = create<StateType>((set) => ({
	isMap: true,
	sidebarTab: "editProfile",
	loading: false,
	numberOfResults: 0,
	toggleEditProfile: () =>
		set((state: StateType) => ({ sidebarTab: "editProfile" })),
	toggleEditPassword: () =>
		set((state: StateType) => ({ sidebarTab: "editPassword" })),
	toggleGrid: () => set((state: StateType) => ({ isMap: false })),
	toggleMap: () => set((state: StateType) => ({ isMap: true })),
	toggleLoadingTrue: () => set((state: StateType) => ({ loading: true })),
	toggleLoadingFalse: () => set((state: StateType) => ({ loading: false })),
	setNumberOfResults: (results: number) =>
		set((state: StateType) => ({ numberOfResults: results })),
}));

export default useStore;
