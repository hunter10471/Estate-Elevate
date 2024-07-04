interface HeadingProps {
	text: string;
	subtitle?: string;
	weight?: string;
	mediumSize?: boolean;
	smallSize?: boolean;
	center?: boolean;
}

const Heading = ({
	text,
	weight,
	mediumSize,
	smallSize,
	subtitle,
	center,
}: HeadingProps) => {
	return (
		<div>
			<h1
				className={` font-heading ${weight ? `font-${weight}` : "font-bold"}  ${
					mediumSize
						? "text-[16px] sm:text-[18px] md:text-[20px]"
						: smallSize
						? "text-[14px] sm:text-[16px] md:text-[18px]"
						: "text-[20px] sm:text-[24px] md:text-[28px]"
				} ${center ? "text-center" : "text-left"}  leading-tight  `}
			>
				{text}
			</h1>
			{subtitle && (
				<span className="text-xs md:text-sm font-medium text-gray-500 tracking-wide">
					{subtitle}
				</span>
			)}
		</div>
	);
};

export default Heading;
