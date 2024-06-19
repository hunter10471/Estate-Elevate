import Image from "next/image";
import { IoHeartOutline } from "react-icons/io5";
import { IoShareSocialOutline } from "react-icons/io5";
import { GrLocation } from "react-icons/gr";
import { LiaVectorSquareSolid } from "react-icons/lia";
import { MdOutlineBed } from "react-icons/md";
import { PiBathtub } from "react-icons/pi";
import { CiPhone } from "react-icons/ci";
import { MdVerified } from "react-icons/md";
import { MdOutlineCameraAlt } from "react-icons/md";
import { FaCircle } from "react-icons/fa";
import Link from "next/link";

interface CardProps {
	price: number;
	name: string;
	address: string;
	area: number;
	bedroom: number;
	bathroom: number;
	img: string;
	type: string;
}

const Card = ({
	price,
	name,
	address,
	area,
	bedroom,
	bathroom,
	img,
	type,
}: any) => {
	return (
		<Link
			href={"/properties/id"}
			className="cursor-pointer transition-all hover:scale-95 m-2"
		>
			<div className="w-[250px] h-[200px] relative">
				<div className="bg-white bg-opacity-40 backdrop-blur-md px-2 py-1 rounded-lg text-white absolute right-2 top-2 z-[20] text-xs flex items-center gap-1">
					<MdOutlineCameraAlt size={17} /> 20
				</div>
				<div className="bg-white flex items-center gap-2 absolute z-10 bottom-2 w-[90%] mx-[5%] px-2 py-1 rounded-xl">
					<Image
						className="rounded-full"
						src={"/no-avatar.jpg"}
						alt="avatar"
						width={32}
						height={32}
					/>
					<div className="text-[10px] md:text-xs">
						<span className="flex gap-1 font-bold mb-[2px]">
							John Doe <MdVerified size={15} className="text-sky-500" />
						</span>
						<span className="text-gray-400 flex items-center font-medium">
							<CiPhone className="text-gray-500" size={15} /> (305) 781-5855
						</span>
					</div>
				</div>
				<Image
					className="rounded-xl object-cover"
					src={"/seaside-villa.jpg"}
					alt="property"
					fill
				/>
			</div>
			<div className="p-2 font-medium">
				<div className="flex justify-between">
					<span className="text-emerald-400 gap-1 flex items-center text-xs">
						<FaCircle size={8} />
						For sale
					</span>
					{/* <span className="text-orange-400 gap-1 flex items-center text-xs">
						<FaCircle size={8} />
						For rent
					</span> */}
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
					<span className="text-lg font-bold">$95,000</span>
					<span>Seaside Villa</span>
				</div>
				<span className="flex text-xs items-center gap-1 my-3">
					<GrLocation size={12} /> 15-H, Askari-V, KHI
				</span>
				<div className="flex justify-between items-center gap-2">
					<span className="flex items-center gap-1 text-[10px] md:text-xs">
						<LiaVectorSquareSolid className="text-primary" size={18} /> 1400
						sqft
					</span>
					<span className="flex items-center gap-1 text-[10px] md:text-xs">
						<MdOutlineBed className="text-primary" size={18} /> 3 Bd
					</span>
					<span className="flex items-center gap-1 text-[10px] md:text-xs">
						<PiBathtub className="text-primary" size={18} /> 2 Bth
					</span>
				</div>
			</div>
		</Link>
	);
};

export default Card;
