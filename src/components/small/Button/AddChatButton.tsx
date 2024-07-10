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
}

const AddChatButton = ({ chatPartnerId }: AddChatButtonProps) => {
	const [loading, setLoading] = useState(false);
	const router = useRouter();
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
		<div className="flex gap-2 my-2">
			<ToastContainer />
			<Button
				loading={loading}
				action={onAddChat}
				icon={MdOutlineChat}
				full
				primary
				text="Chat"
			/>
			<Button icon={FiPhone} full outline text="Call" />
		</div>
	);
};

export default AddChatButton;
