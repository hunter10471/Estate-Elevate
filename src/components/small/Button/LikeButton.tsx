"use client";
import React, { useState } from "react";
import { IoHeartOutline } from "react-icons/io5";
import { IoHeartSharp } from "react-icons/io5";
interface LikeButtonProps {
	isLiked: boolean;
}

const LikeButton = ({ isLiked }: LikeButtonProps) => {
	const [liked, setLiked] = useState(isLiked);
	return (
		<button
			onClick={() => setLiked((prev) => !prev)}
			className={`p-1 transition-all rounded-full border-2 border-gray-300 ease-out hover:scale-110 active:scale-95 ${
				liked ? "bg-rose-300" : ""
			}`}
		>
			<IoHeartOutline
				className={`${liked ? "text-rose-500" : ""} transition-all ease-out`}
				size={20}
			/>
		</button>
	);
};

export default LikeButton;
