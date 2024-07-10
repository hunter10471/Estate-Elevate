import Image from "next/image";
import React from "react";
import { Message, SafeUser } from "../../../../utils/types";
import ChatMessages from "@/components/medium/ChatMessages/ChatMessages";
import ChatInput from "@/components/small/Input/ChatInput";

interface ChatWindowProps {
	initialMessages: Message[];
	sessionUser: SafeUser;
	chatPartner: SafeUser;
	chatId: string;
	isMainPage?: boolean;
}

const ChatWindow = ({
	isMainPage,
	chatPartner,
	initialMessages,
	sessionUser,
	chatId,
}: ChatWindowProps) => {
	return (
		<div className="w-full max-w-[800px] h-[calc(100vh-150px)]">
			{!isMainPage ? (
				<div className="flex flex-col justify-between h-full ">
					{" "}
					<div className="flex gap-5 items-center">
						<div className="relative h-14 w-14">
							<Image
								src={chatPartner.image || "/no-avatar.jpg"}
								fill
								alt="avatar"
								className="rounded-full"
							/>
						</div>
						<h2 className="font-semibold text-lg">{chatPartner.name}</h2>
					</div>
					<ChatMessages
						sessionUser={sessionUser}
						initialMessages={initialMessages}
						chatPartner={chatPartner}
						chatId={chatId}
					/>
					<ChatInput chatId={chatId} chatPartner={chatPartner} />
				</div>
			) : (
				<div className="flex flex-col w-full h-full items-center justify-center opacity-80">
					<div className="relative w-[350px] h-[300px] grayscale-[5]">
						<Image src={"/chat.png"} fill alt="no-chat" />
					</div>
					<h1 className="text-lg font-medium text-gray-400">
						Nothing to show here, select a chat to start talking.
					</h1>
				</div>
			)}
		</div>
	);
};

export default ChatWindow;
