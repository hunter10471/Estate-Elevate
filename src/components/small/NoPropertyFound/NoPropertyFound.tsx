import Image from "next/image";
import React from "react";

const NoPropertyFound = () => {
	return (
		<div className="flex flex-col items-center gap-2 grayscale-[5] text-gray-400 w-full">
			<div className="relative w-[300px] h-[300px]">
				<Image
					src={"/not-found.png"}
					alt="not-found"
					fill
					className="object-cover"
				/>
			</div>
			<h1 className="font-semibold text-xl text-center max-w-[300px]">
				We couldn&apos;t find what you were looking for...
			</h1>
		</div>
	);
};

export default NoPropertyFound;
