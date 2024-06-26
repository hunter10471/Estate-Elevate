import React from "react";
import { PiBarbell } from "react-icons/pi";
import { MdOutlinePool } from "react-icons/md";
import { LuTrees } from "react-icons/lu";
import { PiPark } from "react-icons/pi";
import { GiHomeGarage } from "react-icons/gi";
import { RiCommunityLine } from "react-icons/ri";
import { PiSecurityCamera } from "react-icons/pi";
import { IoBusOutline } from "react-icons/io5";
import { LiaVectorSquareSolid } from "react-icons/lia";
import { MdOutlineBed } from "react-icons/md";
import { PiBathtub } from "react-icons/pi";
import { LuSchool } from "react-icons/lu";
import Heading from "../Heading/Heading";
import { FacilityKey } from "../../../../utils/types";
import { IconType } from "react-icons";

const facilities: Record<FacilityKey, { title: string; icon: IconType }> = {
	gym: {
		title: "Gym",
		icon: PiBarbell,
	},
	pool: {
		title: "Pool",
		icon: MdOutlinePool,
	},
	garden: {
		title: "Garden",
		icon: LuTrees,
	},
	park: {
		title: "Playground",
		icon: PiPark,
	},
	garage: {
		title: "Parking",
		icon: GiHomeGarage,
	},
	community: {
		title: "Club",
		icon: RiCommunityLine,
	},
	surveillance: {
		title: "Security",
		icon: PiSecurityCamera,
	},
	transport: {
		title: "Transport",
		icon: IoBusOutline,
	},
	area: {
		title: "sqft",
		icon: LiaVectorSquareSolid,
	},
	bedroom: {
		title: "Bedrooms",
		icon: MdOutlineBed,
	},
	bathroom: {
		title: "Bathrooms",
		icon: PiBathtub,
	},
	school: {
		title: "School",
		icon: LuSchool,
	},
};

const Facilities = () => {
	const data: FacilityKey[] = [
		"gym",
		"school",
		"transport",
		"surveillance",
		"community",
		"garage",
		"park",
		"garden",
		"pool",
	];
	return (
		<div className="my-8">
			<Heading mediumSize text="Facilities" weight="medium" />
			<div className="mt-5 flex gap-4 flex-wrap justify-between items-center font-medium">
				<span className="text-xs md:text-sm flex items-center gap-1 w-[45%] sm:w-[30%] md:w-1/4 lg:w-1/5 ">
					<facilities.bedroom.icon size={23} /> 4 {facilities.bedroom.title}
				</span>
				<span className="text-xs md:text-sm flex items-center gap-1 w-[45%] sm:w-[30%] md:w-1/4 lg:w-1/5">
					<facilities.bathroom.icon size={23} /> 2 {facilities.bathroom.title}
				</span>
				<span className="text-xs md:text-sm flex items-center gap-1 w-[45%] sm:w-[30%] md:w-1/4 lg:w-1/5">
					<facilities.area.icon size={23} /> 1500 {facilities.area.title}
				</span>
				{data.map((facilityKey) => {
					const facility = facilities[facilityKey];
					return (
						<span className="text-xs md:text-sm flex items-center gap-1  w-[45%] sm:w-[30%] md:w-1/4 lg:w-1/5">
							<facility.icon size={23} /> {facility.title}
						</span>
					);
				})}
			</div>
		</div>
	);
};

export default Facilities;
