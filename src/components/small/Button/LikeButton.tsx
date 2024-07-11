"use client";
import { addLike, removeLike } from "@/app/actions/propertyActions";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
interface LikeButtonProps {
	isLiked: boolean;
	userId?: string;
	propertyId: string;
}

const LikeButton = ({ isLiked, userId, propertyId }: LikeButtonProps) => {
	const [liked, setLiked] = useState(isLiked);
	const router = useRouter();
	const onLike = async () => {
		try {
			if (!userId) {
				router.push("/auth/login");
				return;
			}
			if (!liked) {
				setLiked(true);
				await addLike(userId, propertyId);
			} else {
				setLiked(false);
				await removeLike(userId, propertyId);
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<button
			onClick={onLike}
			className={`p-1 transition-all rounded-full ease-out hover:scale-110 active:scale-95`}
		>
			{!liked ? (
				<IoHeartOutline
					className={`${liked ? "text-rose-500" : ""} transition-all ease-out`}
					size={25}
				/>
			) : (
				<IoHeart
					className={`${liked ? "text-rose-500" : ""} transition-all ease-out`}
					size={25}
				/>
			)}
		</button>
	);
};

export default LikeButton;
