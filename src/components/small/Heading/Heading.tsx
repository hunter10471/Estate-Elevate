interface HeadingProps {
	text: string;
	subtitle?: string;
}

const Heading = ({ text, subtitle }: HeadingProps) => {
	return (
		<h1 className="font-heading font-bold text-[32px] md:text-[42px] leading-tight">
			{text}
		</h1>
	);
};

export default Heading;
