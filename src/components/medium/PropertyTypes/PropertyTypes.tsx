"use client";
import React from "react";
import { PropertyType } from "@/lib/types";
import { BsHouse, BsBuildings } from "react-icons/bs";
import { MdOutlineVilla } from "react-icons/md";
import { PiBuildingApartment } from "react-icons/pi";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const propertyTypes: PropertyType[] = [
	{ name: "House", icon: BsHouse, query: "house" },
	{ name: "Apartment", icon: BsBuildings, query: "apartment" },
	{ name: "Villa", icon: MdOutlineVilla, query: "villa" },
	{ name: "Guest House", icon: PiBuildingApartment, query: "guest-house" },
];

const PropertyTypes = () => {
	const currentQuery = useSearchParams().get("propertyType");
	const router = useRouter();
	const updateQuery = (query: string) => {
		router.push(`/properties?propertyType=${query}`);
	};

	return (
		<div className="flex flex-[2] items-center justify-center gap-5 flex-wrap lg:flex-nowrap">
			{propertyTypes.map((property) => (
				<div
					className={`flex items-center justify-center gap-2 cursor-pointer pb-1 select-none`}
					key={property.name}
					onClick={() => updateQuery(property.query)}
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
