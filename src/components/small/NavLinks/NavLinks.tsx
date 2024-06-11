"use client";
import NavUser from "@/components/medium/NavUser/NavUser";
import { NavLink } from "@/lib/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { useEffect, useRef, useState } from "react";

interface NavLinksProps {
	mobile?: boolean;
}

const links: NavLink[] = [
	{ name: "Home", path: "/" },
	{ name: "Properties", path: "/properties" },
];

const NavLinks = ({ mobile }: NavLinksProps) => {
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);
	const navContainer = useRef<HTMLDivElement>(null);
	const user = false;
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
	return (
		<div>
			<div
				className={`hidden sm:flex items-center gap-6 lg:gap-12 font-medium font-heading select-none`}
			>
				{links.map((link) => (
					<Link
						key={link.name}
						className={`${pathname === link.path ? "text-primary" : ""}`}
						href={link.path}
					>
						{link.name}
					</Link>
				))}
				{user ? (
					<NavUser />
				) : (
					<>
						<Link
							className={`${pathname === "/login" ? "text-primary" : ""}`}
							href={"/login"}
						>
							Login
						</Link>
						<Link
							className="px-6 py-2 rounded-md text-white bg-primary hover:bg-primaryDark transition-all font-normal"
							href={"/signup"}
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
				}  items-center  pt-[10%] gap-5 absolute h-[calc(100vh-120px)] w-[50%] top-0 right-0 bg-slate-900 text-white transition-all ease-in-out duration-500  ${
					isOpen
						? "translate-x-[0%] opacity-100"
						: "translate-x-[100%] opacity-0"
				} `}
			>
				<IoMdClose
					onClick={() => setIsOpen((prev) => !prev)}
					className="cursor-pointer text-white absolute top-5 right-5"
					size={25}
				/>
				{links.map((link) => (
					<Link
						key={link.name}
						className={`${pathname === link.path ? "text-primary" : ""}`}
						href={link.path}
					>
						{link.name}
					</Link>
				))}
				{user ? (
					<NavUser mobile />
				) : (
					<>
						<Link
							className={`${pathname === "/login" ? "text-primary" : ""}`}
							href={"/login"}
						>
							Login
						</Link>
						<Link
							className="px-6 py-2 rounded-md text-white bg-primary hover:bg-primaryDark transition-all font-normal"
							href={"/signup"}
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
