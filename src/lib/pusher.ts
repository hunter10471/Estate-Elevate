import PusherServer from "pusher";
import PusherClient from "pusher-js";

export const pusherServer = new PusherServer({
	key: "43d82207c48c17f2434f",
	appId: process.env.PUSHER_APP_ID!,
	secret: process.env.PUSHER_APP_SECRET!,
	cluster: "us2",
	useTLS: true,
});

export const pusherClient = new PusherClient("43d82207c48c17f2434f", {
	cluster: "us2",
});
