"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MdOutlineNotifications } from "react-icons/md";
import { BiMessageAltDetail } from "react-icons/bi";
import { MdKeyboardArrowDown } from "react-icons/md";
import Link from "next/link";
import { NavLink, SafeUser } from "../../../../utils/types";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { UserType } from "@prisma/client";
import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import { useChat } from "@/context/ChatContext";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

interface NavUserProps {
	mobile?: boolean;
	user: SafeUser | null;
}

const links: NavLink[] = [
	{ name: "Home", path: "/" },
	{ name: "Properties", path: "/properties" },
	{ name: "Contact", path: "/contact" },
];

const NavUser = ({ mobile, user }: NavUserProps) => {
	const pathname = usePathname();
	const [open, setOpen] = useState(false);
	const [unread, setUnread] = useState(false);
	const { chats } = useChat();
	const path = usePathname();
	useEffect(() => {
		chats.forEach((chat) => {
			chat && pusherClient.subscribe(toPusherKey(`chat:${chat.id}`));
		});

		const messageHandler = () => {
			if (!path.includes("chat")) {
				setUnread(true);
			}
		};
		chats.forEach((chat) => {
			chat && pusherClient.bind(`incoming-message`, messageHandler);
		});

		return () => {
			chats.forEach((chat) => {
				if (chat) {
					pusherClient.unsubscribe(toPusherKey(`chat:${chat.id}`));
					pusherClient.unbind(`incoming-message`, messageHandler);
				}
			});
		};
	}, [chats, path]);
	return (
		<div className="flex sm:flex-row-reverse flex-col items-center gap-8">
			<div className="flex gap-4 z-[99999]">
				<div className="items-center gap-6 lg:flex hidden">
					<Link className="relative" href={"/chat"}>
						{" "}
						<BiMessageAltDetail
							onClick={() => setUnread(false)}
							className="cursor-pointer"
							size={25}
						/>{" "}
						{unread && (
							<span className="h-3 w-3 rounded-full absolute bg-green-500 -top-1 -left-1"></span>
						)}
					</Link>
					<MdOutlineNotifications className="cursor-pointer" size={25} />
				</div>
				<div
					onClick={() => setOpen((prev) => !prev)}
					className="flex items-center  gap-3 p-2 text-left relative rounded-full sm:border-2 border-transparent hover:border-gray-300 hover:shadow-md transition-all sm:cursor-pointer"
				>
					<div className="h-[42px] w-[42px] relative">
						<Image
							className="object-cover rounded-full"
							src={user?.image || "/no-avatar.jpg"}
							alt="avatar"
							fill
						/>
					</div>
					{mobile ? (
						<div className="flex flex-col ">
							<span className="font-semibold text-sm">{user?.name}</span>
							<span className="text-xs">{user?.email}</span>
						</div>
					) : (
						<div className="hidden lg:flex flex-col ">
							<span className="font-semibold text-sm">{user?.name}</span>
							<span className="text-xs text-text/80">{user?.email}</span>
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
						} select-none overflow-hidden bg-white transition-all duration-300 ease-in-out p-3 rounded-lg flex-col absolute ${
							user?.userType === UserType.ADMIN
								? "-bottom-[195px]"
								: "-bottom-[155px]"
						} right-0 left-0 mx-auto gap-2 w-[90%] border-2 border-gray-200 shadow-xl text-sm`}
					>
						<Link
							className="flex gap-2 items-center pb-1 border-b-2 border-b-gray-200 hover:font-semibold transition-all"
							href={"/properties/mine/listed"}
						>
							<FaRegUser className="text-primary" size={15} /> My Properties
						</Link>
						<Link
							className="flex gap-2 items-center pb-1 border-b-2 border-b-gray-200 hover:font-semibold transition-all"
							href={"/properties/mine/liked"}
						>
							<FaRegHeart className="text-rose-500" size={15} />
							Liked Properties
						</Link>
						{user?.userType === UserType.ADMIN && (
							<Link
								className="flex items-center gap-2 pb-1 border-b-2 border-b-gray-200 hover:font-semibold  transition-all"
								href={"/admin"}
							>
								<MdOutlineAdminPanelSettings
									className="text-orange-500"
									size={18}
								/>{" "}
								Admin
							</Link>
						)}
						<Link
							className="flex gap-2 items-center pb-1 border-b-2 border-b-gray-200 hover:font-semibold transition-all"
							href={"/profile"}
						>
							<IoSettingsOutline size={18} /> Settings
						</Link>
						<button
							className="flex gap-2 items-center text-left hover:font-semibold  transition-all"
							onClick={() => signOut({ callbackUrl: "/auth/login" })}
						>
							<MdLogout size={18} /> Logout
						</button>
					</div>
				</div>
			</div>
			<div className="flex sm:flex-row flex-col items-center gap-6">
				{links.map((link) => (
					<Link
						key={link.name}
						className={`${
							pathname === link.path ? "text-primary" : " sm:hover:text-text/80"
						} transition-all font-medium  `}
						href={link.path}
					>
						{link.name}
					</Link>
				))}
			</div>
			<Link
				className="flex items-center gap-1 sm:hidden hover:font-semibold transition-all"
				href={"/properties/mine/listed"}
			>
				<FaRegUser className="text-primary" size={15} /> My Properties
			</Link>
			<Link
				className="flex items-center gap-1 sm:hidden hover:font-semibold transition-all"
				href={"/properties/mine/liked"}
			>
				<FaRegHeart className="text-rose-500" size={15} /> Liked Properties
			</Link>
			{user?.userType === UserType.ADMIN && (
				<Link
					className="flex items-center gap-1 sm:hidden  hover:font-semibold  transition-all"
					href={"/admin"}
				>
					<MdOutlineAdminPanelSettings className="text-orange-500" size={18} />{" "}
					Admin
				</Link>
			)}
			<Link
				className="flex items-center gap-1 sm:hidden hover:font-semibold transition-all"
				href={"/profile"}
			>
				<IoSettingsOutline size={18} /> Settings
			</Link>
			<button
				className="flex items-center gap-1 sm:hidden hover:font-semibold  transition-all"
				onClick={() => signOut({ callbackUrl: "/auth/login" })}
			>
				<MdLogout size={18} /> Logout
			</button>
		</div>
	);
};

export default NavUser;
