import { nanoid } from "nanoid";
import React from "react";
import {
	FaFacebookF,
	FaTwitter,
	FaYoutube,
	FaGoogle,
	FaInstagram,
	FaLinkedinIn,
} from "react-icons/fa";

const SocialRow = () => {
	const socialsArr = [
		FaFacebookF,
		FaTwitter,
		FaYoutube,
		FaGoogle,
		FaInstagram,
		FaLinkedinIn,
	];
	return (
		<div className="flex gap-2 w-fit">
			{socialsArr.map((Icon) => (
				<span
					key={nanoid()}
					className="bg-white/20 p-2 rounded-full text-white cursor-pointer hover:bg-primaryLight"
				>
					{<Icon size={15} />}
				</span>
			))}
		</div>
	);
};

export default SocialRow;
