import Heading from "@/components/small/Heading/Heading";
import React from "react";
import CardSlider from "../CardSlider/CardSlider";
import { getProperties } from "@/app/actions/propertyActions";
import { getSessionUser } from "../../../../utils/helpers";

const ExploreProperties = async () => {
	const properties = await getProperties(null, null, null, null, null, null, 5);
	const user = await getSessionUser();
	return (
		<div className="my-10">
			<Heading text="Explore More Properties" weight="medium" />
			<CardSlider user={user} data={properties} />
		</div>
	);
};

export default ExploreProperties;
