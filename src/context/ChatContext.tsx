"use client";
import { createContext, useContext, useState } from "react";
import { Chat, ChatContextType, Message, SafeUser } from "../../utils/types";

const ChatContext = createContext<ChatContextType>({
	chats: [],
	chatRequests: [],
	addChat: (chat: Chat) => {},
	removeChatRequest: (chat: Chat) => {},
	addChatRequest: (chat: Chat) => {},
	updateChatLastMessage: (
		chatId: string,
		message: Message,
		sessionUser: SafeUser,
		chatPartner: SafeUser
	) => {},
	updateChatSeenStatus: (chatId: string, userId: string) => {},
});
export const ChatProvider = ({
	children,
	initialChats,
	initialChatRequests,
}: {
	children: React.ReactNode;
	initialChats: (Chat | null)[];
	initialChatRequests: (Chat | null)[];
}) => {
	const [chats, setChats] = useState(initialChats);
	const [chatRequests, setChatRequests] = useState(initialChatRequests);

	const addChat = (chat: Chat) => {
		setChats((prevChats) => [...prevChats, chat]);
	};

	const updateChatSeenStatus = (chatId: string, userId: string) => {
		setChats((prev) => {
			const chats = [...prev];
			const chatIndex = chats.findIndex((chat) => chat?.id === chatId);
			if (!chats[chatIndex]?.seenBy.includes(userId))
				chats[chatIndex]?.seenBy.push(userId);
			return chats;
		});
	};

	const updateChatLastMessage = (
		chatId: string,
		message: Message,
		sessionUser: SafeUser,
		chatPartner: SafeUser
	) => {
		setChats((prev) => {
			const chatUsers = [message.senderId, message.receiverId];
			if (
				chatUsers.includes(sessionUser.id) &&
				chatUsers.includes(chatPartner.id)
			) {
				const updatedChats = [...prev];
				const chatIndex = updatedChats.findIndex((chat) => chat?.id === chatId);
				const existingChat = updatedChats[chatIndex] as Chat;
				if (existingChat) {
					updatedChats[chatIndex] = {
						...existingChat,
						lastMessage: message,
					};
				}
				return updatedChats;
			}
			return prev;
		});
	};

	const addChatRequest = (chat: Chat) => {
		setChatRequests((prevChats) => [...prevChats, chat]);
	};

	const removeChatRequest = (chat: Chat) => {
		setChatRequests((prev: (Chat | null)[]) =>
			prev.filter((item) => chat.chatPartner.id !== item?.chatPartner.id)
		);
	};

	return (
		<ChatContext.Provider
			value={{
				chats,
				chatRequests,
				addChat,
				removeChatRequest,
				addChatRequest,
				updateChatLastMessage,
				updateChatSeenStatus,
			}}
		>
			{children}
		</ChatContext.Provider>
	);
};

export const useChat = () => {
	return useContext(ChatContext);
};
