import { getProperties } from "@/app/actions/propertyActions";
import { getCurrentUser } from "@/app/actions/userActions";
import ListPropertyModal from "@/components/large/ListPropertyModal/ListPropertyModal";
import Filterbar from "@/components/medium/Filterbar/Filterbar";
import PropertyResult from "@/components/medium/PropertyResult/PropertyResult";
import QueryHeading from "@/components/medium/QueryHeading/QueryHeading";
import Button from "@/components/small/Button/Button";
import SortBy from "@/components/small/SortBy/SortBy";
import React from "react";

const page = async () => {
	const user = await getCurrentUser();
	const properties = await getProperties();
	return (
		<div className="select-none">
			<Filterbar />
			<div className="relative mb-5 lg:mb-10 mt-10 flex justify-between lg:flex-row flex-col">
				<QueryHeading resultNumber={properties && properties.length} />
				<div className="flex flex-col items-end gap-2">
					{user && (
						<ListPropertyModal userId={user.id}>
							<Button text="List Property" primary />
						</ListPropertyModal>
					)}
					<SortBy />
				</div>
			</div>
			<PropertyResult allProperties={properties} />
		</div>
	);
};

export default page;
