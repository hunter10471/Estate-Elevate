import Logo from "@/components/small/Logo/Logo";
import NavLinks from "@/components/small/NavLinks/NavLinks";

import React from "react";

interface NavbarProps {}

const Navbar = ({}: NavbarProps) => {
	return (
		<nav className="flex justify-between items-center h-[120px]">
			<Logo />
			<NavLinks />
		</nav>
	);
};

export default Navbar;
