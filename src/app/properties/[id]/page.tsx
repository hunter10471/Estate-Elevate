import ImageSlider from "@/components/large/ImageSlider/ImageSlider";
import Facilities from "@/components/small/Facilities/Facilities";
import Heading from "@/components/small/Heading/Heading";
import LikeButton from "@/components/small/LikeButton/LikeButton";
import PropertyDescription from "@/components/small/PropertyDescription/PropertyDescription";
import { IoShareSocialOutline } from "react-icons/io5";
import dynamic from "next/dynamic";
import { FaLocationDot } from "react-icons/fa6";
import Image from "next/image";
import Button from "@/components/small/Button/Button";
import { MdOutlineChat } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { LuCalendarDays } from "react-icons/lu";
import ExploreProperties from "@/components/large/ExploreProperties/ExploreProperties";

const Map = dynamic(() => import("../../../components/medium/Map/Map"), {
	ssr: false,
});

const page = () => {
	return (
		<div>
			<ImageSlider />
			<div className="flex gap-5 justify-between my-5 lg:flex-row flex-col">
				<div className="w-full md:w-[70%]">
					<div className="flex items-center justify-between w-full">
						<Heading weight="medium" text="Sea Side Villa" />
						<div className="flex gap-3">
							<LikeButton isLiked />
							<button className="p-1 rounded-full border-2 border-gray-300 transition-all ease-out hover:scale-110 active:scale-95">
								<IoShareSocialOutline size={20} />
							</button>
						</div>
					</div>
					<PropertyDescription />
					<Facilities />
					<div className="h-[400px] w-full flex flex-col gap-5">
						<Heading mediumSize text="Location" weight="medium" />
						<Map fullWidth />
						<span className="text-xs flex gap-2 items-center font-medium -mt-4">
							<FaLocationDot className="text-primary" size={10} />
							Askari 5, Malir Cantt, Karachi
						</span>
					</div>
				</div>
				<div className="w-auto max-w-[350px] h-full border-2 border-gray-200 rounded-lg p-4 flex flex-col">
					<div className="flex flex-col pb-3 border-b-2 border-gray-300">
						<span className="text-gray-500 text-sm">Price</span>
						<h1 className="text-primary font-medium text-[24px]">$150,000</h1>
					</div>
					<div className="flex flex-col py-3 border-b-2 border-gray-300">
						<h1 className="font-medium text-[18px]">Agent Detail</h1>
						<div className="my-3 flex items-center gap-3">
							<Image
								src={"/no-avatar.jpg"}
								alt="avatar"
								width={48}
								height={48}
								className="object-cover rounded-full "
							/>
							<div className="flex flex-col">
								<h1 className="font-semibold">John Doe</h1>
								<span className="text-gray-500 text-xs">Real Estate Agent</span>
							</div>
						</div>
						<div className="flex gap-2 my-2">
							<Button icon={MdOutlineChat} full primary text="Chat" />
							<Button icon={FiPhone} full outline text="Call" />
						</div>
					</div>
					<div className="flex flex-col pt-3">
						<h1 className="font-medium text-[18px]">Inspection Times</h1>
						<div className=" mt-2 mb-5">
							<span className="text-gray-500 text-xs">
								Live inspection times only available on:
							</span>
							<h1 className="font-semibold">
								Monday - Friday at 10:00am - 5:00pm
							</h1>
						</div>
						<Button
							full
							icon={LuCalendarDays}
							primary
							text="Make Appointment"
						/>
					</div>
				</div>
			</div>
			<ExploreProperties />
		</div>
	);
};

export default page;
