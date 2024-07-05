import ImageSlider from "@/components/large/ImageSlider/ImageSlider";
import Facilities from "@/components/small/Facilities/Facilities";
import Heading from "@/components/small/Heading/Heading";
import LikeButton from "@/components/small/Button/LikeButton";
import PropertyDescription from "@/components/small/PropertyDescription/PropertyDescription";
import { IoShareSocialOutline } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import Image from "next/image";
import Button from "@/components/small/Button/Button";
import { MdOutlineChat } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { LuCalendarDays } from "react-icons/lu";
import ExploreProperties from "@/components/large/ExploreProperties/ExploreProperties";
import Map from "@/components/medium/Map/Map";
import { getPropertyById } from "@/app/actions/propertyActions";
import DeletePropertyButton from "@/components/small/Button/DeletePropertyButton";
import { getCurrentUser } from "@/app/actions/userActions";
import DeletePropertyModal from "@/components/medium/DeletePropertyModal/DeletePropertyModal";
import { LatLngExpression } from "leaflet";
import { ListingStatus } from "@prisma/client";
import { FaCircle } from "react-icons/fa";

interface PageProps {
	params: { id: string };
}

const page = async ({ params: { id } }: PageProps) => {
	const property = await getPropertyById(id);
	const user = await getCurrentUser();
	if (!property) return <></>;
	return (
		<div>
			<ImageSlider images={property.images} />
			<div className="flex gap-5 justify-between my-5 lg:flex-row flex-col">
				<div className="w-full md:w-[70%]">
					<div className="flex items-start justify-between w-full mb-2 gap-2">
						<Heading weight="medium" text={property.title} />

						<div className="flex gap-2">
							<LikeButton isLiked />
							<button className="p-1 rounded-full border-2 border-gray-300 transition-all ease-out hover:scale-110 active:scale-95">
								<IoShareSocialOutline size={20} />
							</button>
							{property.listedById === user?.id && (
								<DeletePropertyModal propertyId={property.id}>
									<DeletePropertyButton />
								</DeletePropertyModal>
							)}
						</div>
					</div>
					{property.status === ListingStatus.SALE ? (
						<span className="text-emerald-400 gap-1 flex items-center font-semibold">
							<FaCircle size={8} />
							For sale
						</span>
					) : (
						<span className="text-orange-400 gap-1 flex items-center font-semibold">
							<FaCircle size={8} />
							For rent
						</span>
					)}
					<PropertyDescription description={property.description} />
					<Facilities
						area={property.area}
						bathrooms={property.bathrooms}
						bedrooms={property.bedrooms}
						data={property.facilities}
					/>
					<div className="h-[400px] w-full flex flex-col gap-5">
						<Heading mediumSize text="Location" weight="medium" />
						<Map
							zoom={5}
							position={property.latlng as LatLngExpression}
							fullWidth
						/>
						<span className="text-xs flex gap-2 items-center font-medium -mt-4">
							<FaLocationDot className="text-primary" size={10} />
							{property.city}, {property.state}, {property.country}
						</span>
					</div>
				</div>
				<div className="w-auto max-w-[350px] h-full border-2 border-gray-200 rounded-lg p-4 flex flex-col">
					<div className="flex flex-col pb-3 border-b-2 border-gray-300">
						<span className="text-gray-500 text-sm">Price</span>
						<h1 className="text-primary font-medium text-[24px]">
							${property.price.toLocaleString("en-US")}
						</h1>
					</div>
					<div className="flex flex-col py-3 border-b-2 border-gray-300">
						<h1 className="font-medium text-[18px]">Owner Detail</h1>
						<div className="my-3 flex items-center gap-3">
							<div className="relative w-16 h-16">
								<Image
									src={property.listedBy.avatar || "/no-avatar.jpg"}
									alt="avatar"
									fill
									className="object-cover rounded-full "
								/>
							</div>
							<div className="flex flex-col">
								<h1 className="font-semibold">{property.listedBy.username}</h1>
								<span className="text-gray-500 text-xs">Property Owner</span>
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
