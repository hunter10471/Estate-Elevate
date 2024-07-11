"use client";
import React, { useState } from "react";
import Button from "./Button";
import { MdOutlineChat } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { Slide, ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";

interface AddChatButtonProps {
	chatPartnerId: string;
	phone: string | null;
}

const AddChatButton = ({ chatPartnerId, phone }: AddChatButtonProps) => {
	const [loading, setLoading] = useState(false);
	const [showPhone, setShowPhone] = useState(false);
	const onAddChat = async () => {
		setLoading(true);
		try {
			await fetch(`/api/chat/add`, {
				method: "POST",
				body: JSON.stringify({ id: chatPartnerId }),
			});
			toast.success("Message request sent successfully!", {
				position: "bottom-left",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
				transition: Slide,
			});
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
		<div className="flex flex-col gap-2 my-2">
			<ToastContainer />
			<div className="flex gap-2 my-2">
				<Button
					loading={loading}
					action={onAddChat}
					icon={<MdOutlineChat size={20} />}
					full
					primary
					text="Chat"
				/>
				<Button
					action={() => setShowPhone((prev) => !prev)}
					icon={<FiPhone size={20} />}
					full
					outline
					text="Call"
				/>
			</div>
			{showPhone && (
				<span className="flex items-center justify-center gap-2 text-center p-2 bg-primary/20 text-primaryDark font-medium rounded-xl">
					<FiPhone size={20} />
					{phone ? phone : "Unavailable"}
				</span>
			)}
		</div>
	);
};

export default AddChatButton;
