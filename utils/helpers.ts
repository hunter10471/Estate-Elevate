import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";

export const getSessionUser = async () => {
	const session = await getServerSession();
	if (session?.user) {
		const user = await prisma.user.findUnique({
			where: { email: session.user.email },
		});
		if (user?.password) {
			const { password, ...others } = user;
			return others;
		}
		return user;
	}
	return null;
};

const upstashRedisUrl = process.env.UPSTASH_REDIS_REST_URL;
const authToken = process.env.UPSTASH_REDIS_REST_TOKEN;

type Command = "zrange" | "sismember" | "get" | "smembers";

export async function fetchRedis(
	command: Command,
	...args: (string | number)[]
) {
	const commandUrl = `${upstashRedisUrl}/${command}/${args.join("/")}`;
	const response = await fetch(commandUrl, {
		headers: {
			Authorization: `Bearer ${authToken}`,
		},
		cache: "no-store",
	});
	if (!response.ok) {
		throw new Error(`Error execuing redis command: ${response.statusText}`);
	}
	const data = await response.json();
	return data.result;
}

export const sortId = (id1: string, id2: string) => {
	const sortedIds = [id1, id2].sort();
	return `${sortedIds[0]}--${sortedIds[1]}`;
};
