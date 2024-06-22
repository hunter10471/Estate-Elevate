import { create } from "zustand";

type StateType = {
	isMap: boolean;
	sidebarTab: "editProfile" | "editPassword";
	toggleMap: () => void;
	toggleGrid: () => void;
	toggleEditProfile: () => void;
	toggleEditPassword: () => void;
};

const useStore = create<StateType>((set) => ({
	isMap: true,
	sidebarTab: "editProfile",
	toggleEditProfile: () =>
		set((state: StateType) => ({ sidebarTab: "editProfile" })),
	toggleEditPassword: () =>
		set((state: StateType) => ({ sidebarTab: "editPassword" })),
	toggleGrid: () => set((state: StateType) => ({ isMap: false })),
	toggleMap: () => set((state: StateType) => ({ isMap: true })),
}));

export default useStore;
