import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/large/Navbar/Navbar";
import Footer from "@/components/large/Footer/Footer";
import { getChatRequests, getChats } from "./actions/chatActions";
import { ChatProvider } from "@/context/ChatContext";
import { getSessionUser } from "../../utils/helpers";
import { Notification } from "../../utils/types";
import { getUserNotifications } from "./actions/notificationActions";
import { NotificationProvider } from "@/context/NotificationContext";

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

const RootLayout = async ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	const data = await Promise.all([getChats(), getChatRequests()]);
	const user = await getSessionUser();
	let notifications: Notification[] | undefined = [];
	if (user) {
		notifications = await getUserNotifications(user.id);
	}
	return (
		<html lang="en">
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
					rel="stylesheet"
				/>
			</head>
			<body>
				<ChatProvider initialChatRequests={data[1]} initialChats={data[0]}>
					<NotificationProvider initialNotifications={notifications}>
						<Navbar user={user} />
						<div className="container relative font-heading text-text overflow-hidden">
							<div className="mt-[120px]">{children}</div>
						</div>
					</NotificationProvider>
					<Footer />
				</ChatProvider>
			</body>
		</html>
	);
};

export default RootLayout;
