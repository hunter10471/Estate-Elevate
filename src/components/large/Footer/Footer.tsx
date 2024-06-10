import Logo from "@/components/small/Logo/Logo";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
	return (
		<div className="flex items-center justify-center h-[250px] w-full bg-blue-950">
			<Logo dark />
		</div>
	);
};

export default Footer;
