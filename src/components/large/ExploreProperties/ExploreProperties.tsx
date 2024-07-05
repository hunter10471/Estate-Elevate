import Heading from "@/components/small/Heading/Heading";
import React from "react";
import CardSlider from "../CardSlider/CardSlider";
import { getAllProperties } from "@/app/actions/propertyActions";

const ExploreProperties = async () => {
	const properties = await getAllProperties();
	return (
		<div className="my-10">
			<Heading text="Explore More Properties" weight="medium" />
			<CardSlider properties={properties} />
		</div>
	);
};

export default ExploreProperties;
