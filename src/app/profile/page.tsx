import { getCurrentUser } from "@/app/actions/userActions";
import PersonalInfo from "@/components/large/PersonalInfo/PersonalInfo";
import ProfileSidebar from "@/components/medium/ProfileSidebar/ProfileSidebar";
import Heading from "@/components/small/Heading/Heading";

const page = async () => {
	const user = await getCurrentUser();
	return (
		<div className="flex justify-between gap-5 lg:gap-20 min-h-[calc(100vh-100px)]">
			<ProfileSidebar />
			<div className="w-full">
				<Heading text="Profile" weight="semibold" />
				<PersonalInfo user={user} />
			</div>
		</div>
	);
};

export default page;
