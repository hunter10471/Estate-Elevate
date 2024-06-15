import Image from "next/image";
import { IoHeartOutline } from "react-icons/io5";
import { IoShareSocialOutline } from "react-icons/io5";
import { GrLocation } from "react-icons/gr";
import { LiaVectorSquareSolid } from "react-icons/lia";
import { MdOutlineBed } from "react-icons/md";
import { PiBathtub } from "react-icons/pi";
import { CiPhone } from "react-icons/ci";
import { MdVerified } from "react-icons/md";

interface CardProps {
	price: number;
	name: string;
	address: string;
	area: number;
	bedroom: number;
	bathroom: number;
	img: string;
}

const Card = ({ price, name, address, area, bedroom, bathroom, img }: any) => {
	return (
		<div className="cursor-pointer transition-all hover:scale-95 ">
			<div className="w-[270px] h-[200px] relative ">
				<div className="bg-white flex items-center gap-2 absolute z-10 bottom-2 w-[90%] mx-[5%] px-2 py-1 rounded-xl">
					<Image
						className="rounded-full"
						src={"/no-avatar.jpg"}
						alt="avatar"
						width={42}
						height={42}
					/>
					<div className="text-xs">
						<span className="flex gap-1 font-bold mb-[2px]">
							John Doe <MdVerified size={15} className="text-sky-500" />
						</span>
						<span className="text-gray-400 flex items-center">
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
				<div className="flex justify-between my-2">
					<span className=" text-lg">$95,000</span>
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
				<span>Seaside Villa</span>
				<span className="flex text-xs items-center gap-1 my-3">
					<GrLocation size={12} /> 15-H, Askari-V, KHI
				</span>
				<div className="flex justify-between items-center">
					<span className="flex items-center gap-1 text-xs">
						<LiaVectorSquareSolid className="text-primary" size={18} /> 1400
						sqft
					</span>
					<span className="flex items-center gap-1 text-xs">
						<MdOutlineBed className="text-primary" size={18} /> 3 Bd
					</span>
					<span className="flex items-center gap-1 text-xs">
						<PiBathtub className="text-primary" size={18} /> 2 Bth
					</span>
				</div>
			</div>
		</div>
	);
};

export default Card;
