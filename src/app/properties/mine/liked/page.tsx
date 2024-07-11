import { getLikedProperties } from "@/app/actions/propertyActions";
import Card from "@/components/medium/Card/Card";
import Heading from "@/components/small/Heading/Heading";
import { getSessionUser } from "../../../../../utils/helpers";

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
				{likedProperties.map((liked) => {
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
				})}
			</div>
		</div>
	);
};

export default page;
