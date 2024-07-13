"use client";
import React, { useEffect, useRef, useState } from "react";
import { Message, SafeUser } from "../../../../utils/types";
import { format } from "date-fns";
import Image from "next/image";
import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import { useChat } from "@/context/ChatContext";

interface ChatMessagesProps {
	initialMessages: Message[];
	sessionUser: SafeUser;
	chatPartner: SafeUser;
	chatId: string;
}

const ChatMessages = ({
	initialMessages,
	sessionUser,
	chatPartner,
	chatId,
}: ChatMessagesProps) => {
	const scrollDownRef = useRef<HTMLDivElement>(null);
	const [messages, setMessages] = useState(initialMessages);
	const { updateChatLastMessage } = useChat();
	useEffect(() => {
		pusherClient.subscribe(toPusherKey(`chat:${chatId}`));
		const messageHandler = ({ message }: { message: Message }) => {
			setMessages((prev) => [message, ...prev]);
			updateChatLastMessage(chatId, message, sessionUser, chatPartner);
		};
		pusherClient.bind("incoming-message", messageHandler);
		return () => {
			pusherClient.unsubscribe(toPusherKey(`chat:${chatId}`));
			pusherClient.unbind("incoming-message", messageHandler);
			if (messages.length > 0) {
				const lastMessage = messages[0];
				const messageSender =
					lastMessage.senderId === sessionUser.id ? sessionUser : chatPartner;
				if (
					(!lastMessage.seenBy.includes(sessionUser.id) ||
						!lastMessage.seenBy.includes(chatPartner.id)) &&
					lastMessage.senderId !== sessionUser.id
				) {
					fetch("/api/chat/send", {
						method: "POST",
						body: JSON.stringify({
							text: lastMessage.text,
							chatId: chatId,
							chatPartner: messageSender,
							existingMessage: lastMessage,
						}),
					});
				}
			}
		};
	}, []);
	const formatTimestamp = (timestamp: number) => {
		if (!timestamp) return `Invalid timestamp ${timestamp}`;
		return format(timestamp, "HH:mm");
	};
	return (
		<div className="flex flex-1 flex-col-reverse gap-4 p-3 h-full overflow-y-scroll overflow-x-hidden my-2">
			<div ref={scrollDownRef} />
			{messages.map((message, index) => {
				const isCurrentUser = message.senderId === sessionUser.id;
				const hasNextMessageFromSameUser =
					messages[index - 1]?.senderId === messages[index]?.senderId;

				return (
					<div
						className={`flex items-end  ${
							isCurrentUser ? "justify-end " : "flex-row-reverse justify-end"
						}`}
						key={`${message.id}`}
					>
						<div
							className={`flex flex-col max-w-xs mx-2 ${
								isCurrentUser ? "items-end" : "items-start"
							}`}
						>
							<span
								className={`px-4 py-2 rounded-lg text-sm inline-block ${
									isCurrentUser ? "bg-primary text-white" : "bg-gray-300"
								} ${
									!hasNextMessageFromSameUser && isCurrentUser
										? "rounded-br-none"
										: ""
								} ${
									!hasNextMessageFromSameUser && !isCurrentUser
										? "rounded-bl-none"
										: ""
								} `}
							>
								{message.text}
								<span
									className={`ml-2 text-xs ${
										isCurrentUser ? "text-white/70" : "text-gray-500"
									}`}
								>
									{formatTimestamp(message.timestamp)}
								</span>
							</span>
						</div>
						<div
							className={`relative w-10 h-10 ${
								hasNextMessageFromSameUser ? "invisible" : ""
							}  `}
						>
							<Image
								src={
									(isCurrentUser ? sessionUser.image : chatPartner.image) ||
									"/no-avatar.jpg"
								}
								alt="avatar"
								fill
								referrerPolicy="no-referrer"
								className="rounded-full object-cover"
							/>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default ChatMessages;
