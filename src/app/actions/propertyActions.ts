"use server";
import prisma from "@/lib/prisma";
import { PropertyWithListedBy } from "../../../utils/types";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ListingStatus, Prisma, PropertyType } from "@prisma/client";

export const getProperties = async (
	status?: ListingStatus | null,
	type?: PropertyType | null,
	query?: string | null
): Promise<PropertyWithListedBy[]> => {
	try {
		const where: Prisma.PropertyWhereInput = {};

		if (status) {
			where.status = status;
		}

		if (type) {
			where.type = type;
		}

		if (query) {
			where.OR = [
				{ title: { contains: query, mode: "insensitive" } },
				{ city: { contains: query, mode: "insensitive" } },
				{ state: { contains: query, mode: "insensitive" } },
				{ country: { contains: query, mode: "insensitive" } },
			];
		}

		const properties = await prisma.property.findMany({
			orderBy: { createdAt: "desc" },
			include: {
				listedBy: {
					select: {
						username: true,
						avatar: true,
					},
				},
			},
			where,
		});

		return properties;
	} catch (error: any) {
		console.error("Error fetching properties:", error);
		return [];
	}
};

export const getPropertyById = async (
	id: string
): Promise<PropertyWithListedBy | null> => {
	try {
		const property = await prisma.property.findUnique({
			where: { id: id },
			include: { listedBy: true },
		});
		if (property) {
			return property;
		}
		return null;
	} catch (error: any) {
		console.log(error);
		return error;
	}
};

export const deleteProperty = async (id: string) => {
	try {
		const session = await getServerSession();
		if (session) {
			const userId = session.user.id;
			await prisma.property.delete({
				where: { id, listedById: userId },
			});
		}
	} catch (error: any) {
		console.log(error);
		return;
	}
	revalidatePath("/properties");
	redirect("/properties");
};
