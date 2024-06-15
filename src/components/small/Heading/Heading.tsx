interface HeadingProps {
	text: string;
	subtitle?: string;
}

const Heading = ({ text, subtitle }: HeadingProps) => {
	return (
		<h1 className="font-heading font-bold text-[26px] md:text-[32px]">
			{text}
		</h1>
	);
};

export default Heading;
