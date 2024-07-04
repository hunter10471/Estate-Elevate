"use server";

import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { SafeUser } from "../../../utils/types";
import { EditProfileFormInputs } from "../../../utils/validation/EditProfileForm.schema";
import bcrypt from "bcrypt";

export const getCurrentUser = async (): Promise<SafeUser | null> => {
	const session = await getServerSession();
	try {
		if (session && session.user && session.user.email) {
			const user = await prisma.user.findUnique({
				where: { email: session.user?.email },
			});
			if (user) {
				const { password, createdAt, updatedAt, ...others } = user;
				return others;
			}
		}
		return null;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const updateCurrentUser = async (
	values: EditProfileFormInputs
): Promise<SafeUser | Error> => {
	const session = await getServerSession();
	try {
		if (session && session.user && session.user.email) {
			const existingUser = await prisma.user.findUnique({
				where: { email: session.user.email },
			});
			if (values.oldPassword && values.password && existingUser) {
				const comparePassword = await bcrypt.compare(
					values.oldPassword,
					existingUser.password
				);
				if (!comparePassword) {
					throw new Error("Invalid credentials.");
				} else {
					const salt = 10;
					const hashedPass = await bcrypt.hash(values.password, salt);
					delete values.oldPassword;
					delete values.confirmPassword;
					values.password = hashedPass;
				}
			}
			const updatedUser = await prisma.user.update({
				where: { email: session.user.email },
				data: values,
			});
			if (updatedUser) {
				const { password, createdAt, updatedAt, ...others } = updatedUser;
				return others;
			}
			throw new Error("There was an error updating the user.");
		} else {
			throw new Error("Unauthorized action, user must be logged in.");
		}
	} catch (error: any) {
		console.log(error);
		return error;
	}
};
