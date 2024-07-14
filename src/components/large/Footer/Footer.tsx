import Logo from "@/components/small/Logo/Logo";
import SocialRow from "@/components/small/SocialRow/SocialRow";
import Link from "next/link";
import React from "react";
import { FaPhone, FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Footer = () => {
	return (
		<div className="flex items-center justify-between flex-wrap gap-6 md:pt-14 md:px-16 px-8 pt-6 w-full bg-blue-950">
			<div className="flex flex-col gap-5 flex-[2]">
				<Logo small dark />
				<p className="text-xs text-white/80 text-pretty w-full max-w-[350px] min-w-[300px]">
					{" "}
					Your Partner in Premier Real Estate Solutions, Elevating Dreams into
					Reality with Exceptional Service and Unparalleled Expertise
				</p>
				<SocialRow />
			</div>
			<div className="flex flex-1 gap-[72px] ">
				<div className="flex flex-col gap-4">
					<h1 className="text-white text-xl font-medium mb-1">Pages</h1>
					<Link
						className="text-white/70 hover:text-white hover:underline text-sm"
						href={"/Home"}
					>
						Home
					</Link>
					<Link
						className="text-white/70 hover:text-white hover:underline text-sm"
						href={"/properties"}
					>
						Properties
					</Link>
					<Link
						className="text-white/70 hover:text-white hover:underline text-sm"
						href={"/contact"}
					>
						Contact
					</Link>
					<Link
						className="text-white/70 hover:text-white hover:underline text-sm"
						href={"/auth/signup"}
					>
						Register
					</Link>
				</div>
				<div className="flex flex-col gap-4 max-w-[200px]">
					<h1 className="text-white text-xl font-medium mb-1">Contact</h1>
					<span className="text-white text-sm flex gap-2 items-center">
						<FaPhone /> (404) 555-1902
					</span>
					<span className="text-white text-sm flex gap-2 items-center">
						<MdEmail /> info@estate_elevate.com
					</span>
					<span className="text-white  text-sm flex gap-2">
						<FaLocationDot /> 2928 23rd Street, Floral Avenue, Santa Fe
					</span>
				</div>
			</div>
			<p className="w-full text-white/80 text-[10px] text-center mt-5 mb-1">
				ALL RIGHTS © RESERVED ESTATE ELEVATE LTD. 2001-2024
			</p>
		</div>
	);
};

export default Footer;
