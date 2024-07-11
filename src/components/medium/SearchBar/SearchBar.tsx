"use client";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BsHouse } from "react-icons/bs";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import Button from "@/components/small/Button/Button";
import { useState } from "react";
import { ListingStatus, PropertyType } from "@prisma/client";
import { useRouter } from "next/navigation";

interface SearchBarProps {}

const SearchBar = ({}: SearchBarProps) => {
	const router = useRouter();
	const [isBuy, setIsBuy] = useState(false);
	const [location, setLocation] = useState("");
	const [propertyType, setPropertyType] = useState<PropertyType>();
	const [minPrice, setMinPrice] = useState<number>();
	const [maxPrice, setMaxPrice] = useState<number>();
	const handleSearch = () => {
		const url = new URL("/properties", window.location.origin);
		url.searchParams.append(
			"type",
			isBuy ? ListingStatus.SALE : ListingStatus.RENT
		);
		url.searchParams.append("query", location);
		{
			propertyType && url.searchParams.append("propertyType", propertyType);
		}
		{
			minPrice && url.searchParams.append("minPrice", minPrice.toString());
		}
		{
			maxPrice && url.searchParams.append("maxPrice", maxPrice.toString());
		}
		router.push(url.toString());
	};
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
			<div className=" bg-white border-b-2 border-x-2 border-gray-200 p-5 rounded-lg rounded-tl-none font-medium flex flex-wrap items-center sm:flex-row flex-col justify-center gap-4">
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
							value={location}
							onChange={(e) => setLocation(e.target.value)}
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
							value={propertyType}
							onChange={(e) => {
								setPropertyType(e.target.value as PropertyType);
								console.log(e.target.value, propertyType);
							}}
						>
							<option>Select an option</option>
							<option value={PropertyType.HOUSE}>House</option>
							<option value={PropertyType.VILLA}>Villa</option>
							<option value={PropertyType.APARTMENT}>Apartment</option>
							<option value={PropertyType.GUEST_HOUSE}>Guest House</option>
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
								placeholder="Min price"
								type="text"
								className="focus:outline-none w-[80px] border-b-2 border-gray-300  text-center"
								value={minPrice}
								onChange={(e) => setMinPrice(Number(e.target.value))}
							/>
						</div>
						<span>-</span>
						<div className="w-fit pl-1">
							$
							<input
								placeholder="Max price"
								type="text"
								className="focus:outline-none w-[80px] border-b-2 border-gray-300  text-center"
								onChange={(e) => setMaxPrice(Number(e.target.value))}
								value={maxPrice}
							/>
						</div>
					</div>
				</div>
				<Button
					action={handleSearch}
					mobileFull
					text="Search Property"
					primary
				/>
			</div>
		</div>
	);
};

export default SearchBar;
