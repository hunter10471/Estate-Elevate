import { IconType } from "react-icons";

export interface PropertyType {
	icon: IconType;
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
