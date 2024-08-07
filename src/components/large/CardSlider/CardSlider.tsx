"use client";
import Card from "@/components/medium/Card/Card";
import React, { useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import {
	PropertyWithListedByAndLikedBy,
	SafeUser,
} from "../../../../utils/types";

interface CardSliderProps {
	data: PropertyWithListedByAndLikedBy[];
	user: SafeUser | null;
}

const CardSlider = ({ data, user }: CardSliderProps) => {
	const [current, setCurrent] = useState(0);
	const [properties, setProperties] = useState(data || []);
	const size = properties.length - 1;
	const next = () => {
		if (current + 1 > size - 1) {
			setCurrent(0);
		} else {
			setCurrent((prev) => prev + 1);
		}
	};
	const prev = () => {
		if (current - 1 < 0) {
			setCurrent(size - 1);
		} else {
			setCurrent((prev) => prev - 1);
		}
	};
	return (
		<div className="flex justify-center sm:justify-normal relative mx-auto">
			<div className="hidden sm:flex gap-4 absolute right-0 -top-16 ">
				<button onClick={prev}>
					<IoIosArrowBack
						className="hover:text-white hover:bg-primary p-2 rounded-lg cursor-pointer transition-all"
						size={40}
					/>
				</button>
				<button onClick={next}>
					<IoIosArrowForward
						className="hover:text-white hover:bg-primary p-2 rounded-lg cursor-pointer transition-all"
						size={40}
					/>
				</button>
			</div>
			<div className="relative">
				<button onClick={prev}>
					<IoIosArrowBack
						className="hover:text-white hover:bg-primary p-2 rounded-lg cursor-pointer transition-all absolute -left-11 sm:-left-16 top-[30%] sm:hidden"
						size={40}
					/>
				</button>
				<button onClick={next}>
					<IoIosArrowForward
						className="hover:text-white hover:bg-primary p-2 rounded-lg cursor-pointer transition-all absolute -right-11 sm:-right-16 top-[30%] sm:hidden"
						size={40}
					/>
				</button>
				<div className="overflow-hidden w-[270px] md:w-[580px] lg:w-[900px] xl:w-[1200px]">
					<div
						style={{ transform: `translateX(-${current * 310}px)` }}
						className={`flex gap-10 transition-all ease-in-out`}
					>
						{properties.map((property) => {
							const isLiked = user
								? property.likedBy.filter((item) => user.id === item.user.id)
										.length > 0
								: false;
							return (
								<Card
									isLiked={isLiked}
									sessionUser={user}
									key={property.id}
									{...property}
									listingStatus={property.status}
									listedByName={property.listedBy.name}
									listedByAvatar={property.listedBy.image}
									listedByEmail={property.listedBy.email}
									listedByPhone={property.listedBy.phone}
								/>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CardSlider;
