interface ButtonProps {
	primary?: boolean;
	outline?: boolean;
	action?: () => void;
	text: string;
}

const Button = ({ primary, text, outline, action }: ButtonProps) => {
	return (
		<button
			className={`px-6 py-3 text-xs sm:text-sm  rounded-lg transition-all font-heading font-normal ${
				!primary && !outline ? "hover:text-text/80" : ""
			} ${primary ? "bg-primary hover:bg-primaryDark text-white" : ""}  `}
		>
			{text}
		</button>
	);
};

export default Button;
