"use client";
import { SortByOption } from "../../../../utils/types";
import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

const options: SortByOption[] = [
	{ name: "Price (Low to High)", value: "price-l-h" },
	{ name: "Price (High to Low)", value: "price-h-l" },
	{ name: "Newest Listings", value: "new-listings" },
	{ name: "Oldest Listings", value: "old-listings" },
];

const SortBy = () => {
	const [value, setValue] = useState(2);
	const [open, setOpen] = useState(false);
	const onClick = (index: number) => {
		setValue(index);
		setOpen(false);
	};
	return (
		<div className="flex gap-1 font-semibold mt-2 relative lg:text-sm text-xs">
			<span className="whitespace-nowrap mr-[170px]">Sort by:</span>
			<div
				className={`flex flex-col gap-2 transition-all ease-in-out rounded-lg duration-300 select-none ${
					!open ? "h-[30px]" : "h-[180px] sm:h-[200px]"
				} overflow-hidden absolute ml-14 bg-white z-[9999] pb-2 px-2 rounded-lg`}
			>
				<span className="text-primary px-2">{options[value].name}</span>
				{options.map((option, index) => (
					<span
						onClick={() => onClick(index)}
						className="p-2 hover:text-primary cursor-pointer"
					>
						{option.name}
					</span>
				))}
			</div>
			<button className="h-fit" onClick={() => setOpen((prev) => !prev)}>
				<FaAngleDown className="cursor-pointer" size={18} />
			</button>
		</div>
	);
};

export default SortBy;
