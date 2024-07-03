import {
	AiOutlineHome,
	AiOutlineFile,
	AiOutlineEnvironment,
	AiOutlineInfoCircle,
	AiOutlinePicture,
	AiOutlineMessage,
	AiOutlineDollar,
} from "react-icons/ai";
import { IoSparklesOutline } from "react-icons/io5";

const steps = [
	{ label: "Type", icon: AiOutlineHome },
	{ label: "Category", icon: AiOutlineFile },
	{ label: "Location", icon: AiOutlineEnvironment },
	{ label: "Info", icon: AiOutlineInfoCircle },
	{ label: "Amenities", icon: IoSparklesOutline },
	{ label: "Images", icon: AiOutlinePicture },
	{ label: "Description", icon: AiOutlineMessage },
	{ label: "Price", icon: AiOutlineDollar },
];

interface StepIndicatorProps {
	currentStep: number;
}

const StepIndicator = ({ currentStep }: StepIndicatorProps) => (
	<div className="flex justify-between items-center mx-6 mb-2 relative">
		{steps.map((step, index) => (
			<div key={index} className="flex flex-col items-center relative z-[10]">
				<div
					className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-500
            ${
							index <= currentStep
								? "bg-primaryDark text-white"
								: "bg-gray-300 text-gray-400"
						}`}
				>
					{<step.icon size={20} />}
				</div>
			</div>
		))}{" "}
		<div className="absolute top-4 left-0 w-[99%] z-[5]">
			<div className="h-1 bg-gray-300 rounded-full">
				<div
					className={`h-1 bg-primaryDark rounded-full transition-all`}
					style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
				/>
			</div>
		</div>
	</div>
);

export default StepIndicator;
