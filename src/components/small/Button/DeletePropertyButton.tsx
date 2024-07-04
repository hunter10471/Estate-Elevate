"use client";

import { deleteProperty } from "@/app/actions/propertyActions";
import { MdDeleteOutline } from "react-icons/md";

interface DeletePropertyButtonProps {
	propertyId?: string;
}
const DeletePropertyButton = ({ propertyId }: DeletePropertyButtonProps) => {
	return (
		<button
			onClick={propertyId ? () => deleteProperty(propertyId) : undefined}
			className="p-1 rounded-full border-2 border-gray-300 transition-all ease-out hover:scale-110 active:scale-95 bg-rose-500 text-white"
		>
			<MdDeleteOutline size={20} />
		</button>
	);
};

export default DeletePropertyButton;
