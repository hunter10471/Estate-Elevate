import { getServerSession } from "next-auth";
import { AddChatSchema } from "../../../../../utils/validation/Chat.schema";
import { fetchRedis, getSessionUser } from "../../../../../utils/helpers";
import { db } from "@/lib/redis.db";
import { ZodError } from "zod";
import { pusherServer } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";

export async function POST(req: Request) {
	try {
		const session = await getSessionUser();
		if (!session) {
			return new Response(
				"An active session is required to be able to add new chats.",
				{ status: 401 }
			);
		}
		const userId = session.id;
		const body = await req.json();
		const parsedBody = AddChatSchema.parse(body);
		const { id } = parsedBody;
		if (id === userId) {
			return new Response("You cannot add a chat with yourself.", {
				status: 400,
			});
		}
		const ifAlreadyAdded = await fetchRedis(
			"sismember",
			`chat:${id}:incoming_chat_requests`,
			userId
		);
		if (ifAlreadyAdded) {
			return new Response("Already added this user", { status: 400 });
		}

		const ifChatExists = await fetchRedis(
			"sismember",
			`chat:${userId}:chats`,
			id
		);
		if (ifChatExists) {
			return new Response("Already have a chat with this user", {
				status: 400,
			});
		}
		await db.sadd(`chat:${id}:incoming_chat_requests`, userId);
		pusherServer.trigger(
			toPusherKey(`chat:${id}:incoming_chat_requests`),
			"incoming_chat_requests",
			{ sender: session }
		);
		return new Response("OK");
	} catch (error) {
		if (error instanceof ZodError) {
			return new Response("Invalid payload", { status: 422 });
		}
		console.log(error);
		return new Response("An error occured please try again later", {
			status: 500,
		});
	}
}
