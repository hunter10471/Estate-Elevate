import { getCurrentUser } from "@/actions/userActions";
import ListPropertyModal from "@/components/large/ListPropertyModal/ListPropertyModal";
import Filterbar from "@/components/medium/Filterbar/Filterbar";
import PropertyResult from "@/components/medium/PropertyResult/PropertyResult";
import Button from "@/components/small/Button/Button";
import Heading from "@/components/small/Heading/Heading";
import SortBy from "@/components/small/SortBy/SortBy";
import React from "react";

const page = async () => {
	const user = await getCurrentUser();
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
				<div className="flex flex-col items-end gap-2">
					{user && (
						<ListPropertyModal userId={user.id}>
							<Button text="List Property" primary />
						</ListPropertyModal>
					)}
					<SortBy />
				</div>
			</div>
			<PropertyResult />
		</div>
	);
};

export default page;
