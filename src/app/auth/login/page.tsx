import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";

const page = async () => {
	const session = await getServerSession();
	if (session) {
		redirect("/");
	}
	return <LoginForm />;
};

export default page;
