import React from "react";
import { getChatRequests, getChats } from "../actions/chatActions";
import Chatbar from "@/components/medium/Chatbar/Chatbar";
import { getSessionUser } from "../../../utils/helpers";
import { notFound } from "next/navigation";
import { ChatProvider } from "@/context/ChatContext";

const layout = async ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	const chats = await Promise.all([getChats(), getChatRequests()]);
	const sessionUser = await getSessionUser();
	if (!sessionUser) return notFound();
	return (
		<ChatProvider initialChatRequests={chats[1]} initialChats={chats[0]}>
			<div className="flex gap-4">
				<Chatbar sessionUser={sessionUser} />
				<div className="w-full">{children}</div>
			</div>
		</ChatProvider>
	);
};

export default layout;
