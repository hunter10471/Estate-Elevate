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
import { FormikProps } from "formik";
import { ListPropertyFormSchemaInputs } from "../../../../utils/validation/ListPropertyForm.schema";
import Facility from "./Facility";

const facilities: any = {
	gym: {
		title: "Gym",
		icon: <PiBarbell size={25} />,
	},
	pool: {
		title: "Pool",
		icon: <MdOutlinePool size={25} />,
	},
	garden: {
		title: "Garden",
		icon: <LuTrees size={25} />,
	},
	park: {
		title: "Park",
		icon: <PiPark size={25} />,
	},
	garage: {
		title: "Parking",
		icon: <GiHomeGarage size={25} />,
	},
	community: {
		title: "Club",
		icon: <RiCommunityLine size={25} />,
	},
	surveillance: {
		title: "Security",
		icon: <PiSecurityCamera size={25} />,
	},
	transport: {
		title: "Transport",
		icon: <IoBusOutline size={25} />,
	},
	area: {
		title: "sqft",
		icon: <LiaVectorSquareSolid size={23} />,
	},
	bedroom: {
		title: "Bedrooms",
		icon: <MdOutlineBed size={23} />,
	},
	bathroom: {
		title: "Bathrooms",
		icon: <PiBathtub size={23} />,
	},
	school: {
		title: "School",
		icon: <LuSchool size={25} />,
	},
};

interface FacilitiesProps {
	listing?: boolean;
	formik?: FormikProps<ListPropertyFormSchemaInputs>;
	bathrooms?: number;
	bedrooms?: number;
	area?: number;
	data?: string[];
}

const Facilities = ({
	listing,
	formik,
	bathrooms,
	bedrooms,
	area,
	data,
}: FacilitiesProps) => {
	const facilityKeys = [
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
	let keyArr = data ? data : facilityKeys;
	return (
		<div className="my-8">
			{!listing && <Heading mediumSize text="Facilities" weight="medium" />}
			<div
				className={`mt-5 flex ${
					listing ? "gap-8 justify-between" : "gap-4"
				} flex-wrap items-center font-medium`}
			>
				{!listing && (
					<>
						<span className="text-xs md:text-sm flex items-center  gap-2 w-[45%] sm:w-[30%] md:w-1/4 lg:w-1/5 p-2">
							{facilities.bedroom.icon} {bedrooms} {facilities.bedroom.title}
						</span>
						<span className="text-xs md:text-sm flex items-centerjustify-center gap-2 w-[45%] sm:w-[30%] md:w-1/4 lg:w-1/5 p-2">
							{facilities.bathroom.icon} {bathrooms} {facilities.bathroom.title}
						</span>
						<span className="text-xs md:text-sm flex items-center  gap-2 w-[45%] sm:w-[30%] md:w-1/4 lg:w-1/5 p-2">
							{facilities.area.icon} {area} {facilities.area.title}
						</span>
					</>
				)}
				{keyArr.map((facilityKey) => {
					const facility: { title: string; icon: React.ReactNode } =
						facilities[facilityKey];
					let selected = false;
					if (formik) {
						selected = formik.values.facilities.includes(facilityKey);
					}
					return (
						<Facility
							facility={facility}
							facilityKey={facilityKey}
							key={facility.title}
							listing={listing}
							selected={selected}
							formik={formik}
						/>
					);
				})}
				{formik?.errors.facilities && (
					<span className="text-xs text-rose-500 w-[95%] text-justify">
						{String(formik.errors.facilities)}
					</span>
				)}
			</div>
		</div>
	);
};

export default Facilities;
