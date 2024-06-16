import Filterbar from "@/components/medium/Filterbar/Filterbar";
import PropertyResult from "@/components/medium/PropertyResult/PropertyResult";
import Heading from "@/components/small/Heading/Heading";
import SortBy from "@/components/small/SortBy/SortBy";
import React from "react";

const page = () => {
	return (
		<div className="select-none">
			<Filterbar />
			<div className="relative mb-5 lg:mb-10 mt-10 flex justify-between lg:flex-row flex-col">
				<div>
					<Heading text="Malir Cantt, Karachi Homes for Sale" />
					<span className="text-xs lg:text-sm text-gray-400 font-medium">
						10,595 results found
					</span>
				</div>
				<SortBy />
			</div>
			<PropertyResult />
		</div>
	);
};

export default page;
