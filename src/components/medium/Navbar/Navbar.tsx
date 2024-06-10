import Logo from "@/components/small/Logo/Logo";
import React from "react";

interface NavbarProps {}

const Navbar = ({}: NavbarProps) => {
	return (
		<nav className="flex justify-between items-center h-[120px]">
			<div>
				<Logo />
			</div>
			<div>Middle</div>
			<div>Right</div>
		</nav>
	);
};

export default Navbar;
