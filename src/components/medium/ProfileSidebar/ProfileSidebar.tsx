"use client";
import useStore from "@/store/store";
import { FaUserCircle } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

const ProfileSidebar = () => {
	const sidebarState = useStore((state) => state);
	return (
		<div className="w-[50px] lg:w-[220px] flex flex-col gap-2">
			<span className="text-gray-500 text-sm">Profile</span>
			<button
				className={`flex text-sm items-center gap-2 font-medium py-2 px-4 border-2 ${
					sidebarState.sidebarTab === "editProfile"
						? "border-primary"
						: "border-transparent"
				} rounded-lg transition-all hover:border-primary`}
				onClick={sidebarState.toggleEditProfile}
			>
				<FaUserCircle size={20} />{" "}
				<span className="lg:block hidden"> Edit Profile </span>
			</button>
			<span className="text-gray-500 text-sm">Secure</span>
			<button
				className={`flex text-sm items-center gap-2 font-medium py-2 px-4 border-2 ${
					sidebarState.sidebarTab === "editPassword"
						? "border-primary"
						: "border-transparent"
				} rounded-lg transition-all hover:border-primary`}
				onClick={sidebarState.toggleEditPassword}
			>
				<MdLockOutline size={20} />{" "}
				<span className="lg:block hidden"> Password </span>
			</button>
			<button
				className={`flex text-sm items-center gap-2 font-medium py-2 px-4 border-2 mt-5 border-transparent text-rose-500 hover:font-semibold rounded-lg transition-all `}
				onClick={sidebarState.toggleEditPassword}
			>
				<RiDeleteBin6Line size={20} />{" "}
				<span className="lg:block hidden"> Delete account </span>
			</button>
		</div>
	);
};

export default ProfileSidebar;
