import Image from "next/image";
import { IoHeartOutline } from "react-icons/io5";
import { IoShareSocialOutline } from "react-icons/io5";
import { GrLocation } from "react-icons/gr";
import { LiaVectorSquareSolid } from "react-icons/lia";
import { MdOutlineBed } from "react-icons/md";
import { PiBathtub } from "react-icons/pi";
import { CiMail, CiPhone } from "react-icons/ci";
import { MdVerified } from "react-icons/md";
import { MdOutlineCameraAlt } from "react-icons/md";
import { FaCircle } from "react-icons/fa";
import Link from "next/link";
import { ListingStatus } from "@prisma/client";

interface CardProps {
	price: number;
	title: string;
	area: number;
	bedrooms: number;
	bathrooms: number;
	images: string[];
	listingStatus: ListingStatus;
	listedByName: string;
	listedByAvatar: string | null;
	listedByPhone: string | null;
	listedByEmail: string | null;
	id: string;
	country: string;
	state: string;
	city: string;
}

const Card = ({
	price,
	title,
	area,
	bedrooms,
	bathrooms,
	images,
	listingStatus,
	listedByName,
	listedByAvatar,
	listedByPhone,
	listedByEmail,
	id,
	country,
	state,
	city,
}: CardProps) => {
	return (
		<div className="w-[150px] md:w-[250px] flex-shrink-0 max-h-[400px]">
			<div className="w-full h-[150px] md:h-[200px] relative ">
				<div className="bg-white bg-opacity-40 backdrop-blur-md px-2 py-1 rounded-lg text-white absolute right-2 top-2 z-[20] text-xs flex items-center gap-1">
					<MdOutlineCameraAlt size={17} /> {images && images.length}
				</div>
				<div className="bg-white hidden md:flex items-center gap-2 absolute z-10 bottom-2 w-[90%] mx-[5%] px-2 py-1 rounded-xl">
					<div className="relative w-10 h-10">
						<Image
							className="rounded-full object-cover"
							src={listedByAvatar || "/no-avatar.jpg"}
							alt="avatar"
							fill
						/>
					</div>
					<div className="text-[10px] md:text-xs">
						<span className="flex gap-1 font-bold mb-[2px]">
							{listedByName} <MdVerified size={15} className="text-sky-500" />
						</span>
						<span className="text-gray-400 flex items-center font-medium gap-1">
							{listedByPhone ? (
								<>
									<CiPhone className="text-gray-500" size={15} />{" "}
									{listedByPhone}{" "}
								</>
							) : (
								<>
									<CiMail className="text-gray-500" size={15} /> {listedByEmail}
								</>
							)}
						</span>
					</div>
				</div>
				<Image
					className="rounded-xl object-cover"
					src={(images && images[0]) || ""}
					alt="property"
					fill
				/>
			</div>
			<div className="flex flex-col justify-between px-2 py-3 font-medium w-full h-[200px]">
				<div className="flex justify-between w-full">
					{listingStatus === ListingStatus.SALE ? (
						<span className="text-emerald-400 gap-1 flex items-center text-xs">
							<FaCircle size={8} />
							For sale
						</span>
					) : (
						<span className="text-orange-400 gap-1 flex items-center text-xs">
							<FaCircle size={8} />
							For rent
						</span>
					)}
					<div className="flex items-center gap-2">
						<IoHeartOutline
							className="cursor-pointer p-1 rounded-full hover:bg-gray-300"
							size={28}
						/>
						<IoShareSocialOutline
							className="cursor-pointer p-1 rounded-full hover:bg-gray-300"
							size={28}
						/>
					</div>
				</div>
				<div className="flex flex-col gap-2">
					<span className=" md:text-lg font-bold">
						${price.toLocaleString("en-US")}
					</span>
					<Link
						href={`/properties/${id}`}
						className="text-sm md:text-base font-medium line-clamp-2 hover:underline"
					>
						{title}
					</Link>
				</div>
				<span className="flex text-xs items-center gap-1 my-3 font-normal">
					<GrLocation size={12} /> {city}, {state}, {country}
				</span>
				<div className="hidden md:flex justify-between items-center gap-2">
					<span className="flex items-center gap-1 text-[10px] md:text-xs">
						<LiaVectorSquareSolid className="text-primary" size={18} /> {area}
						sqft
					</span>
					<span className="flex items-center gap-1 text-[10px] md:text-xs">
						<MdOutlineBed className="text-primary" size={18} /> {bedrooms} Bd
					</span>
					<span className="flex items-center gap-1 text-[10px] md:text-xs">
						<PiBathtub className="text-primary" size={18} /> {bathrooms} Bth
					</span>
				</div>
			</div>
		</div>
	);
};

export default Card;
