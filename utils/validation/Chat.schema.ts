import { array, number, object, string } from "zod";

export const AddChatSchema = object({
	id: string({ required_error: "ID of user is required." }).cuid(),
});

export const MessageSchema = object({
	id: string(),
	senderId: string(),
	text: string(),
	timestamp: number(),
	receiverId: string(),
	seenBy: array(string()),
});

export const MessageArraySchema = array(MessageSchema);
