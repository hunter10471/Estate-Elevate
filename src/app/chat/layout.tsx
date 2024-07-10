import React from "react";
import { getChatRequests, getChats } from "../actions/chatActions";
import Chatbar from "@/components/medium/Chatbar/Chatbar";
import { getSessionUser } from "../../../utils/helpers";
import { notFound } from "next/navigation";

const layout = async ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	const chats = await Promise.all([getChats(), getChatRequests()]);
	const sessionUser = await getSessionUser();
	if (!sessionUser) return notFound();
	return (
		<div className="flex gap-4">
			<Chatbar
				sessionUser={sessionUser}
				chats={chats[0]}
				chatRequests={chats[1]}
			/>
			<div className="w-full">{children}</div>
		</div>
	);
};

export default layout;
