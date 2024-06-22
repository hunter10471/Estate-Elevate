import PersonalInfo from "@/components/large/PersonalInfo/PersonalInfo";
import ProfileSidebar from "@/components/medium/ProfileSidebar/ProfileSidebar";
import Heading from "@/components/small/Heading/Heading";

const page = () => {
	return (
		<div className="flex justify-between gap-5 lg:gap-20">
			<ProfileSidebar />
			<div className="w-full">
				<Heading text="Profile" weight="semibold" />
				<PersonalInfo />
			</div>
		</div>
	);
};

export default page;
