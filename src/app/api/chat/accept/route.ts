import { db } from "@/lib/redis.db";
import {
	fetchRedis,
	getSessionUser,
	sortId,
} from "../../../../../utils/helpers";
import { AddChatSchema as AcceptChatSchema } from "../../../../../utils/validation/Chat.schema";
import { ZodError } from "zod";
import { pusherServer } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";

export async function POST(req: Request) {
	try {
		const user = await getSessionUser();
		if (!user) return new Response("Unauthorized action.", { status: 401 });
		const { chatPartner } = await req.json();
		const chatExists = await fetchRedis(
			"sismember",
			`chat:${user.id}:chats`,
			chatPartner.id
		);
		if (chatExists) {
			return new Response("Chat already exists", { status: 400 });
		}
		const hasChatRequest = await fetchRedis(
			"sismember",
			`chat:${user.id}:incoming_chat_requests`,
			chatPartner.id
		);
		if (!hasChatRequest) {
			return new Response(
				"You must send a request first before adding a user.",
				{ status: 400 }
			);
		}
		pusherServer.trigger(toPusherKey(`chat:${user.id}:chats`), "new_chat", {
			id: sortId(user.id, chatPartner.id),
			messages: [],
			chatPartner,
			seen: false,
		});
		await db.sadd(`chat:${user.id}:chats`, chatPartner.id);
		await db.sadd(`chat:${chatPartner.id}:chats`, user.id);
		await db.srem(`chat:${user.id}:incoming_chat_requests`, chatPartner.id);
		return new Response("OK");
	} catch (error) {
		console.log(error);
		if (error instanceof ZodError) {
			return new Response("Invalid request payload", { status: 422 });
		}
		return new Response("An error occured please try again later", {
			status: 500,
		});
	}
}
