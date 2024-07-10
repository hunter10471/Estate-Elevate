import { IconType } from "react-icons";
import { ClipLoader } from "react-spinners";

interface ButtonProps {
	primary?: boolean;
	outline?: boolean;
	action?: () => void;
	text: string;
	mobileFull?: boolean;
	full?: boolean;
	icon?: IconType;
	type?: "submit" | "button" | "reset";
	id?: string;
	disabled?: boolean;
	danger?: boolean;
	loading?: boolean;
	loaderColor?: string;
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
	loading,
	loaderColor,
}: ButtonProps) => {
	return (
		<button
			onClick={action}
			id={id}
			type={type}
			disabled={disabled || loading}
			className={`flex items-center justify-center min-w-[120px] gap-1 px-6 py-2 text-xs sm:text-sm border-2  rounded-lg transition-all font-heading font-normal ${
				mobileFull ? "w-full sm:w-auto" : ""
			} ${
				!primary && !outline && !danger
					? "hover:text-text/80 font-semibold"
					: ""
			} ${
				primary
					? "bg-primary hover:bg-primaryDark text-white disabled:bg-primaryDark"
					: ""
			} ${
				outline
					? "text-primary border-primaryLight hover:text-primaryDark hover:border-primary"
					: "border-transparent disabled:text-gray-400"
			} ${danger ? "text-white bg-rose-500 hover:bg-rose-700" : ""}
			 ${full ? "w-full" : ""}  disabled:cursor-not-allowed `}
		>
			{!loading && Icon && <Icon size={20} />}{" "}
			{loading && (
				<ClipLoader
					loading={true}
					color={loaderColor ? loaderColor : "#fff"}
					size={20}
					aria-label="Loading Spinner"
					data-testid="loader"
				/>
			)}{" "}
			{!loading && text}
		</button>
	);
};

export default Button;
