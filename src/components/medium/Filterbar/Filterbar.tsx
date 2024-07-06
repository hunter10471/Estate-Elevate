"use client";
import React, { useEffect, useState } from "react";
import PropertyTypes from "../PropertyTypes/PropertyTypes";
import { IoSearch } from "react-icons/io5";
import { FaRegMap } from "react-icons/fa6";
import { FiGrid } from "react-icons/fi";
import useStore from "@/store/store";
import { useQueryState } from "nuqs";

const Filterbar = () => {
	const [status, setStatus] = useQueryState("status");
	const [query, setQuery] = useQueryState("query");
	const [value, setValue] = useState<string | undefined>();
	const isMap = useStore((state) => state.isMap);
	const toggleIsMap = useStore((state) => state.toggleMap);
	const toggleGrid = useStore((state) => state.toggleGrid);
	const toggleLoading = useStore((state) => state.toggleLoadingTrue);

	const onUpdateQuery = (update: string) => {
		if (update === status) {
			setStatus(null);
		} else {
			setStatus(update);
		}
		toggleLoading();
	};

	useEffect(() => {
		if (value !== undefined) {
			const timer = setTimeout(() => {
				setQuery(value);
			}, 2000);
			return () => clearTimeout(timer);
		}
	}, [value]);

	return (
		<div className="flex flex-col gap-10">
			<div className="flex justify-between items-center lg:flex-row flex-col gap-4 text-sm font-semibold flex-1">
				<div className="flex items-center gap-5 ">
					<button
						onClick={() => onUpdateQuery("RENT")}
						className={`${
							status === "RENT"
								? "text-text border-b-primary"
								: "text-gray-400 border-transparent"
						} border-b-2 pb-1 transition-all ease-in`}
					>
						Rent
					</button>
					<button
						onClick={() => onUpdateQuery("SALE")}
						className={`${
							status === "SALE"
								? "text-text border-b-primary"
								: "text-gray-400 border-transparent"
						} border-b-2 pb-1 transition-all ease-in`}
					>
						Buy
					</button>
					<div className="relative ml-5">
						<IoSearch className="absolute top-[10px]" size={18} />
						<input
							onChange={(e) => setValue(e.target.value)}
							className="py-2 pl-7 focus:outline-none border-b-2 border-gray-300 min-w-[220px]"
							type="search"
							placeholder="Search for a location"
						/>
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
