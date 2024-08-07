import { LikedProperty, Property, PropertyType, User } from "@prisma/client";
import { IconType } from "react-icons";

export interface PropertyTypeQuery {
	icon: IconType;
	type: PropertyType;
	name: string;
}

export interface NavLink {
	name: string;
	path: string;
}

export interface CompanyStat {
	value: string;
	subtitle: string;
	img: string;
}

export interface UpcomingProject {
	id: number;
	description: string;
	img: string;
}

export interface SortByOption {
	name: string;
	value: string;
}

export interface CreateListingResponse {
	message?: string;
	property?: Property;
	error?: any;
}

export interface Chat {
	id: string;
	chatPartner: SafeUser;
	lastMessage?: Message;
	seenBy: string[];
}

export interface Message {
	id: string;
	senderId: string;
	receiverId: string;
	text: string;
	timestamp: number;
	seenBy: string[];
}

export interface ChatRequest {
	id: string;
	senderId: string;
	receiverId: string;
}

export interface Notification {
	id: string;
	senderId: string;
	receiverId: string;
	type: NotificationType;
	timestamp: number;
	propertyId?: string;
	sender?: SafeUser;
	property?: Property;
	isNew?: boolean;
}

export interface ChatContextType {
	chats: (Chat | null)[];
	chatRequests: (Chat | null)[];
	addChat: (chat: Chat) => void;
	removeChatRequest: (chat: Chat) => void;
	addChatRequest: (chat: Chat) => void;
	updateChatLastMessage: (
		chatId: string,
		message: Message,
		sessionUser: SafeUser,
		chatPartner: SafeUser
	) => void;
	updateChatSeenStatus: (chatId: string, userId: string) => void;
}

export interface NotificationContextType {
	notifications: Notification[];
	addNotification: (notification: Notification) => void;
	seenNotification: () => void;
}

export type FacilityKey =
	| "gym"
	| "pool"
	| "garden"
	| "park"
	| "garage"
	| "community"
	| "surveillance"
	| "transport"
	| "area"
	| "bedroom"
	| "bathroom"
	| "school";

export type SafeUser = Omit<User, "password" | "createdAt" | "updatedAt">;

export type PropertyWithListedBy = Property & {
	listedBy: {
		name: string;
		id: string;
		email: string;
		image: string | null;
		phone: string | null;
	};
};

export type PropertyWithListedByAndLikedBy = PropertyWithListedBy & {
	likedBy: (LikedProperty & { user: User; property: Property })[];
};

export enum NotificationType {
	LIKE_PROPERTY = 0,
	CHAT_REQUEST = 1,
}
