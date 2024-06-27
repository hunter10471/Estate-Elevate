"use server";

import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { SafeUser } from "../../utils/types";

export const getCurrentUser = async (): Promise<SafeUser | null> => {
	try {
		const session = await getServerSession();

		if (session && session.user && session.user.email) {
			const user = await prisma.user.findUnique({
				where: { email: session.user?.email },
			});
			if (user) {
				const { password, ...others } = user;
				return others;
			}
		}
		return null;
	} catch (error) {
		console.log(error);
		return null;
	}
};
