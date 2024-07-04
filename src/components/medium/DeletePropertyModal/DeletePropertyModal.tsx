"use client";
import { deleteProperty } from "@/app/actions/propertyActions";
import Button from "@/components/small/Button/Button";
import Heading from "@/components/small/Heading/Heading";
import React, { useRef, useState } from "react";

interface DeletePropertyModalProps {
	children: React.ReactNode;
	propertyId: string;
}

const DeletePropertyModal = ({
	children,
	propertyId,
}: DeletePropertyModalProps) => {
	const [show, setShow] = useState(false);
	const modal = useRef<HTMLDivElement>(null);
	return (
		<div>
			<div
				className={`w-screen h-screen fixed ${
					show ? "opacity-100" : "opacity-0 pointer-events-none"
				} bg-black/40 z-[99999] flex justify-center items-center duration-500  m-auto top-0 right-0 overflow-hidden`}
			>
				<div
					ref={modal}
					className={`${
						show ? "translate-y-[0%]" : "translate-y-[100%]"
					} transition-all duration-500 ease-in-out flex flex-col justify-between bg-white w-[280px] h-[140px] rounded-xl p-4`}
				>
					<Heading
						text="Are you sure you want to delete this property?"
						smallSize
						weight="medium"
						center
					/>
					<div className="flex gap-4">
						<Button
							text="Delete"
							type="button"
							action={() => deleteProperty(propertyId)}
							danger
							full
						/>
						<Button
							full
							text="Cancel"
							type="button"
							action={() => setShow(false)}
						/>
					</div>
				</div>
			</div>

			<div onClick={() => setShow(true)}>{children}</div>
		</div>
	);
};

export default DeletePropertyModal;
