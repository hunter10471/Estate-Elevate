"use client";
import React, { useState } from "react";

interface PropertyDescriptionProps {
	description: string;
}

const PropertyDescription = ({ description }: PropertyDescriptionProps) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const toggleReadMore = () => {
		setIsExpanded(!isExpanded);
	};
	return (
		<div>
			<p
				className={`text-sm text-gray-600 mt-2 mb-1 text-justify ${
					isExpanded ? "" : "line-clamp-4"
				}`}
			>
				{description}
			</p>
			<button
				onClick={toggleReadMore}
				className="text-sm font-medium text-primary hover:text-primaryDark"
			>
				{isExpanded ? "Read Less" : "Read More"}
			</button>
		</div>
	);
};

export default PropertyDescription;
