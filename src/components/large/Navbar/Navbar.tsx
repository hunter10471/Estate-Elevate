import Logo from "@/components/small/Logo/Logo";
import NavLinks from "@/components/small/NavLinks/NavLinks";

import React from "react";

interface NavbarProps {}

const Navbar = ({}: NavbarProps) => {
	return (
		<nav className="flex justify-between items-center mx-auto w-[90%] h-[120px] z-[99999] fixed left-0 right-0 top-0 bg-white">
			<Logo />
			<NavLinks />
		</nav>
	);
};

export default Navbar;
