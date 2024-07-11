"use client";
import React, { useRef, useState } from "react";
import { Chat, SafeUser } from "../../../../utils/types";
import TextAreaAutoSize from "react-textarea-autosize";
import { BsSend } from "react-icons/bs";
import Button from "../Button/Button";
import { Slide, ToastContainer, toast } from "react-toastify";

interface ChatInputProps {
	chatId: string;
	chatPartner: SafeUser;
}

const ChatInput = ({ chatPartner, chatId }: ChatInputProps) => {
	const [input, setInput] = useState("");
	const [loading, setLoading] = useState(false);
	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	const sendMessage = async () => {
		setLoading(true);
		try {
			await fetch("/api/chat/send", {
				method: "POST",
				body: JSON.stringify({ text: input, chatId: chatId, chatPartner }),
			});
			setInput("");
		} catch (error) {
			console.log(error);
			toast.error("Something went wrong, please try again later.", {
				position: "bottom-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
				transition: Slide,
			});
		} finally {
			setLoading(false);
		}
	};
	return (
		<div className="flex gap-4">
			<ToastContainer />
			<div className="relative flex-1 overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2  focus-within:ring-primaryLight">
				<TextAreaAutoSize
					rows={1}
					value={input}
					onChange={(e) => setInput(e.target.value)}
					className="px-4 py-2 block focus:outline-none w-full resize-none border-0 bg-transparent placeholder:text-gray-400 focus:ring-0 sm:py-1.5 sm:text-sm sm:leading-6 "
					placeholder={`Enter a message to send to ${chatPartner.name}`}
					ref={textAreaRef}
					onKeyDown={(e) => {
						if (e.key === "Enter" && !e.shiftKey) {
							e.preventDefault();
							sendMessage();
						}
					}}
				/>
				<div
					className="py-2"
					aria-hidden="true"
					onClick={() => textAreaRef.current?.focus()}
				>
					<div className="py-px flex justify-end">
						<div className="h-4" />
						<Button
							action={sendMessage}
							loaderColor="#000"
							disabled={input === ""}
							text="Send"
							icon={<BsSend size={20} />}
							loading={loading}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChatInput;
