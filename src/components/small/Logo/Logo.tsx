import React from "react";
import { RiBuilding2Line } from "react-icons/ri";

interface LogoProps {
	dark?: boolean;
}

const Logo = ({ dark }: LogoProps) => {
	return (
		<div className="flex flex-col items-center font-heading uppercase">
			<span className="-m-1">
				<RiBuilding2Line
					className={`${dark ? "text-white" : "text-primary"} `}
					size={40}
				/>
			</span>
			<div className="flex flex-col items-center">
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
		</div>
	);
};

export default Logo;
