"use client";
import React, { useState } from "react";

interface PropertyDescriptionProps {
	description: string;
}

const PropertyDescription = () => {
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
				Discover your dream coastal getaway with this stunning Seaside Villa!
				Nestled right by the ocean, this beautiful home offers breathtaking
				views and a serene atmosphere. With four spacious bedrooms and three
				modern bathrooms, there’s plenty of room for family and friends. Enjoy
				cooking in the sleek, fully-equipped kitchen or relax in the stylish
				living area that opens up to a private terrace. Imagine sipping your
				morning coffee or watching sunsets over the water from your very own
				slice of paradise. The villa also features a refreshing pool and lush
				garden, perfect for unwinding or entertaining.
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
