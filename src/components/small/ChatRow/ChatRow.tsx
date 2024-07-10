"use client";
import React, { SetStateAction } from "react";
import { Chat, SafeUser } from "../../../../utils/types";
import Image from "next/image";
import { FaCircle } from "react-icons/fa6";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { FaRegCircleCheck } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

interface ChatRowProps {
	chat: Chat;
	setChatRequests: SetStateAction<any>;
	sessionUser: SafeUser;
	isRequest?: boolean;
}

const ChatRow = ({
	chat,
	isRequest,
	setChatRequests,
	sessionUser,
}: ChatRowProps) => {
	const router = useRouter();
	const onAccept = async () => {
		try {
			setChatRequests((prev: (Chat | null)[]) =>
				prev.filter((item) => chat.chatPartner.id !== item?.chatPartner.id)
			);
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
			setChatRequests((prev: (Chat | null)[]) =>
				prev.filter((item) => chat.chatPartner.id !== item?.chatPartner.id)
			);
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
		}
	};
	const formatTimestamp = (timestamp?: number) => {
		if (!timestamp) return `Invalid timestamp ${timestamp}`;
		return format(timestamp, "HH:mm");
	};
	console.log(chat.seenBy.push(sessionUser.id));
	return (
		<div
			onClick={navigateToChat}
			className={`w-full flex gap-4  ${
				isRequest ? "" : "hover:bg-gray-200 cursor-pointer"
			} transition-all p-2 rounded-xl`}
		>
			<div className="relative h-10 w-10 rounded-full flex-shrink-0">
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
			<div className="flex flex-col w-full">
				<span className="font-semibold">{chat.chatPartner.name}</span>
				<span
					className={`text-sm line-clamp-1 ${
						chat.seenBy.includes(sessionUser.id)
							? "text-gray-500"
							: "font-semibold"
					}`}
				>
					{chat.lastMessage?.text || `Started a chat with you!`}
				</span>
			</div>
			<div className="flex flex-col gap-2">
				<span className="text-gray-500 text-sm">
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
