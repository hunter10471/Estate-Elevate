"use client";
import { createContext, useContext, useState } from "react";
import { Notification, NotificationContextType } from "../../utils/types";

const NotificationContext = createContext<NotificationContextType>({
	notifications: [],
	addNotification(notification) {},
	seenNotification() {},
});
export const NotificationProvider = ({
	children,
	initialNotifications,
}: {
	children: React.ReactNode;
	initialNotifications: Notification[];
}) => {
	const [notifications, setNotifications] = useState(initialNotifications);

	const addNotification = (notification: Notification) => {
		const isPresent = notifications.find((item) => item.id === notification.id);
		if (!isPresent) {
			setNotifications((prevNotifications) => [
				{ ...notification, isNew: true },
				...prevNotifications,
			]);
		}
	};
	const seenNotification = () => {
		setNotifications((prev) =>
			prev.map((notification) => {
				notification.isNew = false;
				return notification;
			})
		);
	};

	return (
		<NotificationContext.Provider
			value={{
				notifications,
				addNotification,
				seenNotification,
			}}
		>
			{children}
		</NotificationContext.Provider>
	);
};

export const useNotification = () => {
	return useContext(NotificationContext);
};
