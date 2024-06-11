import Image from "next/image";
import React from "react";
import { MdOutlineNotifications } from "react-icons/md";
import { BiMessageAltDetail } from "react-icons/bi";
import { MdKeyboardArrowDown } from "react-icons/md";

interface NavUserProps {
	mobile?: boolean;
}

const NavUser = ({ mobile }: NavUserProps) => {
	return (
		<div className="flex items-center gap-6">
			<div className="items-center gap-6 lg:flex hidden">
				<BiMessageAltDetail className="cursor-pointer" size={25} />
				<MdOutlineNotifications className="cursor-pointer" size={25} />
			</div>
			<div className="flex items-center gap-3 p-2 rounded-full border-2 border-transparent hover:border-gray-300 hover:shadow-md transition-all cursor-pointer">
				<Image
					className="object-cover rounded-full"
					src={"/no-avatar.jpg"}
					alt="no-avatar"
					width={40}
					height={40}
				/>
				{mobile ? (
					<div className="flex flex-col ">
						<span className="font-bold text-sm">John Doe</span>
						<span className="text-xs">johndoe@gmail.com</span>
					</div>
				) : (
					<div className="hidden lg:flex flex-col ">
						<span className="font-bold text-sm">John Doe</span>
						<span className="text-xs text-text/80">johndoe@gmail.com</span>
					</div>
				)}
				{!mobile && <MdKeyboardArrowDown size={25} />}
			</div>
		</div>
	);
};

export default NavUser;
