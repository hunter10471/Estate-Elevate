import { IconType } from "react-icons";

interface ButtonProps {
	primary?: boolean;
	outline?: boolean;
	action?: () => void;
	text: string;
	mobileFull?: boolean;
	full?: boolean;
	icon?: IconType;
	type?: "submit" | "button";
	id?: string;
	disabled?: boolean;
	danger?: boolean;
}

const Button = ({
	primary,
	text,
	outline,
	mobileFull,
	full,
	icon: Icon,
	action,
	type,
	id,
	disabled,
	danger,
}: ButtonProps) => {
	return (
		<button
			onClick={action}
			id={id}
			type={type}
			disabled={disabled}
			className={`flex items-center justify-center gap-1 px-6 py-2 text-xs sm:text-sm border-2  rounded-lg transition-all font-heading font-normal ${
				mobileFull ? "w-full sm:w-auto" : ""
			} ${
				!primary && !outline && !danger
					? "hover:text-text/80 font-semibold"
					: ""
			} ${primary ? "bg-primary hover:bg-primaryDark text-white" : ""} ${
				outline
					? "text-primary border-primaryLight hover:text-primaryDark hover:border-primary"
					: "border-transparent"
			} ${danger ? "text-white bg-rose-500 hover:bg-rose-700" : ""}
			 ${full ? "w-full" : ""} disabled:bg-primaryDark disabled:cursor-not-allowed `}
		>
			{Icon && <Icon size={20} />} {text}
		</button>
	);
};

export default Button;
