"use client";
import { Chat, Message, SafeUser } from "../../../../utils/types";
import Image from "next/image";
import { FaCircle } from "react-icons/fa6";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { FaRegCircleCheck } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useChat } from "@/context/ChatContext";
import { useEffect } from "react";
import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";

interface ChatRowProps {
	chat: Chat;
	sessionUser: SafeUser;
	isOpen: boolean;
	isRequest?: boolean;
}

const ChatRow = ({ chat, isRequest, sessionUser, isOpen }: ChatRowProps) => {
	const router = useRouter();
	const { removeChatRequest, updateChatSeenStatus, updateChatLastMessage } =
		useChat();
	const onAccept = async () => {
		try {
			removeChatRequest(chat);
			await fetch(`/api/chat/accept`, {
				method: "POST",
				body: JSON.stringify({ chatPartner: chat.chatPartner }),
			});
		} catch (error) {
			console.log(error);
		}
	};
	const onDeny = async () => {
		try {
			removeChatRequest(chat);
			await fetch(`/api/chat/deny`, {
				method: "POST",
				body: JSON.stringify({ id: chat.chatPartner.id }),
			});
		} catch (error) {
			console.log(error);
		}
	};
	const navigateToChat = () => {
		if (isRequest) {
			return;
		} else {
			router.push(`/chat/${chat.id}`);
			if (!chat.seenBy.includes(sessionUser.id))
				updateChatSeenStatus(chat.id, sessionUser.id);
		}
	};
	const formatTimestamp = (timestamp?: number) => {
		if (!timestamp) return `Invalid timestamp ${timestamp}`;
		return format(timestamp, "HH:mm");
	};
	useEffect(() => {
		pusherClient.subscribe(toPusherKey(`chat:${chat.id}`));
		const messageHandler = async ({ message }: { message: Message }) => {
			updateChatLastMessage(chat.id, message, sessionUser, chat.chatPartner);
		};
		pusherClient.bind("incoming-message", messageHandler);
		return () => {
			pusherClient.unsubscribe(toPusherKey(`chat:${chat.id}`));
			pusherClient.unbind("incoming-message", messageHandler);
		};
	}, []);
	return (
		<div
			onClick={navigateToChat}
			className={`w-full md:max-w-[240px] lg:max-w-[320px] flex gap-4 relative  ${
				isRequest ? "" : "hover:bg-gray-200 cursor-pointer"
			} transition-all p-2 rounded-xl`}
		>
			<div className="relative lg:h-10 md:h-8 h-6 lg:w-10 md:w-8 w-6 rounded-full flex-shrink-0">
				<Image
					src={chat.chatPartner.image || "/no-avatar.jpg"}
					fill
					alt="avatar"
					className="object-cover rounded-full"
				/>
				<FaCircle
					size={8}
					className="text-green-400 absolute -bottom-1 -right-0"
				/>
			</div>
			<div className={`flex-col ${isOpen ? "flex" : "hidden md:flex"}`}>
				<span className="lg:text-base sm:text-sm text-xs font-semibold line-clamp-1">
					{chat.chatPartner.name}
				</span>
				<span
					className={`lg:text-sm text-xs line-clamp-1 ${
						chat.seenBy.includes(sessionUser.id)
							? "text-gray-500"
							: "font-semibold"
					}`}
				>
					{chat.lastMessage?.text || `Started a chat with you!`}
				</span>
			</div>
			<div
				className={`flex-col gap-2 text-right flex-shrink-0 flex-grow ${
					isOpen ? "flex " : "hidden md:flex"
				}`}
			>
				<span className="text-gray-500 lg:text-sm text-xs">
					{formatTimestamp(chat.lastMessage?.timestamp || Date.now())}
				</span>
				{chat.lastMessage?.senderId === sessionUser.id && (
					<span className={`self-end`}>
						<IoCheckmarkDoneOutline
							className={
								chat.seenBy.includes(chat.chatPartner.id)
									? "text-blue-600"
									: "text-gray-500"
							}
							size={20}
						/>
					</span>
				)}
			</div>
			{isRequest && (
				<div className="flex gap-2">
					<button
						onClick={onAccept}
						className="text-green-400 hover:scale-105 transition-all"
					>
						<FaRegCircleCheck size={25} />
					</button>
					<button
						onClick={onDeny}
						className="text-rose-500 hover:scale-105 transition-all"
					>
						<IoMdClose size={25} />
					</button>
				</div>
			)}
		</div>
	);
};

export default ChatRow;
