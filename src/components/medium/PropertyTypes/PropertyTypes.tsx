"use client";
import React from "react";
import { PropertyTypeQuery } from "../../../../utils/types";
import { BsHouse, BsBuildings } from "react-icons/bs";
import { MdOutlineVilla } from "react-icons/md";
import { PiBuildingApartment } from "react-icons/pi";
import { PropertyType } from "@prisma/client";
import useUpdateQuery from "@/hooks/useUpdateQuery";
import useStore from "@/store/store";

export const propertyTypes: PropertyTypeQuery[] = [
	{ name: "House", type: PropertyType.HOUSE, icon: BsHouse },
	{
		name: "Apartment",
		type: PropertyType.APARTMENT,
		icon: BsBuildings,
	},
	{
		name: "Villa",
		type: PropertyType.VILLA,
		icon: MdOutlineVilla,
	},
	{
		name: "Guest House",
		type: PropertyType.GUEST_HOUSE,
		icon: PiBuildingApartment,
	},
];

const PropertyTypes = () => {
	const { getQueryParam, updateQuery } = useUpdateQuery();
	const currentQuery = getQueryParam("propertyType");
	const toggleLoading = useStore((state) => state.toggleLoadingTrue);
	const onUpdateQuery = (key: string, value: string) => {
		toggleLoading();
		updateQuery(key, value);
	};
	return (
		<div className="flex flex-[2] items-center justify-center gap-5 flex-wrap lg:flex-nowrap">
			{propertyTypes.map((property) => (
				<div
					className={`flex items-center justify-center gap-2 cursor-pointer pb-1 select-none`}
					key={property.name}
					onClick={() => onUpdateQuery("propertyType", property.type)}
				>
					{
						<property.icon
							className={` ${
								currentQuery === property.type
									? "text-primary"
									: "text-gray-400"
							}`}
							size={20}
						/>
					}{" "}
					<span
						className={`text-sm mt-1 transition-all ease-in font-semibold whitespace-nowrap ${
							currentQuery === property.type ? "text-text" : "text-gray-400"
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
