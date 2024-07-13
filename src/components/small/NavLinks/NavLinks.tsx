"use client";
import NavUser from "@/components/medium/NavUser/NavUser";
import { NavLink, Notification, SafeUser } from "../../../../utils/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { useChat } from "@/context/ChatContext";
import { useNotification } from "@/context/NotificationContext";
import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";

interface NavLinksProps {
	user: SafeUser | null;
}

const links: NavLink[] = [
	{ name: "Home", path: "/" },
	{ name: "Properties", path: "/properties" },
	{ name: "Contact", path: "/contact" },
];

const NavLinks = ({ user }: NavLinksProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const navContainer = useRef<HTMLDivElement>(null);
	const pathname = usePathname();
	const [notificationUnread, setNotificationUnread] = useState(false);
	const [unread, setUnread] = useState(false);
	const { chats } = useChat();
	const { addNotification } = useNotification();
	const path = usePathname();
	const handleClickOutside = (e: React.MouseEvent<Document>) => {
		if (
			navContainer.current &&
			!navContainer.current.contains(e.target as Node)
		) {
			setIsOpen(false);
		}
	};
	useEffect(() => {
		if (isOpen) {
			document.addEventListener(
				"mousedown",
				handleClickOutside as unknown as EventListener
			);
		} else {
			document.removeEventListener(
				"mousedown",
				handleClickOutside as unknown as EventListener
			);
		}
		return () => {
			document.removeEventListener(
				"mousedown",
				handleClickOutside as unknown as EventListener
			);
		};
	}, [isOpen]);
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
		const notificationHandler = ({
			notification,
		}: {
			notification: Notification;
		}) => {
			addNotification(notification);
			setNotificationUnread(true);
		};
		if (user) pusherClient.subscribe(toPusherKey(`notification:${user.id}`));
		pusherClient.bind(`incoming-notification`, notificationHandler);
		return () => {
			chats.forEach((chat) => {
				if (chat) {
					pusherClient.unsubscribe(toPusherKey(`chat:${chat.id}`));
					pusherClient.unbind(`incoming-message`, messageHandler);
					if (user)
						pusherClient.unsubscribe(toPusherKey(`notification:${user.id}`));
					pusherClient.unbind(`incoming-notification`, notificationHandler);
				}
			});
		};
	}, [chats, path]);
	return (
		<div>
			<div
				className={`hidden sm:flex items-center gap-6 lg:gap-12 font-medium font-heading select-none text-sm lg:text-base`}
			>
				{user ? (
					<NavUser
						unread={unread}
						setUnread={setUnread}
						notificationUnread={notificationUnread}
						setNotificationUnread={setNotificationUnread}
						user={user}
					/>
				) : (
					<>
						<div className="flex sm:flex-row flex-col items-center gap-6 lg:gap-12 ">
							{links.map((link) => (
								<Link
									key={link.name}
									className={`${
										pathname === link.path
											? "text-primary  "
											: "sm:hover:text-text/80"
									} transition-all font-medium`}
									href={link.path}
								>
									{link.name}
								</Link>
							))}
						</div>
						<Link
							className={`${
								pathname === "/login" ? "text-primary" : "hover:text-text/80"
							}`}
							href={"/auth/login"}
						>
							Login
						</Link>
						<Link
							className="px-6 py-2 rounded-md text-white bg-primary hover:bg-primaryDark transition-all font-normal"
							href={"/auth/signup"}
						>
							Signup
						</Link>
					</>
				)}
			</div>

			<IoMenu
				onClick={() => setIsOpen((prev) => !prev)}
				className="cursor-pointer sm:hidden"
				size={25}
			/>
			<div
				ref={navContainer}
				className={`flex sm:hidden ${
					user ? "flex-col-reverse justify-end" : "flex-col justify-center"
				}  items-center pt-[10%] gap-5 absolute h-screen min-w-[220px] w-[50%] top-0 right-0 bg-slate-900 text-white transition-all ease-in-out duration-500  ${
					isOpen
						? "translate-x-[15%] opacity-100"
						: "translate-x-[100%] opacity-0"
				} `}
			>
				<IoMdClose
					onClick={() => setIsOpen((prev) => !prev)}
					className="cursor-pointer text-white absolute top-5 right-5"
					size={25}
				/>
				{user ? (
					<NavUser
						unread={unread}
						setUnread={setUnread}
						notificationUnread={notificationUnread}
						setNotificationUnread={setNotificationUnread}
						user={user}
						mobile
					/>
				) : (
					<>
						<div className="flex sm:flex-row flex-col items-center gap-6 lg:gap-12">
							{links.map((link) => (
								<Link
									key={link.name}
									className={`${
										pathname === link.path
											? "text-primary  transition-all"
											: "sm:hover:text-text/80"
									} transition-all font-medium`}
									href={link.path}
								>
									{link.name}
								</Link>
							))}
						</div>
						<Link
							className={`${pathname === "/login" ? "text-primary" : ""}`}
							href={"/auth/login"}
						>
							Login
						</Link>
						<Link
							className="px-6 py-2 rounded-md text-white bg-primary hover:bg-primaryDark transition-all font-normal"
							href={"/auth/signup"}
						>
							Signup
						</Link>
					</>
				)}
			</div>
		</div>
	);
};

export default NavLinks;
