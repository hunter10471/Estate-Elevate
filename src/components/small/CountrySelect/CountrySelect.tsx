"use client";

import useCountries from "@/hooks/useCountries";
import React from "react";
import Select from "react-select";
import { FormikProps } from "formik";
import { EditProfileFormInputs } from "../../../../utils/validation/EditProfileForm.schema";
import { ListPropertyFormSchemaInputs } from "../../../../utils/validation/ListPropertyForm.schema";

export type CountrySelectValue = {
	flag: string;
	label: string;
	latlng: number[];
	region: string;
	value: string;
};

interface CountrySelectProps<T> {
	formik: FormikProps<T>;
	isDiv?: boolean;
	label?: boolean;
}

const CountrySelect = <
	T extends EditProfileFormInputs | ListPropertyFormSchemaInputs
>({
	formik,
	isDiv,
	label,
}: CountrySelectProps<T>) => {
	const { getAll } = useCountries();
	const value = formik.values.country;
	const error = formik.errors.country;
	const currentCountry = getAll().find((country) => country.label === value);
	return (
		<div className="w-full z-[99999]">
			{label && (
				<label
					className={` text-xs md:text-sm ${
						isDiv ? " text-gray-500 font-normal" : "font-medium"
					}`}
				>
					Country
				</label>
			)}
			<Select
				placeholder="Anywhere"
				isClearable
				options={getAll()}
				value={currentCountry}
				onChange={(value: CountrySelectValue) => {
					formik.setFieldValue("country", value.label);
					formik.setFieldValue("latitude", value.latlng[0]);
					formik.setFieldValue("longitude", value.latlng[1]);
				}}
				className="z-[9999]"
				formatOptionLabel={(option: any) => {
					return (
						<div className="flex flex-row items-center gap-3 w-full z-[9999]">
							<div>{option.flag}</div>
							<div>
								{option.label},{" "}
								<span className="text-neutral-800 ml-1">{option.region}</span>
							</div>
						</div>
					);
				}}
				classNames={{
					control: () =>
						`${
							error ? "border-rose-400" : "border-gray-300"
						} text-sm md:text-base w-full px-4 py-[2px] !focus:outline-none !hover:border-primaryLight !focus:border-primaryLight rounded-lg !hover:border-[2px] !border-[2px] `,
					input: () => "text-sm p-0",
					option: () => "text-sm p-0",
				}}
				theme={(theme) => ({
					...theme,
					borderRadius: 8,
				})}
			/>
			{error && (
				<div className="text-rose-500 text-xs mt-1">{String(error)}</div>
			)}
		</div>
	);
};

export default CountrySelect;
