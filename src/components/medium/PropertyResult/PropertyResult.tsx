"use client";
import React, { Suspense, useEffect, useState } from "react";
import Card from "../Card/Card";
import Map from "../Map/Map";
import useStore from "@/store/store";
import CardSkeleton from "../Card/Card.Skeleton";
import { PropertyWithListedBy } from "../../../../utils/types";
import { getProperties } from "@/app/actions/propertyActions";
import { ListingStatus, PropertyType } from "@prisma/client";
import { PulseLoader } from "react-spinners";
import Heading from "@/components/small/Heading/Heading";
import { useSearchParams } from "next/navigation";

interface PropertyResultProps {
	allProperties?: PropertyWithListedBy[];
}

const PropertyResult = ({ allProperties }: PropertyResultProps) => {
	const [fullWidth, setFullWidth] = useState(false);
	const [properties, setProperties] = useState(allProperties);
	const searchParams = useSearchParams();
	const propertyType = searchParams.get("propertyType");
	const status = searchParams.get("status");
	const query = searchParams.get("query");
	const isMap = useStore((state) => state.isMap);
	const toggleLoadingFalse = useStore((state) => state.toggleLoadingFalse);
	const toggleLoadingTrue = useStore((state) => state.toggleLoadingTrue);
	const setResults = useStore((state) => state.setNumberOfResults);
	const loading = useStore((state) => state.loading);
	const queryProperties = async () => {
		try {
			toggleLoadingTrue();
			const data = await getProperties(
				status as ListingStatus,
				propertyType as PropertyType,
				query
			);
			setProperties(data);
			setResults(data.length);
		} catch (error) {
			console.log(error);
		}
		toggleLoadingFalse();
	};

	useEffect(() => {
		queryProperties();
	}, [query, propertyType, status]);

	return (
		<div className={`flex ${!isMap ? "" : "lg:gap-10"} mb-10 transition-all`}>
			<div
				className={`flex justify-between md:justify-normal
				  ${
						fullWidth && isMap ? "w-[0%] opacity-0" : "w-full opacity-100"
					} transition-all duration-500 ease-out flex-wrap  p-2 gap-3 md:gap-10 ${
					!isMap
						? "overflow-visible"
						: "md:overflow-scroll md:overflow-x-hidden md:h-[650px]"
				} `}
			>
				{loading && (
					<div className="flex items-center justify-center gap-2 w-full">
						<Heading text="Fetching properties" weight="normal" smallSize />
						<PulseLoader
							loading={true}
							color="#007BFF"
							size={8}
							aria-label="Loading Spinner"
							data-testid="loader"
						/>
					</div>
				)}
				{!loading &&
					properties &&
					properties.map((item) => (
						<Suspense key={item.id} fallback={<CardSkeleton />}>
							<Card
								area={item.area}
								bathrooms={item.bathrooms}
								bedrooms={item.bedrooms}
								images={item.images}
								title={item.title}
								price={item.price}
								listingStatus={item.status}
								key={item.id}
								listedByName={item.listedBy.name}
								listedByAvatar={item.listedBy.image}
								listedByPhone={item.listedBy.phone}
								listedByEmail={item.listedBy.email}
								id={item.id}
								country={item.country}
								state={item.state}
								city={item.city}
							/>
						</Suspense>
					))}
			</div>

			<div
				className={` h-[650px] transition-all  duration-500 ease-out hidden lg:block ${
					!isMap ? "w-[0%] opacity-0" : "lg:w-[80%] xl:w-full opacity-100"
				}`}
			>
				<Map
					properties={properties}
					setFullWidth={setFullWidth}
					fullWidth={fullWidth}
					zoom={4}
				/>
			</div>
		</div>
	);
};

export default PropertyResult;
