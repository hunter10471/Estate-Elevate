"use client";
import React, { useEffect, useState } from "react";
import { Chat, SafeUser } from "../../../../utils/types";
import ChatRow from "@/components/small/ChatRow/ChatRow";
import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import { useChat } from "@/context/ChatContext";

interface ChatbarProps {
	sessionUser: SafeUser;
}

const Chatbar = ({ sessionUser }: ChatbarProps) => {
	const { chats, chatRequests, addChat, addChatRequest } = useChat();
	const [requestTab, setRequestTab] = useState(false);
	useEffect(() => {
		pusherClient.subscribe(
			toPusherKey(`chat:${sessionUser.id}:incoming_chat_requests`)
		);
		pusherClient.subscribe(toPusherKey(`chat:${sessionUser.id}:chats`));
		const newChatHandler = (newChat: Chat) => {
			addChat(newChat);
		};
		const chatRequestHandler = async ({ sender }: { sender: SafeUser }) => {
			addChatRequest({ id: "", chatPartner: sender, seenBy: [] });
		};
		pusherClient.bind("incoming_chat_requests", chatRequestHandler);
		pusherClient.bind("new_chat", newChatHandler);
		return () => {
			pusherClient.unsubscribe(
				toPusherKey(`chat:${sessionUser.id}:incoming_chat_requests`)
			);
			pusherClient.unsubscribe(toPusherKey(`chat:${sessionUser.id}:chats`));
			pusherClient.unbind("incoming_chat_requests", chatRequestHandler);
			pusherClient.unbind("new_chat", newChatHandler);
		};
	}, []);
	return (
		<div className="flex flex-col items-center flex-shrink-0 w-[320px] p-2 h-[calc(100vh-120px)] overflow-scroll overflow-x-hidden m-2">
			<div className="flex justify-center gap-2 text-sm mb-5">
				<button
					className={`px-4 py-2 rounded-xl transition-all ${
						!requestTab ? "bg-text text-white" : "text-text hover:bg-gray-300"
					}`}
					onClick={() => setRequestTab(false)}
				>
					Messages
				</button>
				<button
					className={`flex items-center w-fit px-4 py-2 rounded-xl transition-all ${
						requestTab ? "bg-text text-white" : "text-text hover:bg-gray-300"
					}`}
					onClick={() => setRequestTab(true)}
				>
					Requests{" "}
					{chatRequests.length > 0 && (
						<span className="text-xs bg-primary text-white ml-2 flex items-center justify-center w-6 h-6 rounded-full">
							{chatRequests.length}
						</span>
					)}
				</button>
			</div>
			{!requestTab
				? chats.map(
						(chat) =>
							chat && (
								<ChatRow sessionUser={sessionUser} key={chat.id} chat={chat} />
							)
				  )
				: chatRequests.map(
						(chat) =>
							chat && (
								<ChatRow
									sessionUser={sessionUser}
									key={chat.id}
									isRequest={true}
									chat={chat}
								/>
							)
				  )}
		</div>
	);
};

export default Chatbar;
