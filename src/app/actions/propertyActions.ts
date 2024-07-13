"use server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ListingStatus, Prisma, PropertyType } from "@prisma/client";
import { getSessionUser } from "../../../utils/helpers";
import { NotificationType } from "../../../utils/types";

export const getProperties = async (
	status?: ListingStatus | null,
	type?: PropertyType | null,
	query?: string | null,
	minPrice?: string | null,
	maxPrice?: string | null,
	sort?: string | null,
	limit?: number
) => {
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
				listedBy: true,
				likedBy: {
					include: { property: true, user: true },
				},
			},
			where,
			orderBy,
			take: limit,
		});
		return properties;
	} catch (error: any) {
		console.error("Error fetching properties:", error);
		return [];
	}
};

export const getPropertyById = async (id: string) => {
	try {
		const property = await prisma.property.findUnique({
			where: { id },
			include: {
				likedBy: {
					include: { property: true, user: true },
				},
				listedBy: true,
			},
		});

		return property;
	} catch (error: any) {
		console.log(error);
	}
};

export const deleteProperty = async (id: string) => {
	try {
		const user = await getSessionUser();
		if (user) {
			const userId = user.id;
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

export const getUsersProperties = async () => {
	try {
		const user = await getSessionUser();
		if (user) {
			const properties = await prisma.property.findMany({
				where: { listedBy: { id: user.id } },
				include: {
					likedBy: {
						include: { property: true, user: true },
					},
					listedBy: true,
				},
				orderBy: { createdAt: "desc" },
			});
			return properties;
		}
		return [];
	} catch (error) {
		console.log(error);
		return [];
	}
};

export const getLikedProperties = async () => {
	try {
		const user = await getSessionUser();
		if (user) {
			const properties = await prisma.likedProperty.findMany({
				where: { userId: user.id },
				include: {
					property: {
						include: { listedBy: true },
					},
					user: {
						select: {
							id: true,
							email: true,
							name: true,
							image: true,
							phone: true,
						},
					},
				},
				orderBy: { createdAt: "desc" },
			});
			return properties;
		}
		return [];
	} catch (error) {
		console.log(error);
		return [];
	}
};

export const addLike = async (userId: string, propertyId: string) => {
	try {
		revalidatePath("/properties/mine/liked");
		const property = await getPropertyById(propertyId);
		const sessionUser = await getSessionUser();

		if (property?.listedBy.id !== sessionUser?.id) {
			await fetch(`${process.env.URL}/api/notification`, {
				method: "POST",
				body: JSON.stringify({
					receiverId: property?.listedBy.id,
					senderId: userId,
					propertyId,
					type: NotificationType.LIKE_PROPERTY,
				}),
			});
		}
		return await prisma.likedProperty.create({
			data: {
				userId,
				propertyId,
			},
		});
	} catch (error) {
		console.log(error);
	}
};

export const removeLike = async (userId: string, propertyId: string) => {
	try {
		revalidatePath("/properties/mine/liked");
		return await prisma.likedProperty.delete({
			where: {
				userId_propertyId: {
					userId,
					propertyId,
				},
			},
		});
	} catch (error) {
		console.log(error);
	}
};
