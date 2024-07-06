"use client";
import React from "react";
import { PropertyTypeQuery } from "../../../../utils/types";
import { BsHouse, BsBuildings } from "react-icons/bs";
import { MdOutlineVilla } from "react-icons/md";
import { PiBuildingApartment } from "react-icons/pi";
import { PropertyType } from "@prisma/client";
import useStore from "@/store/store";
import { useQueryState } from "nuqs";

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
	const [propertyType, setPropertyType] = useQueryState("propertyType");
	const toggleLoading = useStore((state) => state.toggleLoadingTrue);
	const onUpdateQuery = (value: string) => {
		if (value === propertyType) {
			setPropertyType(null);
		} else {
			setPropertyType(value);
		}
		toggleLoading();
	};
	return (
		<div className="flex flex-[2] items-center justify-center gap-5 flex-wrap lg:flex-nowrap">
			{propertyTypes.map((property) => (
				<div
					className={`flex items-center justify-center gap-2 cursor-pointer pb-1 select-none`}
					key={property.name}
					onClick={() => onUpdateQuery(property.type)}
				>
					{
						<property.icon
							className={` ${
								propertyType === property.type
									? "text-primary"
									: "text-gray-400"
							}`}
							size={20}
						/>
					}{" "}
					<span
						className={`text-sm mt-1 transition-all ease-in font-semibold whitespace-nowrap ${
							propertyType === property.type ? "text-text" : "text-gray-400"
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
