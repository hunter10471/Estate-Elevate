import Link from "next/link";
import React from "react";
import { RiBuilding2Line } from "react-icons/ri";

interface LogoProps {
	dark?: boolean;
	small?: boolean;
}

const Logo = ({ dark, small }: LogoProps) => {
	return (
		<Link
			href={"/"}
			className="flex flex-col items-center font-heading uppercase cursor-pointer"
		>
			<span className="-m-1">
				<RiBuilding2Line
					className={`${dark ? "text-white" : "text-primary"} `}
					size={small ? 25 : 40}
				/>
			</span>
			<div
				className={`flex flex-col items-center ${small ? "text-xs mt-1" : ""}`}
			>
				<span
					className={`${
						dark ? "text-white font-medium" : "font-bold"
					}  leading-none`}
				>
					Estate
				</span>
				<span
					className={`${
						dark ? "font-bold bg-white" : "text-white font-medium bg-primary"
					}  w-fit px-1 text-center`}
				>
					Elevate
				</span>
			</div>
		</Link>
	);
};

export default Logo;
