"use client";
import React from "react";
import { ListPropertyFormSchemaInputs } from "../../../../utils/validation/ListPropertyForm.schema";
import { FormikProps } from "formik";

interface FacilityProps {
	facilityKey: string;
	listing?: boolean;
	facility: { title: string; icon: React.ReactNode };
	selected?: boolean;
	formik?: FormikProps<ListPropertyFormSchemaInputs>;
}

const Facility = ({
	facilityKey,
	facility,
	listing,
	selected,
	formik,
}: FacilityProps) => {
	const handleClick = (facility: string) => {
		if (formik) {
			const facilitiesArr = formik.values.facilities;
			if (facilitiesArr && facilitiesArr.length > 0) {
				const inArray = formik.values.facilities.includes(facility);
				if (inArray) {
					const filteredArr = facilitiesArr.filter((item) => item !== facility);
					formik.setFieldValue("facilities", filteredArr);
				} else {
					formik.setFieldValue("facilities", [
						...formik.values.facilities,
						facility,
					]);
				}
			} else {
				formik.setFieldValue("facilities", [facility]);
			}
		} else return;
	};
	return (
		<span
			onClick={() => handleClick(facilityKey)}
			key={facility.title}
			className={` p-2 flex gap-2 border-2 items-center border-transparent transition-all ${
				listing ? "cursor-pointer hover:border-gray-300 justify-center" : ""
			} ${
				listing && selected ? "bg-gray-300" : ""
			} rounded-full  text-xs md:text-sm flex items-center gap-2  w-[45%] sm:w-[30%] md:w-1/4 lg:w-1/5`}
		>
			{facility.icon} {facility.title}
		</span>
	);
};

export default Facility;
