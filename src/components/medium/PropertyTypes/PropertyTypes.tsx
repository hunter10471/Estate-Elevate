"use client";
import React from "react";
import { PropertyTypeQuery } from "../../../../utils/types";
import { BsHouse, BsBuildings } from "react-icons/bs";
import { MdOutlineVilla } from "react-icons/md";
import { PiBuildingApartment } from "react-icons/pi";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { PropertyType } from "@prisma/client";
import useUpdateQuery from "@/hooks/useUpdateQuery";

export const propertyTypes: PropertyTypeQuery[] = [
	{ name: "House", type: PropertyType.HOUSE, icon: BsHouse, query: "house" },
	{
		name: "Apartment",
		type: PropertyType.APARTMENT,
		icon: BsBuildings,
		query: "apartment",
	},
	{
		name: "Villa",
		type: PropertyType.VILLA,
		icon: MdOutlineVilla,
		query: "villa",
	},
	{
		name: "Guest House",
		type: PropertyType.GUEST_HOUSE,
		icon: PiBuildingApartment,
		query: "guest-house",
	},
];

const PropertyTypes = () => {
	const { getQueryParam, updateQuery } = useUpdateQuery();
	const currentQuery = getQueryParam("propertyType");

	return (
		<div className="flex flex-[2] items-center justify-center gap-5 flex-wrap lg:flex-nowrap">
			{propertyTypes.map((property) => (
				<div
					className={`flex items-center justify-center gap-2 cursor-pointer pb-1 select-none`}
					key={property.name}
					onClick={() => updateQuery("propertyType", property.query)}
				>
					{
						<property.icon
							className={` ${
								currentQuery === property.query
									? "text-primary"
									: "text-gray-400"
							}`}
							size={20}
						/>
					}{" "}
					<span
						className={`text-sm mt-1 transition-all ease-in font-semibold whitespace-nowrap ${
							currentQuery === property.query ? "text-text" : "text-gray-400"
						} `}
					>
						{property.name}
					</span>
				</div>
			))}
		</div>
	);
};

export default PropertyTypes;
