import ImageSlider from "@/components/large/ImageSlider/ImageSlider";
import Facilities from "@/components/small/Facilities/Facilities";
import Heading from "@/components/small/Heading/Heading";
import LikeButton from "@/components/small/Button/LikeButton";
import PropertyDescription from "@/components/small/PropertyDescription/PropertyDescription";
import { IoShareSocialOutline } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import Image from "next/image";
import Button from "@/components/small/Button/Button";
import { LuCalendarDays } from "react-icons/lu";
import ExploreProperties from "@/components/large/ExploreProperties/ExploreProperties";
import Map from "@/components/medium/Map/Map";
import { getPropertyById } from "@/app/actions/propertyActions";
import DeletePropertyButton from "@/components/small/Button/DeletePropertyButton";
import DeletePropertyModal from "@/components/medium/DeletePropertyModal/DeletePropertyModal";
import { LatLngExpression } from "leaflet";
import { ListingStatus } from "@prisma/client";
import { FaCircle } from "react-icons/fa";
import AddChatButton from "@/components/small/Button/AddChatButton";
import { getSessionUser } from "../../../../utils/helpers";
import { PiHandshake } from "react-icons/pi";
import { RxValueNone } from "react-icons/rx";
import { FaDollarSign } from "react-icons/fa6";
import { TbCarCrane } from "react-icons/tb";

interface PageProps {
	params: { id: string };
}

const page = async ({ params: { id } }: PageProps) => {
	const property = await getPropertyById(id);
	const user = await getSessionUser();
	if (!property) return <></>;
	const isLiked = user
		? property.likedBy.filter((item) => item.user.id === user.id).length > 0
		: false;
	return (
		<div>
			<ImageSlider images={property.images} />
			<div className="flex gap-5 justify-between my-5 lg:flex-row flex-col">
				<div className="w-full lg:w-[70%]">
					<div className="flex items-start justify-between w-full mb-2 gap-2">
						<Heading weight="medium" text={property.title} />

						<div className="flex gap-2">
							<LikeButton
								isLiked={isLiked}
								userId={user ? user.id : undefined}
								propertyId={id}
							/>
							<button className="p-1 rounded-full transition-all ease-out hover:scale-110 active:scale-95">
								<IoShareSocialOutline size={20} />
							</button>
							{property.listedById === user?.id && (
								<DeletePropertyModal propertyId={property.id}>
									<DeletePropertyButton />
								</DeletePropertyModal>
							)}
						</div>
					</div>
					<div className="flex gap-5 items-center text-sm">
						{property.status === ListingStatus.SALE ? (
							<span className="text-emerald-400 gap-1 flex items-center font-medium">
								<FaDollarSign size={15} />
								For sale
							</span>
						) : (
							<span className="text-orange-400 gap-1 flex items-center font-medium">
								<FaDollarSign size={15} />
								For rent
							</span>
						)}
						<span className="text-slate-600 gap-1 flex items-center font-medium">
							<TbCarCrane size={20} />
							Built in {property.yearBuilt}
						</span>
					</div>
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
				<div className="w-full md:w-auto md:max-w-[350px] h-full border-2 border-gray-200 rounded-lg p-4 flex flex-col">
					<div className="flex pb-3 border-b-2 border-gray-300 justify-between items-center">
						<div className="flex flex-col">
							<span className="text-gray-500 text-sm">Price</span>
							<h1 className="text-primary font-medium text-[24px]">
								${property.price.toLocaleString("en-US")}
							</h1>
							<h1 className="text-sm text-gray-500 font-normal">
								{property.negotiable ? (
									<span className="flex items-center gap-1">
										{" "}
										<PiHandshake size={18} className="text-green-400" />{" "}
										Negotiable{" "}
									</span>
								) : (
									<span className="flex items-center gap-1">
										{" "}
										<RxValueNone size={18} className="text-red-400" /> Not
										Negotiable{" "}
									</span>
								)}
							</h1>
						</div>
					</div>
					<div className="flex flex-col py-3 border-b-2 border-gray-300">
						<h1 className="font-medium text-[18px]">Owner Detail</h1>
						<div className="my-3 flex items-center gap-3">
							<div className="relative w-16 h-16">
								<Image
									src={property.listedBy.image || "/no-avatar.jpg"}
									alt="avatar"
									fill
									className="object-cover rounded-full "
								/>
							</div>
							<div className="flex flex-col">
								<h1 className="font-semibold">{property.listedBy.name}</h1>
								<span className="text-gray-500 text-xs">Property Owner</span>
							</div>
						</div>
						<p className="text-sm text-gray-500">{property.listedBy.bio}</p>
						{user && property.listedBy.id !== user.id && (
							<AddChatButton
								phone={property.listedBy.phone}
								chatPartnerId={property.listedBy.id}
							/>
						)}
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
							disabled
							full
							icon={<LuCalendarDays size={20} />}
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
