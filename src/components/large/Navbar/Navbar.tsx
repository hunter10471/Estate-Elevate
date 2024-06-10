import PropertyTypes from "@/components/medium/PropertyTypes/PropertyTypes";
import Logo from "@/components/small/Logo/Logo";

import React from "react";

interface NavbarProps {}

const Navbar = ({}: NavbarProps) => {
	return (
		<nav className="flex justify-between items-center h-[120px]">
			<Logo />
			<PropertyTypes />
			<div className="">Right</div>
		</nav>
	);
};

export default Navbar;
