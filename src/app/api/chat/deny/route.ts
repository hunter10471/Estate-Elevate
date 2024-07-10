import { db } from "@/lib/redis.db";
import { fetchRedis, getSessionUser } from "../../../../../utils/helpers";
import { AddChatSchema as DenyChatSchema } from "../../../../../utils/validation/Chat.schema";

export async function POST(req: Request) {
	try {
		const user = await getSessionUser();
		if (!user) return new Response("Unauthorized action.", { status: 401 });
		const body = await req.json();
		const { id } = DenyChatSchema.parse(body);
		const hasChatRequest = await fetchRedis(
			"sismember",
			`chat:${user.id}:incoming_chat_requests`,
			id
		);
		if (!hasChatRequest) {
			return new Response("You cannot deny a request without a valid request", {
				status: 400,
			});
		}
		await db.srem(`chat:${user.id}:incoming_chat_requests`, id);
		return new Response("OK");
	} catch (error) {
		console.log(error);
		return new Response();
	}
}
