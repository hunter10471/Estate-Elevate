import { fetchRedis, getSessionUser, sortId } from "../../../utils/helpers";
import { getUserById } from "./userActions";
import { Chat, Message } from "../../../utils/types";
import { MessageArraySchema } from "../../../utils/validation/Chat.schema";

export const getChatRequests = async (): Promise<(Chat | null)[]> => {
	const user = await getSessionUser();
	if (!user) return [];
	const incomingSenderIds = (await fetchRedis(
		"smembers",
		`chat:${user.id}:incoming_chat_requests`
	)) as string[];
	const senderChats: (Chat | null)[] = await Promise.all(
		incomingSenderIds.map(async (id) => {
			const sender = await getUserById(id);
			if (!sender) return null;
			return {
				id: sortId(user.id, sender.id),
				messages: [],
				chatPartner: sender,
				seenBy: [],
			};
		})
	);
	return senderChats;
};

export const getChats = async (): Promise<(Chat | null)[]> => {
	const user = await getSessionUser();
	if (!user) return [];
	const incomingSenderIds = (await fetchRedis(
		"smembers",
		`chat:${user.id}:chats`
	)) as string[];
	const senderChats: (Chat | null)[] = await Promise.all(
		incomingSenderIds.map(async (id) => {
			const sender = await getUserById(id);
			if (!sender) return null;
			const chatId = sortId(sender.id, user.id);
			const lastMessage = await getLastMessage(chatId);
			return {
				id: sortId(user.id, sender.id),
				lastMessage,
				chatPartner: sender,
				seenBy: lastMessage ? lastMessage.seenBy : [],
			};
		})
	);
	return senderChats;
};

export const getMessages = async (chatId: string) => {
	try {
		const result: string[] = await fetchRedis(
			"zrange",
			`chat:${chatId}:messages`,
			0,
			-1
		);
		const resultMessages: Message[] = result.map((message) =>
			JSON.parse(message)
		);
		const reverseMessages = resultMessages.reverse();
		const messages = MessageArraySchema.parse(reverseMessages);
		return messages;
	} catch (error) {
		console.log(error);
		return [];
	}
};

export const getLastMessage = async (chatId: string) => {
	try {
		const result: string = await fetchRedis(
			"zrange",
			`chat:${chatId}:messages`,
			-1,
			-1
		);
		const lastMessage: Message = JSON.parse(result);
		return lastMessage;
	} catch (error) {
		console.log(error);
	}
};
