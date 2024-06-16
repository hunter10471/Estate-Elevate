interface HeadingProps {
	text: string;
	subtitle?: string;
}

const Heading = ({ text, subtitle }: HeadingProps) => {
	return (
		<h1 className="font-heading font-bold text-[20px] sm:text-[24px] md:text-[28px]">
			{text}
		</h1>
	);
};

export default Heading;
