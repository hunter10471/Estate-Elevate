"use client";
import Image from "next/image";
import React, { useState } from "react";
import { MdOutlineNotifications } from "react-icons/md";
import { BiMessageAltDetail } from "react-icons/bi";
import { MdKeyboardArrowDown } from "react-icons/md";
import Link from "next/link";
import { NavLink } from "../../../../utils/types";
import { usePathname } from "next/navigation";

interface NavUserProps {
	mobile?: boolean;
}

const links: NavLink[] = [
	{ name: "Home", path: "/" },
	{ name: "Properties", path: "/properties" },
	{ name: "Contact", path: "/contact" },
];

const NavUser = ({ mobile }: NavUserProps) => {
	const pathname = usePathname();
	const [open, setOpen] = useState(false);
	return (
		<div className="flex sm:flex-row-reverse flex-col items-center gap-8">
			<div className="flex gap-4 z-[99999]">
				<div className="items-center gap-6 lg:flex hidden">
					<BiMessageAltDetail className="cursor-pointer" size={25} />
					<MdOutlineNotifications className="cursor-pointer" size={25} />
				</div>
				<div
					onClick={() => setOpen((prev) => !prev)}
					className="flex items-center gap-3 p-2 text-left relative rounded-full sm:border-2 border-transparent hover:border-gray-300 hover:shadow-md transition-all sm:cursor-pointer"
				>
					<Image
						className="object-cover rounded-full"
						src={"/no-avatar.jpg"}
						alt="no-avatar"
						width={40}
						height={40}
					/>
					{mobile ? (
						<div className="flex flex-col ">
							<span className="font-semibold text-sm">John Doe</span>
							<span className="text-xs">johndoe@gmail.com</span>
						</div>
					) : (
						<div className="hidden lg:flex flex-col ">
							<span className="font-semibold text-sm">John Doe</span>
							<span className="text-xs text-text/80">johndoe@gmail.com</span>
						</div>
					)}
					{!mobile && (
						<MdKeyboardArrowDown
							className={`${open ? "rotate-180" : "rotate-0"} transition-all`}
							size={25}
						/>
					)}
					<div
						className={`${
							open ? "hidden sm:flex" : "hidden"
						} select-none overflow-hidden bg-white transition-all duration-300 ease-in-out p-3 rounded-lg flex-col absolute -bottom-[120px] right-0 left-0 mx-auto gap-2 w-[90%] border-2 border-gray-200 shadow-xl text-sm`}
					>
						<Link
							className="pb-1 border-b-2 border-b-gray-200 hover:font-semibold transition-all"
							href={"/profile"}
						>
							Settings
						</Link>
						<Link
							className="pb-1 border-b-2 border-b-gray-200 hover:font-semibold  transition-all"
							href={"/admin"}
						>
							Admin
						</Link>
						<Link
							className="hover:font-semibold  transition-all"
							href={"/logout"}
						>
							Logout
						</Link>
					</div>
				</div>
			</div>
			<div className="flex sm:flex-row flex-col items-center gap-6">
				{links.map((link) => (
					<Link
						key={link.name}
						className={`${
							pathname === link.path
								? "text-primary font-semibold transition-all"
								: "hover:font-semibold sm:hover:text-text/80"
						} transition-all `}
						href={link.path}
					>
						{link.name}
					</Link>
				))}
			</div>
			<Link
				className="sm:hidden hover:font-semibold transition-all"
				href={"/profile"}
			>
				Settings
			</Link>
			<Link
				className="sm:hidden  hover:font-semibold  transition-all"
				href={"/admin"}
			>
				Admin
			</Link>
			<Link
				className="sm:hidden hover:font-semibold  transition-all"
				href={"/logout"}
			>
				Logout
			</Link>
		</div>
	);
};

export default NavUser;
