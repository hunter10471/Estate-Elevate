"use client";

import { useState } from "react";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";

interface InputProps {
	type: "email" | "password" | "text";
	placeholder?: string;
	label: string;
}

const Input = ({ type, placeholder, label }: InputProps) => {
	const [open, setOpen] = useState(false);
	return (
		<div className="flex flex-col gap-1">
			<label className="font-medium">{label}</label>
			<div className="relative">
				{type === "password" && (
					<button className="absolute right-4 top-3">
						{open ? (
							<LuEye
								onClick={() => setOpen(false)}
								size={18}
								className="text-gray-400"
							/>
						) : (
							<LuEyeOff
								onClick={() => setOpen(true)}
								size={18}
								className="text-gray-400"
							/>
						)}
					</button>
				)}
				<input
					className="w-full px-4 py-2 focus:outline-none hover:border-primaryLight focus:border-primaryLight rounded-lg border-2 border-gray-300"
					placeholder={placeholder}
					type={type === "password" ? (open ? "text" : "password") : type}
				/>
			</div>
		</div>
	);
};

export default Input;
