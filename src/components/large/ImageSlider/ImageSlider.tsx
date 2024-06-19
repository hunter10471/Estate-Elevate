import Image from "next/image";
import React from "react";

const ImageSlider = () => {
	return (
		<div className="flex justify-between sm:flex-row flex-col gap-2">
			<div className="relative w-full sm:w-[65%] lg:h-[350px] h-[250px] cursor-pointer">
				<Image
					className="object-cover rounded-lg"
					src={"/seaside-villa.jpg"}
					alt="property"
					fill
				/>
			</div>
			<div className="w-full sm:w-[35%] flex flex-wrap justify-between items-center">
				<div className="w-[23%] sm:w-[48%] lg:h-[170px] sm:h-[120px] h-[80px] relative cursor-pointer">
					<Image
						className="object-cover rounded-lg"
						src={"/seaside-villa.jpg"}
						alt="property"
						fill
					/>
				</div>
				<div className="w-[23%] sm:w-[48%] lg:h-[170px] sm:h-[120px] h-[80px] relative cursor-pointer">
					<Image
						className="object-cover rounded-lg"
						src={"/seaside-villa.jpg"}
						alt="property"
						fill
					/>
				</div>
				<div className="w-[23%] sm:w-[48%] lg:h-[170px] sm:h-[120px] h-[80px] relative cursor-pointer">
					<Image
						className="object-cover rounded-lg"
						src={"/seaside-villa.jpg"}
						alt="property"
						fill
					/>
				</div>
				<div className="w-[23%] sm:w-[48%] lg:h-[170px] sm:h-[120px] h-[80px] relative cursor-pointer">
					<div className="z-[99] bg-black bg-opacity-40 absolute flex items-center justify-center text-white w-full h-full rounded-lg text-xs md:text-sm text-center p-1">
						Show more photos
					</div>
					<Image
						className="object-cover rounded-lg"
						src={"/seaside-villa.jpg"}
						alt="property"
						fill
					/>
				</div>
			</div>
		</div>
	);
};

export default ImageSlider;
