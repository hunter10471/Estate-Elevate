"use client";
import Logo from "@/components/small/Logo/Logo";
import NavLinks from "@/components/small/NavLinks/NavLinks";
import { SafeUser } from "../../../../utils/types";
import { useEffect, useState } from "react";

interface NavbarProps {
	user: SafeUser | null;
}

const Navbar = ({ user }: NavbarProps) => {
	const [hasShadow, setHasShadow] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 0) {
				setHasShadow(true);
			} else {
				setHasShadow(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);
	return (
		<nav
			className={`flex justify-between transition-all items-center px-[5%] h-[90px] z-[99999] fixed left-0 right-0 top-0 bg-white ${
				hasShadow ? " shadow-xl" : ""
			}`}
		>
			<Logo />
			<NavLinks user={user} />
		</nav>
	);
};

export default Navbar;
