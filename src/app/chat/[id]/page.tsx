import ChatWindow from "@/components/large/ChatWindow/ChatWindow";
import React from "react";
import { getSessionUser } from "../../../../utils/helpers";
import { notFound } from "next/navigation";
import { getUserById } from "@/app/actions/userActions";
import { getMessages } from "@/app/actions/chatActions";

interface PageProps {
	params: { id: string };
}

const page = async ({ params: { id } }: PageProps) => {
	const [user1, user2] = id.split("--");
	const user = await getSessionUser();
	if (!user) {
		return notFound();
	}
	const chatPartnerId = user.id === user1 ? user2 : user1;
	const chatPartner = await getUserById(chatPartnerId);
	if (!chatPartner) {
		return notFound();
	}
	const initialMessages = await getMessages(id);
	return (
		<ChatWindow
			sessionUser={user}
			initialMessages={initialMessages}
			chatPartner={chatPartner}
			chatId={id}
		/>
	);
};

export default page;
