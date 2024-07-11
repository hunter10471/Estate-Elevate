import React from "react";
import Chatbar from "@/components/medium/Chatbar/Chatbar";
import { getSessionUser } from "../../../utils/helpers";
import { notFound } from "next/navigation";

const layout = async ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	const sessionUser = await getSessionUser();
	if (!sessionUser) return notFound();
	return (
		<div className="flex gap-4">
			<Chatbar sessionUser={sessionUser} />
			<div className="w-full">{children}</div>
		</div>
	);
};

export default layout;
