"use client";
import React, { useState } from "react";
import Card from "../Card/Card";
import Map from "../Map/Map";
import useStore from "@/store/store";

const PropertyResult = () => {
	const [fullWidth, setFullWidth] = useState(false);
	const isMap = useStore((state) => state.isMap);

	return (
		<div className={`flex ${!isMap ? "" : "lg:gap-10"} mb-5 transition-all`}>
			<div
				className={`flex justify-between md:justify-normal ${
					fullWidth && isMap ? "w-[0%] opacity-0" : "w-full opacity-100"
				} transition-all duration-500 ease-out flex-wrap  p-2 gap-3 md:gap-10 ${
					!isMap
						? "overflow-visible"
						: "md:overflow-scroll md:overflow-x-hidden md:h-[650px]"
				} `}
			>
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
			</div>

			<div
				className={` h-[650px] transition-all  duration-500 ease-out hidden lg:block ${
					!isMap ? "w-[0%] opacity-0" : "lg:w-[80%] xl:w-full opacity-100"
				}`}
			>
				<Map setFullWidth={setFullWidth} fullWidth={fullWidth} />
			</div>
		</div>
	);
};

export default PropertyResult;
