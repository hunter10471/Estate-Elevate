import { Property, PropertyType, User } from "@prisma/client";
import { IconType } from "react-icons";

export interface PropertyTypeQuery {
	icon: IconType;
	type: PropertyType;
	name: string;
	query: string;
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
	listedBy: { username: string; avatar: string | null };
};
