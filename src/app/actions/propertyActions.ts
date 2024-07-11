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
	query?: string | null,
	minPrice?: string | null,
	maxPrice?: string | null,
	sort?: string | null
): Promise<PropertyWithListedBy[]> => {
	try {
		const where: Prisma.PropertyWhereInput = {};

		let orderBy = {};
		switch (sort) {
			case "price-l-h":
				orderBy = { price: "asc" };
				break;
			case "price-h-l":
				orderBy = { price: "desc" };
				break;
			case "new-listings":
				orderBy = { createdAt: "desc" };
				break;
			case "old-listings":
				orderBy = { createdAt: "asc" };
				break;
			default:
				orderBy = { createdAt: "desc" };
				break;
		}

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
				{
					price: {
						...(minPrice && { gt: Number(minPrice) }),
						...(maxPrice && { lt: Number(maxPrice) }),
					},
				},
			];
		}

		const properties = await prisma.property.findMany({
			include: {
				listedBy: {
					select: {
						name: true,
						image: true,
						id: true,
						phone: true,
						email: true,
					},
				},
			},
			where,
			orderBy,
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
