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
		router.push(`/?propertyType=${query}`);
	};

	return (
		<div className="flex items-center justify-between gap-5">
			{propertyTypes.map((property) => (
				<div
					className={`flex items-center justify-center gap-2 cursor-pointer px-4 py-2 rounded-full select-none border-2 transition-all ease-in   hover:border-gray-200 hover:shadow-lg ${
						property.query === currentQuery
							? "border-gray-200 shadow-lg"
							: "border-transparent"
					}  `}
					key={property.name}
					onClick={() => updateQuery(property.query)}
				>
					{
						<property.icon
							className={`transition-all ease-in ${
								currentQuery === property.query
									? "text-primary"
									: "text-gray-400"
							}`}
							size={20}
						/>
					}{" "}
					<span
						className={` mt-1 transition-all ease-in font-bold ${
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
