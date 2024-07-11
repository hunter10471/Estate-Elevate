import { db } from "@/lib/redis.db";
import { fetchRedis, getSessionUser } from "../../../../../utils/helpers";
import { Message, SafeUser } from "../../../../../utils/types";
import { nanoid } from "nanoid";
import { pusherServer } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";

export async function POST(req: Request) {
	try {
		const {
			text,
			chatId,
			chatPartner,
			existingMessage,
		}: {
			text: string;
			chatId: string;
			chatPartner: SafeUser;
			existingMessage: Message;
		} = await req.json();
		const user = await getSessionUser();
		if (!user) return new Response("Unauthorized action", { status: 401 });
		const [id1, id2] = chatId.split("--");
		if (user.id !== id1 && user.id !== id2) {
			return new Response("Unauthorized action", { status: 401 });
		}
		const chatList: string[] = await fetchRedis(
			"smembers",
			`chat:${user.id}:chats`
		);
		const chatExists = chatList.includes(chatPartner.id);
		if (!chatExists) {
			return new Response("Unauthorized action", { status: 401 });
		}
		const timestamp = Date.now();
		let seenBy = [user.id];
		let messageData: Message;
		if (existingMessage) {
			seenBy.push(chatPartner.id);
			const updatedExistingMessage = existingMessage;
			updatedExistingMessage.seenBy = seenBy;
			messageData = updatedExistingMessage;
		} else {
			messageData = {
				id: nanoid(),
				text,
				timestamp,
				senderId: user.id,
				receiverId: chatPartner.id,
				seenBy,
			};
		}
		if (existingMessage) {
			await db.zremrangebyrank(`chat:${chatId}:messages`, -1, -1);
		} else {
			pusherServer.trigger(toPusherKey(`chat:${chatId}`), "incoming-message", {
				message: messageData,
			});
		}
		await db.zadd(`chat:${chatId}:messages`, {
			score: timestamp,
			member: JSON.stringify(messageData),
		});
		return new Response("OK");
	} catch (error) {
		console.log(error);
		return new Response("There was an error sending a message", {
			status: 500,
		});
	}
}
