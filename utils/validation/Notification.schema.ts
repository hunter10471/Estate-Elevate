import { nativeEnum, object, string } from "zod";
import { NotificationType } from "../types";

export const sendNotificationSchema = object({
	senderId: string({ required_error: "ID of sender is required." }).cuid(),
	receiverId: string({ required_error: "ID of reciever is required." }).cuid(),
	propertyId: string().cuid().optional(),
	type: nativeEnum(NotificationType),
});
