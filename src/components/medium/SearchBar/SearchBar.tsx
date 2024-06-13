"use client";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BsHouse } from "react-icons/bs";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import Button from "@/components/small/Button/Button";
import { useState } from "react";

interface SearchBarProps {}

const SearchBar = ({}: SearchBarProps) => {
	const [isBuy, setIsBuy] = useState(false);
	return (
		<div className="absolute sm:bottom-[-60px] bottom-[-70%] left-0 right-0 ml-auto mr-auto sm:text-base  text-sm w-[90%] sm:w-fit shadow-xl">
			<div className="flex font-heading font-medium ">
				<button
					className={`px-6 py-3 rounded-tl-lg sm:text-sm text-xs ${
						isBuy ? "bg-white" : "bg-blue-950 text-white"
					}`}
					onClick={() => setIsBuy(false)}
				>
					Rent
				</button>
				<button
					className={`px-6 py-3 rounded-tr-lg sm:text-sm text-xs ${
						!isBuy ? "bg-white" : "bg-blue-950 text-white"
					}`}
					onClick={() => setIsBuy(true)}
				>
					Buy
				</button>
			</div>
			<div className=" bg-white border-b-2 border-x-2 border-gray-200 p-5 rounded-lg rounded-tl-none font-heading font-semibold flex flex-wrap items-center sm:flex-row flex-col justify-center gap-4">
				<div className=" w-full sm:w-[210px]">
					<label className="text-sm font-medium text-text/80">Location</label>
					<div className="flex items-center gap-1">
						<span>
							<HiOutlineLocationMarker size={20} />
						</span>
						<input
							type="text"
							placeholder="Enter location"
							className="focus:outline-none w-[90%] border-b-2 border-gray-300"
							defaultValue={"Malir Cantt, Karachi"}
						/>
					</div>
				</div>
				<div className=" w-full sm:w-[210px]">
					<label className="text-sm font-medium text-text/80">
						Property Type
					</label>
					<div className="flex items-center gap-1">
						<BsHouse size={20} />
						<select
							className="focus:outline-none outline-none appearance-none cursor-pointer  w-[90%] border-b-2 border-gray-300 "
							name="propertyType"
							id="propertyType"
						>
							<option value="house">House</option>
							<option value="villa">Villa</option>
							<option value="apartment">Apartment</option>
							<option value="guestHouse">Guest House</option>
						</select>
					</div>
				</div>
				<div className="pr-10 w-full sm:w-auto">
					<label className="text-sm font-medium text-text/80">Price</label>
					<div className="flex items-center gap-1">
						<RiMoneyDollarCircleLine size={20} />
						<div className="w-fit">
							$
							<input
								type="text"
								className="focus:outline-none w-[50px] border-b-2 border-gray-300  text-center"
								defaultValue={12000}
							/>
						</div>
						<span>-</span>
						<div className="w-fit pl-1">
							$
							<input
								type="text"
								className="focus:outline-none w-[50px] border-b-2 border-gray-300  text-center"
								defaultValue={18000}
							/>
						</div>
					</div>
				</div>
				<Button mobileFull text="Search Property" primary />
			</div>
		</div>
	);
};

export default SearchBar;
