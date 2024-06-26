import { redirect } from "next/navigation";
import SignupForm from "./SignupForm";
import { getServerSession } from "next-auth";

const page = async () => {
	const session = await getServerSession();
	if (session) {
		redirect("/");
	}
	return <SignupForm />;
};

export default page;
