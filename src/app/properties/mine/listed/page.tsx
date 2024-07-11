import { getUsersProperties } from "@/app/actions/propertyActions";
import Card from "@/components/medium/Card/Card";
import Heading from "@/components/small/Heading/Heading";
import { getSessionUser } from "../../../../../utils/helpers";

const page = async () => {
	const myProperties = await getUsersProperties();
	const user = await getSessionUser();
	if (!user) return <></>;
	return (
		<div className="min-h-[calc(100vh-120px)]">
			<Heading
				text="My Properties"
				subtitle="The following are the properties that you have listed on the platform"
			/>
			<div className="flex flex-wrap gap-10 my-10">
				{myProperties.map((property) => {
					const isLiked =
						property.likedBy.filter((item) => item.user.id === user.id).length >
						0;
					return (
						<Card
							sessionUser={user}
							isLiked={isLiked}
							key={property.id}
							{...property}
							listingStatus={property.status}
							listedByAvatar={property.listedBy.image}
							listedByName={property.listedBy.name}
							listedByEmail={property.listedBy.email}
							listedByPhone={property.listedBy.phone}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default page;
