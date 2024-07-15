"use client";
import { FormikProps } from "formik";
import React, { useEffect, useState } from "react";
import { ListPropertyFormSchemaInputs } from "../../../../utils/validation/ListPropertyForm.schema";
import { CiCircleMinus } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import { IconType } from "react-icons";

interface CounterInputProps {
	title: string;
	subtitle: string;
	name: string;
	formik: FormikProps<ListPropertyFormSchemaInputs>;
	icon: IconType;
	intialValue?: number;
	noButtons?: boolean;
}

const CounterInput = ({
	title,
	subtitle,
	intialValue,
	formik,
	name,
	icon: Icon,
	noButtons,
}: CounterInputProps) => {
	const [value, setValue] = useState(intialValue || 1);

	const add = () => {
		setValue((prev) => prev + 1);
	};

	const minus = () => {
		if (value !== 1) setValue((prev) => prev - 1);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		setValue(Number(newValue));
	};

	useEffect(() => {
		formik.setFieldValue(name, value);
	}, [value]);

	return (
		<div className="flex items-end justify-between gap-6 my-4">
			<div>
				<h1 className="flex items-center gap-2 font-medium">
					<Icon className="text-primaryDark mb-[2px]" size={25} />
					{title}
				</h1>
				<p className="text-sm">{subtitle}</p>
			</div>
			<div className="flex items-center w-[170px] justify-center gap-2 text-gray-500">
				{!noButtons && (
					<button
						className="hover:text-gray-700 rounded-full transition-all"
						onClick={minus}
						type="button"
					>
						<CiCircleMinus size={35} />
					</button>
				)}
				<input
					inputMode="numeric"
					className={`text-[18px] w-[90px] text-center border-gray-300 focus:outline-none focus:border-primaryLight hover:border-primaryLight border-2 rounded-xl p-2`}
					value={value}
					onChange={handleChange}
				/>
				{!noButtons && (
					<button
						className="hover:text-gray-700 rounded-full transition-all "
						onClick={add}
						type="button"
					>
						<CiCirclePlus size={35} />
					</button>
				)}
			</div>
		</div>
	);
};

export default CounterInput;
