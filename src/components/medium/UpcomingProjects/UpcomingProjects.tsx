"use client";
import Heading from "@/components/small/Heading/Heading";
import Logo from "@/components/small/Logo/Logo";
import { UpcomingProject } from "../../../../utils/types";
import Image from "next/image";
import { useState } from "react";

const projects: UpcomingProject[] = [
	{
		id: 1,
		description: "Enjoy panoramic city views in Sunset Heights Apartment",
		img: "/apartments.jpg",
	},
	{
		id: 2,
		description: "Discover your dream home in the Green Valley Estates",
		img: "/green-estate.jpg",
	},
	{
		id: 3,
		description: "Indulge in coastal living with these Seaside Villas",
		img: "/seaside-villa.jpg",
	},
	{
		id: 4,
		description:
			"Future-proof your lifestyle with state-of-the-art Tech Hub Towers",
		img: "/tech-hub.jpg",
	},
];

const UpcomingProjects = () => {
	const [imageIndex, setImageIndex] = useState(0);
	return (
		<div className="flex gap-14 my-10 md:my-20 flex-wrap md:text-base text-sm md:flex-row flex-col-reverse text-justify">
			<div className="flex flex-col-reverse md:flex-col md:flex-1 w-full">
				<div className="md:my-0 my-10">
					<Heading text="Upcoming Projects" />
					<p className="mt-5 font-medium text-sm">
						At Estate Elevate, we are committed to bringing you the finest in
						real estate opportunities. Our upcoming projects reflect our
						dedication to quality, luxury, and innovation. Here’s a sneak peek
						at what’s in store:
					</p>
					<ul className="mt-2">
						{projects.map((item) => (
							<li
								key={item.id}
								className="flex items-center gap-4 my-8 font-medium text-sm"
							>
								<Image
									src={"/check.png"}
									width={20}
									height={20}
									alt="check-mark"
								/>{" "}
								{item.description}
							</li>
						))}
					</ul>
				</div>
				<div className="flex gap-5 flex-wrap md:justify-normal justify-center">
					{projects.map((item, index) => (
						<div
							onClick={() => setImageIndex(index)}
							className={`relative w-[80px] h-[80px] md:w-[120px] md:h-[120px] cursor-pointer border-4 rounded-xl ${
								index === imageIndex ? "border-text/50" : "border-transparent"
							}`}
						>
							<Image
								className="object-cover rounded-lg"
								key={item.id}
								src={item.img}
								alt="project"
								fill
							/>
						</div>
					))}
				</div>
			</div>
			<div className="md:flex-1 relative h-[300px] md:h-[500px] w-full md:w-[400px]">
				<Image
					src={projects[imageIndex].img}
					alt="upcoming project"
					fill
					className="object-cover rounded-lg"
				/>
				<div className="absolute right-5 top-5 p-2 rounded-lg bg-black bg-opacity-40 backdrop-blur-md">
					<Logo dark small />
				</div>
			</div>
		</div>
	);
};

export default UpcomingProjects;
