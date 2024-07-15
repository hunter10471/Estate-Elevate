import { getLikedProperties } from "@/app/actions/propertyActions";
import Card from "@/components/medium/Card/Card";
import Heading from "@/components/small/Heading/Heading";
import { getSessionUser } from "../../../../../utils/helpers";
import Image from "next/image";

const page = async () => {
	const likedProperties = await getLikedProperties();
	const user = await getSessionUser();
	return (
		<div className="min-h-[calc(100vh-120px)]">
			<Heading
				text="Favourite Properties"
				subtitle="The following are the properties that you have favourited on the platform"
			/>
			<div className="flex flex-wrap gap-10 my-10">
				{likedProperties.length > 0 ? (
					likedProperties.map((liked) => {
						return (
							<Card
								sessionUser={user}
								isLiked={true}
								key={liked.propertyId + liked.userId}
								{...liked.property}
								listingStatus={liked.property.status}
								listedByAvatar={liked.property.listedBy.image}
								listedByName={liked.property.listedBy.name}
								listedByEmail={liked.property.listedBy.email}
								listedByPhone={liked.property.listedBy.phone}
							/>
						);
					})
				) : (
					<div className="flex justify-center items-center flex-col w-full mt-10">
						<div className="relative h-[300px] w-[250px] grayscale-[5]">
							<Image
								src={"/nothing.png"}
								alt="no-results"
								fill
								className="object-cover"
							/>
						</div>
						<h2 className="font-medium text-gray-400 text-xl text-center">
							You haven&apos;t liked any properties...
						</h2>
					</div>
				)}
			</div>
		</div>
	);
};

export default page;
