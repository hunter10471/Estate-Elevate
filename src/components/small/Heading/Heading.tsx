interface HeadingProps {
	text: string;
	subtitle?: string;
	weight?: string;
	mediumSize?: boolean;
}

const Heading = ({ text, weight, mediumSize, subtitle }: HeadingProps) => {
	return (
		<h1
			className={`font-heading ${weight ? `font-${weight}` : "font-bold"}  ${
				mediumSize
					? "text-[16px] sm:text-[18px] md:text-[20px]"
					: "text-[20px] sm:text-[24px] md:text-[28px]"
			} `}
		>
			{text}
		</h1>
	);
};

export default Heading;
