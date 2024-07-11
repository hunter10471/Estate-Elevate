"use client";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";

interface ButtonProps {
	primary?: boolean;
	outline?: boolean;
	action?: () => void;
	text: string;
	mobileFull?: boolean;
	full?: boolean;
	icon?: React.ReactNode;
	type?: "submit" | "button" | "reset";
	id?: string;
	disabled?: boolean;
	danger?: boolean;
	loading?: boolean;
	loaderColor?: string;
	redirect?: "/contact" | "/chat" | "/profile";
	scrollToId?: string;
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
	redirect,
	scrollToId,
}: ButtonProps) => {
	const router = useRouter();
	const navigate = () => {
		if (redirect) router.push(redirect);
	};
	const scrollTo = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			const offset = 150;
			const elementPosition =
				element.getBoundingClientRect().top + window.scrollY;
			const offsetPosition = elementPosition - offset;

			window.scrollTo({
				top: offsetPosition,
				behavior: "smooth",
			});
		}
	};
	const onClick = () => {
		if (scrollToId) {
			return scrollTo(scrollToId);
		} else if (redirect) {
			return navigate();
		} else if (action) {
			return action();
		} else {
			return undefined;
		}
	};

	return (
		<button
			onClick={onClick}
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
			{!loading && Icon}{" "}
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
