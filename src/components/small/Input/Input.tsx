"use client";

import { Field } from "formik";
import { useState } from "react";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { BsCurrencyDollar } from "react-icons/bs";

interface InputProps {
	type: "email" | "password" | "text";
	name: string;
	placeholder?: string;
	label?: string;
	defaultValue?: string;
	isDiv?: boolean;
	error?: string;
	dollar?: boolean;
}

const Input = ({
	type,
	name,
	placeholder,
	label,
	defaultValue,
	isDiv,
	error,
	dollar,
}: InputProps) => {
	const [open, setOpen] = useState(false);
	return (
		<div className="flex flex-col gap-1 w-full">
			<label
				className={` text-xs md:text-sm ${
					isDiv ? " text-gray-500 font-normal" : "font-medium"
				}`}
			>
				{label}
			</label>
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
				{isDiv ? (
					<div className="font-medium">{defaultValue}</div>
				) : (
					<div className="flex flex-col gap-1 relative">
						{dollar && (
							<BsCurrencyDollar
								className="text-text absolute left-2 top-[10px]"
								size={20}
							/>
						)}
						<Field
							as={name === "description" ? "textarea" : undefined}
							rows={8}
							className={`${
								error ? "border-rose-400" : "border-gray-300"
							} text-sm md:text-base w-full  px-4 py-2 ${
								dollar ? "pl-8" : ""
							} focus:outline-none hover:border-primaryLight focus:border-primaryLight rounded-lg border-2 `}
							placeholder={placeholder}
							defaultValue={defaultValue}
							type={type === "password" ? (open ? "text" : "password") : type}
							name={name}
						/>
						{error && (
							<span className="text-xs text-rose-500 w-[95%] text-justify">
								{error}
							</span>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default Input;
