import { ZodError } from "zod";
import { sendNotificationSchema } from "../../../../utils/validation/Notification.schema";
import prisma from "@/lib/prisma";
import { Notification } from "../../../../utils/types";
import { nanoid } from "nanoid";
import { pusherServer } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import { db } from "@/lib/redis.db";

export async function POST(req: Request) {
	try {
		const body = await req.json();
		let property;
		const { receiverId, senderId, propertyId, type } =
			sendNotificationSchema.parse(body);
		const sender = await prisma.user.findUnique({ where: { id: senderId } });
		const reciever = await prisma.user.findUnique({
			where: { id: receiverId },
		});

		if (!sender && !reciever) {
			return new Response(
				"You can only send notifications to users who exist",
				{
					status: 403,
				}
			);
		}
		if (propertyId) {
			property = await prisma.property.findUnique({
				where: { id: propertyId },
			});
		}
		const timestamp = Date.now();
		const notification: Notification = {
			id: nanoid(),
			receiverId,
			senderId,
			propertyId,
			type,
			timestamp,
		};
		await db.zadd(`notification:${receiverId}`, {
			score: timestamp,
			member: JSON.stringify(notification),
		});
		if (sender) {
			const { password, ...others } = sender;
			pusherServer.trigger(
				toPusherKey(`notification:${receiverId}`),
				"incoming-notification",
				{
					notification: { ...notification, sender: others, property },
				}
			);
		}
		return new Response("OK");
	} catch (error) {
		console.log(error);
		if (error instanceof ZodError) {
			return new Response("Invalid payload sent", { status: 422 });
		}
		return new Response("There was an error processing your request", {
			status: 500,
		});
	}
}
