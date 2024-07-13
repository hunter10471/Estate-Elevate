import { Property } from "@prisma/client";
import { fetchRedis } from "../../../utils/helpers";
import { Notification } from "../../../utils/types";
import { getUserById } from "./userActions";
import { getPropertyById } from "./propertyActions";

export const getUserNotifications = async (id: string) => {
	try {
		const notifications = (await fetchRedis(
			"zrange",
			`notification:${id}`,
			0,
			-1
		)) as string[];
		const parsedNotifications: Notification[] = await Promise.all(
			notifications.map(async (notification) => {
				const parsedNotification: Notification = JSON.parse(notification);
				const user = await getUserById(parsedNotification.senderId);
				let property;
				if (parsedNotification.propertyId) {
					property = await getPropertyById(parsedNotification.propertyId);
				}
				parsedNotification.sender = user ? user : undefined;
				parsedNotification.property = property ? property : undefined;
				return parsedNotification;
			})
		);
		return parsedNotifications;
	} catch (error) {
		console.log(error);
		return [];
	}
};
