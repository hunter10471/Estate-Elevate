import Heading from "@/components/small/Heading/Heading";
import React from "react";
import CardSlider from "../CardSlider/CardSlider";
import { getProperties } from "@/app/actions/propertyActions";

const ExploreProperties = async () => {
	const properties = await getProperties(null, null, null, null, null, null, 5);
	return (
		<div className="my-10">
			<Heading text="Explore More Properties" weight="medium" />
			<CardSlider data={properties} />
		</div>
	);
};

export default ExploreProperties;
