"use client";
import React from "react";
import PropertyTypes from "../PropertyTypes/PropertyTypes";
import { IoSearch } from "react-icons/io5";
import { FaRegMap } from "react-icons/fa6";
import { FiGrid } from "react-icons/fi";
import useStore from "@/store/store";
import Filter from "@/components/small/Filter/Filter";
import useUpdateQuery from "@/hooks/useUpdateQuery";

const Filterbar = () => {
	const { getQueryParam, updateQuery } = useUpdateQuery();
	const currentQuery = getQueryParam("status");
	const isMap = useStore((state) => state.isMap);
	const toggleIsMap = useStore((state) => state.toggleMap);
	const toggleGrid = useStore((state) => state.toggleGrid);
	const toggleLoading = useStore((state) => state.toggleLoadingTrue);
	const onUpdateQuery = (key: string, value: string) => {
		toggleLoading();
		updateQuery(key, value);
	};
	return (
		<div className="flex flex-col gap-10">
			<div className="flex justify-between items-center lg:flex-row flex-col gap-4 text-sm font-semibold flex-1">
				<div className="flex items-center gap-5 ">
					<button
						onClick={() => onUpdateQuery("status", "RENT")}
						className={`${
							currentQuery === "RENT"
								? "text-text border-b-primary"
								: "text-gray-400 border-transparent"
						} border-b-2 pb-1 transition-all ease-in`}
					>
						Rent
					</button>
					<button
						onClick={() => onUpdateQuery("status", "SALE")}
						className={`${
							currentQuery === "SALE"
								? "text-text border-b-primary"
								: "text-gray-400 border-transparent"
						} border-b-2 pb-1 transition-all ease-in`}
					>
						Buy
					</button>
					<div className="relative ml-5">
						<IoSearch className="absolute top-[10px]" size={18} />
						<input
							className="py-2 pl-7 focus:outline-none border-b-2 border-gray-300 min-w-[220px]"
							type="text"
							defaultValue="Malir cantt, Karachi"
						/>
						<Filter />
					</div>
				</div>

				<PropertyTypes />
				<div className="justify-end gap-4 text-gray-400 flex-1 lg:flex hidden">
					<button
						onClick={toggleIsMap}
						className={`flex items-center gap-2 ${isMap ? "text-text" : ""}`}
					>
						<FaRegMap
							className={`${
								isMap ? "text-primary" : ""
							} transition-all ease-in`}
							size={18}
						/>{" "}
						Map
					</button>
					<button
						onClick={toggleGrid}
						className={`flex items-center gap-2 ${!isMap ? "text-text" : ""}`}
					>
						<FiGrid
							className={`${
								!isMap ? "text-primary" : ""
							} transition-all ease-in`}
							size={18}
						/>{" "}
						Grid
					</button>
				</div>
			</div>
		</div>
	);
};

export default Filterbar;
