"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

interface ImageSliderProps {
	images: string[];
}

const ImageSlider = ({ images }: ImageSliderProps) => {
	const arrSliceLength = images.length > 3 ? 3 : images.length - 1;
	const [index, setIndex] = useState(0);
	const [show, setShow] = useState(false);
	const onNext = () => {
		if (index === images.length - 1) {
			setIndex(0);
		} else {
			setIndex((prev) => prev + 1);
		}
	};
	const onBack = () => {
		if (index === 0) {
			setIndex(images.length - 1);
		} else {
			setIndex((prev) => prev - 1);
		}
	};

	const modal = useRef<HTMLDivElement>(null);
	const handleClickOutside = (e: React.MouseEvent<Document>) => {
		if (modal.current && !modal.current.contains(e.target as Node)) {
			setShow(false);
		}
	};

	useEffect(() => {
		if (show) {
			document.addEventListener(
				"mousedown",
				handleClickOutside as unknown as EventListener
			);
		} else {
			document.removeEventListener(
				"mousedown",
				handleClickOutside as unknown as EventListener
			);
		}
		return () => {
			document.removeEventListener(
				"mousedown",
				handleClickOutside as unknown as EventListener
			);
		};
	}, [show]);

	return (
		<div className="flex justify-between sm:flex-row flex-col gap-2">
			<div className="relative w-full sm:w-[65%] lg:h-[350px] h-[250px] cursor-pointer">
				<Image
					className="object-cover rounded-lg"
					src={images[index]}
					alt="property"
					fill
				/>
			</div>
			<div className="w-full sm:w-[35%] flex flex-wrap justify-between items-center">
				{images.slice(0, arrSliceLength).map((image, index) => (
					<div
						onClick={() => setIndex(index)}
						className="w-[23%] sm:w-[48%] lg:h-[170px] sm:h-[120px] h-[80px] relative cursor-pointer"
					>
						<Image
							className="object-cover rounded-lg"
							src={image}
							alt="property"
							fill
						/>
					</div>
				))}

				{arrSliceLength === 3 && (
					<div
						onClick={() => setShow(true)}
						className="w-[23%] sm:w-[48%] lg:h-[170px] sm:h-[120px] h-[80px] relative cursor-pointer"
					>
						<div className="z-[99] bg-black bg-opacity-40 absolute flex items-center justify-center text-white w-full h-full rounded-lg text-xs md:text-sm text-center p-1">
							Show more photos
						</div>
						<Image
							className="object-cover rounded-lg"
							src={images[images.length - 1]}
							alt="property"
							fill
						/>
					</div>
				)}
			</div>
			{show && (
				<div className="h-screen w-screen fixed top-0 left-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-[99999]">
					<div ref={modal} className="flex items-center gap-2">
						<button
							onClick={onBack}
							className="transition-all hover:scale-105 active:scale-90 p-1 bg-white rounded-full"
						>
							<IoChevronBack size={25} />
						</button>
						<div className="relative w-[80vw] h-[80vh]">
							<Image
								className="object-cover rounded-xl"
								src={images[index]}
								alt="property"
								fill
							/>
							<button
								onClick={() => setShow(false)}
								className="absolute top-4 right-4 transition-all hover:scale-105 active:scale-90 p-1 bg-white rounded-full"
							>
								<IoMdClose size={20} />
							</button>
						</div>
						<button
							onClick={onNext}
							className="transition-all hover:scale-105 active:scale-90 p-1 bg-white rounded-full"
						>
							<IoChevronForward size={25} />
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default ImageSlider;
