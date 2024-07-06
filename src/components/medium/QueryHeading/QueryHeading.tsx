"use client";
import Heading from "@/components/small/Heading/Heading";
import useStore from "@/store/store";
import { useQueryState } from "nuqs";
import React, { useEffect, useState } from "react";

interface QueryHeadingProps {
	resultNumber?: number;
}

const QueryHeading = ({ resultNumber }: QueryHeadingProps) => {
	const [query, setQuery] = useQueryState("query");
	const [numberOfResults, setNumberOfResults] = useState(resultNumber);
	const results = useStore((state) => state.numberOfResults);
	const capitalizeFirstLetter = (text?: string) => {
		if (text) return text.charAt(0).toUpperCase() + text.slice(1);
	};
	useEffect(() => {
		setNumberOfResults(Number(results));
	}, [results]);
	return (
		<div>
			<Heading
				text={
					query
						? `Properties found for ${capitalizeFirstLetter(query)}`
						: "Showing All Available Properties"
				}
			/>
			<span className="text-xs lg:text-sm text-gray-400 font-medium">
				{numberOfResults?.toLocaleString("en-US")} Results found
			</span>
		</div>
	);
};

export default QueryHeading;
