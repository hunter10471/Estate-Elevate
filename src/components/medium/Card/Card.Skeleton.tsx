import "./Card.css";

const CardSkeleton = () => {
	return (
		<div className="flex flex-col gap-4">
			<div className="w-[150px] md:w-[250px] h-[150px] md:h-[200px] relative skeleton"></div>
			<div className="flex justify-between px-2">
				<div className="w-14 h-5 skeleton skeleton"></div>
				<div className="flex gap-2">
					<div className="w-5 h-5 rounded-full skeleton"></div>
					<div className="w-5 h-5 rounded-full skeleton"></div>
				</div>
			</div>
			<div className="px-2 flex flex-col gap-4">
				<div className="h-7 w-[80%] skeleton"></div>
				<div className="h-5 w-[60%] skeleton "></div>
				<div className="h-4 w-[40%] skeleton"></div>
			</div>
		</div>
	);
};

export default CardSkeleton;
