interface ButtonProps {
	primary?: boolean;
	outline?: boolean;
	action?: () => void;
	text: string;
	mobileFull?: boolean;
}

const Button = ({
	primary,
	text,
	outline,
	mobileFull,
	action,
}: ButtonProps) => {
	return (
		<button
			className={`px-6 py-3 text-xs sm:text-sm border-2  rounded-lg transition-all font-heading font-normal ${
				mobileFull ? "w-full sm:w-auto" : ""
			} ${!primary && !outline ? "hover:text-text/80" : ""} ${
				primary ? "bg-primary hover:bg-primaryDark text-white" : ""
			} ${
				outline
					? "text-primary border-primaryLight hover:text-primaryDark hover:border-primary"
					: "border-transparent"
			}  `}
		>
			{text}
		</button>
	);
};

export default Button;
