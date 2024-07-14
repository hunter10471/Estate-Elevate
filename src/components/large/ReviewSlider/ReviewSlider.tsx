"use client";
import Heading from "@/components/small/Heading/Heading";
import Image from "next/image";
import React from "react";
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { GiFallingStar } from "react-icons/gi";

type Props = {};

const ReviewSlider = (props: Props) => {
	const prev = () => {};
	const next = () => {};
	return (
		<div className="flex lg:flex-row flex-col-reverse my-10 md:my-20 justify-evenly items-center gap-10">
			<div className="max-w-[500px]">
				<div className="relative">
					<Heading text="What our clients say about us" />
					<GiFallingStar
						className="text-amber-500 absolute right-3 -top-3"
						size={50}
					/>
				</div>
				<p className="my-5 text-justify text-sm font-medium leading-relaxed">
					Fantastic experience with Estate Elevate! The team was responsive,
					professional, and made the process of buying a home seamless. I highly
					recommend them for anyone looking for a reliable real estate service.
					Thank you for helping me find my dream home!
				</p>
				{/* <div className="flex gap-4">
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
				</div> */}
			</div>
			<div className="relative w-[350px] h-[250px] md:w-[500px] md:h-[400px]">
				<Image
					className="rounded-xl"
					src={"/indoor.jpg"}
					alt="home interiror"
					fill
				/>
				<div className="absolute bottom-5 left-0 mx-auto md:-left-20 bg-white flex items-center md:py-4 py-3 md:px-6 px-3 rounded-r-xl md:rounded-xl gap-4 md:gap-5">
					<div className="relative w-16 h-16">
						<Image
							className="rounded-full object-cover"
							src={"/avatar-1.jpg"}
							fill
							alt="avatar"
						/>
					</div>
					<div className="text-xs flex flex-col gap-1 md:gap-2">
						<span className="font-bold">Martin Smith</span>
						<span>Property Manager</span>
						<span className="flex gap-1">
							<FaStar size={15} className="text-yellow-400" />
							<b>4.5</b> (Reviews)
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ReviewSlider;
