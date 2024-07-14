"use client";
import React, { useEffect, useState } from "react";
import { Chat, SafeUser } from "../../../../utils/types";
import ChatRow from "@/components/small/ChatRow/ChatRow";
import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import { useChat } from "@/context/ChatContext";
import { FaArrowRight } from "react-icons/fa";

interface ChatbarProps {
	sessionUser: SafeUser;
}

const Chatbar = ({ sessionUser }: ChatbarProps) => {
	const { chats, chatRequests, addChat, addChatRequest } = useChat();
	const [open, setOpen] = useState(false);
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
		<div
			className={`flex flex-col items-center relative flex-shrink-0 transition-all ease-in-out ${
				open ? "w-full" : "w-[11%] md:w-full"
			} max-w-[320px] min-w-[60px] p-2 h-[calc(100vh-120px)] overflow-scroll overflow-x-hidden m-2`}
		>
			<div className="justify-end w-full px-3 py-1 md:hidden flex">
				<button
					className={`transition-all ${open ? "rotate-180" : ""}`}
					onClick={() => setOpen((prev) => !prev)}
				>
					<FaArrowRight />
				</button>
			</div>
			<div
				className={`transition-all ${
					open ? "" : "opacity-0 md:opacity-100"
				} flex justify-center gap-2 mb-5 lg:text-sm text-xs`}
			>
				<button
					className={`px-2 lg:px-4 py-2 rounded-xl transition-all ${
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
								<ChatRow
									isOpen={open}
									sessionUser={sessionUser}
									key={chat.id}
									chat={chat}
								/>
							)
				  )
				: chatRequests.map(
						(chat) =>
							chat && (
								<ChatRow
									isOpen={open}
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
