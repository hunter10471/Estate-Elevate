import Heading from "@/components/small/Heading/Heading";
import React from "react";
import CardSlider from "../CardSlider/CardSlider";

const ExploreProperties = () => {
	return (
		<div className="my-10">
			<Heading text="Explore More Properties" weight="medium" />
			<CardSlider />
		</div>
	);
};

export default ExploreProperties;
