import { getServerSession } from "next-auth";

export const getSessionUser = async () => {
	const session = await getServerSession();
	if (session?.user) {
		return session.user;
	}
	return null;
};
