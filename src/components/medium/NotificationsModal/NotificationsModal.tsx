"use client";
import { useNotification } from "@/context/NotificationContext";
import Image from "next/image";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { MdOutlineNotifications } from "react-icons/md";
import { NotificationType, SafeUser } from "../../../../utils/types";

interface NotificationsModalProps {
	user: SafeUser;
	notificationUnread: boolean;
	setNotificationUnread: SetStateAction<any>;
}

const NotificationsModal = ({
	notificationUnread,
	setNotificationUnread,
}: NotificationsModalProps) => {
	const { notifications, seenNotification } = useNotification();
	const [show, setShow] = useState(false);
	const openModal = () => {
		setShow((prev) => !prev);
		setNotificationUnread(false);
	};
	const modalOpen = useRef(false);
	const modal = useRef<HTMLDivElement>(null);
	const handleClickOutside = (e: React.MouseEvent<Document>) => {
		if (modal.current && !modal.current.contains(e.target as Node)) {
			setShow(false);
		}
	};

	useEffect(() => {
		if (modalOpen.current && !show) {
			seenNotification();
		} else {
			modalOpen.current = true;
		}
	}, [show]);

	useEffect(() => {
		if (show) {
			document.addEventListener(
				"mousedown",
				handleClickOutside as unknown as EventListener
			);
		} else {
			document.removeEventListener(
				"mousedown",
				handleClickOutside as unknown as EventListener
			);
		}
		return () => {
			document.removeEventListener(
				"mousedown",
				handleClickOutside as unknown as EventListener
			);
		};
	}, [show]);

	return (
		<div ref={modal} className="relative">
			<button className="relative" onClick={openModal}>
				<MdOutlineNotifications className="-mb-1" size={25} />
				{notificationUnread && (
					<span className="h-2 w-2 rounded-full absolute bg-primary top-1 left-1"></span>
				)}
			</button>
			{show && (
				<div className="border-2  absolute -bottom-[260px] -left-[160px] h-[250px] w-[200px] rounded-l-xl overflow-scroll overflow-x-hidden bg-white  shadow-xl">
					{notifications.length > 0 ? (
						notifications.reverse().map((notification) => (
							<div
								className={`flex min-h-[60px] w-full border-b-2 border-gray-200 py-2 text-xs gap-2 p-2 ${
									notification.isNew ? "bg-primaryLight" : ""
								}`}
								key={notification.id}
							>
								<div className="relative h-6 w-6 flex-shrink-0">
									<Image
										src={notification.sender?.image || "/no-avatar.jpg"}
										alt="avatar"
										fill
										className="rounded-full object-cover"
									/>
								</div>

								{notification.type === NotificationType.LIKE_PROPERTY ? (
									<span className="line-clamp-3">
										{" "}
										{notification.sender?.name} liked your property
										<b> {notification.property?.title}</b>
									</span>
								) : (
									<span className="line-clamp-3">
										{" "}
										<b>{notification.sender?.name} </b> sent you a chat request
									</span>
								)}
							</div>
						))
					) : (
						<div className="flex p-2 text-xs text-gray-500 items-center justify-center w-full h-full text-center">
							You don&apos;t have any notifications yet.
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default NotificationsModal;
